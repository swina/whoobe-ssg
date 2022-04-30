<template>

  <Dashboard :size="size" v-if="!editor.preview"/>
  <Home v-if="!store.tabber.tabs.length || store.tabber.tab < 0"/>
  <SidebarLeft/>
  <Toolbar class="w-full" :tab="store.tabber.tabs.length && store.tabber.tab?store.tabber.tab:-1"/>
  <Preview v-if="editor.preview"/>
  <Message/>
  <Loading v-if="store.status.loading"/>
  <FloatingModal/>
  
  <div class="fixed z-modal bottom-0 right-0 w-1/3 h-1/2" v-if="message.console">
    <div class="p-1 bg-purple-700 text-white flex items-center">Console <icon icon="mdi:close" class="absolute right-0" @click="message.console=''"/></div>
    <textarea class="bg-black w-full h-screen-sm font-mono text-white">{{ store.message.console }}</textarea>
  </div>
  
  <div ref="setupColors" id="setupColors" class="h-10 absolute left-0 bottom-0 w-full"></div>
 
</template>

<script lang="ts" setup>
import '../styles/editor.css'
import { ref , computed , onMounted } from 'vue';
//import { useStore } from '/@/composables/useActions'
import  Element from '/@/composables/useElementClass'
//import { tabber , status, useEditorSidebar } from '/@/composables/useNavigation'
//import { message } from '/@/composables/useUtils'
//import { EDITOR } from '../composables/useEditor';
import { store } from '../composables/useStore';
const editor = store.editor //EDITOR //useStore('')
const message = store.message

const size = computed(()=>{
        return ''
        //return useEditorSidebar.sidebar && editor.current ? 'w-3/4' : 'mr-12'
        //return navigation.sidebar ? 'w-3/4' : 'w-full'
    })

    
    onMounted(async () => {
      const elements = new Element().Groups()
      editor.elements = elements
      editor.elements = elements
      message.data = ''
      message.console = ''
    })
</script>

<style>
body { overflow:hidden; font-family: 'Barlow' }

  
</style>