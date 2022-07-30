<template>
    <div class="p-2 flex flex-col" v-if="store.editor.current" :key="store.editor.current.id" :ql="isGraphQL">
        GraphQL endpoints 
        <select v-model="store.editor.current.data.client" @change="config.model=''">
            <option value=""></option>
            <option v-for="cl in graphqlClients" :value="cl">{{cl}}</option>
        </select>
        Model
        <select v-model="store.editor.current.data.model" @change="setQLModel">
            <option value=""></option>
            <option v-if="store.editor.current.data.client" v-for="model in Object.keys(graphqlConfig[store.editor.current.data.client].schema)" :value="model">{{model}}</option>
        </select>
 
        <div v-if="store.editor.current.data?.client && store.editor.current.data?.model && !store.editor.current.data?.child" class="my-2">
            <div class="flex items-center my-2">Loop Item <input class="ml-2 border" type="checkbox" v-model="store.editor.current.data.isLoop"></div>
            
                <div class="grid grid-cols-2 mt-4">
                    <div>
                        Limit <input type="number" v-model="config.limit" min="0" class="ml-2 w-12">
                    </div>
                    <div class="flex items-center">
                        Offset <input type="number" v-model="config.offset" min="0" class="ml-2 w-12">
                    </div>
                </div>
                
            <div v-if="store.editor.current.data?.model && store.graphql?.data[store.editor.current.id]" class="my-2">
                Records found: {{ store.graphql.data[store.editor.current.id][store.editor.current.data.model].length }} 
                <div>
                    Preview page
                    <select v-model="config.index" @change="updateFields" class="text-sm">
                        <option :key="index" v-for="(record,index) in store.graphql.data[store.editor.current.id][store.editor.current.data.model]" :value="index" class="text-xs">{{record.slug}}</option>

                    </select>
                </div>
                <button @click="setQLModel">Load Data</button>
            </div>
        </div>

        <div v-if="store.editor.current.parent && store.editor.current.data?.client && store.editor.current.data?.model" class="my-2" title="to set a field select a block as target content">
            Fields 
            <div class="flex flex-wrap">
                    <template v-if="store.graphql.config.schema[store.editor.current.data.model].query?.translations" v-for="field in store.graphql.config.schema[store.editor.current.data.model].query.translationsFields">
                        <chip class="m-1" :class="store.editor.current.parent && field===store.editor.current.data?.field ? 'bg-purple-700':'bg-blue-500'" @click="setQLFieldTranslation(field)">{{field}}-{{store.status.locale.split('-')[0]}}</chip>
                    </template>
                    <template v-for="field in store.graphql.config.schema[store.editor.current.data.model].query.fields">
                        <chip class="m-1" :class="store.editor.current.parent && field===store.editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'" @click="setQLField(field)">{{field}}</chip>
                    </template>
                    
            </div>
            Legend
            <div class="flex">
                <chip class="m-1 bg-blue-500" title="Assign field for the current locale">Locale</chip>
                <chip class="m-1 bg-gray-700" title="Assign field">Normal</chip>
                <chip class="m-1 bg-purple-700" title="Current field">Assigned</chip>
            </div>
            <div class="flex items-center">
            Locale <chip class="m-1 bg-yellow-300 text-black">{{ store.status.locale }}</chip>
            </div>
        </div>
        <div class="absolute flex flex-col items-center justify-center w-full bottom-0 mb-20 " v-if="store.editor.current.data.client && store.editor.current.data.model && !store.editor.current.data?.child && store.editor.current.blocks.length">
            <input type="text" placeholder="save in folder" v-model="config.folder" v-if="!store.editor.current.data?.isLoop"/>
            <input type="text" placeholder="save as ..." v-model="graphQLSlug" v-else/>
            <button class="bg-purple-600 mx-auto" @click="generateGraphQLPages" v-if="!readyToRender">Generate all pages</button>
            <div v-if="readyToRender" class="flex flex-col">
                <button class="bg-green-600 mx-auto my-2" @click="saveAllPages">Create pages</button>
                <button class="bg-red-600 mx-auto my-2" @click="resetRender">Undo</button>
            </div>
        </div>
        <div v-if="store.graphql?.data[store.editor.current.id]" class="preview-sm w-full" style="max-width:100%;width:100%;">
            <Preview :save="true" :slug="graphQLSlug"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject , ref , computed } from 'vue'
import { saveStaticPage , graphQLRequest } from '/@/composables/useLocalApi'
import { graphqlClients, graphqlConfig , graphQLQuery , graphQLCurrent } from '/@/composables/useGraphCMS';
import { graphQLData , isGraphQLContainer } from '/@/composables/useGraphQL';

const store = inject('useStore')
const current = store.editor.current

let data = ref(null)
let readyToRender = computed(
    () => {
        if ( store.graphql?.data[store.editor.current.id] && store.editor.current.data?.model ){
            return n.value >= store.graphql.data[store.editor.current.id][store.editor.current.data.model].length
        } 
        return false
    }
)

const resetRender = () => {
    store.graphql.render = []
}

let n = ref(0)
let graphQLContent = ref({})
let graphQLSlug = ref('')
const config = ref ( {
    client: null,
    model: '',
    schema: null,
    isLoop: false,
    limit: 8,
    offset:0, 
    index: 0, 
    folder: ''
})

const isGraphQL = computed ( () => {
    if ( graphQLCurrent[current.parent] ){
        console.log ( 'is graphql' )
        current.data.client = graphQLCurrent[current.parent].client
        current.data.model = graphQLCurrent[current.parent].model
        current.data.schema = graphQLCurrent[current.parent].schema
        current.data.child = true
        
        return true
    }
    return false
})

const records = computed( ()=>{
    try {
        return store.graphql.data[store.editor.current.id][store.editor.current.data.model].length
    } catch ( err ) {
        console.log ( err )
        return 0
    }
})

let cc = ref(graphQLCurrent)

if ( graphQLCurrent ){
    if ( graphQLCurrent[current.parent] ){
        console.log ( 'has graphql parent')
        //cc.value = graphQLCurrent[store.editor.current.parent]
    }
}


store.editor.current.data['slug'] = 'my-first-page'
console.log ( graphQLData ( store.editor.current.data ) )
console.log ( 'Is graphQL Container =>' , isGraphQLContainer ( store.editor.current.data , store.editor.current.parent) )



const setQLModel = async () => {
    store.status.loading = true
    store.editor.current.data.schema = graphqlConfig[store.editor.current.data.client].schema[store.editor.current.data.model]
    graphQLCurrent[current.id] = store.editor.current.data
    store.graphql.data[store.editor.current.id] = {}
    store.graphql.data[store.editor.current.id][store.editor.current.data.model] = []
    try { 

        if ( store.editor.current.data.model ){
            data.value = await graphQLData(store.editor.current.data) //graphQLQuery ( store.editor.current.data )
            store.graphql?.data ? null : store.graphql = { data: null }
            store.graphql.data[store.editor.current.id][store.editor.current.data.model] = await data.value
        }    
        store.status.loading = false
    } catch (err ){
        store.status.loading = false
        console.log ( err)
    }
    

    //delete store.editor.current.data.general
}

const setQLField = async (field:String) => {
    if ( store.editor.current.data?.client && store.editor.current.parent ) {
            if ( store.editor.current.data?.field && store.editor.current.data.field === field ){
                delete current.data.field
                store.editor.current.content = ''
            } else {

                store.editor.current.data['field'] = field
                let content = await field.split('.').reduce((o,i)=> o[i], store.graphql.data[store.editor.current.parent][store.editor.current.data.model][config.value.index])
                let prefix = ''
                console.log ( 'field content for ' , field , content )
                // if ( store.editor.current.data.client === 'directus' ){
                //     prefix = graphqlConfig[store.editor.current.data.client].url
                // }
                console.log( prefix )
                if ( store.editor.current.element === 'img' ){
                    store.editor.current.image.url = prefix + content//store.graphql.data[current.parent][current.data.model][0][field].url
                } else {
                    store.editor.current.content = content//store.graphql.data[current.parent][current.data.model][0][field]
                }
            }
        
    }

}

const setQLFieldTranslation = (field:String) => {
    if ( store.editor.current.data?.client && store.editor.current.parent ) {
        if ( store.editor.current.data?.field && store.editor.current.data.field === field ){
            delete store.editor.current.data.field
            store.editor.current.content = ''
        } else {
            store.editor.current.data['field'] = field
            let content = field.split('.').reduce((o,i)=> o[i], store.graphql.data[store.editor.current.parent][store.editor.current.data.model][config.value.index].translations[0])
            let prefix = ''
            //     if ( store.editor.current.data.client === 'directus' ){
            //         prefix = graphqlConfig[store.editor.current.data.client].url + 'assets/'
            //     }
            //     console.log( prefix )
            if ( store.editor.current.element === 'img' ){
                content = prefix + content
                if ( !content?.url ){
                    content = { url: content }                    
                } 
                store.editor.current.image = content
            } else {
                store.editor.current.content = content
            }
        }
        store.editor.tool = 'graphql'            
        

    }
}

const updateFields = async() => {
    const page = store.graphql.data[store.editor.current.id][store.editor.current.data.model][config.value.index]
    populateBlock ( page )
   
}
const generateGraphQLPages = async () => {
    if ( store.graphql?.data[current.id] && current.data?.model && !current.data?.isLoop ){
        store.message.console = 'Generate pages ...\n'
        store.message.console += 'Endpoint : ' + current.data.client + '\nModel : ' + current.data.model + '\n'
        store.message.console += 'Limit : ' + config.value.limit || 50 
        store.message.console += '\nOffset : ' + config.value.offset || 0 + '\n'
        //await setQLModel()
        store.message.console += '\nFound ' + store.graphql.data[current.id][current.data.model].length + ' pages\n'
        store.graphql.render = [];
        n.value = 0
        
        store.graphql.data[current.id][current.data.model].forEach ( (p,i) => {
            
            window.setTimeout ( async () => {
                graphQLSlug.value = p.slug 
                await populateBlock ( p )
                
                let seo = {
                    title: graphqlConfig[current.data.client].schema[current.data.model].query.seo.title,
                    description: graphqlConfig[current.data.client].schema[current.data.model].query.seo.description,
                    keywords: graphqlConfig[current.data.client].schema[current.data.model].query.seo?.keywords || '',
                }
                let page = {
                    html: await documentHTML(),
                    slug: p.slug,
                    folder: config.value.folder,
                    document: store.editor.document,
                    fonts: [],
                    layout: null,
                    seo: {
                        title: p[seo.title],
                        description : p[seo.description],
                        keyword: ''// p[seo.keywords].join(',') || ''
                    }
                }
                store.graphql.render.push ( page )
                store.message.console += '\nRendered page ' + page.slug + ' ' + (i+1) + ' of ' + store.graphql.data[current.id][current.data.model].length
                n.value += 1
            },2000) 
        })
    }
}

const currentGQL = async ()=> {
    return graphqlConfig[current.data.client].schema[current.data.model].query
}


const saveAllPages = async () => {
    if ( n.value >= store.graphql.data[current.id][current.data.model].length )
        store.graphql.render.forEach ( async (page) => {
            await saveStaticPage ( page )
            store.message.console += '\n' + page.slug + '.html created'
        })
}

const populateBlock = async ( content:Object ) => {
    let prefix = ''
    if ( store.editor.current.data.client === 'directus' ){
        prefix = graphqlConfig[store.editor.current.data.client].url
    }
    console.log ( prefix )
    store.editor.current.blocks.forEach ( async ( block ) => {
            block.data?.field && block.data?.model && block.data?.client ?
                block.data.client === current.data.client && block.data.model === current.data.model ?
                    block.element === 'img' ?
                        block.image = prefix + block.data.field.split('.').reduce((o,i)=> o[i], content) :
                            block.content = block.data.field.split('.').reduce((o,i)=> o[i], content) : null : null
        })
    return 
}

const documentHTML = async (i:Number) => {
    let doc = window.document.querySelector ('#templatePreview')
    let html = await doc.innerHTML.replaceAll('<!--v-if-->','')
    //store.editor.document.json['html'] = html
    return html
    //let saved = await saveHTMLPage ( html , store.graphql.data[current.id][current.data.model][i].slug , i)
    
}

const saveHTMLPage = async () => {
    let doc = window.document.querySelector ('#templatePreview')
    let html = await doc.innerHTML.replaceAll('<!--v-if-->','')
    let content = graphQLContent.value
    let slug = graphQLSlug.value
    let seo = {
        title: graphqlConfig[current.data.client].schema[current.data.model].query.seo.title,
        description: graphqlConfig[current.data.client].schema[current.data.model].query.seo.description,
        keywords: graphqlConfig[current.data.client].schema[current.data.model].query.seo.keywords,
    }
    let page = {
        html: html,
        slug: slug,
        document: store.editor.document,
        fonts: [],
        layout: null,
        seo: {
            title: content[seo.title],
            description : content[seo.description],
            keyword: content[seo.keywords].join(',')
        }
    }
    return await saveStaticPage ( page )
}

const initGraphQL = async() => {
    let res = await isGraphQLContainer ( store.editor.current.data , store.editor.current.parent )
    if ( await res ){
        setQLModel()
    }
}

//if ( store.editor.current.data?.client && store.editor.current?.data.model && !store.editor.current.parent ){

//    setQLModel()
//}

initGraphQL()

</script>