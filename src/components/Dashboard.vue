<template>
    <div :class="size" class="ml-10 mt-8">
      <Archive  v-if="loadthis() === 'Archive'"/>
      <Editor   v-if="loadthis() === 'Editor'"/>
      <UIKits   v-if="loadthis() === 'UIKits'"/>
      <Pages    v-if="loadthis() === 'Website'"/>
      <Svelte   v-if="loadthis() === 'Svelte'"/>
      <!-- <div v-if="tabber.tabs">
      {{ tabber.tabs[tabber.tab].component }}
      </div> -->
      <!-- <Editor v-if="tabber.tabs && tabber.tab > -1 && tabber.tabs[tab]?.component && tabber.tabs[tab].component==='Editor'"/> -->
      <!-- <FileExplorer v-if="what==='Archive'" context="templates"  :open="open" @close="open=!open" @file="openTemplate"/>
      <UIKits v-if="what === 'UIKits'"/> -->
    </div>
    
    
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '/@/composables/useActions'
  import { tabberAddTab , status , tabber } from '../composables/useNavigation'

  const props = defineProps ({
    comp: String,
    size: String
  })

  let open = ref ( true )
  let what = ref ( props.comp )
  let uikit = ref ({})

  const loadthis = () => {
    if ( tabber.tabs && tabber.tab > -1 ){
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Editor' ){
        return 'Editor'
      }
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'UIKits' ){
        return 'UIKits'
      }
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Archive' ){
        return 'Archive'
      }
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Website' ){
        return 'Website'
      }
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Svelte' ){
        return 'Svelte'
      }
    }
    return false
  }

  const openTemplate = async (file) => {
    console.log ( 'file=>' , file )
    what.value = ''
    const res = await openPath ( file.path )
    const template = await res.json()
    tabberAddTab ( {
      component: 'Editor',
      label: template.json.name,
      object: template.json
    })
  }

  const openUIKits = ( file ) => {
    console.log ( 'UIKIT => ' , file )
    open.value = !open.value
    uikit.value = file
  }
  const editor = useStore()
</script>

