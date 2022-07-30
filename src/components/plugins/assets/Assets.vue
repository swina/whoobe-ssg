<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 mt-8 absolute z-2xtop h-screen w-screen bg-gray-100 overflow-y-auto pb-20">
        <div class="p-2 bg-bluegray-800 text-gray-500 text-xs" v-if="previewItem">
            {{previewItem.path}} 
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
    <TreeContainer :context="context" :open="open" @file="setRawData" :extension="true"/>
    <transition name="fade">
    <div class="fixed bg-black bg-opacity-75 inset-0 flex items-center justify-center h-screen w-screen z-modal p-20" style="z-index:999999999;" v-if="asset && previewItem">
        <span class="absolute top-0 right-0 m-1 cursor-pointer" @click="previewItem=!previewItem"><icon icon="mdi:close" class="text-5xl text-gray-500"/></span>
        <div class="relative w-3/4 m-10">
            <img v-if="isImage(asset)" @load="getImageInfo($event)" id="previewImage" class="h-4/5 object-contain m-auto bg-black border" :src="PAGESURL+'/assets/' + asset.relativePath"  @click="previewItem=!previewItem" />
            <div v-if="isImage(asset)" class="text-white text-lg">{{ asset.name }} - {{ asset.size }} - {{ imageInfo }} </div>

            <div v-if="!isImage(asset)" class="flex flex-col w-full">
                <span class="absolute top-0 right-0 m-1 cursor-pointer" @click="previewItem=!previewItem"><icon icon="mdi:close" class="text-2xl text-gray-500"/></span>
                <div class="w-full bg-black text-white p-2">{{ asset.path }} - Size: {{ asset.size }}</div>
                <textarea class="w-full h-2/3 font-mono text-sm" v-model="fileContent"></textarea>
            </div>
        </div>
    </div>
    </transition>
</template>

<script setup lang="ts">
import { ref , computed, onMounted } from 'vue'
import { PAGESURL , paths , openPath } from '/@/composables/useLocalApi';
import { store } from '/@/composables/useStore'
import { imageDim } from '/@/composables/useUtils'

const context = ref ('assets')
let open = ref ( true )
let asset = ref ( null )
let file = ref ( '' )
let path = ref ( '' )
let previewItem = ref ( false )
let folderPreview = ref ( null )
let imageInfo = ref ( '' )
let fileContent = ref('')
const status = store.status
if ( status.current && status.current?.type ){
    if ( status.current.type === 'directory' ){
        console.log ( status.current )
    }
}

const getAsset = async ( asset:Object ) => {
    if ( asset.type === 'directory' ) return false
    try {
        let result = await openPath ( asset.path )
        fileContent.value = await result.data
    } catch (err) {
        store.message.data = 'Error reading file'
    }
}
const isImage = (item:Object)=> {
    if (  item.extension === 'jpg' || item.extension === 'png' || item.extension === 'gif' || item.extension === 'webp' || item.extension === 'svg') {
        return true
    } else {
        getAsset ( item )
        return false
    }
}

// const loadFile = async ( file:Object ) => {
//     console.log ( await file )
//     //component.value = file.data
// }

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

// const previewModal = ()=>{
//     if ( asset.value && previewItem.value ){
//         return 'fixed'
//     }
//     return 'hidden'
// }

const getImageInfo = async (e:Object) => {
    let el = e.path[0]
    imageInfo.value = el.naturalWidth + 'x' + el.naturalHeight
}


</script>