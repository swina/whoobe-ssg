<template>
    <div v-if="editor.document" class="z-1 relative min-h-screen border-black" data-document-tag="template" @click="setCurrent">
        <!-- <container class="editor-block relative" :id="editor.document.json.blocks[0].id" :block="editor.document.json.blocks[0]" level="2" data-block-tag="template"/> -->
        <block :block="editor.document.json.blocks" :level="2"/>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { useEditorStore } from '/@/stores/editor';
import { EDITOR } from '/@/composables/useEditor';

import '/@/styles/editor.css'

const editor: any = EDITOR //useEditorStore();
// const navigation = useNavigatorStore();

//let whoobe = ref(EDITOR)

const setCurrent = () => {
    console.log ( 'container' , editor.document  )
}
</script>