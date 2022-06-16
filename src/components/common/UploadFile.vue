<template>
    <div class="p-4 flex flex-col">
        <input type="file" ref="file" @change="fileToUpload">
        {{ store.status.current.path }}
        <button @click="uploadForm" class="small my-4">Upload!</button>
    </div>
</template>

<script setup lang="ts">
import { propsToAttrMap } from '@vue/shared';
import { ref } from 'vue'
import { API_URL , fileTree ,  PAGES_PATH } from '/@/composables/useLocalApi'
import { store } from '/@/composables/useStore'

const file = ref(null)
const props = defineProps({ 
    context:String,
    close:Boolean
})
const fileToUpload = (item) => {
    console.log ( file.value.files[0] )
}
const uploadForm = async () => {
    const formData = new FormData();
    console.log ( file.value.files[0] )
    formData.append( 'file', file.value.files[0] );
    formData.append( 'path' , props.context ? PAGES_PATH + '/assets/img' : store.status.current.path )
    const res = await fetch ( API_URL + '/upload-single' , {
        method: 'post',
        body: formData ,
    })
    console.log ( await res )
    fileTree.reload = true
    if ( props.close ){
        store.status.dialog = null
    }
}

</script>