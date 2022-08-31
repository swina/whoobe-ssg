<template>
    
    <div  class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-0 top-0 left-0 mt-8 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
       
        <TreeContainer context="templates" :open="open" @file="loadFile"/>

        <div class="p-2 pl-6 bg-bluegray-800 w-full flex text-gray-500 text-xs" v-if="fileInfo?.path">
            <chip class="">{{fileInfo.path}}</chip>
            <span @click="editFile" class="absolute cursor-pointer right-0 top-0 text-2xl m-1 text-white" >
                <icon icon="mdi:edit" title="edit"/>
            </span>
        </div>
        <div v-if="fileInfo?.name" class="relative flex flex-col p-2 pl-8">
            <ul class="border-b mb-4 sticky">
                <li class="flex">Template name <chip css="ml-2">{{fileInfo.name }}</chip></li>
                <li class="flex">Description : {{ fileInfo.description }}</li>
            </ul>
            <div class="bg-transparent relative mx-auto w-full">
                <BlockPreview v-if="fileInfo?.json" :block="fileInfo.json.blocks" :level="2"/>
            </div>

        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { tabberAddTab } from '/@/composables/useNavigation'
import { saveFile, moveFile, currentFolder  } from '/@/composables/useLocalApi'
//import EditorPanelVue from '../editor/EditorPanel.vue';
//import { useStore } from '/@/composables/useActions';
import { dragDrop } from '/@/composables/useUtils'
//import { EDITOR } from '/@/composables/useEditor';
//import { store } from '/@/composables/useStore'

const store = inject ( 'useStore' )

const editor = store.editor // EDITOR //useStore()

const emits = defineEmits ( {
    disable:String
})

store.status.context = 'templates'
store.status.current = null
let dragAndDrop = ref(dragDrop)
let message = store.message
let open = ref ( true )
let fileInfo = ref ({})

const loadFile = async ( file:Object , filePath:String ) => {
    
    fileInfo.value = file 
    fileInfo.value.path = filePath
    
    //editor._document ( file )
    editor.document = file
}

const editFile = () => {
     tabberAddTab ( {
        component: 'Editor',
        label: fileInfo.value.name,
        object: fileInfo.value
    })
}

const copyFile = async () =>{
    let newFile = fileInfo.value
    let fileName = prompt ( 'Template name?')
    newFile.name = fileName
    newFile.path = currentFolder.path + '/' + fileName + '.json'
    await saveFile ( newFile )
    message.data = 'New file created'
}
const deleteFile = async ( ) => {
    console.log ( 'Delete file' , fileInfo.value.path )
}


const saveToCurrentFolder = async () => {
    let path = currentFolder.path 
    let fileName = fileInfo.value.path.split('/')[fileInfo.value.path.split('/').length-1]
    console.log ( fileName )
    console.log ( path )
}

const moveToFolder = async () => {
    let sourcePath = fileInfo.value.path
    let targetPath = store.status.current.path + '/' + sourcePath.split('/')[sourcePath.split('/').length-1]
    const res = await moveFile ( sourcePath , targetPath )
    message.data = await res.message
    console.log ( res )
    console.log ( "move => " , sourcePath )
    console.log ( "to => ", targetPath )

}

</script>