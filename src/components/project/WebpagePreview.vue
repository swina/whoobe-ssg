<template>
    <div class="preview-page text-center" :class="context==='homepage'?'preview-md-homepage':'preview-md-page'" v-if="store.project.data.homepage?.blocks">
        <BlockPreview v-if="store.project.data.header?.blocks" :block="store.project.data.header.blocks.json.blocks"/>
        <BlockPreview v-if="props.context==='homepage'" :block="store.project.data.homepage.blocks.json.blocks"/>
        <BlockPreview v-if="props.context!='homepage'" :block="store.project.data.pages[props.context].blocks.json.blocks"/>
        <BlockPreview v-if="store.project.data.footer?.blocks" :block="store.project.data.footer.blocks.json.blocks"/>
    </div>
</template>

<script setup lang="ts">
import { inject , computed } from 'vue'
// import { project } from '/@/composables/useProject'
// import { store } from '/@/composables/useStore'

const store = inject ( 'useStore')
const props = defineProps({
    context:String
})

const stile = ()=>{
    const pippo:string = props.context === 'homepage' ? 'transform:scale(.5,.8);transform-origin:30% 0%;' : 'transform:scale(.5);transform-origin:20% 20%;'
    console.log ( pippo )
    return pippo
}
</script>