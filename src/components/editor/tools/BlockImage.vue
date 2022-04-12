<template>
    <div v-if="editor.current" class="flex flex-col p-2 text-xs col-span-2">
        <div class="w-full" v-if="canHaveImage">
            Image URL
            <textarea v-model="editor.current.image.url" class="my-2 w-full font-mono text-xs h-16"/>
            <div class="h-40" v-if="editor.current.image.url">
                <img :src="editor.current.image.url" class="h-40 m-auto" v-if="editor.current.image.url"/>
            </div>
        </div>
        <div v-else>
            This element doesn't support Image as background or content
        </div>
        <!-- <div class="flex flex-col text-xs text-gray-400" v-if="editor.current.type === 'container'">
            <template v-for="setting in Object.keys ( bgPosition )" :key="setting">
                <span class="capitalize">{{ setting }}</span>
                <select class="text-xs border-none mb-1" v-model="bgPosition[setting]" @change="changeCSS(setting)">
                    <option value=""></option>
                    <option v-for="key in bgSettings[setting]" :key="key" :value="key">{{ key.replace('bg-','') }}</option>
                </select>
            </template>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
//import classes from '/@/composables/tw.classes'
//import { updateCSS } from '/@/composables/useActions'

const editor = useEditorStore()
const canHaveImage = computed ( () => {
    return editor.current && ( editor.current.type === 'container' || editor.current.element === 'img' ) ?
        true :
        null
})
// const bgPosition = ref ( classes.bgPosition )
// const bgSettings = classes.bgSettings

// const changeCSS = async (setting:string )=>{
//     if ( setting ){
//         editor.current.css.css = await updateCSS ( bgSettings[setting] , editor.current.css.css , bgPosition.value[setting]  )
//         // console.log ( css , bgSettings[setting] , bgPosition.value[setting] )
//     } else {
//         bgSettings[setting].forEach ( cl => {
//             editor.current.css.css.replace ( cl , '' )
//         })
//     }
//     // Object.keys ( bgPosition.value ).forEach ( classe => {
//     //     if ( classe ){
//     //         updateCSS ( bgSettings[classe] , editor.current.css.css , classe  )
//     //     } else {
//     //         bgSettings[classe].forEach ( cl => {
//     //             editor.current.css.css.replace ( cl , '' )
//     //         })
//     //     }
//     // })
// }
</script>