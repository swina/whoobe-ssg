<template>
<div class="fixed inset-0 bg-white h-screen w-screen max-w-screen z-modal preview overflow-y-auto">
    <div class="whoobePreview border shadow-xl" @contextmenu="openContextMenu($event)" v-if="editor.document?.json" :style="scale">
        <BlockPreview :block="project.data.header.blocks.json.blocks" v-if="previewLayout && project.data.header?.blocks"/>
        <div :class="previewLayout?previewCSS:''" id="templatePreview">
            <BlockPreview :data="$attrs.data" :slug="$attrs.slug" :block="editor.document.json.blocks" :level="2"/>
        </div>
        <BlockPreview :block="project.data.footer.blocks.json.blocks" v-if="previewLayout && project.data.footer?.blocks"/>
    </div>
    <div class="fixed top-0 right-0 cursor-pointer text-gray-200 hover:text-gray-400 z-modal" @click="editor.preview=!editor.preview"><Icon icon="mdi:close" class="text-5xl"/></div>

    <div class="fixed hidden z-modal cursor-pointer text-white p-2 bg-black" id="previewCtx" @mouseleave="closeCtx('previewCtx')">
        <ul class="m-0">
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveHTMLPage">Save as Page</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveAsLayout('main')">Save as Main Layout</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveAsLayout('header')">Save as Layout Header</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveAsLayout('footer')">Save as Layout Footer</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="documentHTML">Save HTML</li>
            
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="previewLayout=!previewLayout">Toggle Layout</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="addToProjectPages(false)">Add to website pages</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="addToProjectPages(true)">Add to website Homepage</li>
            <!-- <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" v-if="project.data" @click="saveHTMLPage">Save as website page</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400" @click="saveAsSveltePage">SvelteKit page ...</li>
            <li class="ml-2 list-none py-2 p-1 hover:text-blue-400">Save as ...</li> -->
        </ul>
    </div>
    <div class="fixed left-0 bottom-0 z-modal flex items-center p-2 justify-center cursor-pointer m-2" title="Toggle layout"  @click="previewLayout=!previewLayout">
        <icon icon="ant-design:layout-filled" class="text-2xl animate-pulse bg-white rounded-full px-2 py-1 pt-2 shadow-lg" :class="previewLayout?'text-purple-600':'text-gray-300'"/>
        
    </div> 
    <input type="range" min="0" max="100" v-model="scaleIndex" @change="scaleDown" class="z-modal bg-purple-600 fixed bottom-0 right-0 m-2 rounded-full cursor-pointer mr-20 mb-5" title="Zoom In/Out"/>
    <button class="fixed bottom-0 right-0 m-2" @click="openContextMenu($event,true)">Menu</button>
    <!-- <div class="fixed modal bottom-0 right-0 p-2 z-modal bg-white w-1/3 text-xs" v-if="settings">
        <DocumentSettings :mode="mode" @close="settings=false"/>
    </div> -->
</div>
</template>

<script setup lang="ts">
import { ref , computed , watch , inject } from 'vue'
import { useStore } from '/@/composables/useActions'
import { openCtx , closeCtx } from '/@/composables/contextMenu'
import { slugify , message } from '/@/composables/useUtils';
import { status } from '/@/composables/useNavigation'
import { loadConfig , CONFIG_FILE , saveFile , layoutMainClass , saveStaticPage } from '/@/composables/useLocalApi'
import { graphqlConfig } from '/@/composables/useGraphCMS'

import { project , exportDocument } from '/@/composables/useProject'
import { EDITOR , usedFonts } from '/@/composables/useEditor'
//import { store } from '/@/composables/useStore'

const store = inject ( 'useStore' )

const editor = EDITOR //useStore()
const current = editor.current


const props = defineProps({
    save: Boolean,
    slug: String
})

// watch ( () => props.slug , async (slug) => {
//     console.log ( store.graphql.render.length )
//     if ( props.save ){
//         let seo = {
//             title: graphqlConfig[current.data.client].schema[current.data.model].query.seo.title,
//             description: graphqlConfig[current.data.client].schema[current.data.model].query.seo.description,
//             keywords: graphqlConfig[current.data.client].schema[current.data.model].query.seo.keywords,
//         }
//         let content = store.graphql.data[current.id][current.data.model].filter ( a => a.slug === slug )[0]
//         documentHTML().then ( html => {
//             let page = {
//                 html: html,
//                 slug: slug,
//                 document: store.editor.document,
//                 fonts: [],
//                 layout: null,
//                 seo: {
//                     title: content[seo.title],
//                     description : content[seo.description],
//                     keyword: content[seo.keywords].join(',')
//                 }
//             }
//             store.graphql.render.push(page)
//         //     return page
//         // }).then ( page => {
//         //     saveStaticPage ( page ).then ( res => {
//         //         console.log ( page.html )
//         //         store.message.console += '\n' + slug + ' created'
//         //     })
//         })

//     }
// })

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

if ( props.save ) {
    console.log ( 'Save on load' )
}

const openContextMenu = (e:Object) => {
    e.preventDefault()
    openCtx('previewCtx', e)
}

const documentHTML = async () => {
    let doc = document.querySelector ('#templatePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    console.log ( html )
    editor.document.json['html'] = html
    return html
}

const saveAsLayout = async ( context:String ) => {
    let html = await documentHTML()
    let fonts = await usedFonts ( editor.document.json.blocks )
    store.project.data[context] = {
        blocks: Object.assign({},editor.document),
        html: html,
        fonts: fonts
    }
    store.project.path = CONFIG_FILE
    const res = await saveFile(store.project)
    store.message.data = await res.message
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
const scale = ref ( '' )
const scaleIndex = ref(100);
const scaleDown = ()=>{
    let canvas = document.querySelector('.preview').getBoundingClientRect();
    let ratio = canvas.width/canvas.height
    let y = scaleIndex.value/100;
    let x = (y/ratio)+.20
    if ( y === 1 ){
        scale.value = ''
        return
    }
    scale.value = `transform:scale(${x},${y})`
    console.log ( scale.value )
}
</script>