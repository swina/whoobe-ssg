<template>
    <div v-if="status.dialog" class="z-modal fixed inset-0 h-screen w-screen bg-black bg-opacity-30 items-center justify-center flex flex-col" style="z-index:999999999;" id="contextDialog">
        <div class="flex flex-col m-auto bg-white z-modal relative" :class="status.dialogCss"> 
            <div class="bg-purple-700 text-white flex items-center p-2">{{ status.dialogTitle || 'Dialog' }}</div>
            <span class="absolute right-0 top-0 m-1 text-white cursor-pointer" @click="status.dialog=null"><icon icon="mdi:close"/></span>
            <BlockToProject v-if="status.dialog==='BlockToProject'"/>
            <CreateFolder v-if="status.dialog === 'CreateFolder'"/>
            <CreateFile v-if="status.dialog === 'CreateFile'"/>
            <DeleteFile v-if="status.dialog === 'Delete'"/>
            <DocumentSettings v-if="status.dialog === 'DocumentSettings'" :mode="status.mode"/>
            <BlockTipTap v-if="status.dialog==='wysiwyg'"/>
            <BlockGrid v-if="status.dialog==='Grid'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { status } from '/@/composables/useNavigation';
import { openContextDialog , closeCtx } from '/@/composables/contextMenu';

</script>