<template>
    <div class="fixed inset-0 h-screen w-screen flex items-center justify-around text-bluegray-400  from-bluegray-900 to-bluegray-700 bg-gradient-to-tr">
        <div class="flex flex-col w-40 h-40 justify-center items-center p-4">
            <h1 style="font-family:'Abel';" class="text-3xl text-purple-500">wh<span class="text-blue-100">oo</span>be</h1>
            
        </div>
        <div class="absolute right-0 top-0 w-10 h-screen bg-bluegray-900"></div>
        <div class="absolute left-0 bottom-0 h-10 w-screen bg-bluegray-900"></div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'

const editor = useStore()
</script>