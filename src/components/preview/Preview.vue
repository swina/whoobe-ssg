<template>
    <div class="fixed inset-0 bg-white h-screen w-screen max-w-screen z-modal preview overflow-y-auto whoobePreview" @contextmenu="openContextMenu($event)" v-if="editor.document?.json">
        <BlockPreview :block="project.data.header.blocks.json.blocks" v-if="previewLayout && project.data.header?.blocks"/>
        <div :class="previewLayout?previewCSS:''" id="templatePreview">
            <BlockPreview :block="editor.document.json.blocks" :level="2"/>
        </div>
        <BlockPreview :block="project.data.footer.blocks.json.blocks" v-if="previewLayout && project.data.footer?.blocks"/>
    </div>
    <div class="fixed top-0 right-0 cursor-pointer text-gray-200 hover:text-gray-400 z-modal" @click="editor.preview=!editor.preview"><Icon icon="mdi:close" class="text-5xl"/></div>

    <div class="fixed hidden z-modal cursor-pointer text-white p-2 bg-black" id="previewCtx" @mouseleave="closeCtx('previewCtx')">
        <ul class="m-0">
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveHTMLPage">Save as Page</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveAsLayout('main')">Save as Main Layout</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveAsLayout('header')">Save as Layout Header</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveAsLayout('footer')">Save as Layout Footer</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="documentHTML">Save HTML</li>
            
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="previewLayout=!previewLayout">Toggle Layout</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="addToProjectPages(false)">Add to website pages</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="addToProjectPages(true)">Add to website Homepage</li>
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
import { loadConfig , CONFIG_FILE , saveFile , layoutMainClass } from '/@/composables/useLocalApi'
import { project , exportDocument } from '/@/composables/useProject'
import { EDITOR , usedFonts } from '/@/composables/useEditor'
import { store } from '/@/composables/useStore'

const editor = EDITOR //useStore()

let settings = ref ( false )
let mode = ref ('layoutPreview')
let previewLayout = ref ( false )

const saveHTMLPage = async () =>{
    //mode.value = 'saveHTML'
    store.status.dialog = 'DocumentSettings'
    store.status.dialogTitle = 'Save'
    store.status.mode = 'saveHTML' 
    store.status.previewMode = previewLayout.value
    settings.value = true
}


const openContextMenu = (e:Object) => {
    e.preventDefault()
    openCtx('previewCtx', e)
}

const documentHTML = async () => {
    let doc = document.querySelector ('.whoobePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    editor.document.json['html'] = html
    return html
}

const saveAsLayout = async ( context:String ) => {
    let html = await documentHTML()
    let fonts = await usedFonts ( editor.document.json.blocks )
    project.data[context] = {
        blocks: Object.assign({},editor.document),
        html: html,
        fonts: fonts
    }
    project.path = CONFIG_FILE
    const res = await saveFile(project)
    message.data = await res.message
    return
}
let previewCSS = ref('')

const addToProjectPages = async ( homepage:Boolean = false) => {
    let html = await documentHTML()
    let fonts = await usedFonts ( editor.document.json.blocks )
    if ( !homepage ){
        project.data.pages[slugify(editor.document.name)] = {
            html: html,
            blocks: editor.document,
            fonts: fonts,
            slug: slugify(editor.document.name)
        }
    } else {
        project.data.homepage = {
            blocks: editor.document,
            html: html,
            fonts: fonts,
            slug: slugify(editor.document.name)
        }
    }
    project.path = CONFIG_FILE
    const res = await saveFile(project)
    message.data = 'Added to project'
    return
}


const previewClass = async () => {
    if ( previewLayout.value ){
        previewCSS.value = await layoutMainClass()
    }
}

previewClass()

async function loadSettings () {
    let response = await loadConfig()
    project.data = await response.data
}

loadSettings()
</script>