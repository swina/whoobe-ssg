<template>
    <div class="flex flex-col pb-40 overflow-y-auto h-screen">
        <!-- <span @click="cms_context='homepage',open=!open" class="ml-2 text-4xl mt-1" title="Select template">
            <button>Select</button>
        </span> -->
        <div v-if="store.project.data.homepage" class="mx-auto">
            <div class="flex items-center justify-center">
                <WebpagePreview context="homepage" v-if="store.project.data.homepage.blocks"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const store = inject('useStore')

</script>