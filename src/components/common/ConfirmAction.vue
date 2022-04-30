<template>
    <div class="flex items-center justify-center p-8 bg-white">
        <button @click="store.status.dialogConfirm=true,store.status.dialog=null">Yes</button>
        <button @click="store.status.dialogConfirm=false,store.status.dialog=null">No</button>
    </div>
</template>

<script setup lang="ts">
import { store } from '/@/composables/useStore';
</script>