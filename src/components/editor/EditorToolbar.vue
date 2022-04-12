<template>
    <Icon icon="mdi:chevron-right-box" class="cursor-pointer absolute top-0 right-0 m-1 text-gray-400 text-2xl z-20" @click="sidebar('')" title="Close sidebar"/>
    <div class="editor-toolbar text-2xl pt-6">
        <Icon v-for="icon in icons" :icon="icon.icon" class="icon-button ml-0 mb-1" :class="isActive(icon.tool)" @click="sidebar(icon.tool)" :title="icon.tool"/>
        <!-- <Icon icon="tabler:template" class="icon-button ml-0 mb-1" :class="isActive('snippets')" @click="toolbar.tool='snippets',sidebar('snippets')"  
        title="Snippets"/>
        
        <Icon icon="la:elementor" :class="isActive('elements')" @click="sidebar('elements')" title="Add element"/>

        <Icon icon="file-icons:windi" :class="isActive('customize')" @click="toolbar.tool='customize',sidebar('customize')" title="Tailwind Controls"/>
        
        <Icon icon="ic:baseline-css" class="icon-button ml-0 mb-1" :class="isActive('css')" @click="sidebar('css')" title="CSS & Style"/>

        <Icon icon="clarity:cursor-hand-click-line" class="icon-button ml-0 mb-1" :class="isActive('events')" @click="sidebar('events')" title="Events"/>

        <Icon icon="ic:outline-edit-attributes" class="text-xl icon-button ml-0 mb-1 cursor-pointer" :class="isActive('attributes')" @click="sidebar('attributes')" title="Attributes" mode="editor"/>

        <i data-icon="mdi:widgets-outline" class="iconify icon-button ml-0 mb-1" :class="isActive('library')" @click="sidebar('library')" title="Library"/>

        <Icon icon="mdi:settings" :class="isActive('settings')" @click="sidebar('settings')" title="Template settings"/>

        <Icon icon="carbon:tree-view-alt" :class="isActive('tree')" @click="sidebar('tree')" title="Document tree"/> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '/@/composables/useActions'
import { useEditorSidebar, toolbar } from '/@/composables/useNavigation';

const editor = useStore() //useStore()

const icons = ref([
    { icon: 'tabler:template' , tool: 'snippets' , mode: null },
    { icon: 'la:elementor' , tool: 'elements' , mode: null },
    { icon: 'file-icons:windi' , tool: 'customize' , mode: null },
    { icon: 'ic:baseline-css' , tool: 'css' , mode: null },
    { icon: 'simple-icons:alpinedotjs' , tool: 'alpine' , mode: null },
    { icon: 'clarity:cursor-hand-click-line' , tool: 'events' , mode: null },
    { icon: 'ic:outline-edit-attributes' , tool: 'attributes' , mode: 'editor' },
    { icon: 'mdi:widgets-outline' , tool: 'library' , mode: null },
    { icon: 'mdi:settings' , tool: 'settings' , mode: null },
    //{ icon: 'carbon:tree-view-alt' , tool: 'tree' , mode: null },
])

const sidebar = ( action: String ) => {
    toolbar.tool = action
    if ( !action ) {
        console.log ( useEditorSidebar )
        useEditorSidebar.sidebar = false
        return
    }
    useEditorSidebar.sidebar = true
    editor._tool ( action , editor.current )
}

const isActive = (tool:String) =>{
    return toolbar.tool === tool ?
        'text-purple-600' :
        ''
}

</script>
