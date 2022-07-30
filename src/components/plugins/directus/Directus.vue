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
    <div v-else class="p-8">
        <div class="bg-purple-500 text-white p-2">Directus Whoobe Data</div>
        <div class="flex w-full border bg-gray-100">
            <div class="flex flex-col w-1/4">
                <template v-for="option in options">
                    <div v-if="!option?.hidden" class="capitalize px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" 
                        @click="directusData(option),tab=option.tab" :class="option.tab===tab?'bg-white':''">
                        {{ option.tab.includes('_') ? option.tab.split('_')[1] : option.tab }}
                    </div>
                </template>
            </div>
            <div v-if="tab" class="bg-white w-full">
                <div>
                    <ul>
                        <li v-for="item in store.directus[current]" class="list-none my-1 hover:bg-gray-200 p-1 cursor-pointer items-center flex">
                            
                            <template v-for="field in fields">
                                
                                <span v-if="typeof item[field] === 'object'" class="ml-2">
                                    <span v-for="a in item[field]" class="text-sm p-1 bg-purple-300 rounded">
                                        {{ a }}
                                    </span>
                                </span>
                                <span v-else>
                                    <i data-icon="arcticons:file" class="iconify mr-1 text-lg"/>{{ item[`${field}`] }}
                                </span>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject , ref } from 'vue'
import { graphQLDirectus , configAll } from '/@/composables/useGraphQL'

const store = inject('useStore')

const tab = ref('')

const options = ref ([
    { tab: 'projects'  },
    { tab: 'templates_categories' , filter: 'templates' , hidden: true },
    { tab: 'templates' , filter: 'templates_categories' },
    { tab: 'languages' },
])

let tree = ref({
    children:null,
    name: '',
    ref: null
})
const fields = ref(null)
const key = ref(null)
const current = ref('')
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
}

</script>