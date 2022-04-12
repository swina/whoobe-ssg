<template>
    <ul class="ml-4 text-sm cursor-pointer" :id="rootID">
        <template v-for="(item , index) in items">
            <li class="flex flex-col" 
                v-if="item?.items"
                :id="'item_' + index"  
                @click="item.status=!item.status">
                <div class="flex"><icon icon="mdi:folder-outline" class="text-yellow-400 mr-1 text-lg"></icon>{{ item.label }} {{ item.status }}</div>
                <TreeList  :items="item.items" :status="item.status"/>
            </li>
            <li class="flex items-center" v-else> 
                <icon icon="mdi:file-outline" class="text-yellow-400 mr-1 text-lg"></icon>{{ item.label }} 
            </li>
           
        </template>
    </ul>
</template>

<script setup lang="ts">
import  { computed , ref , useAttrs } from 'vue'
import { randomID } from '/@/composables/useActions'
const attrs = useAttrs()
const rootID = ref ( randomID() )
const node = ref('')
const keepOpen = ref ( false )
const hideMe = (index) => {
    return ''
}

const items = ref( !attrs.tree ? [
        { label: 'Root' , status: true , root: true, 
            items: [ 
                { label: 'Folder A' , status: true ,
                    items : [
                        { label: 'File 1' },
                        { label: 'File 2' }, 
                    ]
                },
                { label: 'Folder B' , status: true ,
                    items : [
                        { label: 'File 3' },
                        { label: 'File 4' }, 
                    ]
                },
            ]
        }
    ] : attrs.tree
)


const hideTree = (item)=>{
    let ul = document.querySelector('#' + item)
    console.log ( ul )
    // ul.classList.contains('hidden') ?
    //     ul.classList.remove ( 'hidden' ) :
    //     ul.classList.add ( 'hidden' ) 
}


</script>