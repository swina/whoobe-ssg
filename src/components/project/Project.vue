<template>
    <div  class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 pr-0 top-0 left-0 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <span  class="text-3xl absolute right-0 top-0 text-white z-modal  cursor-pointer" @click="switchToEditor"><icon icon="mdi:close"></icon></span>
        <Website v-if="project" :data="project.data"/>
    </div>
    <FileExplorer context="projects" :open="true" @close="open=!open" @file="loadFile"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { switchToEditor } from '/@/composables/useNavigation'
import { project } from '/@/composables/useProject'

let open = ref ( false )
//let project = ref ()

const loadFile = (file:Object , path:String) => {
    project.data.init = false
    project.data = file
    project.path = path
}
</script>