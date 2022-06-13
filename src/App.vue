<script setup lang="ts">
import { provide } from 'vue'
import { store } from '/@/composables/useStore'
provide ( 'useStore' , store )
</script>
<template>
  <router-view />
</template>
