<template>
    <div class="w-full flex flex-col p-2">
        Add template to project as 
        <select v-model="target">
            <option value="header">Header</option>
            <option value="homepage">Homepage</option>
            <option value="pages">Page</option>
            <option value="footer">Footer</option>
        </select>
        <div v-if="target==='pages'" class="my-2">
            Slug <input type="text" v-model="slug"/>
            {{ slugify ( editor.document.name ) }}
        </div>
        <div>
            <button @click="section" class="my-2">Add</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { project } from '/@/composables/useProject'
import { useStore } from '/@/composables/useActions'
import { slugify } from '/@/composables/useUtils'

const editor = useStore()

let target = ref('')
let slug = ref( slugify(editor.document.name) )

const section = () => {
    if ( target.value != 'pages' ){
        project.data[target.value] = editor.document
    } else {
        project.data.pages[slug.value] = editor.document
        console.log ( project )
    }
}
</script>