<template>
    <div v-if="editor.document" class="z-1 relative min-h-screen border-black" data-document-tag="template">
        <!-- <container class="editor-block relative" :id="editor.document.json.blocks[0].id" :block="editor.document.json.blocks[0]" level="2" data-block-tag="template"/> -->
        <block :block="editor.document.json.blocks" :level="2"/>
    </div>
</template>

<script setup lang="ts">

import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';

import '/@/styles/editor.css'

const editor: any = useEditorStore();
const navigation = useNavigatorStore();
</script>