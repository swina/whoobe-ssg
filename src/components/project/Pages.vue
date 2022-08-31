<template>
    <div class="pages-preview ml-10 px-20 w-full pl-0 mb-20 pb-52 top-0 left-0 mt-2 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto shadow-lg">
        <div class="p-2 bg-bluegray-800 text-gray-500 text-xs relative">
            {{store.status.currentFile.path}} 
            <div class="absolute flex cursor-pointer right-0 top-0 text-2xl m-1 text-white" >
                <span @click="edit=!edit"><icon icon="mdi:edit" title="edit"/></span>
                <a :href="slug.replace('.html','')" target="preview"><icon icon="iconoir:open-in-window" title="Open in a new window"/></a>
            </div>
            
        </div>
        <iframe class="w-full h-screen" v-if="slug && !edit" :src="slug +'?preview=' + randomID()"></iframe>
        <textarea class="w-full h-screen text-sm font-mono" v-if="edit" v-model="rawdata"/>
        <!-- <textarea v-model="rawdata" v-if="rawdata" class="w-full p-2 font-mono text-xs h-full"/> -->
    </div>
    <!-- <TreeContainer context="pages" :open="open" @close="open=!open" @file="setRawData"/> -->
</template>

<script setup lang="ts">
import { ref , computed , inject } from 'vue'
import { randomID } from '/@/composables/useEditor';
import { PAGESURL , ROOT_PATH, paths  } from '/@/composables/useLocalApi'

//import { status } from '/@/composables/useNavigation'
const store = inject ( 'useStore' )

const status = store.status

let rawdata = ref ( '' )
let file = ref ( '' )
status.context = 'pages'
status.current = null
//let slug = ref ('')
let edit = ref (false)
// computed (()=>{
//     return file && file.value.split('.')[0] != 'index' ?
//                 PAGESURL + '/' + file.value.split('.')[0] : PAGESURL
// })

console.log( paths )
const setRawData = ( data:String , path:String ) => {
    console.log ( 'data', data , 'path',path )
    file.value = store.status.currentData?.path
    rawdata.value = store.status.currentData?.data
    console.log ( 'Pages URL => ' , PAGESURL , paths.root )
    console.log ( 'ROOT PATH => ' , ROOT_PATH )
    //slug.value = PAGESURL + store.status.currentData.path.replace(paths.ssg,'')
}

let slug = computed( () => {
    return store.status.currentData?.path ? PAGESURL + store.status.currentData.path.replace(paths.ssg,'') : null
})


if ( store.status.currentFile ){
    setRawData( store.status.currentFile )
}

</script>