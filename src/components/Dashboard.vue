<template>
    <div :class="props.size" class="ml-10 mt-8">
      <Archive  v-if="loadthis() === 'Archive'"/>
      <Editor   v-if="loadthis() === 'Editor'"/>
      <UIKits   v-if="loadthis() === 'UIKits'"/>
      <Pages    v-if="loadthis() === 'Pages'"/>
      <Builder  v-if="loadthis() === 'Builder'"/>
      <Assets   v-if="loadthis() === 'Assets'"/>
      <Directus   v-if="loadthis() === 'Directus'"/>
    </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  const store = inject('useStore')

  const props = defineProps ({
    comp: String,
    size: String
  })

  let tabber = store.tabber

  const loadthis = () => {
    if ( tabber.tabs && tabber.tab > -1 ){
      return tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component 
    }
    return false
  }

</script>

