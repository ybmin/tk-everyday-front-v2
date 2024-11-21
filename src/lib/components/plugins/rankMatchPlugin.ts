import type {
  PluginInfo,
  PluginContext,
  PluginOptions,
  MdNode,
} from "@toast-ui/editor";
import { $inputRule, $nodeAsync, $remark } from "@milkdown/kit/utils";
import directive from "remark-directive";
import { InputRule } from "@milkdown/kit/prose/inputrules";
import { on } from "svelte/events";
import { text } from "@sveltejs/kit";
// import TekkenMatch from "../TekkenMatch.svelte";

const PREFIX = "toastui-editor-";
function createToolbarItemOption(rankMatchContainer: HTMLDivElement) {
  return {
    name: "match",
    tooltip: "랭크 전적",
    text: "R",
    className: `${PREFIX}popup-tekken-rank-match`,
    style: {
      color: "red",
      fontWeight: "bold",
      fontSize: "1.5em",
      border: "0px solid red",
    },
    popup: {
      className: `${PREFIX}popup-tekken-rank-match-container`,
      body: rankMatchContainer,
      style: {
        width: "auto",
        border: "0px",
        padding: "0px",
        margin: "0px",
        backgroundColor: "transparent",
        borderRadius: "5px",
        color: "black",
      },
    },
  };
}

function createSelection(
  tr: any,
  selection: any,
  SelectionClass: any,
  openTag: string,
  closeTag: string
) {
  const { mapping, doc } = tr;
  const { from, to, empty } = selection;
  const mappedFrom = mapping.map(from) + openTag.length;
  const mappedTo = mapping.map(to) - closeTag.length;

  return empty
    ? SelectionClass.create(doc, mappedTo, mappedTo)
    : SelectionClass.create(doc, mappedFrom, mappedTo);
}

// 커스텀 플러그인 정의
export function tekkenRankMatchPlugin(
  context: PluginContext,
  options: PluginOptions = {}
): PluginInfo {
  const { eventEmitter, pmState } = context;
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.padding = "10px";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.backgroundColor = "white";
  container.style.border = "1px solid #ccc";
  container.style.alignItems = "center";
  container.style.borderRadius = "5px";
  container.style.position = "relative";
  container.style.color = "black";
  container.style.zIndex = "1000";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "match-id");
  input.setAttribute("placeholder", "Enter Match ID");
  input.style.color = "black";
  container.appendChild(input);
  const button = document.createElement("button");
  button.textContent = "Load Match Data";
  button.setAttribute("type", "button");
  button.addEventListener("click", async () => {
    const matchId = (
      container.querySelector("#match-id") as HTMLTextAreaElement
    ).value;
    eventEmitter.emit("command", "matchData", { matchId: matchId });
    eventEmitter.emit("closePopup");
  });
  container.appendChild(button);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://your-iframe-source.com");
  iframe.style.width = "100%";
  iframe.style.height = "400px";

  return {
    markdownCommands: {
      matchData: (
        { matchId }: any,
        { tr, selection, schema }: any,
        dispatch: any
      ) => {
        if (matchId) {
          console.log("matchData on md", matchId);
          const slice = selection.content();
          const textContent = slice.content.textBetween(
            0,
            slice.content.size,
            "\n"
          );

          tr.replaceSelectionWith(
            // schema.text(`::match{#${matchData.battle_id}}`)
            schema.text()
          );

          dispatch!(tr);

          return true;
        }
        return false;
      },
    },
    wysiwygCommands: {
      matchData: (
        { matchId }: any,
        { tr, selection, schema }: any,
        dispatch: any
      ) => {
        if (matchId) {
          console.log("matchData on wysiwyg", matchId);
          tr.inserthtml(
            `<iframe src="http://localhost:3000/tekkenMatch/${matchId}" height="auto" width="100%"/>`
          );
          tr.insertText("\n");
          console.log("matchData on wysiwyg", matchId);
          const slice = selection.content();
          const textContent = slice.content.textBetween(
            0,
            slice.content.size,
            "\n"
          );
          const iframe = document.createElement("iframe");
          iframe.setAttribute(
            "src",
            `https://localhost:3000/tekkenMatch/${matchId}`
          );
          iframe.style.width = "100%";
          iframe.style.height = "auto";

          tr.replaceSelectionWith();

          tr.replaceSelectionWith(node).scrollIntoView();
          dispatch!(tr);

          return true;
        }
        return false;
      },
    },
    toHTMLRenderers: {
      matchData(node: MdNode) {},
    },
    toMarkdownRenderers: {
      matchData(node: MdNode) {
        console.log("matchData on MD renderer", node.attrs.matchId);
        return `::match{#${node.attrs.matchId}}`;
      },
    },
    toolbarItems: [
      {
        groupIndex: 4,
        itemIndex: 2,
        item: createToolbarItemOption(container),
      },
    ],
  };
}

export async function fetchMatchData(matchId: string) {
  try {
    const res = await fetch(`https://api.tk-everyday.site/battles/${matchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      return data;
    } else {
      return { error: "No Match Found" };
    }
  } catch (error) {
    console.error("Error fetching match data:", error);
    return { error: "Error fetching match data" };
  }
}
