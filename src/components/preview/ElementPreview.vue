<template>
    <component
        v-if="element"
        :id="element.id"
        :ref="element.id"
        :is="component" 
        :type="element.type" 
        :class="classe"
        :style="element.style"
        :value="element.value" 
        v-html="element.content"
        :src="element.image && element.image.url?element.image.url:'no-image.png'" 
        :placeholder="element.placeholder" 
        :data-id="element.id"
        :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
        :data-click="element.events.click">
    </component>

</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps (
    {
        element: Object,
        id: String
    }
)

const component = computed ( () => {
    return props.element.level ? props.element.element + props.element.level : props.element.element
})


const classe = computed ( () => {
    return Object.values ( props.element.css ).join ( ' ' )
})
</script>