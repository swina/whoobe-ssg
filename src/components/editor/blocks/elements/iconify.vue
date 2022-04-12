<template>
    <div :class="classe"
        @click="selectBlock(element,$event),contextMenu($event,false)" @contextmenu.prevent="selectBlock(element,$event),contextMenu($event,true)"
        >
        <i class="iconify" :data-icon="element.data.icon" :class="element.class"/>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useStore , selectBlock } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
const editor = useStore()

const props = defineProps ({
    element: Object,
    level: Number
})

const classe = computed(() => {
    let css = Object.values(props.element.css).join( ' ' ) + ' z-' + props.level
    css += ' ' + selector.value
    return css
})

const selector = computed( () => {
        return editor.current.id === props.element.id ?
            ' border border-green-500 ' + ' z-' + props.level :
            ' border hover:border-green-500 border-dashed '  + ' z-' + props.level
})

const contextMenu = ( event: object , flag: boolean ) => {
    flag ?
        openContextMenu ( event ) :
        toggleContext()
}
</script>
