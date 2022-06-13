<template>
    <div class="p-2 flex flex-col text-sm">
        <label class="text-xs">Path: {{ status.current.path.replace(status.current.name,'') }}</label>
        <h3 v-if="status.current.type==='file'">File: {{ status.current.name }}</h3>
        <input type="text" v-model="fileNewName" @keydown="slugIt"/>
        <button class="hover:bg-black bg-red-500 text-white w-20 mx-auto mt-4" @click="renameItem">Rename</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fileTree , renameFile } from '/@/composables/useLocalApi';
import { store } from '/@/composables/useStore'
import { slugify } from '/@/composables/useUtils'

let status = store.status
let message = store.message
let fileNewName = ref ('')

const renameItem = async () =>{
    const res = await renameFile ( status.current.path.replace(status.current.name,'') , status.current.name , fileNewName.value + '.' + status.current.extension )
    message.data = await res.message
    fileTree.reload = true
    status.dialog = null
}
const slugIt = () => {
    fileNewName.value = slugify( fileNewName.value )
}
</script>
