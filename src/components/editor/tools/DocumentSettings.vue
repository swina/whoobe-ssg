<template>
    <div class="p-4">
        <label>Title</label>
        <input class="w-full mb-2" type="text" v-model="editor.document.name"/>
        <label>Description</label>
        <textarea class="w-full mb-2 h-24" v-model="editor.document.description"/>
        <label>Slug</label>
        <input class="w-full mb-2" type="text" v-model="slug"/>
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
        <button class="m-auto btn btn-blue rounded mt-4 text-lg" @click="saveDocument">SAVE</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '/@/composables/useActions'
import { saveSveltePage , activeProject, saveFile, saveStaticPage } from '/@/composables/useLocalApi'
import { project , exportDocument } from '/@/composables/useProject'
import { slugify , message } from '/@/composables/useUtils';
import { status } from '/@/composables/useNavigation'

import jp from 'jsonpath'

const props = defineProps ({
    mode:String
})

const emits = defineEmits ({
    close:String
})

let newTag = ref ( '' )

const editor = useStore()


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
    props.mode === 'saveHTML' ?
        saveAsStaticPage() : null
    props.mode === 'addToProjectPages' ?
        addToProjectPages() : null
    props.mode === 'addToProjectHomepage' ?
        addToProjectHomepage() : null
    props.mode === 'saveAsSveltePage' ?
        saveAsSveltePage() : null

}
let slug = ref( slugify(editor.document.name) )
const saveAsStaticPage = async () => {
    
    let page = await {
        html: documentHTML(),
        slug: slug.value,
        document: editor.document,
        fonts: getFonts()
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