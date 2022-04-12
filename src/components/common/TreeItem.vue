
<template>
  <li class="ml-2 px-1 text-base drop-container">
    <div
        :id="model.hash"
        :data-path="model.path"
        :class="current(model)"
        @reloadTree="refreshTree"
        @click="toggle(model)"
        @openTemplate="loadFile"
        @drop="handleDrop($event,model)"
        @dragover.prevent
        @dragenter.prevent
        >
        <span class="flex tree-item items-center hover:bg-purple-800 p-1" @contextmenu="openContextMenu($event)" @dragend="handleDragEnd($event,model)" draggable="true" >
            <icon icon="ant-design:folder-filled" class="mr-2 text-lg" v-if="isFolder && !isOpen"/>
            <icon icon="ant-design:folder-open-filled" class="mr-2 text-lg" v-if="isFolder && isOpen"/>
            <i :data-icon="'bi:filetype-' + model.name.split('.')[model.name.split('.').length-1]" class="iconify mr-1 text-lg" v-if="model.type==='file'"/>
            <span class="tree-item text-vase" :title="model.type==='directory'?'double click to add a folder':''">{{ model.type === 'file' ? model.name.split('.').slice(0,-1).join('.') : model.name  }}</span>
        </span>
      <!-- <span class="absolute right-0" v-if="model.type==='directory'">[+]</span> -->
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <!--
        A component can recursively render itself using its
        "name" option (inferred from filename if using SFC)
      -->
      <TreeItem
        v-for="model in model.children"
        :model="model"
        @openTemplate="loadFile"
        @reloadTree="refreshTree">
      </TreeItem>
      <!-- <li class="p-1 flex add ml-3" @click="addChild">+ <icon icon="carbon:document" class="mr-1 text-lg"></icon></li> -->
    </ul>
  </li>
  <div class="fixed hidden z-modal cursor-pointer shadow-lg pr-10 text-white p-2 bg-black text-xm" id="archiveCtx" @mouseleave="closeCtx('archiveCtx')">
    <ul>
        <li class="py-1 p-1 hover:text-blue-400" @click="addFolder">Create folder</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="addFile">Create file</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="deleteItem">Delete ...</li>
        <li class="py-1 p-1 hover:text-blue-400" @click="refreshTree">Refresh</li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed  } from 'vue'
import { status } from '/@/composables/useNavigation'
import { openContextDialog, openCtx , closeCtx } from '/@/composables/contextMenu'
import { moveFile , fileTree } from '/@/composables/useLocalApi';
import { dragDrop , message } from '/@/composables/useUtils';

const props = defineProps({
  model: Object,
  open: Boolean
})


const emit = defineEmits(['openTemplate','reloadTree'])

const isOpen = ref(props.open?props.open:false)


const isFolder = computed(() => {
    return props.model.children && props.model.children.length || props.model.type === 'directory'
})

function toggle(model,open=true) {
    if ( model.type === 'file' && open ){
        emit('openTemplate',model)
    }
    status.current = model 
    isOpen.value = !isOpen.value
}

function changeType(model) {
    if ( model.type === 'directory' ){
        status.dialog = 'CreateFolder'
        status.dialogTitle = 'New Folder'
        openContextDialog()
    }
}

const addFile = () => {
    status.dialog = 'CreateFile'
    status.dialogTitle = 'New File'
    openContextDialog() 
}


const addFolder = () => {
    status.dialog = 'CreateFolder'
    status.dialogTitle = 'New Folder'
    openContextDialog() 
}

const deleteItem = () => {
    status.dialog = 'Delete'
    status.dialogTitle = 'Delete'
    openContextDialog() 
    let element = document.getElementById ( props.model.hash )
    element.remove()
}

const current = ()=>{
    return status.current ?
            status.current.path === props.model.path ?
                'text-purple-300 bg-black' : '' : ''
}
const loadFile = async ( item ) => {
    emit('openTemplate' , item )
}

const refreshTree = async () => {
    emit('reloadTree')
}

let source = ref({})
let target = ref({})
let fs = ref (fileTree)
const handleDragEnd = async (e,item) => {
    console.log ( 'drag stop ' , item , dragDrop.target )
    source.value = item.path
    dragDrop.source = item
    let targetPath = dragDrop.target.path
    let srcElement = document.getElementById(item.hash)
    srcElement?.setAttribute('data-path' , dragDrop.target.path + '/' + item.name )
    let targetElement = document.getElementById(dragDrop.target.hash).parentElement
    targetElement = targetElement?.querySelector('ul')
    let li = document.createElement('li')
    li.setAttribute('class','ml-2 px-1 text-sm drop-container item')
    li.append ( srcElement )
    targetElement.prepend ( li )
    console.log ( srcElement , targetElement )
    if ( dragDrop.target.type === 'file' ){
        targetPath = dragDrop.target.path.replace(item.name,'')
    }
    const result = await moveFile ( item.path , targetPath , item.name , fs.value )
    message.data = await result.message

    fileTree.lastSource = item
    fileTree.lastTarget = dragDrop.target
    //emit ( 'reloadTree' )
}

const handleDrop = (e:any,item:Object) => {
    console.log ( 'drag drop ' ,  item )
    dragDrop.target = item
}

const openContextMenu = (e:any) => {
    
    e.preventDefault()
    openCtx('archiveCtx', e)
}

</script>