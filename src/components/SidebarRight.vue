<template>
    <div class="bars sidebarRight z-modal overflow-y-auto border-r border-bluegray-700">
        <!-- @mouseover="disableFloating()" @mouseout="disableFloating()" -->
        <div class="h-8 flex w-full justify-center bg-purple-600 text-white uppercase items-center"> {{ editor.tool.replace ( '-' , ' ') }}</div>
        <BlockElements v-if="editor.tool === 'elements'"/>
        <BlockEdit v-if="editor.tool === 'edit' && editor.current && editor.current.type != 'container'"/>
        <BlockCss v-if="editor.tool === 'css'"/>
        <BlockSnippets v-if="editor.tool === 'snippets'"/>
        <BlockLink v-if="editor.tool === 'link'"/>
        <BlockEvents v-if="editor.tool === 'events'"/>
        <!-- <BlockFont v-if="editor.tool==='font'"/> -->
        <!-- <BlockColor v-if="editor.tool==='text-color'" context="text"/>
        <BlockColor v-if="editor.tool==='bg-color'" context="bg"/> -->
        <!-- <BlockImage v-if="editor.tool==='image'"/> -->
        <BlockHeading v-if="editor.tool==='heading'"/>
        <BlockWindi v-if="editor.tool === 'customize'" :group="editor.toolGroup"/>
        <BlockSlider v-if="editor.tool === 'slider'"/>
        <!-- <BlockGraphQL v-if="editor.tool === 'graphql'"/> -->
        <GraphQLTool v-if="editor.tool==='graphql'"/>
        <BlockTree v-if="editor.tool === 'tree'"/>
        <BlockAlpine v-if="editor.current && editor.tool === 'alpine'" :id="editor.current.id"/>
        <BlockUIKits v-if="editor.current && editor.tool === 'library'"/>
        <BlockAttributes v-if="editor.current && editor.tool === 'attributes'"/>
        <div id="root" class="ml-4 text-white overflow-y-auto"></div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const editor = inject('useStore').editor
</script>
<style>
::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#cccccc;border-radius:5px}::-webkit-scrollbar-thumb{background:#6c6c6d;border-radius:5px}

</style>