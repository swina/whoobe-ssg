<template>
    <!-- <div class="bars sidebarRight"> -->
        <!-- <div class="panelTitle bg-purple-900 uppercase cursor-pointer">Customize</div> -->
        
        
        <template v-for="group in editor.wiTools">
            <div v-if="enabledOption(group) && !editor.toolGroup" class="titleBar hover:bg-black text-xs uppercase cursor-pointer" :title="group.label" @click="editor._toolGroup ( group )">
                {{ group.label }}
            </div>
        </template>
        
        
        <div v-if="editor.toolGroup" class="overflow-y-auto">
            <div class="titleBar bg-black text-xs flex items-center uppercase cursor-pointer" @click="editor._toolGroup(null)">
                <Icon icon="bi:arrow-left-circle" class="text-xl mr-2"/> {{ editor.toolGroup.label }}
            </div>
            <div class="grid grid-cols-2">
                <template v-for="option in editor.toolGroup.components">
                    <BlockOption v-if="option.name==='Options'" :option="option" :key="option.attr"/>
                    <BlockFont v-if="option.name === 'BlockFont'"/>
                    <BlockImage v-if="option.name === 'Image'"/>
                    <BlockColor v-if="option.name === 'BlockColor'" :option="option" :context="option.prefix"/>
                    <BlockGradient v-if="option.name === 'BgGradient'"/>
                    <BlockCheckbox v-if="option.name === 'Checkbox'" :option="option"/>
                </template>
            </div>
        </div>
        
    <!-- </div> -->
</template>

<script setup lang="ts">
//import { ref , computed , defineAsyncComponent } from 'vue'
//import { useEditorStore } from '/@/stores/editor'
import { useStore } from '/@/composables/useActions'
//import twGroups from '/@/composables/tw.groups'

//const editor = useEditorStore()
const props = defineProps({
    group: String
})

const editor = useStore()

// const wiGroups = ref ( twGroups )
const enabledOption = ( group ) => {
    return group?.filter ?
        group.filter.includes ( editor.current.tag ) ? true : false : true
}
// let groupTools = ref ( null )

// if ( props.group && editor.wiTools ){
//     try {
//         editor._toolGroup ( editor.wiTools.filter ( group => group.label === props.group.group )[0] )
//     } catch ( err ){
//         console.log ( err )
//     }
// }


// const useTool = ref ( null )
// const currentTool = ref ('' )
// const tools = ref ( 
//     [
//         { title: 'Background' , component: 'image' , tool: 'BlockImage.vue'},
//         { title: 'Text' , component: 'text' , tool: 'BlockFont.vue' },
//         { title: 'Padding' , component: 'padding' , tool: 'BlockPadding.vue' },
//     ]
// )


// let dynaComponent = computed ( () => {
//     if ( useTool.value ){
//         return defineAsyncComponent ( () => import ('./' + useTool.value.tool ) )
//     } 
//     return null
// })


// const setWindiTool = ( tool ) => {
//     currentTool.value = tool.component
//     useTool.value && useTool.value.component === tool.component ? useTool.value = null  : useTool.value = tool
   
// }
</script>