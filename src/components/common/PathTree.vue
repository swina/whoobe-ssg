<template>
     <div v-if="context"  class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-0 top-0 left-0 mt-8 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
       
        <TreeContainer :context="context" :open="open" @file="loadFile"/>

        <div class="p-2 pl-6 bg-bluegray-800 w-full flex text-gray-500 text-xs" v-if="fileInfo?.path && context==='templates'">
            <chip class="">{{fileInfo.path}}</chip>
            <span @click="editFile" class="absolute cursor-pointer right-0 top-0 text-2xl m-1 text-white" >
                <icon icon="mdi:edit" title="edit"/>
            </span>
        </div>
        <div v-if="context === 'templates' && fileInfo?.name" class="relative flex flex-col p-2 pl-8">
            <ul class="border-b mb-4 sticky">
                <li class="flex">Template name <chip css="ml-2">{{fileInfo.name }}</chip></li>
                <li class="flex">Description : {{ fileInfo.description }}</li>
            </ul>
            <div class="bg-transparent relative mx-auto w-full">
                <BlockPreview v-if="fileInfo?.json" :block="fileInfo.json.blocks" :level="2"/>
            </div>
        </div>
        <div v-if="context === 'assets'">
            <Assets v-if="store.status.currentType==='asset'"/>
        </div>
        <Pages v-if="context==='pages'"/>
    </div>
</template>

<script setup lang="ts">
import { ref , inject } from 'vue'
import { saveFile, moveFile, currentFolder  } from '/@/composables/useLocalApi'
import { dragDrop } from '/@/composables/useUtils'
import { tabberAddTab } from '/@/composables/useNavigation'

const store = inject ( 'useStore' )

const context = store.tabber.tabs[store.tabber.tab].context

let fileInfo = ref ({})

let isAsset = false

const loadFile = async ( file:Object , filePath:String ) => {
    fileInfo.value = file 
    fileInfo.value.path = filePath

    store.explorer.file = file
    store.status.currentData = file

    if ( context === 'templates' ){
        store.editor.document = file
    }
    if ( context === 'assets' ){
        store.status.currentType = 'asset'
        store.status.previewMode = true
    }
}

const editFile = () => {
     tabberAddTab ( {
        component: 'Editor',
        label: fileInfo.value.name,
        object: fileInfo.value
    })
}
</script>