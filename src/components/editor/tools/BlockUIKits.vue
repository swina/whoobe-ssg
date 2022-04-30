<template>
    <div class="overflow-y-auto fixed w-1/3 top-0 right-0 mr-10 bg-bluegray-800" v-if="uikit">
        <div @click="open=!open" class="mr-2 border-b mb-4"> {{uikit?uikit.name:''}} </div>
        <div class="relative flex flex-wrap justify-around h-screen pb-20">
            <template v-for="kit in uikit.templates" :key="kit.name" v-if="uikit">
                <div class="flex flex-col text-xs truncate m-2 cursor-pointer" @click="loadTemplate(kit)" title="Edit">
                    <img :src="kit.image" class="w-60 h-60 object-contain rounded shadow-lg "/>
                    {{ kit.name }}
                </div>
            </template>
        </div>
        <span  class="text-3xl absolute right-0 top-0 cursor-pointer" @click="switchToEditor"><icon icon="mdi:close"></icon></span>
    </div>
    <!-- <FileExplorer context="uikits" :open="open" @close="open=!open" @file="loadFile"/> -->
    <TreeContainer context="uikits" :open="open" @close="open=!open" @file="loadFile"/>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { tabberAddTab , loading , switchToEditor } from '/@/composables/useNavigation'
import { openPath } from '/@/composables/useLocalApi'
import { useStore } from '/@/composables/useActions'
import { EDITOR } from '/@/composables/useEditor'

const uikit = ref ( '')
let open = ref ( true )
const editor = EDITOR //useStore()

const loadFile = async ( file ) => {
    uikit.value = file
}
const loadTemplate = ( template:Object ) =>{
    console.log ( template.json.blocks.blocks[0] )
    editor.current.blocks.push ( template.json.blocks.blocks[0] )
    editor.tool = 'customize'
}
</script>