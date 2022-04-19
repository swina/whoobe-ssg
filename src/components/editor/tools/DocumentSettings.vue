<template>
    <div class="p-4">
        <div v-if="status.mode==='saveAsTemplate'">
            <label>Filename</label>
            <input class="w-full mb-2" type="text" v-model="saveAsPath"/>    
        </div>
        <label>Title</label>
        <input class="w-full mb-2" type="text" v-model="editor.document.name"/>
        <label>Description</label>
        <textarea class="w-full mb-2 h-24" v-model="editor.document.description"/>
        <div v-if="status.mode != 'saveAsTemplate'" class="flex flex-col">
            <label>Slug</label>
            <input class="w-full mb-2" type="text" v-model="slug"/>
            <div class="my-2">
                <label class="mr-2">Page Type</label>
                <!-- <input type="checkbox" v-model="isHomepage" @change="setSlug"/> -->
                <select v-model="pageType" @change="setSlug">
                    <option v-for="isType in pageTypes" :value="isType">{{ isType }}</option>
                </select>
            </div>
            <div>
                <label class="mr-2">Include Header Template</label>
                <input type="checkbox" v-model="includeHeader"/> <small>{{ !SSG.header ? 'available' : '' }}</small>
            </div>
            <div>
                <label class="mr-2">Include Footer Template</label>
                <input type="checkbox" v-model="includeFooter"/> <small>{{ !SSG.footer ? '(not available)' : ''}}</small>
            </div>
            <!-- <label>Category</label>
            <select class="w-full" v-model="editor.document.category">
                <option v-for="category in categories" :value="category">{{ category }}</option>
            </select> -->
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
        <button class="m-auto btn btn-blue rounded mt-4 text-lg" @click="saveDocument">SAVE</button>
    </div>
</template>

<script setup lang="ts">
import { ref , computed , watch } from 'vue'
import { useStore } from '/@/composables/useActions'
import { saveSveltePage , activeProject, saveFile, saveStaticPage , paths , DATA_PATH , SSG, CONFIG_FILE } from '/@/composables/useLocalApi'
import { project , exportDocument } from '/@/composables/useProject'
import { slugify , message } from '/@/composables/useUtils';
import { status } from '/@/composables/useNavigation'
import { EDITOR } from '/@/composables/useEditor';
import jp from 'jsonpath'

const props = defineProps ({
    mode:String
})

const emits = defineEmits ({
    close:String
})

let newTag = ref ( '' )
let isHomepage = ref ( false )
let pageTypes = ref ( ['page','homepage' , 'header' , 'footer'] )
let pageType = ref('page')
let includeHeader = ref (true)
let includeFooter = ref ( true )

!SSG.header ? 
    includeHeader.value = false : includeHeader.value = true

!SSG.footer ? 
    includeFooter.value = false : includeFooter.value = true

const editor = EDITOR //useStore()

let saveAsPath = ref ( DATA_PATH + paths.templates + '/' + slugify(editor.document.name) )
const addTag = (e) => {
    if ( e.keyCode === 13 ){
        if ( newTag.value ){
            if ( !editor.document.tags ) editor.document.tags = []
            editor.document.tags.push ( newTag.value )
            editor.document.tags = [ ...new Set(editor.document.tags)]
            newTag.value = ''
        }
    }
}
const removeTag = (index:Number)=>{
    editor.document.tags.splice(index,1)
}

const saveDocument = () => {
    props.mode === 'saveAsTemplate' ?
        saveAsTemplate() : null
    props.mode === 'saveHTML' ?
        saveAsStaticPage() : null
    props.mode === 'addToProjectPages' ?
        addToProjectPages() : null
    props.mode === 'addToProjectHomepage' ?
        addToProjectHomepage() : null
    props.mode === 'saveAsSveltePage' ?
        saveAsSveltePage() : null

}
let slug = ref ( slugify(editor.document.name) )

const setSlug = () => {
    pageType.value === 'homepage' ?
        slug.value = 'index' :
            pageType.value === 'header' ?
                slug.value = 'header' :
                    pageType.value === 'footer' ?
                        slug.value = 'footer' :
                            slug.value = slugify(editor.document.name)
}

const saveAsTemplate = async () => {
    if ( saveAsPath.value ){
        editor.document.path = saveAsPath.value + '.json'
        await saveFile ( editor.document )
        message.data = 'File saved'
    }
    message.data = 'File saved'
    console.log ( 'File saved' )
    status.dialog = null
}

const saveAsStaticPage = async () => {
    if ( slug.value === 'header' || slug.value === 'footer' ){
        project.data[slug.value] = {
            html: documentHTML(),
            fonts: getFonts()
        }
        project.path = CONFIG_FILE
        const res = await saveFile(project)
        message.data = await res.message
        return
    }
    let page = await {
        html: documentHTML(),
        slug: slug.value,
        document: editor.document,
        fonts: getFonts(),
        include: {
            header: includeHeader.value,
            footer: includeFooter.value
        }
    }
    await saveStaticPage ( page )
    message.data = 'Saved as HTML page'
    status.dialog = null
    emits ('close' )
}

const addToProjectPages = async () => {
    let page = await exportDocument ( documentHTML() , editor.document )
    let slug = prompt ( 'Page slug' )
    if ( !slug ){
        slug = page.name
    }
    slug = slugify ( slug )
    project.data.pages[slug] = page
    await activeProject ( project )
    message.data = 'Added to project'
    await saveFile ( project )
    emits ( 'close' )
}

const addToProjectHomepage = async () => {
    let page = await exportDocument ( documentHTML() , editor.document )
    project.data.homepage = page
    await activeProject ( project )
    message.data = 'Added to project'
    await saveFile ( project )
    emits ('close' )
}

const saveAsSveltePage = async () => {
    let slug = prompt ( 'Page slug' )
    slug = slugify ( slug )
    let page = {
        html: documentHTML(),
        slug: slug
    }
    await saveSveltePage ( page )
    message.data = 'Saved as SvelteKit page'
    emits ('close' )
}

const documentHTML = () => {
    let doc = document.querySelector ('.whoobePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    
    return html
}

const getFonts = () => {
    let fonts = jp.query ( editor.document.json.blocks , '$..blocks..font')
    let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
    if ( fnts ){
        return fnts.join('|').replaceAll(' ','+')
    }
    return ''
}
</script>