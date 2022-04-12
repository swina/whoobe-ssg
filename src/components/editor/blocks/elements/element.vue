<template>
    <div class="relative p-2">
        <component
            :id="id"
            :ref="element.id"
            :is="component" 
            :type="element.type" 
            :class="classe" 
            class="relative"
            :style="stile" 
            v-model="element.content"
            :value="element.value" 
            v-html="element.content"
            :src="element.image && element.image.url?element.image.url:'no-image.png'" 
            :placeholder="element.placeholder" 
            :contenteditable="element.editable"
            @blur="handleInput"
            :data-id="element.id"
            data-type="element"
            :data-element-tag="element.type + ' ' +  element.element"
            :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
            @click="selectBlock(element,$event),contextMenu($event,false)" @contextmenu.prevent="selectBlock(element,$event),contextMenu($event,true)"
            >
            
        </component>
        <!-- <div class="absolute inset-0" :data-element="element.element" :class="selector" @click="selectBlock(element,$event),contextMenu($event,false)" @contextmenu.prevent="selectBlock(element,$event),contextMenu($event,true)" :title="description"></div> -->
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'
import { computed , useAttrs, ref } from 'vue'
import { selectBlock } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
const editor = useEditorStore()
const attrs = useAttrs()

const props = defineProps ({
    element: Object,
    level: Number,
    id: String
})

const classe = computed(() => {
    let css = Object.values(props.element.css).join( ' ' ) + ' z-' + props.level
    css += ' ' + selector.value
    return css
})

const stile = computed(() => {
    return props.element.style
})

const component = computed ( () => {
    return props.element.level ? props.element.element + props.element.level : props.element.element
})

const handleInput = (e) => {
    let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
    props.element.content = text 
}
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

const description = computed( () => {
    return `Element : ${props.element.element}\nCSS: ${props.element.css.css}\nRight button more options ...`
})
</script>