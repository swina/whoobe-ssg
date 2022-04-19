<template>
    <div class="p-4 md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-12 pr-20 top-0 left-0 mt-8  absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div @click="open=!open" class="mr-2 border-b mb-4"> {{uikit?uikit.name:''}} </div>
        <div class="relative flex flex-wrap justify-around h-screen pb-20">
            <template v-for="kit in uikit.templates" :key="kit.name" v-if="uikit">
                <div class="flex flex-col text-xs truncate m-2 cursor-pointer" @click="loadTemplate(kit)" title="Edit">
                    <img :src="kit.image" class="w-60 h-60 object-contain border rounded shadow-lg "/>
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

const uikit = ref ( '')
let open = ref ( true )

const loadFile = async ( file ) => {
    uikit.value = file
}
const loadTemplate = ( template:Object ) =>{
    tabberAddTab ( {
        component: 'Editor',
        label: template.name,
        object: template
    })
}
</script>