<template>
        <div class="flex flex-wrap justify-start h-1/2 bg-white overflow-y">
            <template v-for="item in tree.children" v-if="tree?.children">
                <div class="w-30 h-30 border m-2 text-xs my-4 cursor-pointer" @click="setImage(PAGESURL+'/assets/img/' + item.relativePath)">
                    <img class="w-30 h-30 object-cover" :src="PAGESURL+'/assets/img/' + item.relativePath"/>
                    <div class="truncate">{{item.name}}</div>
                </div>
            </template>
        </div>
        <div class="flex flex-col items-center justify-center absolute bottom-0 w-full bg-gray-200">
            <!-- <button @click="uploadFile=!uploadFile">Upload</button> -->
            <UploadFile context="images" :close="false"/>
        </div>
        
</template>

<script setup lang="ts">
import { ref , computed , watch} from 'vue'
import { store } from '/@/composables/useStore'
import { PAGESURL , paths } from '/@/composables/useLocalApi';
import { fileExplorer, localData , openPath , currentFolder , fileTree } from '/@/composables/useLocalApi';
import { EDITOR } from '/@/composables/useEditor';

const editor = EDITOR

const props = defineProps ( {
    context: String
})

let tree = ref( {} )
let folders = ref ({} )
let uploadFile = ref ( false )
let children = computed ( () => {
    return !props.onlyFolder
})
let show = ref(true)

const loadTree = async ( context ) => {
    store.status.loading = true
    tree.value = await fileExplorer ( context )

    folders.value = { name: context , children: tree.value.children.filter ( a => a.type === 'directory' ).sort() }
    folders.value.children.push ( ...tree.value.children.filter( a => a.type === 'file' ).sort() )
   
    fileTree.folders = folders.value
    store.status.loading = false
}

const reload = async () => {
    fileTree.folders = null
    console.log ( 'reload tree ...')
    await loadTree( props.context )
}

if ( props.context ){
    store.status.context = props.context
    loadTree ( props.context )
}

watch( () => fileTree.reload, (refresh) => {
    refresh ? reload() : null
    fileTree.reload = false
  }
)

const setImage = async ( img ) => {
    editor.current.image = { url: img }
    store.status.dialog = null
}
</script>