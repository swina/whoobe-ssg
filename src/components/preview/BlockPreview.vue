<template>
    <component 
        :ref="block.id" 
        :key="block.id" 
        :class="classe" 
        :id="block.id"
        :style="stile"
        :is="semantic">
        <template v-for="element in block.blocks" :key="element.id">
            <BlockPreview :block="element" v-if="element.type === 'container'"/>
            <ElementPreview :element="element" v-if="element.type != 'container' && element.type != 'slider' && element.tag != 'icon' && element.tag != 'iconify'"/>
            <IconPreview :element="element" v-if="element.tag === 'icon' || element.tag === 'iconify'"/>
            <SliderPreview :block="element" v-if="element.type === 'slider'"/>
        </template>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { blockCSS } from '/@/composables/useActions'
const props = defineProps (
    {
        block: Object
    }
)
const stile = computed ( () => {
    let st = props.block.style
    if ( props.block.image?.url ){
        st += `;background-image:url(${props.block.image.url})`
    }
    return st
})

const semantic = computed( () => {
    return props.block.semantic ? props.block.semantic : 'div'
})
const classe = computed( ()  => {
    return Object.values ( props.block.css ).join ( ' ' )
})

</script>