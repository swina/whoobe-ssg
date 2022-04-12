<template>
    <div class="p-2 flex flex-col" v-if="data.element" :key="data.element.id" :ref="'alp'+data.element.id">
        <strong>Alpine Directive</strong>
        
        <select v-model="data.directive" class="w-full mb-2">
            <option v-for="directive in data.directives" :value="directive">{{directive}}</option>
        </select>
        
        <input type="text" class="w-full mb-2" placeholder="add a directive not listed"  v-model="data.extraDirective" @keydown="addDirective($event)"/>
        <input type="text" class="w-full mb-2" v-model="data.newDirective" @keydown="addDirective($event)"/>

        <strong>Current directives</strong>
        
        <div class="flex flex-wrap" v-if="data.element.data.alpine">
            <template v-for="elementDirective in Object.keys(data.element.data.alpine)">
                <span v-if="data.element.data.alpine[elementDirective]" class="chip bg-purple-400 px-1 flex items-center m-1 rounded-full cursor-pointer" :title="data.element.data.alpine[elementDirective]" @click="data.currentDirective = elementDirective , data.currentData = data.element.data.alpine[elementDirective]">{{ elementDirective }} <m-icon icon="close"  @click="removeDirective(elementDirective)" class="text-xs text-black ml-1 bg-white rounded-full h-4 w-4 flex items-center justify-center"/></span>
            </template>
        </div>
        <div v-if="data.currentDirective">
            <span class="chip w-auto text-purple-400 px-1 flex items-center m-1 rounded-full cursor-pointer">{{ data.currentDirective }}</span>
            <textarea style="font-family:monospace" class="w-full text-xs h-52" v-model="data.element.data.alpine[data.currentDirective]"/>
        </div>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>Add an AlpineJS directive selecting from the list and add your code</b>.
        <!-- <br><br>AlpineJS is disabled in smartphone/tablet preview -->
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '/@/composables/useActions'

const editor = useStore()
let data = ref ({
        element: null,
        directive: '',
        currentDirective : null,
        currentData : null,
        extraDirective: '',
        newDirective: '',
        directives: ['x-data','x-init','x-show','x-bind','x-bind:class',    'x-on','x-on:click','x-text','x-html','x-model','x-for','x-transition','x-effect','x-ignore','x-ref','x-cloak','x-if']
})
data.value.element = editor.current 
function addDirective(e){
    if ( e.keyCode === 13 ){
        if ( data.value.element.data.alpine ){
            data.value.element.data.alpine = {}
        }
        data.value.element.data['alpine'][data.value.directive] = data.value.newDirective
        data.value.directive = ''
        data.value.newDirective = ''
    }
}
function removeDirective(key){
    delete data.value.element.data.alpine[key] 
    
}
</script>