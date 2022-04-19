<template>
    <dialog open class="fixed z-modal relative p-0" style="z-index:999999999;">
        <div class="bg-purple-700 text-white flex items-center p-2">{{ status.dialogTitle || 'Dialog' }}</div>
        <span class="absolute right-0 top-0 m-1 text-white cursor-pointer" @click="status.dialog=null"><icon icon="mdi:close"/></span>
        <BlockToProject v-if="status.dialog==='BlockToProject'"/>
        <CreateFolder v-if="status.dialog === 'CreateFolder'"/>
        <CreateFile v-if="status.dialog === 'CreateFile'"/>
        <DeleteFile v-if="status.dialog === 'Delete'"/>
        <DocumentSettings v-if="status.dialog === 'DocumentSettings'" :mode="status.mode"/>
    </dialog>
</template>

<script setup lang="ts">
import { status } from '/@/composables/useNavigation'
</script>