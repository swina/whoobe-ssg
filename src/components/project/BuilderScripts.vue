<template>
    <div class="flex flex-col p-4 bg-white">
        <div class="flex">
            <label class="text-xs mr-2">AlpineJS</label>
            <input type="checkbox" v-model="store.project.data.alpine"/>
        </div>
        <label class="text-xs mt-2">Custom JS URL</label>
        <input type="text" v-model="store.project.data.custom_script"/>
        <label class="text-xs mt-2">Custom CSS URL</label>
        <input type="text" v-model="store.project.data.custom_css"/>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const store = inject('useStore')

if ( !store.project.data?.alpine ){
    store.project.data['alpine'] = true
}

if ( !store.project.data?.custom_script ){
    store.project.data['custom_script'] = ''
}

if ( !store.project.data?.custom_css ){
    store.project.data['custom_css'] = ''
}


</script>