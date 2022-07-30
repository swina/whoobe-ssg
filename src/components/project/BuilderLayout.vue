<template>
    <!-- Header : <button @click="context='header',open=!open">Set</button> -->
    <div v-if="project.data?.header || project.data?.footer" class="preview-md mx-auto border">
        <span v-if="project.data?.header">To create an header to add to all pages, save a template as page type <strong>header</strong></span>
        <div v-if="project.data.header" v-html="project.data.header.html"></div>
        <div class="h-xl text-2xl flex flex-col items-center justify-center">Your page</div>
        <span v-if="project.data?.footer">To create a footer to add to all pages, save a template as page type <strong>footer</strong></span>
        <div v-if="project.data?.footer" v-html="project.data.footer.html"></div>
    </div>
    <div v-else class="mx-auto">
        <h3 class="mx-auto">No layout defined yet</h3>
    </div>
    <TreeContainer context="templates" :open="open" @close="open=!open" @file="addTemplate"/>
</template>

<script setup lang="ts">
import { inject , ref } from 'vue'
const store = inject('useStore')
let project = store.project
let context = ref('')
let open = ref (false)

const addTemplate = (template:Object) =>{
    project.data[context.value] = template
    open.value = false
    // if ( settings.tab === 'homepage' ){
    //     project.data.homepage.blocks = template
    //     homepage.value = template
    //     open.value = !open.value
    //     previewPage.value = {
    //         blocks: template ,
    //         html: '',
    //         slug: 'index',
    //         fonts: ''
    //     }
    //     saveProject()
    //     return
    // }
    // if ( settings.tab === 'pages' ){
        
    //         let page = {
    //             blocks: template,
    //             html: '',
    //             fonts: '',
    //             slug: slugify(template.name)
    //         }
    //         project.data.pages[slugify(template.name)] = page
    //         previewPage.value = {
    //             blocks: template ,
    //             html: '',
    //             slug: slugify(template.name),
    //             fonts: ''
    //         }
    //     open.value = !open.value
    //     saveProject()
    //     return
    // }
    // if ( settings.tab === 'graphQL' ){
    //     if ( project.data.graphql[cms_context.value] ){
    //         project.data.graphql[cms_context.value] = { template : template }
    //         open.value = !open.value
    //         saveProject()
    //         return
    //     }
    // }
}
</script>