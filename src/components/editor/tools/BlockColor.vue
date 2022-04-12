<template>
    <div v-if="editor.colors" key="colorTool" class="cursor-pointer text-center flex flex-col col-span-2">
        <template v-for="color in Object.keys(editor.colors)" :key="color">
            <div class="flex flex-row flex-wrap justify-around my-1 cursor-pointer">
                <template v-for="bgcolor in editor.colors[color]" :key="bgcolor">
                    <div v-if="!bgcolor.includes('hover')" class="h-4 w-4 border border-gray-800 rounded-full" :class="bgcolor" :title="bgcolor" @click="setColor(bgcolor)">
                    </div>
                </template>
            </div>
        </template>
        <div class="flex flex-row flex-wrap justify-around my-1 cursor-pointer">
            <div class="flex items-center justify-center h-4 w-4 border border-gray-800 rounded-full text-red-600 bg-transparent" title="bg-transparent" @click="setColor('bg-transparent')">
                <Icon icon="mdi:close" class="text-red-600"/>
            </div>
            <div class="h-4 w-4 border border-gray-800 rounded-full bg-white" title="bg-white" @click="setColor('bg-white')"></div>
            <div class="h-4 w-4 border border-gray-800 rounded-full bg-black" title="bg-black" @click="setColor('bg-black')"></div>
        </div>
        <div><input type="checkbox" v-model="hover"> hover</div>
        <div class="absolute top-0 right-0 m-1 mt-10 cursor-pointer w-auto" @click="initColors" title="Load colors">
            <icon icon="mdi:refresh" class="text-2xl"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { updateColorCSS , matchColorCSS , initColors } from '/@/composables/useActions'

const editor = useEditorStore()
const props = defineProps({
  context: String
})

let hover = ref (false)

const setColor = ( color:string ) => {
    let ctx = props.context
    hover.value ? ctx = 'hover:' + ctx : null
    editor.current.css.css = updateColorCSS ( editor.colors , editor.current.css.css , color , ctx )
}

const getCurrent = computed ( () => {
    return matchColorCSS ( editor.colors , editor.current.css.css , props.context )
})

const getColor = computed( () => {
    return matchColorCSS ( editor.colors , editor.current.css.css , props.context )
})

const loadColors = ()=>{
    initColors()
}

</script>