<template>
    <div :class="editor.current.type === 'container' ? ' ' : ''" class="flex border items-center px-2  justify-around h-10 bg-white shadow z-modal cursor-pointer w-auto py-1">
        <div class="-mt-1"><Chip class="mr-2" :text="editor.current.semantic||editor.current.element"/></div>
        <template v-for="item in toolbar" :key="item.icon">
            <span v-if="filter(item)" @click="loadTool(item)"><icon :icon="item.icon" class="ml-1 text-2xl text-gray-700 hover:text-blue-700" :title="item.label" /></span>
        </template>
        <span @click="copyBlock"><icon icon="fa6-regular:copy" class="ml-1 text-2xl text-gray-700 hover:text-blue-700" title="Copy" /></span>
        <span @click="pasteBlock"><icon icon="fa6-regular:paste" class="ml-1 text-2xl text-gray-700 hover:text-blue-700" title="Paste" /></span>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toggleContext } from '/@/composables/contextMenu'
import { useStore , updateCSS , moveBlock } from '/@/composables/useActions'
import { setLocalStorage, getLocalStorage, cloneBlock , CLIPBOARD } from '/@/composables/useActions';
import { message } from '/@/composables/useUtils';

const editor = useStore()

const toolbar = ref ( [
    { icon: 'icomoon-free:move-up' , label: 'Move Up' , action: 'move' },
    { icon: 'la:elementor' , label: 'Add element' , action: 'elements' , filter : [ 'grid' , 'flex' ] },
    { icon: 'ic:baseline-edit' , label: 'Edit' , action: 'edit' , filter : ['element' , 'icon' , 'iconify'] },
    { icon: 'ic:baseline-title' , label: 'Heading' , action: 'heading' , filter : ['h'] },
    { icon: 'fluent:text-direction-horizontal-right-24-regular' , label: 'Direction row' , action: 'flex-row' , filter: ['flex'] },
    { icon: 'fluent:text-direction-rotate-90-ltr-20-regular' , label: 'Direction column' , action: 'flex-col' , filter: ['flex'] },
    { icon: 'clarity:form-line' , label: 'Form settings' , action: 'formSettings' , filter: ['form'] },
    { icon: 'carbon:text-font' , label: 'Font settings' , action: 'customize' , group: 'typography' },
    { icon: 'fluent:text-color-24-regular' , label: 'Text Color' , action: 'customize' , group:'text color' ,options: { context: 'textcolor' } },
    { icon: 'fluent:color-fill-24-regular' , label: 'Fill Color' , action: 'customize' , group: 'background color' , options: { context: 'bgcolor' } },
    { icon: 'akar-icons:image' , label: 'Image' , action: 'customize' , group: 'background' },
    { icon: 'akar-icons:link-chain' , label: 'Link' , action: 'link' },
    { icon: 'ant-design:download-outlined' , label: 'Import block' , action: 'BlockImport' , filter: ['grid','flex'] },
    { icon: 'ant-design:upload-outlined' , label: 'Export block' , action: 'BlockExport' , filter: ['grid','flex'] } ,

])
const filter = ( item: object ) => {
    if ( item?.filter ){
        return item.filter.includes ( editor.current.tag ) || item.filter.includes ( editor.current.element ) ? true : false
    }
    return true
}

const loadTool = ( item: Object ) => {
    toggleContext()

    //move block up
    if ( item.action === 'move' ){
        moveBlock()
        return
    }
    
    if ( item.action === 'flex-row' || item.action === 'flex-col' ){
        //set flex-row / flex-col
        editor.current.css.css = updateCSS ( ['flex-row' , 'flex-col' ] , editor.current.css.css , item.action )
        return
    }
    if ( item.action === 'customize' ){
        //open customize with relative tool
        editor._tool ( item.action , editor.current )
        item?.group ? 
            editor._toolGroup ( editor.wiTools.filter ( group => group.label === item.group )[0] ) : 
                editor._toolGroup ( null )
        return
    } else {
        editor._tool ( item.action , editor.current )
        editor._toolGroup ( null )
    }
}

const copyBlock = () => {
   setLocalStorage ( CLIPBOARD , editor.current )
   message.data = 'Block/Element copied to clipboard'             
}

const pasteBlock = () => {
    let block = cloneBlock ( getLocalStorage ( CLIPBOARD ) )
    if ( block ){
        editor.current.blocks.push ( block )
        message.data = 'Block/Element pasted from clipboard'   
    } else {
        message.data = 'No valid block in clipboard'
    }
}
</script>
