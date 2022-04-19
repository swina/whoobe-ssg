<template>
    <m-icon icon="subject" class="toolbar-icon toolbar-icon" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }"/>

    
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
    </button>
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
    </button>
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
    </button>
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
    </button>
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
    </button>
    <button class="toolbar-icon bg-transparent text-black p-0" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
    </button>


    <m-icon icon="list" class="toolbar-icon" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }"/>

    <m-icon icon="format_list_numbered" class="toolbar-icon"  @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }"/>

    <!-- <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
    </button> -->
    <m-icon icon="format_quote"class="toolbar-icon"  @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"/>

    <m-icon icon="horizontal_rule"class="toolbar-icon"  @click="editor.chain().focus().setHorizontalRule().run()"/>
    <!-- <button @click="editor.chain().focus().setHardBreak().run()">
    hard break
    </button> -->
    <m-icon icon="photo" class="toolbar-icon" @click="addImage=!addImage"/>
    <!-- <m-icon icon="undo" class="toolbar-icon" @click="editor.chain().focus().undo().run()"/>
    <m-icon icon="redo" class="toolbar-icon" @click="editor.chain().focus().redo().run()"/> -->
    <div v-if="addImage">
        <input type="text" v-model="image"/><button @click="setImage">OK</button>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'

const editor = useStore()
</script>