<template>
<div class="p-2 flex flex-col">
    GraphQL endpoints 
    <select v-model="client" @change="setClient">
        <option value=""></option>
        <option v-for="cl in graphqlClients" :value="cl">{{cl}}</option>
    </select>
    Model
    <select v-model="context" @change="setModel">
        <option value=""></option>
        <option v-for="model in Object.keys(CMS_SCHEMA.schema)" :value="model">{{model}}</option>
    </select>
    <div class="flex flex-col my-2" v-if="context">
        <div class="flex items-center">Loop Item <input class="ml-2 border" type="checkbox" v-model="isLoop" @change="isLoopData"></div>
        <div class="grid grid-cols-2 my-2" v-if="editor.current">
            <div>
                Limit <input type="number" v-model="editor.current.data.limit" min="0" class="ml-2 w-12">
            </div>
            <div class="flex items-center">
                Offset <input type="number" v-model="editor.current.data.offset" min="0" class="ml-2 w-12">
            </div>
        </div>
    </div>
    

    <div v-if="(context)" class="m-2 flex flex-col">
        Select field content
        <div class="flex flex-wrap">
            <template v-for="field in CMS_SCHEMA.schema[context].query.fields">
                <div @click="setField(field),currentField=field" class="mr-2 my-1">
                    <chip :class="field===editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'">{{field}}</chip>
                </div>
            </template>
        </div>
        <div class="flex flex-wrap">
            <template v-if="gql.schema[context].query?.fields" v-for="field in gql.schema[context].query.fields">
                <div @click="setField(field),currentField=field" class="mr-2 my-1">
                    <chip :class="field===editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'">{{field}}</chip>
                </div>
            </template>
        </div>
    </div>

    <div v-if="!isLoop && context">
        <button class="dark" @click="editor.current.data.provider=context">Set Model</button>
        <button class="dark" @click="setGraphqlTemplate()">Set Template</button>
        <button class="dark" @click="generateCMSPages">Generate all pages</button>
    </div>
    <div class="hidden preview-sm w-full" style="max-width:100%;width:100%;">
        <Preview v-if="!isLoop && context" class="hidden preview-sm"/>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { graphqlClients , graphqlConfig , setGraphqlClient, CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery  } from "/@/composables/useGraphCMS"
import { EDITOR , usedFonts , returnNode } from '/@/composables/useEditor';
import { saveStaticPage , CONFIG_FILE, saveFile, buildClear } from '/@/composables/useLocalApi'
import { project } from '/@/composables/useProject';
import { ContentMatch } from 'prosemirror-model';
import { message } from '/@/composables/useUtils';
import { store } from '/@/composables/useStore'

console.log ( graphqlClients )

const cms = CMS 
let context = ref ( '' )
const editor = EDITOR
let param = ref ('')
let name = ref('')
let response = ref(null)
let filter = ref('')
let currentField = ref('')
let isLoop = ref(false)
let limit = ref(8)
let offset = ref(0)
let client = ref('')

let gql = ref(null)

if ( editor.current.data?.provider ){
    console.log ( 'has data provider' )
    context.value = editor.current.data.provider
    if ( editor.current.data?.isLoop ) {
        isLoop.value = editor.current.data.isLoop
    }
}

if ( editor.current.data?.field ){
    currentField.value = editor.current.data.field
}

let container = returnNode ( editor.document.json , 'provider' , context.value || Object.keys(CMS_SCHEMA.schema)[0] , null )
if ( container && container.length ){
    console.log ( container )
    editor.current = container.parent.blocks
    context.value = editor.current.data.provider
}

const setClient = async () => {
    gql.value =  graphqlConfig[client.value]
}

const setModel = async () => {
    //console.log ( CMS_SCHEMA.schema[context.value].query.list )
    // if ( context.value ){
    //     param.value = CMS_SCHEMA.schema[context.value].query.params
    //     name.value = CMS_SCHEMA.schema[context.value].query.name
    // }
    //let container = await returnNode ( editor.document.json , 'provider' , context.value , null )
    // if ( !container ) {
    //     editor.current = null
    //     store.message.console = 'No container with data for ' + context.value
    //     return
    // }
    // editor.current = container.parent.blocks
    if ( !context.value ) return 
    console.log( await getCMSQuery ( context.value ) )
    store.message.console = context.value
    //context.value = editor.current.data.provider
    editor.current.data.provider = context.value
    editor.current.data.limit = limit.value
    editor.current.data.offset = offset.value
    let container = await returnNode ( editor.document.json , 'provider' , context.value , null )
    console.log ( container )
    //await getCMSQuery ( context.value )

}
const queryCMS = async ( )=>{
    console.log( filter.value )
    const res = await getCMSSingleQuery(context.value,filter.value)
    console.log ( await res[context.value][0] )
    response.value = await res[context.value][0]
    if ( currentField.value ){
        setField(currentField.value)
    }
    //const content = await res.pages[0]
    //editor.current.content = CMS.page?.content?.html
}

const setField = async ( field:String ) => {
    if ( editor.current.data['field'] === field  ){
        store.message.console = 'remove field'
        delete editor.current.data.field
        return
    }
    editor.current.data['field'] = field
    response.value = cms[context.value][0]
    if ( response.value[field]?.html ){
        editor.current.content = response.value[field].html ? response.value[field].html : ''
    } else {
        if ( response.value[field]?.url ){
            editor.current.image.url = response.value[field].url
        } else {
            if ( response.value[field] ){
                editor.current.content = response.value[field]
            }
        }
    }
}

const isLoopData = () => {
    editor.current.data['isLoop'] = isLoop.value
    if ( isLoop.value ){
        editor.current.data['provider'] = context.value
    } else {
        editor.current.data['provider'] = ''
    }
}

const setBlockData = async (qry) => {
    editor.current.blocks.forEach ( block => {
        if ( block.data?.field ){
            if ( qry[block.data.field]?.html ){
                block.content = qry[block.data.field].html ? qry[block.data.field].html : ''
            } else {
                if ( block.tag === 'button' ){
                    if  ( block.data?.field ) {
                        block.link = qry[block.data.field]
                    }
                } else {
                    if ( qry[block.data.field]?.url ){
                        block.image.url = qry[block.data.field].url
                    } else {
                        if ( qry[block.data.field] ){
                            block.content = qry[block.data.field]
                        }
                    }
                }
            }
        }
    })
}

const generateCMSPages = async () => {
    if ( editor.current?.json ){
        let container = returnNode ( editor.current.json.blocks , 'provider' , context.value )
        editor.current = container
    }
    let fonts = await usedFonts ( editor.document )
    store.message.console = 'GraphQL SSG\nBy default pages will be generated in a relative folder\nRelative folder will be cleared\n\n'
    store.message.console += 'Pages Limit: ' + editor.current.data.limit + '\n'
    store.message.console += 'Pages Offset: ' + editor.current.data.offset + '\n\n'
    //await buildClear(context.value)
    if ( !editor.current.data.isLoop ){
        let dataset = CMS[context.value].map ( (record,index) => {
            console.log ( index , editor.current.data.limit - 1)
            if( index >= editor.current.data.offset && index < editor.current.data.limit  ){
                return record
            }
        }).filter ( a => a )
        dataset.forEach ( async (content)  => {
            let qry = await getCMSSingleQuery(context.value,content.slug)
            qry = qry[context.value][0]
            
            setTimeout ( async() => { 
                await setBlockData ( qry )
                let page = {
                    html: await documentHTML(),
                    slug: qry.slug,
                    document: editor.document,
                    fonts: fonts,
                    layout: false,
                    seo: {
                        title: qry[CMS_SCHEMA.schema[context.value].query.seo.title],
                        description:  qry[CMS_SCHEMA.schema[context.value].query.seo.description],
                    },
                    folder: context.value
                }
                console.log ( await page.html )
                let saved = await saveStaticPage ( await page )
                store.message.console += '- ' + context.value + '/' + qry.slug + '.html\n'
            },1000)

        })
    }
}

const setGraphqlTemplate = async () => {
    if ( !project.data?.graphql ) {
        project.data['graphql'] = {}
        project.data.graphql[context.value] = { template: editor.current  }
    } else {
        project.data.graphql[context.value] = { template: editor.current }
    }

    console.log( project.data.graphql )
    project.path = CONFIG_FILE
    const res = await saveFile(project)
    store.message.data = await res.message
}

const documentHTML = async () => {
    let doc = document.querySelector ('#templatePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    editor.document.json['html'] = html
    return html
}


</script>