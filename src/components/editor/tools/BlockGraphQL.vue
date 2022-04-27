<template>
<div class="p-2 flex flex-col">
    Model
    <select v-model="context" @change="setModel">
        <option value=""></option>
        <option v-for="model in Object.keys(CMS_SCHEMA.schema)" :value="model">{{model}}</option>
    </select>
    <div class="flex items-center my-2">Loop Item <input type="checkbox" v-model="isLoop" @change="isLoopData"></div>
    <div v-if="context" class="my-2">
        <label>Data</label>
        <select v-if="context" @change="queryCMS" v-model="filter">
            <option v-for="item in cms[context]" :value="item[param]">{{item[name]}}</option>
        </select>
    </div>

    <div v-if="context || response" class="m-2 flex flex-col">
        Select field content
        <div class="flex flex-wrap">
        <template v-for="field in CMS_SCHEMA.schema[context].query.fields" v-if="context || response">
        <div @click="setField(field),currentField=field" class="mr-2 my-1">
            <chip :class="field===editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'">{{field}}</chip>
        </div>
        </template>
        </div>
    </div>

    <div v-if="!isLoop && context">
        <button @click="setGraphqlTemplate()">Set Template</button>
        <button @click="generateCMSPages">Generate all pages</button>
    </div>
    <div class="preview-sm w-full" style="max-width:100%;width:100%;">
        <Preview v-if="!isLoop && context" class="preview-sm"/>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery  } from "/@/composables/useGraphCMS"
import { EDITOR , usedFonts } from '/@/composables/useEditor';
import { saveStaticPage , CONFIG_FILE, saveFile } from '/@/composables/useLocalApi'
import { project } from '/@/composables/useProject';
import { ContentMatch } from 'prosemirror-model';
import { message } from '/@/composables/useUtils';

const cms = CMS 
let context = ref ( '' )
const editor = EDITOR
let param = ref ('')
let name = ref('')
let response = ref(null)
let filter = ref('')
let currentField = ref('')
let isLoop = ref(false)

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

const setModel = async () => {
    //console.log ( CMS_SCHEMA.schema[context.value].query.list )
    param.value = CMS_SCHEMA.schema[context.value].query.params
    name.value = CMS_SCHEMA.schema[context.value].query.name
    editor.current.data.provider = context.value
    await getCMSQuery ( context.value )

}
const queryCMS = async ( )=>{
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
    editor.current.data['field'] = field
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
    let fonts = await usedFonts ( editor.document )
    CMS[context.value].forEach ( async (content)  => {
        let qry = await getCMSSingleQuery(context.value,content.slug)
        qry = qry[context.value][0]
        console.log ( qry )
        const setFieldsData = await setBlockData ( qry )
        let page = {
            html: await documentHTML(),
            slug: qry.slug,
            document: editor.document,
            fonts: fonts,
            layout: false,
            seo: {
                title: qry[CMS_SCHEMA.schema[context.value].query.seo.title],
                description:  qry[CMS_SCHEMA.schema[context.value].query.seo.description],
            } 
        }
        console.log ( await page.html )
        let saved = await saveStaticPage ( await page )
        console.log ( await saved )

    })
}

const setGraphqlTemplate = async () => {
    project.data.graphql[context.value].template = editor.current
    project.path = CONFIG_FILE
    const res = await saveFile(project)
    message.data = await res.message
}

const documentHTML = async () => {
    let doc = document.querySelector ('#templatePreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    editor.document.json['html'] = html
    return html
}


</script>