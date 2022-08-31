<template>
    <div class="p-4 flex flex-col">
        <small>The best way to create a page is to select a template</small>
        <button @click="selectTemplate">Select</button>
        <label>Title</label>
        <input class="w-full mb-2" type="text" v-model="store.editor.document.name"/>
        <!-- <label>Title</label>
        <label>Description</label>
        <textarea class="w-full mb-2 h-24" v-model="editor.document.description"/>
        <div v-if="status.mode != 'saveAsTemplate'" class="flex flex-col">
            <label>Slug</label>
            <input class="w-full mb-2" type="text" v-model="slug"/>
            <div class="my-2">
                <label class="mr-2">Page Type</label>
                <select v-model="pageType" @change="setSlug">
                    <option v-for="isType in pageTypes" :value="isType">{{ isType }}</option>
                </select>
            </div>
            <div class="my-2" v-if="store.status.locales && store.status.locales.length > 1">
                Lanaguage
                <select class="w-24" v-model="store.status.locale" @change="updateData">
                    <option v-for="locale in store.status.locales" :value="locale">{{ locale }}</option>
                </select>
            </div>
            <div v-if="!status.previewMode">
                <label class="mr-2">Use layout</label>
                <input type="checkbox" v-model="useLayout"/>
            </div>
            <label>Tags (used as keyword for SEO)</label>
            <div class="flex flex-row flex-wrap my-1">
            <template v-for="(tag,index) in editor.document.tags">
                <span class="bg-purple-300 px-1 rounded-lg m-1 cursor-pointer flex items-center" @click="removeTag(index)">{{ tag }} <icon icon="mdi:close" class="mt-1"/></span>
            </template>
            </div>
            <input type="text" class="w-full bg-white mb-2" placeholder="type a new tag and enter" v-model="newTag" @keydown="addTag($event)"/>
            <label>Google Analytics (optional)</label>
            <input type="text" class="w-full bg-white" placeholder="Enter your Google Analytics" v-model="editor.document.analytics"/>
        </div>
        <button class="m-auto btn btn-blue rounded mt-4 text-lg" @click="saveDocument">SAVE</button> -->
    </div>
</template>

<script setup lang="ts">
import { ref , inject } from 'vue'
// //import { store } from '/@/composables/useStore'
// import { saveSveltePage , activeProject, saveFile, saveStaticPage , paths , DATA_PATH , SSG, CONFIG_FILE } from '/@/composables/useLocalApi'
// import { project , exportDocument } from '/@/composables/useProject'
// import { slugify , message } from '/@/composables/useUtils';
// import { status } from '/@/composables/useNavigation'
// //import { EDITOR } from '/@/composables/useEditor';

const store = inject ('useStore')

const selectTemplate = async()=>{
    
}
// import jp from 'jsonpath'

// const props = defineProps ({
//     mode:String
// })

// const emits = defineEmits ({
//     close:String
// })

// const editor = store.editor //EDITOR //useStore()


// let newTag = ref ( '' )
// let isHomepage = ref ( false )
// let pageTypes = ref ( ['page','homepage' , 'header' , 'footer'] )
// let pageType = ref('page')
// let useLayout = ref ( status.previewMode )
// let includeHeader = ref (true)
// let includeFooter = ref ( true )


// let saveAsPath = ref ( '' )
// let saveAs = ref ( '' )

// const addTag = (e) => {
//     if ( e.keyCode === 13 ){
//         if ( newTag.value ){
//             if ( !editor.document.tags ) editor.document.tags = []
//             editor.document.tags.push ( newTag.value )
//             editor.document.tags = [ ...new Set(editor.document.tags)]
//             newTag.value = ''
//         }
//     }
// }
// const removeTag = (index:Number)=>{
//     editor.document.tags.splice(index,1)
// }

// const saveDocument = () => {
//     props.mode === 'saveAsTemplate' ?
//         saveAsTemplate() : null
//     props.mode === 'saveHTML' ?
//         saveAsStaticPage() : null
//     props.mode === 'addToProjectPages' ?
//         addToProjectPages() : null
//     props.mode === 'addToProjectHomepage' ?
//         addToProjectHomepage() : null
//     props.mode === 'saveAsSveltePage' ?
//         saveAsSveltePage() : null

// }
// let slug = ref ( slugify(editor.document.name) )

// const setSlug = () => {
//     pageType.value === 'homepage' ?
//         slug.value = 'index' :
//             pageType.value === 'header' ?
//                 slug.value = 'header' :
//                     pageType.value === 'footer' ?
//                         slug.value = 'footer' :
//                             slug.value = slugify(editor.document.name)
// }

// const saveAsTemplate = async () => {
//     let filePath = DATA_PATH + paths.templates + '/' 
//     editor.document.path = filePath + slugify(editor.document.name.toLowerCase()) + '.json'
//     await saveFile ( editor.document )
//     store.message.data = 'File saved'
//     store.status.dialog = null
// }

// const saveAsStaticPage = async () => {
//     if ( slug.value === 'header' || slug.value === 'footer' ){
//         store.project.data[slug.value] = {
//             html: documentHTML(),
//             fonts: getFonts(),
//             blocks: editor.document.json.blocks
//         }
//         store.project.path = CONFIG_FILE
//         const res = await saveFile(store.project)
//         store.message.data = 'file saved as ' + slug.value 
//         store.status.dialog = null
//         return
//     }
    
//     let page = await {
//         html: documentHTML(),
//         slug: slug.value,
//         document: editor.document,
//         fonts: getFonts(),
//         layout: useLayout.value
//     }
    
//     console.log ( page )
//     await saveStaticPage ( page )
//     store.message.data = 'Saved as HTML page'
//     store.status.dialog = null
//     if ( pageType.value === 'homepage' ){
//         store.project.path = CONFIG_FILE
//         store.project.data[pageType.value] = { 
//             html: page.html,
//             fonts: page.fonts,
//             blocks: editor.document
//         }
//         await saveFile(store.project)
//     }
//     emits ('close' )
// }

// const addToProjectPages = async () => {
//     let page = await exportDocument ( documentHTML() , editor.document )
//     let slug = prompt ( 'Page slug' )
//     if ( !slug ){
//         slug = page.name
//     }
//     slug = slugify ( slug )
//     project.data.pages[slug] = page
//     await activeProject ( project )
//     store.message.data = 'Added to project'
//     await saveFile ( project )
//     emits ( 'close' )
// }

// const addToProjectHomepage = async () => {
//     let page = await exportDocument ( documentHTML() , editor.document )
//     project.data.homepage = page
//     await activeProject ( project )
//     store.message.data = 'Added to project'
//     await saveFile ( project )
//     emits ('close' )
// }

// const saveAsSveltePage = async () => {
//     let slug = prompt ( 'Page slug' )
//     slug = slugify ( slug )
//     let page = {
//         html: documentHTML(),
//         slug: slug
//     }
//     await saveSveltePage ( page )
//     store.message.data = 'Saved as SvelteKit page'
//     emits ('close' )
// }

// const documentHTML = () => {
//     let doc = null
//     if ( useLayout.value ){
//         doc = document.querySelector ('#' + editor.document.json.blocks.id )
//     } else {
//         doc = document.querySelector ('#templatePreview')
//     }
    
//     let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    
//     return html
// }

// const getFonts = () => {
//     let fonts = jp.query ( editor.document.json.blocks , '$..blocks..font')
//     console.log ( "FONTS=>" , fonts )
//     if ( editor.document.json.blocks.font ){
//         fonts.push ( editor.document.json.blocks.font )
//     }
//     let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
//     if ( fnts ){
//         return fnts.join('|').replaceAll(' ','+')
//     }
//     return ''
// }
</script>