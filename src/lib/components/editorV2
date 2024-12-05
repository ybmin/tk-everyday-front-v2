<script lang="ts">
  import {onMount} from 'svelte';
  import "./editor.css";
  import CustomEmojiBlock from './plugins/emoji';
  import FGCTool from './plugins/fgcommand';
  import { emDash } from '@milkdown/kit/prose/inputrules';
  onMount(async ()=>{
    const { default: EditorJS } = await import('@editorjs/editorjs');
    const { default: Header } = await import('@editorjs/header');
    // const {default: Header} = await import('editorjs-header-with-anchor');
    const { default: List} = await import ('@editorjs/list');
    const { default: Paragraph} = await import('@editorjs/paragraph');
    const {default: TextVariantTune} = await import('@editorjs/text-variant-tune');
    const {default: Undo} = await import('editorjs-undo');
    const {default: Delimiter} = await import('@editorjs/delimiter');
    const {default: Warning} = await import('@editorjs/warning');
    const {default: SimpleImage} = await import('@editorjs/simple-image');
    const {default: Embed} = await import('@editorjs/embed');
    const {default: Table} = await import('@editorjs/table');
    const {default: DragDrop} = await import('editorjs-drag-drop');
    // const {default: MultiBlockSelectionPlugin } = await import('editorjs-multi-block-selection-plugin');
      

    const editor = new EditorJS({
      holder: 'editorjs',
      // inlineToolbar: ['bold', 'italic'],
      tools: {
        header: {
          class: Header,
          /**
           * This property will override the common settings
           * That means that this tool will have only Marker and Link inline tools
           * If 'true', the common settings will be used.
           * If 'false' or omitted, the Inline Toolbar wont be shown
           */
          inlineToolbar: true,
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },
      list: { 
        class: List, 
        inlineToolbar: true 
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      delimiter: Delimiter,
      textVariant: TextVariantTune,
      emoji: CustomEmojiBlock,
      fgc: FGCTool,
      // warning: Warning,
      image: SimpleImage,
      embed: Embed,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
    },
    tunes: ['textVariant'],
    });
    editor.isReady
      .then(() => {
        new Undo({editor});    
        new DragDrop(editor);
        // const blockSelection = new MultiBlockSelectionPlugin({ editor, version: EditorJS.version });
        // blockSelection.listen();
        console.log('Editor.js is ready to work!');
        /** Do anything you need after editor initialization */
      })
      .catch((reason) => {
        console.log(`Editor.js initialization failed because of ${reason}`)
      });
  })
</script>


<div id="editorjs"></div>

<style>
  #editorjs {
    border-color: dimgray;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
</style>