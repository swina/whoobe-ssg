<template>
    <div class="modal" v-if="editor.tool && editor.tool === 'elements' && editor.helper==='Grid'">
        <BlockGrid v-if="editor.tool==='elements' && editor.helper === 'Grid'"/>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { EDITOR } from '/@/composables/useEditor'
let show = ref(true)
const editor = EDITOR //useEditorStore()        
</script>
