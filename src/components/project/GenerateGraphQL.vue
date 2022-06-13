<template>
<div id="graphQLPreview">
    <!-- <Preview class="preview-sm"/> -->
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { store } from '/@/composables/useStore'
import { usedFonts } from '/@/composables/useEditor'
import { CMS_SCHEMA , CMS , getCMSSingleQuery } from '/@/composables/useGraphCMS'
import { saveStaticPage } from '/@/composables/useLocalApi'
import jp from 'jsonpath'
const editor = store.editor

const props = defineProps ( {
    context: String
})

let context = ref ( props.context )

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
        let saved = await saveStaticPage ( await page )
        console.log ( await saved )
        store.message.console += '- ' + qry.slug + ' created\n'

    })
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

const documentHTML = async () => {
    let doc = document.querySelector ('#graphQLPreview')
    let html = doc.innerHTML.replaceAll('<!--v-if-->','')
    editor.document.json['html'] = html
    return html
}

</script>