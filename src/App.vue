<script setup lang="ts">
import { provide , onMounted } from 'vue'
import { store } from '/@/composables/useStore'
//import { CONFIG_FILE , APP_ROOT_PATH, openPath } from '/@/composables/useLocalApi'
const log = console.log
provide ( 'useStore' , store )

// onMounted( async() => {
//   const data = await openPath ( CONFIG_FILE )
//   store.project = data
// })
</script>
<template>
  <router-view />
</template>
