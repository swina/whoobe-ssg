<template>
    <div v-if="editor.document" class="z-1 relative min-h-screen" data-document-tag="template" @click="setCurrent">
        <!-- <container class="editor-block relative" :id="editor.document.json.blocks[0].id" :block="editor.document.json.blocks[0]" level="2" data-block-tag="template"/> -->
        <block :block="editor.document.json.blocks" :level="2"/>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
// import { useEditorStore } from '/@/stores/editor';

const store:any = inject ( 'useStore' )

//import { EDITOR } from '/@/composables/useEditor';

import '/@/styles/editor.css'

const editor: any = store.editor  //EDITOR //useEditorStore();
// const navigation = useNavigatorStore();

//let whoobe = ref(EDITOR)

// const setCurrent = () => {
//     console.log ( 'container' , editor.document  )
// }
</script>