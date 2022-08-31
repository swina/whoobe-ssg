<template>
    <div v-if="!store.directus.enabled" class="p-8">
        <div class="bg-red-500 text-white p-2">Directus CMS is disabled</div>
        <p>
            Please read the documentation to enable Directus as data engine for Whoobe.
            <br/>
            <br/>
            <i>Directus Data Engine is not intended for dynamic content (CMS), but only as data for templates and configuration</i>
        </p>
    </div>
    <div v-else class="p-8 h-screen overflow-y-auto">
        <div class="bg-purple-500 text-white p-2">Directus Whoobe Data</div>
        <div class="flex w-full border bg-gray-100">
            <div class="flex flex-col w-1/5">
                <template v-for="option in options">
                    <div v-if="!option?.hidden" class="capitalize px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" 
                        @click="directusData(option),tab=option.tab" :class="option.tab===tab?'bg-white':''">
                        {{ option.tab.includes('_') ? option.tab.split('_')[1] : option.tab }}
                    </div>
                </template>
            </div>
            <div v-if="tab" class="bg-white w-4/5 flex min-h-screen h-screen">
                <div class="w-1/4">
                    <ul>
                        <li v-for="item in store.directus[current]" class="list-none p-1 ml-0 w-full cursor-pointer items-center flex">
                            
                            <template v-for="field in fields">
                                
                                <div v-if="typeof item[field] === 'object'" class="ml-2">
                                    <span v-for="a in item[field]" class="text-sm p-1 bg-purple-300 rounded">
                                        {{ a }}
                                    </span>
                                </div>
                                <div v-else class="w-full">
                                    <div @click="getItems(item)" class="hover:bg-gray-200 hover:text-black p-1 flex items-center w-full" :class="category && category===item.name?'bg-gray-500 text-white':'text-black'">
                                        {{ item[`${field}`] }}
                                    </div>
                                    <div v-if="templates && category === item.name">
                                        <div class="ml-6 text-sm my-1 flex flex-col hover:bg-gray-300 px-2" v-for="block in templates">
                                            <span @click="template = block">{{ block.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </li>
                    </ul>
                </div>
                <div v-if="template && tab==='templates'" class="w-2/3 flex flex-col overflow-y-auto">
                    <!-- <template v-for="block in templates"> -->
                        <div class="flex flex-col w-full text-sm" @click="editTemplate(template)">
                            <chip>{{ template.name }}</chip>
                            <div class="preview-md" style="transform-origin:0 0">
                                <BlockPreview :block="template.blocks.json.blocks" :level="2"/>
                            </div>
                        </div>
                            <!-- {{ block.blocks.json.blocks }} -->
                    <!-- </template> -->

                </div>
                <div class="w-2/3 flex flex-wrap  overflow-y-auto bg-gray-100" v-if="!template && templates.length && tab==='templates'">
                    <template v-for="block in templates" :key="block.id">
                        <div class="flex flex-col w-1/2 text-sm p-3 overflow-y-auto overflow-x-hidden">
                            <chip class="bg-gray-300 text-black w-1/2">{{ block.name }}</chip>
                            <div class="preview-sm p-2">
                                <BlockPreview :block="block.blocks.json.blocks" :level="2"/>
                            </div>
                        </div>
                    </template>
                    

                </div>
                <div v-if="current === 'templates_categories' && !templates.length && tab==='templates'">
                    No templates found.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject , ref } from 'vue'
import { graphQLDirectus , graphQLData , configAll } from '/@/composables/useGraphQL'
import { tabberAddTab } from '/@/composables/useNavigation'
const store = inject('useStore')

const tab = ref('')

const options = ref ([
    { tab: 'projects'  , icon: 'arcticons:file'},
    // { tab: 'templates_categories' , filter: 'templates' , hidden: false , icon: 'arcticons:folder' },
    { tab: 'templates' , filter: 'templates_categories' , icon: 'arcticons:folder' },
    { tab: 'languages' , icon: 'arcticons:file' },
])

let tree = ref({
    children:null,
    name: '',
    ref: null
})
const fields = ref(null)
const key = ref(null)
const current = ref('')
const fileTree = ref({})

const directusData = async ( collection:Object ) => {
    let coll = collection.tab
    if ( collection?.filter ){
        coll = collection.filter

    }
    const data = await graphQLDirectus ( coll )
    fields.value = configAll.directus.schema[coll].query.fields    
    key.value = configAll.directus.schema[coll].query.key
    current.value = coll
    tree.value.name = coll
    tree.value.children = store.directus[coll]
    tree.value.ref = collection
    if ( current.value === 'templates' ){
        
        let categories = store.directus.templates.map ( template => { template.category.name } )
        categories = [ ... new Set(categories) ].sort()
        console.log ( categories )
    }
}
let category = ref('')
let templates = ref([])
let template = ref(null)

const getItems = async ( item: object ) => {
    template.value = null
    if ( current.value === 'templates_categories' ){
        let config = {
            client: 'directus', 
            model: 'templates',
            category: item.name
        }
        category.value = item.name
        templates.value = await graphQLData ( config )
        console.log ( await templates.value )
    }
}

const editTemplate = (template: object) => {
     tabberAddTab ( {
        component: 'Editor',
        label: template.name,
        object: template.blocks
    })
}

const categories = async () => {
    const config = {
        client: 'directus', 
        model: 'template_categories'
    }
    return await graphQLDirectus ( { filter: 'template_categories' } )
}


console.log ( categories() )

</script>