<template>
    <component 
        v-if="block && !block?.hide" 
        :is="component"
        :ref="$attrs.id ? $attrs.id : block.id" 
        :key="$attrs.id ? $attrs.id :  block.id" 
        class="editor-block relative p-2" 
        :class="current(block,false)" 
        :data-block-tag="block.semantic || block.element"
        :id="$attrs.id ? $attrs.id :  block.id"
        :style="blockStyle">

        <div v-if="!block.blocks.length">
            Start adding an element or a snippet !
        </div>
        <template v-for="element in block.blocks" :key="element.id">
            <block
                
                v-if="element.type === 'container' && !element.data?.isLoop"

                :block="element"
                :level="level+1"/>
            <blockloop
                v-if="element.type === 'container' && element.data?.isLoop"
                :block="element"
                :limit="element.data?.limit ? element.data.limit : 8"
                :offset="element.data?.offset ? element.data.offset : 0"
                :level="level+1"/>
            <Element
                :data="$attrs.data?$attrs.data:null"
                :id="element.id"
                :element="element"
                :parent="block.id"
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
        
        <div class="absolute inset-0" v-if="block.type==='container'" :class="selector" @click="selectBlock(block,$event),contextMenu($event,false),status.current = block,editor.current=block" @contextmenu.prevent="selectBlock(block,$event),contextMenu($event,true),editor.current=block"></div>
    </component>
    <div v-if="block?.hide" :id="block.id" class="relative font-mono text-base w-full my-2 left-0 border-2 border-dashed border-red-500 h-10 z-modal bg-gray-300 p-1 flex items-center"  @click="block.hide=false,selectBlock(block,$event),editor.current=block">
        Hidden {{ block.tag }} <span><icon icon="akar-icons:eye" class="absolute right-0 ml-1 -mt-2 text-2xl text-gray-700 hover:text-blue-700" title="View" /></span>
    </div>
</template>

<script setup lang="ts">
import { computed , ref  } from 'vue'
import '/@/styles/editor.css'
import { selectBlock } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
//import { status } from '/@/composables/useNavigation'
//import { EDITOR } from '/@/composables/useEditor'
import { CMS ,  getCMSQuery  } from "/@/composables/useGraphCMS"
import { store } from '/@/composables/useStore'

    const editor = store.editor //EDITOR//useEditorStore()
    const status = store.status

    const props = defineProps ({
        block: Object,
        level: Number
    })

    let data = ref([])
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
        let borderColor = editor.blockBorders.block //' ' + editor.blockBorders.block + ' ' //border-red-500 '
        let borderHover = editor.blockBorders.blockHover //' border-2 hover:border-' + editor.blockBorders.block + ' border-dashed '
        if ( props.level === 2 ){
            borderColor = editor.blockBorders.root //' border-4 border-' + editor.blockBorders.root + ' ' //purple-500'
            borderHover = editor.blockBorders.rootHover //' border-2 hover:border-' + editor.blockBorders.root + ' border-dashed '
        }
        if ( props.block.data?.provider ){
            borderColor = 'border-2 border-blue-300 '
            borderHover = 'border-2 hover:border-blue-300 border-dashed '
        }
        return editor.current?.id && editor.current.id === props.block.id ?
            borderColor  + ' z-' + props.level :
            borderHover + ' z-' + props.level
    })

    const contextMenu = ( event: object , flag: boolean )=>{

        document.querySelector('#contextMenu') && flag ?
            openContextMenu(event) :
            toggleContext(event)
    }
    const getData = async () => {
        const res = await getCMSQuery ( props.block.data.provider )
        console.log ( 'risposta' ,  await res )
        data.value = await CMS[props.block.data.provider]
    }
    if ( props.block.data?.provider ){
        getData()        
    }
    
</script>