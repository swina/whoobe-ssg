<template>
    <div class="modal" v-if="editor.tool && editor.tool === 'elements' && editor.helper==='Grid'">
        <BlockGrid v-if="editor.tool==='elements' && editor.helper === 'Grid'"/>
    </div>
    
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'

export default defineComponent({
    name: 'EditorPanel',
    setup() {
        let show = ref(true)
        const editor = useEditorStore()        
        return { editor , show }
    },
})
</script>
