<template>
    
    <div class="p-4" v-if="store.project?.data">
        <div class="bg-bluegray-500 p-1 text-white">
            Project: {{ store.project.data.name }} - <span class="capitalize">{{ tab }}</span>
        </div>    
        <div class="flex w-full border bg-gray-100">
            <div class="w-1/4">
                <template v-for="option in options">
                    <div class="capitalize px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="settings.tab=option.tab" :class="option.tab===settings.tab?'bg-white':''">
                        {{ option.tab }}
                        
                    </div>
                </template>
            
                <div class="px-2 py-4 border-b border-gray-300 text-gray-500 cursor-pointer text-xs">
                    <div class="flex flex-row justify-around text-2xl">
                        <span @click="noProject=!noProject"><icon icon="ant-design:folder-open-filled" class="text-2xl" title="Open project"/></span>
                        <span @click="saveProject"><icon icon="ic:baseline-save" class="text-2xl" title="Save project"/></span>
                        <icon icon="bx:current-location" class="text-2xl" title="Set as current project" @click="currentProject()"/>
                        <span title="Build website" @click="buildPages">
                            <icon icon="ic:round-build-circle" class="text-2xl" :class="store.project.rebuild?'text-red-600 animate-pulse':'text-green-400'" />
                        </span>
                    </div>
                </div>
                <div v-if="store.project.rebuild" class="animate-pulse px-2 py-4 border-b border-gray-300 text-gray-100 bg-purple-500 cursor-pointer text-sm">
                    <div >Project changed. Rebuild</div>
                </div>
            </div>
            <div class="w-5/6 flex flex-col border-b text-gray-400 bg-white overflow-x-hidden overflow-y-auto">
                <div class="flex flex-col p-4 bg-white" v-if="settings.tab==='settings'">
                    <label class="text-xs mt-2">Project Name</label>
                    <input type="text" v-model="store.project.data.name"/>
                    <label class="text-xs mt-2">Website Title</label>
                    <input type="text" v-model="store.project.data.title"/>
                    <label class="text-xs mt-2">Description</label>
                    <textarea class="w-full" v-model="store.project.data.description"/>
                    
                    <label class="text-xs mt-2">Demo Website URL</label>
                    <input type="text" class="w-full" v-model="store.project.data.devServer" placeholder="http://localhost:3000"/>
                    <div class="mt-4 mx-auto">
                        <button @click="saveProject" class="bg-purple-600 rounded hover:bg-purple-800 mx-auto text-white">Save</button>
                    </div>
                </div>
                <BuilderLayout      v-if="settings.tab==='layout'"/>
                <BuilderHomepage    v-if="settings.tab==='homepage'"/>
                <BuilderPages       v-if="settings.tab==='pages'"/>
                <BuilderAnalytics   v-if="settings.tab==='analytics'"/>
                <BuilderScripts     v-if="settings.tab==='scripts'"/>
                <BuilderMetaTags    v-if="settings.tab==='meta tags'"/>
                
                <!-- <div v-if="settings.tab==='graphQL'" class="p-2 flex flex-col overflow-y-auto h-screen">
                    <div class="flex flex-row p-2">
                        <div class="w-1/2" v-if="graphQLPagesFound && graphQLPagesFound?.children">
                            GraphQL - <strong>{{ graphQLPagesFound.name }}</strong>
                            <ul class="m-0" >
                                <li class="ml-0 list-none cursor-pointer lowercase flex items-center" :class="previewPage.slug === page?'font-bold':''" v-for="page in graphQLPagesFound.children">
                                    <span @click="removePage(page)" class="pt-0" title="Remove"><icon icon="ci:off-close" class="text-red-500 text-xl mr-2"/></span><span title="Click to preview" @click="setPreviewQLPage(page)">{{page.name}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="w-1/2 text-xs">
                            <chip>{{ previewQLPageHTML }}</chip>
                            <iframe class="preview-md mt-2" style="height:100rem;transform-origin:0 0;" :src="previewQLPageHTML" v-if="previewQLPageHTML"></iframe>
                        </div>
                    </div>
                </div> -->
                <div class="hidden fixed top-0 right-0 w-1/2 flex h-1/3 border shadow-lg">
                    <div class="preview-sm">
                        <div :class="mainCSS" id="previewHomepage">
                            <BlockPreview :key="homepageID" :block="homepage.json.blocks" :level="2" v-if="homepage"/>
                        </div>
                    </div>
                    <div class="preview-sm">
                        <div :class="mainCSS" id="previewPages">
                            <BlockPreview :key="templateID" :block="template.json.blocks" :level="2" v-if="template"/>
                        </div>
                    </div>
                    <div class="preview-sm">
                        <div :class="mainCSS" id="previewTemplate">
                            <BlockPreview :key="previewID" :block="buildPage.json.blocks" :level="2" v-if="buildPage"/>
                        </div>
                    </div>
                    
                </div>
            </div>  
            <!-- <TreeContainer context="templates" :open="open" @close="open=!open" @file="addTemplate"/>  -->
        </div>  
    </div>                    
        <!-- <TreeContainer context="projects" :open="noProject" @file="selectProject"/> -->
</template>

<script setup lang="ts">
import { ref , onMounted , inject, watch, computed } from 'vue'
import { saveFile , buildClear , openPath , paths , DATA_PATH , PAGESURL, CONFIG_FILE , buildProject , saveStaticPage , fileExists , layoutMainClass , fileExplorer } from '/@/composables/useLocalApi'
import { slugify } from '/@/composables/useUtils'
import { usedFonts , usedLinks , randomID } from '/@/composables/useEditor'
import { CMS_SCHEMA , CMS, getCMSQuery , getCMSSingleQuery ,} from '/@/composables/useGraphCMS'
import { tabberAddTab } from '/@/composables/useNavigation'


const store = inject('useStore')

let project = ref(null)

const editor = store.editor // EDITOR //useStore()
let settings = store.settings 
let message = store.message 

const options = ref ([
    { tab: 'settings'  },
    { tab: 'layout' },
    { tab: 'homepage' },
    { tab: 'pages' },
    { tab: 'graphQL' },
    //{ tab: 'links analyzer' },
    { tab: 'analytics' },
    { tab: 'meta tags' },
    { tab: 'scripts' }
])

const tab = ref ('builder')
const cms_context = ref ( '' )
const open = ref ( false )
const qryData = ref ( {} )
const itemID = ref ( '')
let homepage = ref ( null )
let homepageID = ref ( randomID() )
let template = ref(null)
let templateID = ref(randomID())
let buildPage = ref( null  )
let mainCSS = ref('')
let previewID = ref(randomID())
let graphQLPagesFound = ref(null)
let previewQLPageHTML = ref('')
let noProject = ref(false)

const tabClass = (tab) => {
    return tab === tab.value ? 'bg-white' : ''
}

// if ( !project?.data?.graphql ){
//     project.data['graphql'] = {}
//     Object.keys(CMS_SCHEMA.schema).forEach ( context => {
//         project.data.graphql[context] = {}
//     })
// }

const selectProject = async (data:Object)=> {
    store.project.data = {}
    store.project.data = data.data
    noProject.value = false
    return true
}


// if ( store.project.data ){
//     selectProject( store.project )
// }

const saveProject = async () => {
    store.status.loading =! store.status.loading
    store.project.path = CONFIG_FILE
    const res = await saveFile(store.project)
    store.status.loading =! store.status.loading
    //message.data = await res.message
}

const currentProject = async() =>{
    store.status.loading =! store.status.loading
    store.project.path = CONFIG_FILE
    const res = await saveFile(store.project)
    store.status.loading =! store.status.loading
}


// const loadFile = async () => {
//     const config = await openPath ( '/app/pages/whoobe.config.json' ) 
//     console.log ( config )
//     store.project.data = await config.data
//     if ( !store.project.data ){
//         noProject.value = true
//     }
// }

// const editCMSTemplate = () => {
//     let template = project.data.graphql[cms_context.value].template
//     tabberAddTab ( {
//         component: 'Editor',
//         label: template.name,
//         object: template
//     })
// }

//loadFile()

let previewPage = ref({})
let newPageSlug = ref('')

const setPreviewPage = async (page:String) => {
    previewPage.value = project.data.pages[page]
}

const setPreviewQLPage = async ( page ) => {
    previewQLPageHTML.value = PAGESURL + '/' + page.relativePath.replace('.html','')
}

let linksAnalyzed = ref([])

const analyzeLinks = async () =>{
    let links = await usedLinks ( project.data )
    // links = await [ ...links.filter(a=>a) ,  usedLinks ( project.data.footer.blocks ) ].filter( a => a )
    // links = await [ ...links , await usedLinks ( project.data.main ) ].filter( a => a )
    //console.log ( links )
    linksAnalyzed.value = []
    const allLinks = [ ...new Set(links) ].filter(a=>a) //.map( a => a = { page: a , exists: checkIfExist( a ) } )
    allLinks.forEach ( async ( link ) => {
        linksAnalyzed.value.push ( { page: link , exists: await checkIfExist( link )} )
    })

}


if ( project?.data?.pages ){
    try {
        let initPage = Object.keys ( project.data.pages )
    } catch ( err ){
        console.log ( err )
    }
}

onMounted(()=>{
    console.log ( store.project )
    if ( store.project?.data ){
        project.value = store.project.data
    }
})
const loadHomepage = async () => {
    if ( project.data.homepage ){
        try {
            homepageID.value = randomID()
            homepage.value = project.data.homepage.blocks
        } catch ( err ){
            message.console ( 'homepage is not defined' )
        }
    }
}


const graphQLPages = async ( context ) => {
    const cmsPages = await fileExplorer ( context )
    if ( cmsPages?.children ){
        cmsPages.children.forEach ( child => {
            if ( child.name === context ){
                graphQLPagesFound.value = child
            }
        })
    }
}


const setGraphQLSchema = ( e:Object , context:String ) => {
    if ( !project.data?.graphql ){
        project.data['graphql'] = {}
    }
    if ( e.target.checked ){
        project.data.graphql[context] = { enabled: true }
        getCMSData(context)
    } else {
        if ( project.data?.graphql[context] ){
            delete project.data.graphql[context]
        }
    }
}

const addTemplate = (template:Object) =>{
    if ( cms_context.value === 'compose' ){
        console.log ( template.json.blocks )
        project.data.pages[previewPage.value.slug].blocks.json.blocks.blocks.push ( template.json.blocks )
    }
    if ( settings.tab === 'homepage' ){
        project.data.homepage.blocks = template
        homepage.value = template
        open.value = !open.value
        previewPage.value = {
            blocks: template ,
            html: '',
            slug: 'index',
            fonts: ''
        }
        saveProject()
        return
    }
    if ( settings.tab === 'pages' ){
        
            let page = {
                blocks: template,
                html: '',
                fonts: '',
                slug: slugify(template.name)
            }
            project.data.pages[slugify(template.name)] = page
            previewPage.value = {
                blocks: template ,
                html: '',
                slug: slugify(template.name),
                fonts: ''
            }
        open.value = !open.value
        saveProject()
        return
    }
    if ( settings.tab === 'graphQL' ){
        if ( project.data.graphql[cms_context.value] ){
            project.data.graphql[cms_context.value] = { template : template }
            open.value = !open.value
            saveProject()
            return
        }
    }
}

const removePage = ( slug:String )=> {
    let confirm = window.confirm ( 'Confirm to remove the page?')
    confirm ?
        delete project.data.pages[slug] : null
    saveProject()
}



const getCMSData = async (  context: String ) => {
    //cms_context.value = context
    console.log ( CMS.hasOwnProperty(context) )
    if ( !CMS.hasOwnProperty(context) ){
        let data = await getCMSQuery ( context )
    } else {
        console.log ( 'data in memory')
    }
}

const buildPages = async () => {
    message.console = await buildClear()
    message.console += '\n=====================\n'
    mainCSS.value = await layoutMainClass()
    setTimeout (async()=>{
        await buildHomepage()
        Object.keys(store.project.data.pages).forEach ( async ( page ) => {
            
            setTimeout (async()=>{
                templateID.value = randomID()
                template.value = store.project.data.pages[page].blocks
                console.log ( template.value )
                await saveWebsitePage ( page )
            },1000)
        })
        store.project.rebuild = false
        store.project.rebuildData = new Date()
    },1000)
}

const buildHomepage = async () => {
        let pageToCreate = null
        homepage.value = store.project.data.homepage.blocks
    //setTimeout (async()=>{
        let doc = await document.querySelector('#previewHomepage')
        let html = await doc.innerHTML.replaceAll('<!--v-if-->','')
        pageToCreate = {
            document: store.project.data.homepage.blocks,
            html: html,
            slug: 'index' ,
            layout:false,
            fonts: store.project.data.homepage.fonts , //await usedFonts ( project.data.homepage.json.blocks ),
            folder: buildFolder.value,
            seo: {
                title: store.project.data.title,
                description: store.project.data.description,
                tags: homepage.value.tags
            }
        }
        await saveStaticPage ( pageToCreate )
        message.console += '- homepage created (index.html)\n'
        
    //},2000)
}


const saveWebsitePage = async ( slug:String ) => {
    let doc = await document.querySelector('#previewPages')
    let html = await doc.innerHTML.replaceAll('<!--v-if-->','')
    let pageToCreate = {
        document: template.value,
        html: html,
        slug: slug ,
        layout:false,
        fonts: await usedFonts ( template.value ),
        folder: buildFolder.value
    }
    console.log ( pageToCreate )
    const saved = await saveStaticPage ( pageToCreate )
    message.console += '- ' + slug + ' created (' + slug + '.html)\n'
}
let buildFolder = ref('')

const buildGraphQLPages = async () => {
    //buildFolder.value = prompt ('Destination folder',buildFolder.value)
    if ( Object.keys(project.data.graphql).length ){
        message.console += 'Creating GraphQL contents \n\n'
        let contextKeys = Object.keys ( project.data.graphql )
        ///message.console += 'context ' + contextKeys.join('-')
        contextKeys.forEach ( async ( context ) => {
            message.console += 'Context=> ' + context + '\n'
            const res = await getCMSQuery ( context )
        })
        
    }
    return
}


const setBlockData = async (context:String) => {
    //let qry = CMS[context]
     
    CMS[context].forEach ( async (qry) => {
        setTimeout (async()=>{
            loadData (qry,context)
        },2000)
    })
}

const loadData = async (qry:Object,context:String) => {
        
        previewID.value = randomID()
        const buildPreview = await setPreviewFields ( qry )
        let pageToCreate = {
            document: buildPage.value,
            html: await documentHTML(previewID.value),
            slug: qry.slug ,
            layout:false,
            fonts: await usedFonts ( buildPage.value ),
            seo : {
                title: qry[CMS_SCHEMA.schema[context].query.seo.title],
                description: qry[CMS_SCHEMA.schema[context].query.seo.description],
                keywords: qry[CMS_SCHEMA.schema[context].query.seo.keywords],
            },
            folder: buildFolder.value
        }
        const saved = await saveStaticPage ( pageToCreate )
        message.console += '- ' + qry.slug + ' created (GraphQL)\n'
    
}

const setPreviewFields = async ( qry:Object ) => {
    
    buildPage.value.json.blocks.blocks.forEach ( block => {
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
        console.log ( await buildPage.value.json.blocks.blocks[1].content )
    return true
}

const documentHTML = async (id:String) => {
    let doc = document.querySelector ('#previewTemplate')
    return doc.innerHTML.replaceAll('<!--v-if-->','')
}

const updateSlug = async () => {
    alert ( newPageSlug.value )
    store.project.data.pages[newPageSlug.value] = store.project.data.pages[previewPage.value.slug]
    delete store.project.data.pages[previewPage.value.slug]
    previewPage.value.slug = newPageSlug.value
    saveProject() 
}

const checkIfExist = async ( file ) => {
    console.log( file )
    if ( file === '/' ){
        file = file + 'index.html' 
    } else {
        file = file + '.html' 
    }
    const exists = await fileExists( paths.ssg + file )
    console.log ( exists )
    return await exists.success
}

watch ( () => store.settings.tabs , (tab) => {
    console.log ('tab is ' , tab )
})


</script>
