<template>
    <div>
        <div class="p-2 flex flex-col text-sm" v-if="store.status.dialog && store.status.current?.path">
            <label class="text-xs">Path: {{ store.status.current.type === 'directory' ? store.status.current.path : store.status.current.path.replace(store.status.current.name,'') }}</label>
            <input type="text" class="mt-2" v-model="folder" placeholder="new folder"/>
            <label class="text-xs text-gray-300">name</label>
            <button class="hover:bg-black w-20 mx-auto mt-4"   @click="createFolder">Save</button>
        </div>
        <div v-else class="p-2 flex flex-col text-sm">
            <label class="text-xs">Path: {{ store.status.current.path ? store.status.current.path : DATA_PATH }}/{{ store.status.current.path ? '' : store.status.current.name }}</label>
            <input type="text" class="mt-2" v-model="folder" placeholder="new folder"/>
            <label class="text-xs text-gray-300">name</label>
            <button class="hover:bg-black w-20 mx-auto mt-4"   @click="createFolder">Save</button>
        </div>
        <!-- STATUS {{ store.status.current?.path }}  -->
    </div>
</template>

<script setup lang="ts">
import { ref ,computed } from 'vue'
//import { status } from '/@/composables/useNavigation'
//import { addFolder , paths , DATA_PATH } from '/@/composables/useLocalApi';
import { addFolder , DATA_PATH , fileTree } from '/@/composables/useLocalApi';
import { store } from '/@/composables/useStore'

let folder = ref('')

const createFolder = async ()=>{
    let res = await addFolder ( store.status.current?.path ? store.status.current.path : DATA_PATH + '/' + store.status.context ,  folder.value )
    console.log ( res )
    fileTree.reload = true
    store.status.dialog = null
}


</script>