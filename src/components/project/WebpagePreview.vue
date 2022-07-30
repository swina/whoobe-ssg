<template>
    <div class="preview-md text-center" style="transform-origin:50% 0;" v-if="store.project.data.homepage?.blocks">
        <BlockPreview v-if="store.project.data.header?.blocks" :block="store.project.data.header.blocks.json.blocks"/>
        <BlockPreview v-if="props.context==='homepage'" :block="store.project.data.homepage.blocks.json.blocks"/>
        <BlockPreview v-if="props.context!='homepage'" :block="store.project.data.pages[props.context].blocks.json.blocks"/>
        <BlockPreview v-if="store.project.data.footer?.blocks" :block="store.project.data.footer.blocks.json.blocks"/>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
// import { project } from '/@/composables/useProject'
// import { store } from '/@/composables/useStore'

const store = inject ( 'useStore')
const props = defineProps({
    context:String
})
</script>