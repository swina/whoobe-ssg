<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 mt-8 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div class="p-2 bg-bluegray-800 text-gray-500 text-xs" v-if="file">
            {{file}} 
            <div class="absolute flex cursor-pointer right-0 top-0 text-2xl m-1 text-white" >
                <span @click="edit=!edit"><icon icon="mdi:edit" title="edit"/></span>
                <a :href="slug.replace('.html','')" target="preview" v-if="slug"><icon icon="iconoir:open-in-window" title="Open in a new window"/></a>
            </div>
            
        </div>
        <iframe class="w-full h-screen" v-if="slug && !edit" :src="slug +'?preview=' + randomID()"></iframe>
        <textarea class="w-full h-screen text-sm font-mono" v-if="edit" v-model="rawdata"/>
        <!-- <textarea v-model="rawdata" v-if="rawdata" class="w-full p-2 font-mono text-xs h-full"/> -->
    </div>
    <TreeContainer context="pages" :open="open" @close="open=!open" @file="setRawData"/>
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { randomID } from '/@/composables/useEditor';
import { PAGESURL , paths  } from '/@/composables/useLocalApi'
import { status } from '/@/composables/useNavigation'

let open = ref ( true )
let rawdata = ref ( '' )
let file = ref ( '' )
let path = ref ( '' )
status.context = 'pages'
status.current = null
let slug = ref ('')
let edit = ref (false)
// computed (()=>{
//     return file && file.value.split('.')[0] != 'index' ?
//                 PAGESURL + '/' + file.value.split('.')[0] : PAGESURL
// })
const setRawData = ( data:String , path:String ) => {
    edit.value = false
    console.log ( 'data', data , 'path',path )
    file.value = path
    rawdata.value = data.data
    slug.value = PAGESURL + path.replace(paths.ssg,'')
    // file.value = path.split('/')[path.split('/').length-1]
    // console.log ( 'file=>', data.data , path )
    // rawdata.value = data.data
}
</script>