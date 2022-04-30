<template>
    <div v-if="open && show" :class="isShowed()" class="pt-2 md:w-1/4 lg:w-1/5 text-xs cursor-pointer top-0 mt-8 fixed h-screen z-2xtop bg-bluegray-800 text-gray-300 overflow-y-auto">
        <ul>
            <TreeItem 
                :key="fileTree.folders.name" 
                v-if="fileTree && fileTree?.folders" 
                :open="true" 
                :model="fileTree.folders" 
                @openTemplate="loadFile" 
                @reloadTree="reload"/>
        </ul>
    </div>
    <div class="fixed hidden z-modal cursor-pointer shadow-lg pr-10 text-white p-2 bg-black text-xm ctxMenus" id="archiveCtx" @mouseleave="closeCtx('archiveCtx')">
    <ul>
        <li class="py-1 p-1 hover:text-blue-400" @click="addFolder">Create folder</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="addFile" v-if="props.context!='assets'">Create file</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="uploadFile" v-if="props.context==='assets'">Upload file</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="deleteItem">Delete ...</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="refreshTree">Refresh</li>
    </ul>
    </div>
</template>


<script setup lang="ts">
import { ref , computed, watch } from 'vue'
import { closeCtx , openContextDialog } from '/@/composables/contextMenu';
import { status } from '/@/composables/useNavigation';
import { fileExplorer, localData , openPath , currentFolder , fileTree } from '/@/composables/useLocalApi';
import { store } from '/@/composables/useStore'

const props = defineProps ( {
    context: String,
    open: Boolean,
    onlyFolder: {
        type: Boolean,
        required: false,
        default: false
    },
    right:Boolean
})

const emits = defineEmits ( {
    file:String,
    reloadTree:String
})

let opened = ref ( props.open )

let tree = ref( {} )
let folders = ref ({} )
let children = computed ( () => {
    return !props.onlyFolder
})
let show = ref(true)

let symbol = computed(()=>{
    return show.value ?
            '&larr;' : '&rarr;'
})

let css = !props.right ? 'left-0 ml-10 ' : 'right-0 mr-1/4 ml-10'

const isShowed = () => {
    console.log ( props.right , css )
    return show.value ?
        css : css + 'md:w-0 lg:w-0 -ml-1/5'
}
const loadTree = async ( context ) => {
    tree.value = await fileExplorer ( context )

    folders.value = { name: context , children: tree.value.children.filter ( a => a.type === 'directory' ).sort() }
    folders.value.children.push ( ...tree.value.children.filter( a => a.type === 'file' ).sort() )
   
    fileTree.folders = folders.value
}

const reload = async () => {
    fileTree.folders = null
    console.log ( 'reload tree ...')
    await loadTree( props.context )
}

const loadFile = async ( file ) => {
    console.log ( file )
    let element = document.getElementById(file.hash)
    let filePath = element?.getAttribute('data-path')
    const res = await openPath ( filePath )
    emits ( 'file' , res , filePath , file )
}

const addFile = () => {
    store.status.dialog = 'CreateFile'
    store.status.dialogTitle = 'New File'
    openContextDialog() 
}

const uploadFile = () => {
    store.status.dialog = 'UploadFile'
    store.status.dialogTitle = 'Upload File'
    openContextDialog() 
}



const addFolder = () => {
    store.status.dialog = 'CreateFolder'
    store.status.dialogTitle = 'New Folder'
    openContextDialog() 
}

const deleteItem = () => {
    store.status.dialog = 'Delete'
    store.status.dialogTitle = 'Delete'
    openContextDialog()

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


</script>