<template>
    <div class="p-2 flex flex-col" v-if="editor && editor.current && status.current" :key="status.current.id" :ref="'alp'+status.current.id">
        <strong>Alpine Directive</strong>
        
        <select v-model="data.directive" class="w-full mb-2">
            <option v-for="directive in data.directives" :value="directive">{{directive}}</option>
        </select>
        
        <input type="text" class="w-full mb-2" placeholder="add a directive not listed"  v-model="data.extraDirective" @keydown="addExtraDirective=true"/>
        <input type="text" class="w-full mb-2" v-model="data.newDirective" @keydown="addDirective($event,false)"/>

        <strong>Current directives</strong>
        
        <div class="flex flex-wrap" v-if="status.current.alpine">
            <template v-for="elementDirective in Object.keys(status.current.alpine)">
                <span v-if="status.current.alpine[elementDirective]" class="chip bg-purple-400 text-black text-sm p-1 flex items-center m-1 rounded-full cursor-pointer" :title="status.current.alpine[elementDirective]" @click="data.currentDirective = elementDirective , data.currentData = status.current.alpine[elementDirective]">{{ elementDirective }} <icon icon="mdi:close"  @click="removeDirective(elementDirective)" class="h-5 w-5 text-xs text-black ml-1 bg-white rounded-full flex items-center justify-center"/></span>
            </template>
        </div>
        <div v-if="data.currentDirective">
            <span class="chip w-auto text-black px-1 flex items-center m-1 rounded-full cursor-pointer">{{ data.currentDirective }}</span>
            <textarea style="font-family:monospace" class="w-full text-xs h-52" v-model="status.current.alpine[data.currentDirective]"/>
        </div>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>Add an AlpineJS directive selecting from the list and add your code</b>.
        <!-- <br><br>AlpineJS is disabled in smartphone/tablet preview -->
        </p>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore, ALPINE_DIRECTIVES } from '/@/composables/useActions'
import { currentFolder } from '/@/composables/useLocalApi';
import { status } from '/@/composables/useNavigation'

import { EDITOR } from '/@/composables/useEditor';

const editor = EDITOR //useStore()

let element = ref({})
let data = ref ({
        
        directive: '',
        currentDirective : null,
        currentData : null,
        extraDirective: '',
        newDirective: '',
        directives: ALPINE_DIRECTIVES
})
element.value = status.current 
let addExtraDirective = ref(false)
function addDirective(e:Object ){
    if ( e.keyCode === 13 ){
        if ( !status.current?.alpine ){
            status.current.alpine = {}
        }
        if ( addExtraDirective.value ){
            status.current.alpine[data.value.extraDirective] = data.value.newDirective    
        } else {
            status.current.alpine[data.value.directive] = data.value.newDirective
        }
        data.value.directive = ''
        data.value.newDirective = ''
        data.value.extraDirective = ''
        addExtraDirective.value = false
        editor.current.alpine = status.current.alpine
    }
}
function removeDirective(key){
    delete status.current.alpine[key]
    editor.current.alpine = status.current.alpine
}
</script>