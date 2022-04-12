<template>
    {{ JSON.stringify ( document ) }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , getLocalStorage } from '/@/composables/useActions'

const editor = useStore()
const document = ref ( getLocalStorage('whoobe-preview') )
console.log ( document.value )
</script>