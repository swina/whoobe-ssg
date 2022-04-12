<template>
    <div class="p-2 flex flex-col text-sm">
        <label class="text-xs">Path: {{ status.current.path }}</label>
        <input type="text" class="mt-2" v-model="file" @change="setFile" placeholder="new file"/>
        <label class="text-xs text-gray-300">name</label>
        <button class="hover:bg-black w-20 mx-auto mt-4" v-if="enabled" @click="createFile">Save</button>
    </div>
</template>

<script setup lang="ts">
import { ref ,computed } from 'vue'
import { status } from '/@/composables/useNavigation'
import { openPath , saveFile , deleteFile, currentFolder } from '/@/composables/useLocalApi';
import { action , createTemplate  } from '/@/composables/useActions'

let file = ref('')

const setFolder = (e:Object) => {
    console.log ( file.value , e )
}

const enabled = computed(()=>{
    return file.value ? true : false
})

const createFile = ()=>{
    if ( status.context === 'templates' ){
        newTemplate ( status.current.path )
    }
    console.log ( file.value )
}

const newTemplate = async (path:String) => {
    if ( !path ) return
    let filename = file.value //prompt ( 'File name' )
    let filePath = path + '/' + filename + '.json'
    if ( status.current?.children ){
        status.current.children.forEach ( a => {
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
    status.dialog = null
    // action ( 'addTab' , { label: filename , component: 'Editor' , object: template } )
    // console.log ( await savedFile )
}
</script>
