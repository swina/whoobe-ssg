<template>
    <ul>
        <li v-for="item in tree" class="ml-2 my-1 px-1">
            
            <div class="flex items-center px-1 hover:bg-bluegray-900" v-if="item.type==='file' && children && ( parent || root)" :title="item.size" @click="$emit('openTemplate',item)" @contextmenu="openActionMenu($event,item)">
                <icon icon="carbon:document" class="mr-1 text-lg"/> {{ item.name.split('.')[0] || item }} 
            </div>

            <div class="flex px-1 hover:bg-bluegray-900 items-center relative" :class="currentFolder.path===item.path?'bg-black':''" v-if="item.type==='directory'" @click="expandTree=!expandTree,currentFolder.path=item.path" @contextmenu="openActionMenu($event,item)">
                <icon v-if="parent!=item.name" icon="bi:folder-plus" class="mr-2 text-blue-500 text-lg"/>
                <icon v-else icon="bi:folder-minus" class="mr-1 text-blue-500 text-lg"/>
                {{ item.name.split('.')[0] }}
            </div>

            <FileTree v-if="item.type==='directory' && currentFolder.path===item.path" :parent="currentFolder.path" :tree="item.children" @openTemplate="loadFile"/>
        </li>
    </ul>
    <div class="fixed hidden z-modal p-2 bg-black" id="fileExplorerCtx" @mouseleave="closeCtx('fileExplorerCtx')">
        <ul>
            <li class="py-2 p-1 hover:text-blue-400">New folder</li>
            <li class="py-2 p-1 hover:text-blue-400" @click="newTemplate(currentFolder.path)">New Template</li>
            <li class="py-2 p-1 hover:text-blue-400" @click="renameFolder">Rename</li>
            <li class="py-2 p-1 hover:text-blue-400">Delete</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { openPath , saveFile , deleteFile, currentFolder } from '/@/composables/useLocalApi';
import { openCtx , closeCtx , event } from '/@/composables/contextMenu'
import { action , createTemplate  } from '/@/composables/useActions'
import { message } from '/@/composables/useUtils'


import { ref } from 'vue'
const props = defineProps ( {
    tree: Object,
    children: {
        type: Boolean,
        required: false,
        default: true
    },
    parent: {
        type: String
    }
})
const emits = defineEmits ( {
    openTemplate:String,
    reloadTree:String
})

let expandTree = ref ( false )
let ctx = ref ( false )
let root = ref ( true )
let current = ref ({})
let currentType = ref ('')
let currentPath = ref ( '' )
//let currentFolder = ref ('')
const loadFile = async ( item ) => {
    console.log ( item )
    emits('openTemplate' , item )
}

const openActionMenu = ( e:Object ,item:Object) => {
    event.data = e
    if ( !item.path ) return
    currentType.value = item.type
    current.value = item
    currentPath.value = item.path
    currentFolder.path = item.path
    console.log ( item.path )
    openCtx ( 'fileExplorerCtx' , e )
}

const renameFolder = () => {
    event.data.target.innerText = prompt ( 'Rename to ' )
}

const newTemplate = async (path:String) => {
    if ( !path ) return
    let filename = prompt ( 'File name' )
    let filePath = path + '/' + filename + '.json'
    if ( props.tree ){
        props.tree.forEach ( a => {
            if ( a.path === filePath ){
                message.data = 'Duplicate file name. Please set a new file name' 
                return 
            }
        })
    }
    let template = await createTemplate()
    template.name = filename
    template.path = filePath
    console.log ( template )
    //console.log( current.value , template )
    const savedFile = await saveFile ( template )
    emits ( 'reloadTree' )

    // action ( 'addTab' , { label: filename , component: 'Editor' , object: template } )
    // console.log ( await savedFile )
}

const deleteFIle = () => {

}
</script>