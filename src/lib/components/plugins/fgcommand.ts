import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands {
    fgcommand: {
      startFgcommand: () => void;
    };
  }
}

import fgcCommandMap from "./fgcCommandMap";

export default Node.create({
  name: "fgcommand",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      // 필요한 속성 추가
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.fgcommand-block",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "fgcommand-block",
        style: "background-color: #f0f0f0;",
      }),
      ["span", { contenteditable: "true" }],
    ];
  },

  addCommands() {
    return {
      startFgcommand:
        () =>
        ({ commands }: any) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});
