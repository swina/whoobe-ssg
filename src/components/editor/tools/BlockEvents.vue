<template>
    <div class="p-2" v-if="editor.current">
        <strong>Event Bus</strong>
        <template v-for="event in Object.keys(editor.currentBlock.events).sort()" :key="event">
            <div class="">@{{ event }}</div>
            <input type="text" class="p-1 bg-gray-100 w-full" v-model="editor.current.events[event]"/>
        </template>
    </div>
    <div v-else>Select an element</div>
</template>

<script setup lang="ts">

import { useStore } from '/@/composables/useActions'
const editor = useStore()

</script>