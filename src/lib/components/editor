<script lang="ts">
  import '@toast-ui/editor/dist/toastui-editor.css';
  import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
  import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
  import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
  import {onMount} from 'svelte';
  import { tekkenRankMatchPlugin } from './plugins/rankMatchPlugin';
  // import { rankMatchPlugin } from './plugins/rankMatchPlugin'; // 새로 추가
  
  onMount(async ()=>{
    const { default: Editor } = await import('@toast-ui/editor');
    const {default: colorSyntax} = await import('@toast-ui/editor-plugin-color-syntax');
    const  {default: codeSyntaxHighlight} =  await import ('@toast-ui/editor-plugin-code-syntax-highlight');
  
    const content = `# Hello, world! 🌍`;
    const editor = new Editor({
      initialEditType: 'wysiwyg ',
      // language: "ko",
      // hideModeSwitch: true,
      el: document.querySelector('#editor'),
      previewStyle: 'vertical',
      height: '500px',
      initialValue: content,
      toolbarItems:[
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'link'],
      ['code', 'codeblock']
    ],
      plugins: [colorSyntax, codeSyntaxHighlight, tekkenRankMatchPlugin], 
      theme: 'dark',
      customHTMLRenderer: {
      htmlBlock: {
        iframe(node:any) {
          return [
            { type: 'openTag', tagName: 'iframe', outerNewLine: true, attributes: node.attrs },
            { type: 'html', content: node.childrenHTML },
            { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
          ];
        },
      }
    },
    });
    // editor.on('keyup', (editorType:any, ev:any) => {
    //   if (ev.key === '@') {
    //     const popup = document.createElement('ul');
    //     popup.innerHTML = `
    //       <li>apple</li>
    //       <li>banana</li>
    //       <li>cherry</li>
    //     `;
      
    //     editor.addWidget(popup, 'top');
    //   }
    // });
    

  });
</script>

<div id="editor">
</div>