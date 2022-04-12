<template>
    
    <div v-for="group in editor.elements" :key="group.label" class="flex flex-col w-full  cursor-pointer">
        <div class="titleBar"  :class="tab===group.label?'bg-blue-800':'bg-bluegray-800'" @click="tab=group.label">{{ group.label }}</div>
        <div v-if="tab===group.label" class="flex flex-wrap items-center justify-center ">
            <template v-for="element in group.elements" :key="element.label">
                <div class="editor-element bg-bluegray-800 m-1 hover:bg-purple-600 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center text-gray-300 rounded hover:text-white shadow" @click="newElement(element.name)">
                    <i class="iconify text-2xl" :data-icon="'ic:' + element.icon"/>
                    <span class="text-xs">{{ element.name }}</span>
                </div>
            </template>
        </div>
    </div>
        <div class="titleBar cursor-pointer"  :class="tab==='snippets'?'bg-blue-800':'bg-bluegray-800'" @click="tab='snippets'">Snippets</div>
        <div v-if="tab==='snippets'">
            <BlockSnippets/>
        </div>
</template>

<script lang="ts">

import { defineComponent , ref } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import Element from '../../../composables/useElementClass';
//import { getCurrent , getEditor } from '/@/composables/useActions'

export default defineComponent({
  name: 'BlockElements',
  setup() {
    const editor:any = useEditorStore()//useStore().state.editor;
    const tab = ref('')
    const newElement = async ( name: string )=>{
        if ( editor.current ){
            if ( name != 'Grid' ){
                const el = await new Element().createElement(name)
                const current: any = editor.current    
                current.blocks.push ( el )
                //editor.current = el 
            } 
            if ( name === 'Grid' ){
                editor._helper ( name )
            }
        }
    }
    return { editor , tab, newElement };
  },
});
</script>