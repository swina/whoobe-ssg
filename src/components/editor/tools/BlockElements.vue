<template>
    
    <div v-for="group in editor.elements" :key="group.label" class="flex flex-col w-full  cursor-pointer">
        <div class="titleBar"  :class="tab===group.label?'bg-blue-800':'bg-bluegray-800'" @click="tab=group.label">{{ group.label }}</div>
        <div v-if="tab===group.label" class="flex flex-wrap items-center justify-center ">
            <template v-for="element in group.elements" :key="element.label">
                <div class="editor-element bg-bluegray-800 m-1 hover:bg-purple-600 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center text-gray-300 rounded hover:text-white shadow" @click="newElement(element.name)">
                    <i class="iconify text-2xl" :data-icon="element.icon"/>
                    <span class="text-xs">{{ element.name }}</span>
                </div>
            </template>
        </div>
    </div>
        <div class="titleBar cursor-pointer"  :class="tab==='snippets'?'bg-blue-800':'bg-bluegray-800'" @click="tab='snippets'">Snippets</div>
        <div v-if="tab==='snippets'">
            <BlockSnippets/>
        </div>
        <div class="titleBar cursor-pointer"  :class="tab==='templates'?'bg-blue-800':'bg-bluegray-800'" @click="tab='templates',open=true">Templates</div>
        <TreeContainer v-if="open && tab==='templates'" context="templates" :open="open" @file="addTemplate"/>
</template>

<script setup lang="ts">

import { inject, ref } from 'vue';
//import { store } from '/@/composables/useStore'
import Element from '../../../composables/useElementClass';

const store = inject ( 'useStore' )
//import { useStore } from 'vuex'
//import { useEditorStore } from '/@/stores/editor';
//import { EDITOR } from '/@/composables/useEditor';
//import { status } from '/@/composables/useNavigation';

    const editor:any = store.editor //EDITOR //useEditorStore()//useStore().state.editor;
    const status = store.status

    const tab = ref('')
    let open = ref(false)
    const newElement = async ( name: string )=>{
        console.log ( 'adding => ' , name)
        if ( editor.current ){
            
            if ( name != 'Grid' ){
                const el = await new Element().createElement(name)
                //const current: any = editor.current  
                let id = editor.current.id
                let isChild = false
                if ( editor.current.data?.client && editor.current.data?.model ){
                    el.data['client'] = editor.current.data.client
                    el.data['model'] = editor.current.data.model
                    el.parent = editor.current.id
                    isChild = true
                }
                editor.current.blocks.push ( await el )
                if ( name === 'GraphQL' ){
                    store.status.dialog = 'GraphQL'
                    store.status.dialogTitle = 'GraphQL Endpoint'
                }
                store.editor.current = editor.current.blocks[editor.current.blocks.length-1]
                if ( isChild ){
                    store.status.dialog = 'GraphQL'
                    store.status.dialogTitle = 'Set Field Value'
                }
                //editor.current = el 
            } 
            if ( name === 'Grid' ){
                status.dialog = name
                status.dialogTitle = 'Create Grid'
                //editor._helper ( name )
                editor.helper = name
            }
            
        }
    }

    const addTemplate = (template:Object)=>{
        editor.current.blocks.push ( template.json.blocks )
        open.value = !open.value
    }
</script>