<template>
    <div v-if="snippets" class="relative top-0 mt-8 w-full">
        <div class="flex flex-wrap items-center justify-center cursor-pointer">
        <template v-for="snippet in Object.keys(items)" :key="snippet">
            <div class="editor-element bg-bluegray-800 m-1 hover:bg-purple-600 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center  text-gray-300 rounded hover:text-white shadow" @click="createSnippet(items[snippet].template)" :title="snippet">
                <Icon class="text-3xl" :icon="items[snippet].icon" :title="snippet"/>
                <span class="text-xs" style="font-size:.6rem">{{ snippet }}</span>
            </div>
        </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue'
import Template from '/@/composables/useSnippets'
import { useEditorStore } from '/@/stores/editor'

export default defineComponent({
    name: 'BlockSnippets',
    setup() {
        const editor = useEditorStore()
        const snippets = ref (  new Template().templates )
        const items = ref ( new Template().templatesIcon )

        const createSnippet = ( snippet: object ) => {
            let template =  new Template().Build(snippet)
            if ( !template || !editor.current || !editor.current?.blocks ) return 
            template.blocks.forEach ( block => {
                editor.current.blocks.push ( block )
            })
        }
        return { snippets , items , createSnippet}
    },
})
</script>
