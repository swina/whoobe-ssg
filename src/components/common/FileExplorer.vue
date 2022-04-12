<template>
    <div v-if="open && show" :class="isShowed" class="p-4 md:w-1/4 lg:w-1/5 text-xs cursor-pointer fixed top-0 left-0 ml-10  fixed h-screen z-modal bg-bluegray-800 text-gray-300">
        <!-- <span class="absolute right-0 top-0 text-white" @click="$emit('close')"><icon icon="mdi:close"/></span> -->
        <div class="titleBar relative" v-if="show">
            <span class="capitalize">{{ context }}</span>
            <div class="absolute right-0 top-0 m-2 text-gray-300" title="Create folder" @click="createFolder"><span><Icon icon="bi:folder-plus" class="text-lg"></Icon></span></div>
        </div>
        <div v-if="tree && show">
           <FileTree :children="children" :tree="folders?.children ? folders.children : folders" @openTemplate="loadFile" @reloadTree="loadTree(context)"/>
        </div>
        

    </div>
    <div class="w-4 px-1 text-lg absolute left-0 ml-10 z-modal top-0 h-screen justify-center flex items-center text-white">
        <span v-html="symbol" @click="show=!show"></span>
    </div>
    <!-- Current: {{currentFolder?.path ? currentFolder.path : '' }} -->
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'

import { fileExplorer, localData , openPath , addFolder, currentFolder } from '/@/composables/useLocalApi';

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
let folders = ref ( {} )
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
    folders.value = tree.value.children.filter ( a => a.type === 'directory' ).sort()
    tree.value.children.forEach ( a => {
        if ( a.type === 'file' )
            folders.value.push ( a )
    })
}

const loadFile = async ( file ) => {
    const res = await openPath ( file.path )
    emits ( 'file' , res , file.path )
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