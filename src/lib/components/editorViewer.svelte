<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import Document from '@tiptap/extension-document';
  import Paragraph from '@tiptap/extension-paragraph';
  import Heading from '@tiptap/extension-heading';
  import Bold from '@tiptap/extension-bold';
  import Text from '@tiptap/extension-text';
  import Strike from '@tiptap/extension-strike';
  import History from '@tiptap/extension-history';
  import { CharacterCount } from '@tiptap/extension-character-count';
  import HorizontalRule from '@tiptap/extension-horizontal-rule';
  import emojis from "./plugins/emoji.json";
  import "./editor.css";
  
  let element: any;
  let editor: any;
  
  const limit = 2000;
  onMount(async() => {
    const {EmojiPicker}  = await import ("@vtechguys/tiptap-emoji-picker");
    editor = new Editor({
      element: element,
      extensions: [
        Text,
        Document,
        Paragraph,
        Heading,
        Bold,
        Strike,
        History,
        CharacterCount.configure({
          limit,
        }),
        HorizontalRule.configure({
          HTMLAttributes: {
            class: 'hr',
          },
        }),
        EmojiPicker.configure({
          emojis,
          classes: {
            // root container
            root: "emoji-picker__container",
            // emoji box
            emojiContainer: "emoji-picker__emoji",
            // fallback image
            emojiImage: "emoji-picker__emoji__img",
            // unicode char emoji
            emojiChar: "emoji-picker__emoji__char",
          },
          trippy: true,

        })
        // fgcommand, // fgcommand 노드 추가
      ],
      autofocus: true,
      editable: true,
      injectCSS: false,
      content: '<p>Hello World! 🌍️ </p>',
      onTransaction: () => {
        editor = editor;
      },
    });
    
  });
  
  onDestroy(() => {
    if (editor) {

      editor.destroy();
    }
  });
</script>

{#if editor}
<div class="join">
  <button
  class="btn btn-ghost join-item"
  on:click={() => editor.chain().focus().undo().run()}
  disabled={!editor.can().undo()}
  >
  ↰
  </button>
  <button 
  class="btn btn-ghost join-item"
  on:click={() => editor.chain().focus().redo().run()}
  disabled={!editor.can().redo()}
  >
  ↱
  </button>
</div>
<div class="join">
	<button
    class="btn btn-ghost join-item"
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
    class="btn btn-ghost join-item"
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
    class="btn btn-ghost join-item"
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		일반
	</button>
  <button
    class="btn btn-ghost join-item"
    on:click={() => editor.chain().focus().toggleBold().run()}
    class:active={editor.isActive('bold')}
  >
    B
  </button>

  <!-- <button
    class="btn btn-ghost join-item"
    on:click={() => editor.commands.startFgcommand()}
  >
    FG Command
  </button> -->
</div>
<div class="join">
  <button
    class="btn btn-ghost join-item"
    on:click={() => editor.chain().focus().setHorizontalRule().run()}
  >
    구분선
  </button>
  <button
  class="btn btn-ghost join-item"
  on:click={() => 
  !editor.isActive('strike')? editor.chain().focus().setStrike().run(): editor.chain().focus().unsetStrike().run()
  }
>
  취소선
</button>

</div>
{/if}

<div bind:this={element} class="w-full min-h-56 overflow-x-clip "></div>


{#if editor}
<div class={`flex flex-row gap-2 items-center`}>
  <div class="radial-progress bg-base-300 {editor.storage.characterCount.characters() >= limit-100 ?'text-error':'text-primary'}" style="--value:{editor.storage.characterCount.characters() *100 / limit}; --size:6rem;" role="progressbar">{(editor.storage.characterCount.characters() *100 / limit).toPrecision(1)} %</div>
  {editor.storage.characterCount.characters()} / {limit} 자
</div>
{/if}