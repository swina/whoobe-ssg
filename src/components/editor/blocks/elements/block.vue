<template>
    <component 
        v-if="block && !block?.hide" 
        :is="component"
        :ref="block.id" 
        :key="block.id" 
        class="editor-block relative p-2" 
        :class="current(block,false)" 
        :data-block-tag="block.semantic || block.element"
        :id="block.id"
        :style="blockStyle">

        <div v-if="!block.blocks.length && level < 3">
            Start adding an element or a snippet !
        </div>
        <template v-for="element in block.blocks" :key="element.id">
            <block
                v-if="element.type === 'container'"
                :block="element"
                :level="level+1"/>
            <Element
                :id="element.id"
                :element="element"
                v-if="element.type !='container' && element.type != 'slider' && element.tag != 'icon' && element.tag != 'iconify'"
                :level="parseInt(level)+1"
                />
            <Slider 
                v-if="element.type === 'slider'" 
                :block="element" 
                :id="element.id" 
                :level="parseInt(level)+1"/>
            <Iconify
                v-if="element.tag === 'icon' || element.tag === 'iconify'"
                :element="element"
                :id="element.id"
                :level="parseInt(level)+1"></Iconify>
        </template>
        
        <div class="absolute inset-0" v-if="block.type==='container'" :class="selector" @click="selectBlock(block,$event),contextMenu($event,false),status.current = block,EDITOR.current=block" @contextmenu.prevent="selectBlock(block,$event),contextMenu($event,true),EDITOR.current=block"></div>
    </component>
    <div v-if="block?.hide" :id="block.id" class="w-full my-2 left-0 border-2 border-dashed border-red-500 h-10 z-modal bg-gray-300 p-2 flex items-center"  @click="block.hide=false,selectBlock(block,$event),EDITOR.current=block">
        Hidden {{ block.tag }} <span><icon icon="akar-icons:eye" class="ml-1 text-2xl text-gray-700 hover:text-blue-700" title="View" /></span>
    </div>
</template>

<script setup lang="ts">
import { computed , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import '/@/styles/editor.css'
import { dispatch , selectBlock } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
import { status } from '/@/composables/useNavigation'
import { EDITOR } from '/@/composables/useEditor'

    const editor = EDITOR//useEditorStore()
    const navigation = useNavigatorStore()

    const props = defineProps ({
        block: Object,
        level: Number
    })

    const component = computed( () => {
        return props.block.semantic ? props.block.semantic : props.block.element
    })

    const blockStyle = computed ( () => {
        let stile = ''
        if ( props.block.font ){
            stile += 'font-family:"' + props.block.font + '";'
        }
        stile += props.block.image.url ? `background-image:url(${props.block.image.url})` : ''
        return props.block.style + ';' + stile
    })
    const current = ( block:object , flag: boolean = false ) => {
        return Object.values ( props.block.css ).join ( ' ' )
    }

    const selector = computed( () => {
        return editor.current?.id && editor.current.id === props.block.id ?
            ' border border-red-500 ' + ' z-' + props.level :
            ' border hover:border-red-500 border-dashed '  + ' z-' + props.level
    })

    const contextMenu = ( event: object , flag: boolean )=>{

        document.querySelector('#contextMenu') && flag ?
            openContextMenu(event) :
            toggleContext(event)
    }
    
</script>