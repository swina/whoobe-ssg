<template>
    <div class="p-2 flex flex-col ">
        <div class="flex mb-2">

            <button class="toolbar-icon" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <icon icon="bx:bold"/>
            </button>
            <button  class="toolbar-icon" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <icon icon="bx:italic"/>
            </button> 

            <button  class="toolbar-icon" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                <icon icon="bx:underline"/>
            </button> 



            <button  class="toolbar-icon" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                <icon icon="clarity:strikethrough-line"/>
            </button>



            <button class="toolbar-icon" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                <icon icon="bi:code"/>
            </button>
            


            <button class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                <icon icon="bi:paragraph"/>
            </button>
            

            <button class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <icon icon="akar-icons:text-align-left"/>
            </button>
            <button class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <icon icon="akar-icons:text-align-center"/>
            </button>
            <button class="toolbar-icon toolbar-icon"  @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <icon icon="akar-icons:text-align-right"/>
            </button>
            <button class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                <icon icon="akar-icons:text-align-justified"/>
            </button>

            <select v-model="font" @change="setFontFamily">
                <option v-for="fnt in FONTS" :value="fnt.replaceAll('+',' ')">{{fnt.replaceAll('+',' ')}}</option>
            </select>

            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                h1
            </button>
            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                h2
            </button>
            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                h3
            </button>
            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                h4
            </button>
            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                h5
            </button>
            <button class="uppercase toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                h6
            </button>

            <button class="toolbar-icon"  @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            <icon icon="mi:list" />
            </button>

            <button class="toolbar-icon"  @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
            <icon icon="mdi:format-list-numbered" />
            </button>

            <button  class="toolbar-icon"  @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
            <icon icon="bi:quote"/>
            </button>

            <icon icon="ic:baseline-horizontal-rule" class="toolbar-icon"  @click="editor.chain().focus().setHorizontalRule().run()"/>
            <!-- <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
            </button> -->
            <button class="toolbar-icon" @click="addImage">
                <icon icon="bi:image"/>
            </button>
        </div>
        <editor-content :editor="editor" class="border h-md" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EDITOR as STORE } from '/@/composables/useEditor'
import { FONTS } from '/@/composables/useUtils'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'

const element = STORE //useStore()
const font = ref('')
let content = element.current.content

let editor = new Editor({
      content: content ,
      onUpdate: () => {
        element.current.content = editor.getHTML() 
      },
      extensions: [
        StarterKit,
        Underline,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        FontFamily
      ],
})

const addImage = () => {
    const url = window.prompt('URL')
    if (url) {
    editor.chain().focus().setImage({ src: url }).run()
    }
}

const setFontFamily = () => {
    editor.chain().focus().setFontFamily(font.value).run()
}


</script>

<style>
[contenteditable] {
  outline: 0px solid transparent;
}
</style>