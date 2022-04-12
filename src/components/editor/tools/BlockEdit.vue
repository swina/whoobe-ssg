<template>
    <div v-if="editor.current" class="flex flex-col p-2">
        Edit {{ editor.current.tag }}
        <textarea v-if="editor.current.tag === 'element'" v-model="editor.current.content" class="my-2 font-mono text-xs"/>
        <input v-if="editor.current.tag === 'icon'" v-model="editor.current.data.icon"/>
        <input v-if="editor.current.tag === 'icon'" v-model="search" @keydown="searchIcon" placeholder="search icon ..." class="my-2"/>
        
        <div class="flex flex-wrap justify-around bg-gray-200" v-if="icons && editor.current.tag === 'icon'">
            <template v-for="icon in icons" :key="icon">
                <span @click="editor.current.data.icon=icon">
                    <i class="iconify m-1 text-lg" :data-icon="icon"/>
                </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { searchIconify } from '/@/composables/useUtils'
const editor = useEditorStore()
let search = ref ( '' )
let icons = ref ( null )

const searchIcon = async () => {
    if ( search.value.length > 2 ) {
        icons.value = null
        let res  = await searchIconify ( search.value ) 
        icons.value = res.icons
    }
}
</script>