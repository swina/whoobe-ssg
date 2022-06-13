<template>
    <div class="preview-md text-center" style="transform-origin:50% 0;" v-if="project.data.homepage?.blocks">
        <BlockPreview v-if="project.data.header?.blocks" :block="project.data.header.blocks.json.blocks"/>
        <BlockPreview v-if="props.context==='homepage'" :block="project.data.homepage.blocks.json.blocks"/>
        <BlockPreview v-if="props.context!='homepage'" :block="project.data.pages[props.context].blocks.json.blocks"/>
        <BlockPreview v-if="project.data.footer?.blocks" :block="project.data.footer.blocks.json.blocks"/>
    </div>
</template>

<script setup lang="ts">
import { project } from '/@/composables/useProject'
import { store } from '/@/composables/useStore'

const props = defineProps({
    context:String
})

console.log ( project , store )
</script>