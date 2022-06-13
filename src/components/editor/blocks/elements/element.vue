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
            v-html="getContent"
            :src="getImage" 
            :placeholder="element.placeholder" 
            :contenteditable="element.editable"
            @blur="handleInput"
            :data-id="element.id"
            data-type="element"
            :data-element-tag="element.element"
            :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
            @click="selectBlock(element,$event),contextMenu($event,false),status.current=element,editor.current=element" @contextmenu.prevent="selectBlock(element,$event),contextMenu($event,true)"
            >
            
        </component>
        <!-- <div class="absolute inset-0" :data-element="element.element" :class="selector" @click="selectBlock(element,$event),contextMenu($event,false)" @contextmenu.prevent="selectBlock(element,$event),contextMenu($event,true)" :title="description"></div> -->
    </div>
</template>

<script setup lang="ts">
import { computed , ref } from 'vue'
import { selectBlock } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
import { store } from '/@/composables/useStore'

const editor = store.editor // EDITOR //useEditorStore()
const status = store.status


const props = defineProps ({
    element: Object,
    level: Number,
    id: String,
    data:Object,
    parent: String
})

props.element.parent = props.parent

const classe = computed(() => {
    let css = Object.values(props.element.css).join( ' ' ) + ' z-' + props.level
    css += ' ' + selector.value
    return css.replaceAll('invisible','visible').replaceAll('absolute','').replaceAll('fixed','')
})

const stile = computed(() => {
    return props.element.style
})

const component = computed ( () => {
    return props.element.level ? props.element.element + props.element.level : props.element.element
})

const getContent = computed(()=>{
    if ( props.data && props.element.tag === 'button'){
        props.element.link = props.data[props.element.data.field]
        return props.element.content
    }
    if ( props.data && props.element.data?.field ){
        return props.data[props.element.data.field]
    }
    return props.element.content
})

const getImage = computed(()=>{
    if ( props.data && props.element.data?.field ){
        return props.data[props.element.data.field].url
    }
    return props.element.image && props.element.image.url ? props.element.image.url : 'no-image.png'
})

const handleInput = (e) => {
    let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
    props.element.content = text 
}
const selector = computed( () => {
    if ( !editor.current || !editor.current?.id ) return
        return editor.current.id === props.element.id ?
            ' ' + editor.blockBorders.element + ' z-' + props.level :
            ' ' + editor.blockBorders.elementHover + ' z-' + props.level
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