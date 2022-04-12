<template>
    <div class="p-4 md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-12 pr-20 top-0 left-0 mt-8  absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div @click="open=!open" class="mr-2 border-b mb-4"> {{uikit?uikit.name:''}} </div>
        <!-- <span v-if="navigation.currentKit" class="mx-2 border rounded border-purple-700 px-2">
            {{ navigation.currentKit }}
        </span>
        <select v-model="uikit" class="focus:outline-transparent text-sm absolute right-0 bg-bluegray-600 text-gray-300 mr-2 rounded px-1" v-if="kits" @change="fetchUIKIT">
            <option value="">- Free Kits -</option>
            <option v-for="kit in kits" :key="kit" :value="kit">
                {{ kit.name }}
            </option>
        </select>  -->
    
        <div class="relative flex flex-wrap justify-around h-screen pb-20">
            <template v-for="kit in uikit.templates" :key="kit.name" v-if="uikit">
                <div class="flex flex-col text-xs truncate m-2 cursor-pointer" @click="loadTemplate(kit)" title="Edit">
                    <img :src="kit.image" class="w-60 h-60 object-contain border rounded shadow-lg "/>
                    {{ kit.name }}
                </div>
            </template>
        </div>
        <span  class="text-3xl absolute right-0 top-0 cursor-pointer" @click="switchToEditor"><icon icon="mdi:close"></icon></span>
    </div>
    <!-- <FileExplorer context="uikits" :open="open" @close="open=!open" @file="loadFile"/> -->
    <TreeContainer context="uikits" :open="open" @close="open=!open" @file="loadFile"/>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
// import Template from '/@/composables/useSnippets'
// import { useNavigatorStore } from '/@/stores/navigator'
// import { useEditorStore } from '/@/stores/editor'
// import { action } from '/@/composables/useActions'
import { tabberAddTab , loading , switchToEditor } from '/@/composables/useNavigation'
import { openPath } from '/@/composables/useLocalApi'
// const navigation = useNavigatorStore()
// const editor = useEditorStore()

const uikit = ref ( '')
let open = ref ( true )

// const kits = computed ( ()=> {
//     return new Template().kits()
// })

// const fetchUIKIT = async () => {
//     try {
//         if ( !navigation.uikits[uikit.value.name] ){
//             loading()
//             const res = await fetch ( uikit.value.url )
//             let data = await res.json()
//             navigation._uikits ( { name: uikit.value.name , data: data })
//             navigation._currentKit ( uikit.value.name  )
//             loading()
//         } else {
//             navigation.currentKit = uikit.value.name
//         }
//     } catch ( err ){
//         console.log ( 'loading templates' )
//     } 
// }

const loadFile = async ( file ) => {
    uikit.value = file
    //open.value = false
    // console.log ( 'open file => ' , path )
    // const res = await openPath ( path )
    // uikit.value = await res.json() 
}

// const activeKit = computed ( () => {
//     //navigation.currentKit ? uikit.value.name = navigation.currentKit : null 
//     return !navigation.currentKit ? 
//                 navigation.uikits[uikit.value.name] :
//                     navigation.uikits[navigation.currentKit]
//         //navigation.currentKit ?
//         //    navigation.currentKit.data.templates :
//         //    navigation.uikits[uikit.value.name].templates
// })

const loadTemplate = ( template:Object ) =>{
    // editor._document ( template )
    // editor._current ( template.json.blocks[0] )
    // editor._tool ( 'css' , template.json.blocks[0] )
    tabberAddTab ( {
        component: 'Editor',
        label: template.name,
        object: template
    })
    // action ( 'addTab' , {
    //     component: 'Editor',
    //     label: template.name,
    //     object: template
    // })
}
</script>