<template>
    <div v-if="editor.current" class="p-2 flex flex-col" :key="editor.current.id + '_attr'">
        <div class="mb-2" v-if="editor && editor.current.data && editor.current.data.attributes && Object.keys(editor.current.data.attributes)">
            <!-- <select v-model="dt.currentAttribute" class="w-full" v-if="dt.attributes.length">
                <option v-for="att in dt.attributes">{{att}}</option>
            </select>
            <template v-for="(attrib,i) in dt.attributes">
                <div class="w-5/6 flex flex-col items-start mb-1 border-b">
                <chip class="mr-2 my-2">{{ attrib }}</chip> {{ element.data.attributes[attrib]}}
                <icon icon="mdi:close" class="absolute text-gray-400 text-xl mr-2 right-0 mt-2" @click="deleteAttribute(attrib,i)"/>
                </div>
            </template> -->

            <template v-for="(attrib,i) in Object.keys(editor.current.data.attributes)">
                <div class="w-5/6 flex flex-row items-start mb-1 border-b">
                <chip class="mr-2 my-2">{{ attrib }}</chip> <input class="my-2" v-model="editor.current.data.attributes[attrib]"/>
                <icon icon="mdi:close" class="absolute text-gray-400 text-xl mr-2 right-0 mt-2" @click="deleteAttribute(attrib,i)"/>
                </div>
            </template>
        </div>
        <label>Add Attribute</label>
        <input type="text" class="w-full" v-model="dt.newAttributeName"/>
        <label>Value</label>
        <input type="text" class="w-full" v-model="dt.newAttributeValue" @keydown="addAttribute($event)"/>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>To add an attribute add a name a value (optional) and click Enter</b>.<br><br>You can add attributes to any element. Do not duplicate attributes in order to prevent unexpected behaviors.</p>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { EDITOR } from '/@/composables/useEditor'
let element = ref ( EDITOR.current )
let editor = EDITOR

let data = ref( {
        newAttributeName: '',
        newAttributeValue: '',
        currentAttribute: null,
        attributes:[]
    })
    // watch:{
    //     '$store.state.editor.current':function(el){
    //         this.element = el
    //         if ( el.data.hasOwnProperty('attributes') ){ 
    //             Object.keys ( el.data.attributes ) ? this.attributes = Object.keys ( el.data.attributes ) : null
    //         }
    //     }
    // },
    // methods:{

let dt = data.value



const addAttribute = ( e:Object ) => {
    if ( e.keyCode === 13 ){
        if ( !editor.current.data?.attributes ){
            let attrib = {}
            attrib[dt.newAttributeName] = dt.newAttributeValue
            editor.current.data['attributes'] = attrib
        } else {
            editor.current.data.attributes[dt.newAttributeName] = dt.newAttributeValue
        }
        dt.attributes.push ( dt.newAttributeName )
        dt.newAttributeName = ''
        dt.newAttributeValue = ''
    }
}
const deleteAttribute = (attrib:String,i:Number) => {
            dt.currentAttribute = null
            dt.attributes.splice(i,1)
            delete editor.current.data.attributes[attrib]
            
}
</script>