<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 mt-8 absolute z-2xtop h-screen w-screen bg-gray-100 overflow-y-auto pb-20">
        <div class="p-2 bg-bluegray-800 text-gray-500 text-xs" v-if="asset">
            {{file}} 
        </div>
        <div class="flex flex-wrap justify-around">
            <template v-for="item in status.current.children" v-if="status.current?.children">
                <div class="w-40 h-40 border m-2 text-xs my-4 cursor-pointer" @click="previewItem=!previewItem,asset=item">
                    <img v-if="isImage(item)" class="w-40 h-40 object-cover" :src="PAGESURL+'/assets/' + item.relativePath"/>
                    <div class="truncate">{{item.name}}</div>
                </div>
            </template>
        </div>
        <!-- <div v-if="asset && status.current.type==='file'" class="w-screen-md h-screen-md">
            <img v-if="isImage(asset)" class="object-none m-auto" :src="PAGESURL+'/assets/' + asset.relativePath"/>
        </div> -->
        <!-- <iframe class="w-screen-md h-screen-sm overflow-hidden" v-if="asset && !status.current?.children" :src="asset +'?preview=' + new Date()"></iframe> -->
        
    </div>
    <TreeContainer :context="context" :open="open" @file="setRawData"/>
    <transition name="fade">
    <div class="fixed bg-black bg-opacity-75 inset-0 flex items-center justify-center h-screen w-screen z-modal" style="z-index:999999999;" v-if="asset && previewItem">
        <span class="absolute top-0 right-0 m-1 cursor-pointer" @click="previewItem=!previewItem"><icon icon="mdi:close" class="text-5xl text-gray-500"/></span>
        <img v-if="isImage(asset)" class="object-contain m-auto bg-black border" :src="PAGESURL+'/assets/' + asset.relativePath"/>
    </div>
    </transition>
</template>

<script setup lang="ts">
import { ref , watch } from 'vue'
import { PAGESURL , paths } from '/@/composables/useLocalApi';
import { store } from '/@/composables/useStore'

const context = ref ('assets')
let open = ref ( true )
let asset = ref ( null )
let file = ref ( '' )
let path = ref ( '' )
let previewItem = ref ( false )
let folderPreview = ref ( null )
const status = store.status

if ( status.current && status.current?.type ){
    if ( status.current.type === 'directory' ){
        console.log ( status.current )
    }
}
const loadFile = async ( file:Object ) => {
    console.log ( await file )
    //component.value = file.data
}

const setRawData = ( data:String , path:String , item:Object ) => {
    // if ( status.current.type === 'file' ) {
    if ( status.currentFile ){
        asset.value = item
        previewItem.value = true
        return
    }
    console.log ( status.current )
    folderPreview.value = status.current.children
    asset.value = false
    previewItem.value = false
}

const isImage = ( item:Object )=>{
    if ( item.extension.includes('jpg') || item.extension.includes('png') || item.extension.includes('webp') || item.extension.includes('gif') ){
        return true
    }
    return false
}

</script>