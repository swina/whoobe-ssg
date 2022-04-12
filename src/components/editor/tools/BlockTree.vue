<template>
    
</template>

<script setup lang="ts">
import { generateTreeArray } from '/@/composables/useUtils'
import { useStore } from '/@/composables/useActions'

const editor = useStore()
if ( editor.document )
    generateTreeArray(editor.document.json.blocks)
</script>

