<script setup lang="ts">
import { provide , onMounted } from 'vue'
import { store } from '/@/composables/useStore'
import { getConfig } from '/@/composables/useLocalApi'

//import { CONFIG_FILE , APP_ROOT_PATH, openPath } from '/@/composables/useLocalApi'
const log = console.log
provide ( 'useStore' , store )

onMounted( async() => {
  const data = await getConfig()
  store.project.data = await data.data
  log ( "Loaded config" , data )
})
</script>
<template>
  <router-view />
</template>
