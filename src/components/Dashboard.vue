<template>
    <div :class="props.size" class="ml-10 mt-8">
      <Archive  v-if="loadthis() === 'Archive'"/>
      <Editor   v-if="loadthis() === 'Editor'"/>
      <UIKits   v-if="loadthis() === 'UIKits'"/>
      <Pages    v-if="loadthis() === 'Website'"/>
      <Website  v-if="loadthis() === 'Builder'"/>
      <Assets   v-if="loadthis() === 'Assets'"/>
    </div>
</template>

<script setup lang="ts">
  //import { store } from '/@/composables/useStore'
  import { inject } from 'vue'
  const store = inject('useStore')
  const props = defineProps ({
    comp: String,
    size: String
  })

  let tabber = store.tabber

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
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Assets' ){
        return 'Assets'
      }
      if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Builder' ){
        return 'Builder'
      }
    }
    return false
  }

</script>

