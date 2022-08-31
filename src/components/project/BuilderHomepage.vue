<template>
    <div class="flex flex-col pb-40 overflow-y-auto h-screen">
        <span @click="open=!open" class="ml-2 text-4xl mt-1" title="Select template">
            <button>Select</button>
        </span>
        <div v-if="store.project.data.homepage" class="mx-auto">
            <div class="flex items-center justify-center">
                <WebpagePreview context="homepage" v-if="store.project.data.homepage.blocks"/>
            </div>
        </div>
    </div>
    <TreeContainer :context="context" v-if="open" @file="addPage"/>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
const store = inject('useStore')
let open = ref(false)
let context = ref('templates')

const addPage = ( template:any , path:any)=>{
    store.project.data.homepage.blocks = template
    open.value = false
    store.project.rebuild = true
}
</script>