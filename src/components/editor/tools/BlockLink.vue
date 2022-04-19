<template>
    <div class="flex flex-col p-2" v-if="editor.current">
        <label class="flex items-center">Link <span @click="open=!open" title="Link to page/asset" class="absolute right-0 mr-2"><icon icon="mdi:web"/></span></label>
        <input type="text" v-model="editor.current.link"/>
        Anchor
        <input type="text" v-model="editor.current.anchor"/>

        <iframe v-if="editor.current.link && url" :src="url" class="small"/>
        <TreeContainer class="z-modal" context="pages" v-if="open" :open="open" @close="open=!open" @file="setLink"/>
        <!-- <select v-model="editor.current.link" v-if="folders.children">
            <option v-for="file in folders.children" :value="file.path">{{ file.name }} {{ file.path.replace(paths.ssg,'') }}</option>
        </select> -->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '/@/composables/useActions'
import { fileExplorer , fileTree , DATA_PATH , paths , PAGESURL } from '/@/composables/useLocalApi';
import { EDITOR } from '/@/composables/useEditor';

const editor = EDITOR //useStore()
let url = ref('')

const setLink = ( data:String , path:String ) => {
    console.log ( 'data', data , 'path',path )
    editor.current.link = path.replace( paths.ssg , '').replace('.html','')
    open.value = !open.value
    url.value = `${PAGESURL}/${editor.current.link.replace('.html','')}`
}

if ( editor.current.link ){
    url.value = `${PAGESURL}/${editor.current.link.replace('.html','')}`
}

let open = ref ( true )

</script>