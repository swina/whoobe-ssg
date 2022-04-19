<template>
    <div>
        <div class="p-2 flex flex-col text-sm" v-if="status.dialog && status.current?.path">
            <label class="text-xs">Path: {{ status.current.type === 'directory' ? status.current.path : status.current.path.replace(status.current.name,'') }}</label>
            <input type="text" class="mt-2" v-model="folder" placeholder="new folder"/>
            <label class="text-xs text-gray-300">name</label>
            <button class="hover:bg-black w-20 mx-auto mt-4"   @click="createFolder">Save</button>
        </div>
        <div v-else class="p-2 flex flex-col text-sm">
            <label class="text-xs">Path: {{ DATA_PATH }}/{{ status.context }}</label>
            <input type="text" class="mt-2" v-model="folder" placeholder="new folder"/>
            <label class="text-xs text-gray-300">name</label>
            <button class="hover:bg-black w-20 mx-auto mt-4"   @click="createFolder">Save</button>
        </div>
        STATUS
    {{ status.current?.path }}
    </div>
</template>

<script setup lang="ts">
import { ref ,computed } from 'vue'
import { status } from '/@/composables/useNavigation'
import { addFolder , paths , DATA_PATH } from '/@/composables/useLocalApi';

let folder = ref('')

const enabled = computed(()=>{
    return folder.value ? true : false
})

const createFolder = async ()=>{
    await addFolder ( status.context , folder.value )
    status.dialog = null
}


</script>