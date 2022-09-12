<template>
    <div class="bars bottomBar border-t border-bluegray-800 pl-10 text-gray-500 z-modal" :class="$attrs.class">
        
        Template <input class="mx-2" type="text" v-model="editor.document.name"/>
        <span v-if="IS_DIRECTUS" class="mr-2">
            Category : <select class="h-6 border-0 font-mono outline-none bg-bluegray-800 text-gray-400" v-model="store.document.category">
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </span>
        ID: {{ editor.current ? editor.current.id : '' }}
        <span @click="saveTemplate($event)" class="mx-2" title="Save template">
            <Icon icon="ic:baseline-save" class="text-xl"/>
        </span>

        
        <span @click="saveTemplateAs($event)" class="mx-2" title="Save As">
            <Icon icon="codicon:save-as" class="mt-1 text-xl"/>
        </span>

        <span @click="addToUIKit($event)" class="mx-2" title="Add to UIKit">
            <Icon icon="mdi:widgets" class="mt-1 text-xl"/>
        </span>

        <!-- <span @click="blockToProject($event)" class="mx-2" title="Add to project">
            <Icon icon="mdi:web" class="text-xl"/>
        </span> -->
        
        <span @click="preview" class="mx-2" title="Preview">
            <Icon icon="icon-park-outline:preview-open" class="text-xl"/>
        </span>

        <span @click="editor.tool('css')" class="mx-2" title="CSS">
            <Icon icon="ic:baseline-css" class="text-xl"/>
        </span>
        <input 
        v-if="editor.current && editor.current?.css" v-model="editor.current.css.css" class="mx-2 w-1/2"  @focus="editor.tool='css'"/>
        <!-- <div class="w-1/4"></div> -->
    </div>
    <div class="file-explorer fixed left-0 top-0 z-modal w-1/3 h-screen" v-if="selectFolder" @click="selectFolder=!selectFolder">
        <TreeContainer context="templates" :open="selectFolder" :onlyFolder="true"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PREVIEW , setLocalStorage , useStore } from '/@/composables/useActions'
import { openContextDialog } from '/@/composables/contextMenu';
import { status } from '/@/composables/useNavigation'
import { project } from '/@/composables/useProject'
import { saveFile , fileExplorer , IS_DIRECTUS} from '/@/composables/useLocalApi';
import { graphQLTemplateSave , graphQLData } from '/@/composables/useGraphQL'

//import { message } from '/@/composables/useUtils'
//import { EDITOR } from '/@/composables/useEditor'
import { store } from '/@/composables/useStore'

const editor = store.editor //EDITOR //useStore()

const selectFolder = ref(false)
let tree = ref({})
let folders = ref({})
const categories = ref(null)
let directusCategory = ref(null)


const getTemplateCategories = async ()=>{
    const config = {
        client: 'directus', 
        model: 'templates_categories'
    }
    const res = await graphQLData ( config )
    categories.value = res
}

const preview = () => {
    setLocalStorage ( PREVIEW , editor.document )
    editor.preview = true
}

const blockToProject = (e) => {
    status.dialog = 'BlockToProject'
    status.dialogTitle = 'Add to project'
    openContextDialog( e )
}


const saveTemplate = async () => {
    if ( editor.document?.path ){
        await saveFile ( editor.document )
        store.message.data = 'File saved'
        // if ( IS_DIRECTUS ){
        //     editor.document['category'] = directusCategory
        // }
        // const template = await graphQLTemplateSave ( editor.document )
        // console.log ( await template )
    }
}

const saveTemplateAs = async () => {
    store.status.dialog = 'DocumentSettings'
    store.status.dialogTitle = 'Save as'
    store.status.mode = 'saveAsTemplate'
}

const addToUIKit = async () => {
    return
}

const loadTree = async ( context:String = "templates" ) => {
    tree.value = await fileExplorer ( context )
    folders.value = tree.value.children.filter ( a => a.type === 'directory' ).sort()
    tree.value.children.forEach ( a => {
        if ( a.type === 'file' )
            folders.value.push ( a )
    })
}
loadTree()

if ( IS_DIRECTUS ){
    getTemplateCategories()
}
</script>