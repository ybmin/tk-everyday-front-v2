// src/types/toast-ui__editor.d.ts
declare module "@toast-ui/editor" {
  import { Editor as ToastEditor } from "@toast-ui/editor";

  export default ToastEditor;
  export {
    PluginInfo,
    PluginContext,
    PluginOptions,
    MdNode,
  } from "@toast-ui/editor";
}
