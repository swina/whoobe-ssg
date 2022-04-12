<template>
    <div v-if="open && show" :class="isShowed" class="pt-2 md:w-1/4 lg:w-1/5 text-xs cursor-pointer fixed top-0 left-0 mt-8 ml-10  fixed h-screen z-modal bg-bluegray-800 text-gray-300 overflow-y-auto">
        <ul>
            <TreeItem :key="fileTree.folders.name" v-if="fileTree && fileTree?.folders" :open="true" :model="fileTree.folders" @openTemplate="loadFile" @reloadTree="reload"/>
        </ul>
    </div>
</template>


<script setup lang="ts">
import { ref , computed } from 'vue'

import { fileExplorer, localData , openPath , addFolder, currentFolder , fileTree } from '/@/composables/useLocalApi';

const props = defineProps ( {
    context: String,
    open: Boolean,
    onlyFolder: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emits = defineEmits ( {
    file:String
})

let opened = ref ( props.open )

let tree = ref( {} )
let folders = ref ({} )
let children = computed ( () => {
    return !props.onlyFolder
})
let show = ref(true)

let symbol = computed(()=>{
    return show.value ?
            '&larr;' : '&rarr;'
})

const isShowed = () => {
    return show.value ?
        '' : 'md:w-0 lg:w-0 -ml-1/5'
}
const loadTree = async ( context ) => {
    tree.value = await fileExplorer ( context )

    folders.value = { name: context , children: tree.value.children.filter ( a => a.type === 'directory' ).sort() }
    folders.value.children.push ( ...tree.value.children.filter( a => a.type === 'file' ).sort() )
    // if ( !folders.value.children ){
    //     folders.value.children = []
    // }
    // tree.value.children.forEach ( a => {
    //     if ( a.type === 'file' )
    //         folders.value.children.push ( a )
    //     folders.value.children = [ new Set (folders.value.children) ]
    // })
    fileTree.folders = folders.value
}

const reload = async () => {
    fileTree.folders = null
    console.log ( 'reload tree ...')
    await loadTree( props.context )
}

const loadFile = async ( file ) => {
    console.log ( file )
    let element = document.getElementById(file.hash)
    let filePath = element?.getAttribute('data-path')
    const res = await openPath ( filePath )
    emits ( 'file' , res , filePath )
}

const createFolder = async () => {
    const success = await addFolder(props.context)
    success ? 
        loadTree ( props.context ) :
            console.log ( 'error creating a new folder')

}

if ( props.context ){
    loadTree ( props.context )
}

</script>