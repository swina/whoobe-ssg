<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div class="pl-2 bg-bluegray-800 text-gray-500 text-xs"> {{file}} </div>
        <iframe class="w-full h-screen" :src="slug"></iframe>
        <!-- <textarea v-model="rawdata" v-if="rawdata" class="w-full p-2 font-mono text-xs h-full"/> -->
    </div>
    <FileExplorer context="svelte" :open="open" @close="open=!open" @file="setRawData"/>
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { SVELTEURL } from '/@/composables/useLocalApi'
let open = ref ( true )
let rawdata = ref ( '' )
let file = ref ( '' )
console.log ( SVELTEURL )
let slug = computed (()=>{
    return file.value.split('.')[0] != 'index' ?
                SVELTEURL + '/' + file.value.split('.')[0] : SVELTEURL
})
const setRawData = ( data:String , path:String ) => {
    file.value = path.split('/')[path.split('/').length-1]
    console.log ( 'file=>', data.data , path )
    rawdata.value = data.data
}
</script>