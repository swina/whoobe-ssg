<template>
            <span @click="open=!open" class="ml-2 text-4xl mt-1" title="Select template to add as page"><button>Add</button></span>
    <div v-if="store.project.data.pages" class="flex  overflow-y-auto h-screen">
        <div class="w-1/3 p-2 border-r">
            <ul class="m-0">
                <li class="ml-0 list-none cursor-pointer lowercase flex items-center" :class="previewPage.slug === page?'font-bold':''" v-for="page in Object.keys(store.project.data.pages)">
                    <span @click="removePage(page)" class="pt-0" title="Remove"><icon icon="ci:off-close" class="text-red-500 text-xl mr-2"/></span><span title="Click to preview" @click="setPreviewPage(page)">{{page}}</span>
                </li>
            </ul>
        </div>
        <div class="w-2/3 pl-1/4 pr-24 flex flex-col items-center justify-center" v-if="previewPage.blocks?.json || previewPage?.html">
            <!-- <div class="flex items-center justify-start w-full p-2 pt-4"><input class="mr-2 w-3/4" type="text" v-model="newPageSlug"/><button @click="updateSlug">Change Slug</button><button @click="cms_context='compose',open=!open">Compose Page</button></div> -->
            <div class="flex items-center justify-center pr-10" v-if="previewPage?.slug">
                <WebpagePreview :context="previewPage.slug"/>
            </div>
            
        </div>
    </div>
    <TreeContainer :context="context" :open="open" @file="addPage"/>
</template>

<script setup lang="ts">
import { inject , ref } from 'vue'
import { CONFIG_FILE , saveFile } from '/@/composables/useLocalApi'
import { slugify } from '/@/composables/useUtils'

const store = inject('useStore')
let context = ref('templates')
let open = ref(false)
let previewPage = ref({blocks:null,slug:''})
let newPageSlug = ref('')

const addPage = async ( template:Object ) => {
    if ( !store.project.data?.pages ){
        store.project.data['pages'] = {}
    }
    let page = {
        blocks: template,
        fonts: '', 
        html: ''
    }
    store.project.data['pages'][slugify(template.name)] = page
    open.value = false
    saveProject()
}

const removePage = async ( slug:String ) => {
    previewPage.value.blocks = null
    previewPage.value.slug = ''
    delete store.project.data.pages[slug]
    saveProject()
}

const setPreviewPage = async ( slug:String ) => {
    previewPage.value.blocks = store.project.data.pages[slug].blocks
    previewPage.value.slug = slug
    return true
}

const saveProject = async ()=>{
    store.status.loading =! store.status.loading
    store.project.path = CONFIG_FILE
    const res = await saveFile(store.project)
    store.status.loading =! store.status.loading
}
</script>