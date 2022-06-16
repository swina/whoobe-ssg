<template>
    <dialog class="fixed z-modal relative p-0 bg-white" style="z-index:999999999;">
        <div class="bg-purple-700 text-white flex items-center p-2">{{ store.status.dialogTitle || 'Dialog' }}</div>
        <span class="absolute right-0 top-0 m-1 text-white cursor-pointer" @click="store.status.dialog=null"><icon icon="mdi:close"/></span>
        <BlockToProject v-if="store.status.dialog==='BlockToProject'"/>
        <CreateFolder v-if="store.status.dialog === 'CreateFolder'"/>
        <CreateFile v-if="store.status.dialog === 'CreateFile'"/>
        <DeleteFile v-if="store.status.dialog === 'Delete'"/>
        <DocumentSettings v-if="store.status.dialog === 'DocumentSettings'" :mode="store.status.mode"/>
        <ConfirmAction v-if="store.status.dialog === 'ConfirmAction'"/>
        <Images v-if="store.status.dialog === 'images'" context="images"/>
    </dialog>
</template>

<script setup lang="ts">
import { store } from '/@/composables/useStore';

</script>