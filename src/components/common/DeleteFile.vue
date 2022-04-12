<template>
    <div class="p-2 flex flex-col text-sm">
        <label class="text-xs">Path: {{ status.current.path }}</label>
        <h3>File: {{ status.current.name }}</h3>
        <button class="hover:bg-black bg-red-500 text-white w-20 mx-auto mt-4" @click="deleteItem">Delete</button>
    </div>
</template>

<script setup lang="ts">
import { status } from '/@/composables/useNavigation'
import { openPath , saveFile , deleteFile, currentFolder } from '/@/composables/useLocalApi';
import { message } from '/@/composables/useUtils';


const deleteItem = async () =>{
    const res = await deleteFile ( status.current.path )
    message.data = await res.message
    status.dialog = null
}

</script>
