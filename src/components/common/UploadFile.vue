<template>
    <div class="p-8 flex flex-col">
        <input type="file" ref="file" @change="fileToUpload">
        <button @click="uploadForm" class="my-4">Upload!</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { API_URL , fileTree } from '/@/composables/useLocalApi'
import { store } from '/@/composables/useStore'

const file = ref(null)

const fileToUpload = (item) => {
    console.log ( file.value.files[0] )
}
const uploadForm = async () => {
    const formData = new FormData();
    console.log ( file.value.files[0] )
    formData.append( 'file', file.value.files[0] );
    formData.append( 'path' , store.status.current.path )
    const res = await fetch ( API_URL + '/upload-single' , {
        method: 'post',
        body: formData ,
    })
    console.log ( await res )
    fileTree.reload = true
    store.status.dialog = null
}

</script>