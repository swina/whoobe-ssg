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

import {  ref } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import Element from '../../../composables/useElementClass';
import { EDITOR } from '/@/composables/useEditor';
import { status } from '/@/composables/useNavigation';
    const editor:any = EDITOR //useEditorStore()//useStore().state.editor;
    const tab = ref('')
    let open = ref(false)
    const newElement = async ( name: string )=>{
        console.log ( 'adding => ' , name)
        if ( editor.current ){
            if ( name != 'Grid' ){
                const el = await new Element().createElement(name)
                //const current: any = editor.current    
                editor.current.blocks.push ( await el )
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