<template>
    <div class="fixed inset-0 bg-white h-screen w-screen z-modal preview overflow-y-auto pb-40 whoobePreview" @contextmenu="openContextMenu($event)" v-if="editor.document?.json">
        <BlockPreview :block="editor.document.json.blocks" :level="2"/>
    </div>
    <div class="fixed top-0 right-0 cursor-pointer text-gray-200 hover:text-gray-400 z-modal" @click="editor.preview=!editor.preview"><Icon icon="mdi:close" class="text-5xl"/></div>

    <div class="fixed hidden z-modal cursor-pointer text-white p-2 bg-black" id="previewCtx" @mouseleave="closeCtx('previewCtx')">
        <ul class="m-0">
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveHTMLPage">Save as Page</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="documentHTML">Save HTML</li>
            <!-- <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveHTMLPage">Save as website page</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveAsSveltePage">SvelteKit page ...</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400">Save as ...</li> -->
        </ul>
    </div>
    <!-- <div class="fixed modal bottom-0 right-0 p-2 z-modal bg-white w-1/3 text-xs" v-if="settings">
        <DocumentSettings :mode="mode" @close="settings=false"/>
    </div> -->
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { useStore } from '/@/composables/useActions'
import { openCtx , closeCtx } from '/@/composables/contextMenu'
import { slugify , message } from '/@/composables/useUtils';
import { status } from '/@/composables/useNavigation'
import { saveSveltePage , activeProject } from '/@/composables/useLocalApi'
import { project , exportDocument } from '/@/composables/useProject'
import { EDITOR } from '/@/composables/useEditor'

const editor = EDITOR //useStore()

let settings = ref ( false )
let mode = ref ('addToProjectPages')
console.log ( project )

const saveAsSveltePage = () => {
    if ( !project.data.init ) {
       mode.value = 'saveAsSveltePage'
        settings.value = true
    } else {
        message.data = 'No project defined'
    }
}

const saveAsProjectPage = () => {
    if ( !project.data.init ) {
       mode.value = 'addToProjectPages'
       settings.value = true
    } else {
        message.data = 'No project defined'
    }
}

const saveAsProjectHomepage = () => {
    if ( !project.data.init ) {
        mode.value = 'addToProjectHomepage'
        settings.value = true
    } else {
        message.data = 'No project defined'
    }
}

const saveHTMLPage = async () =>{
    mode.value = 'saveHTML'
    status.dialog = 'DocumentSettings'
    status.dialogTitle = 'Save'
    status.mode = mode.value
    settings.value = true
}


const openContextMenu = (e) => {
    e.preventDefault()
    // if ( !project.data.init ){
        openCtx('previewCtx', e)
    // } else {
    //     message.data = 'No project defined'
    // }
}
const documentHTML = () => {
    let doc = document.querySelector ('.whoobePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    editor.document.json['html'] = html
}

</script>