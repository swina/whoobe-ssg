<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 mt-8 absolute z-2xtop h-screen w-screen bg-gray-100 overflow-y-auto pb-20">
       <div class="flex flex-wrap justify-around">
            <template v-for="item in status.current.children" v-if="status.current?.children">
                <div class="w-40 h-40 border m-2 text-xs my-4 cursor-pointer" @click="store.status.previewMode=!store.status.previewMode,store.status.currentFile=item">
                    <img v-if="isImage(item)" class="w-40 h-40 object-cover" :src="PAGESURL+'/assets/' + item.relativePath"/>
                    <div class="truncate">{{item.name}}</div>
                </div>
            </template>
        </div>
    </div>
    <transition name="fade">
    <div class="fixed bg-black bg-opacity-75 inset-0 flex items-center justify-center h-screen w-screen z-modal p-20" style="z-index:999999999;" v-if="store.status.currentFile && store.status.previewMode">
        <span class="absolute top-0 right-0 m-1 cursor-pointer" @click="store.status.previewMode=!store.status.previewMode"><icon icon="mdi:close" class="text-5xl text-gray-500"/></span>
        <div class="relative w-3/4 m-10">
            <img v-if="isImage(store.status.currentFile)" @load="getImageInfo($event)" id="previewImage" class="h-4/5 object-contain m-auto bg-black border" :src="PAGESURL+'/assets/' + store.status.currentFile.relativePath"  @click="store.status.previewMode=!store.status.previewMode" />
            <div v-if="isImage(store.status.currentFile)" class="text-white text-lg">{{ store.status.currentFile.name }} - {{ store.status.currentFile.size }} - {{ imageInfo }} </div>

            <div v-if="!isImage(store.status.currentFile)" class="flex flex-col w-full">
                <span class="absolute top-0 right-0 m-1 cursor-pointer" @click="store.status.previewMode=!store.status.previewMode"><icon icon="mdi:close" class="text-2xl text-gray-500"/></span>
                <div class="w-full bg-black text-white p-2">{{ store.status.currentFile.path }} - Size: {{ store.status.currentFile.size }}</div>
                <textarea class="w-full h-2/3 font-mono text-sm" v-model="fileContent"></textarea>
            </div>
        </div>
    </div>
    </transition>
</template>

<script setup lang="ts">
import { ref , computed, onMounted , inject } from 'vue'
import { PAGESURL , paths , openPath } from '/@/composables/useLocalApi';

import { imageDim } from '/@/composables/useUtils'

const context = ref ('assets')

const store = inject ( 'useStore' )

const props = defineProps({
    preview:Boolean
})

let open = ref ( true )
let asset = ref ( null )
let file = ref ( '' )
let path = ref ( '' )
let previewItem = false 
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
    if ( store.status.currentFile.type === 'directory' ) return false
    try {
        let result = await openPath ( store.status.currentFile.path )
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


const getImageInfo = async (e:Object) => {
    let el = e.path[0]
    imageInfo.value = el.naturalWidth + 'x' + el.naturalHeight
}

// if ( store.status.currentFile ){
    
//     getAsset ( store.status.currentFile )
// }

// if ( props.preview ){
//     previewItem = props.preview
// }


</script>