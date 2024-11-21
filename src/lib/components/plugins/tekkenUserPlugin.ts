import { $inputRule, $node, $remark } from "@milkdown/kit/utils";
import directive from "remark-directive";
import { InputRule } from "@milkdown/kit/prose/inputrules";

export const remarkDirective = $remark("remarkDirective", () => directive);

export const tekkenUserDirectiveNode = $node("tekkenUser", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: "tekkenUser",
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute("src"),
      }),
    },
  ],
  toDOM: (node: any) => {
    return [
      "div",
      { "data-src": node.attrs.src, "data-type": "tekkenUser-wrapper" },
      "tekkenUser-wrapper",
    ];
  },
  parseMarkdown: {
    match: (node) =>
      node.type === "leafDirective" && node.name === "tekkenUser",
    runner: (state, node, type) => {
      state.addNode(type, { src: (node.attributes as { src: string }).src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "tekkenUser",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "tekkenUser",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export const tekkenUserInputRule = $inputRule(
  (ctx) =>
    new InputRule(
      /::tekkenUser\{src\="(?<src>[^"]+)?"?\}/,
      (state, tekkenUser, start, end) => {
        const [okay, src = ""] = tekkenUser;
        const { tr } = state;
        if (okay) {
          tr.replaceWith(
            start - 1,
            end,
            tekkenUserDirectiveNode.type(ctx).create({ src })
          );
        }
        return tr;
      }
    )
);
