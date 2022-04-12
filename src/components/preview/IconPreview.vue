<template>
    <div :class="classe">
        <i class="iconify" :data-icon="element.data.icon" :class="element.class"/>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps ({
    element: Object,
    level: Number
})

const classe = computed(() => {
    let css = Object.values(props.element.css).join( ' ' ) + ' z-' + props.level
    return css
})

</script>
