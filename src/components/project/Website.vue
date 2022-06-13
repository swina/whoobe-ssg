<template>
    
    <div class="p-4">
    <div v-if="project" class="bg-bluegray-500 p-1 text-white">
        Project: {{ project.data.name }} - <span class="capitalize">{{ tab }}</span>
    </div>    
    <div class="flex w-full border bg-gray-100" v-if="project">
        <div class="w-1/4">
            <template v-for="option in options">
                <div class="capitalize px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="settings.tab=option.tab" :class="option.tab===settings.tab?'bg-white':''">
                    {{ option.tab }}
                    
                </div>
            </template>
           
            <div class="px-2 py-4 border-b border-gray-300 text-gray-500 cursor-pointer text-xs">
                <div class="flex flex-row justify-around text-2xl">
                    <span @click="saveProject"><icon icon="ic:baseline-save" class="text-2xl" title="Save project"/></span>
                    <icon icon="bx:current-location" class="text-2xl" title="Set as current project" @click="currentProject()"/>
                    <span title="Build website" @click="buildPages">
                        <icon icon="ic:round-build-circle" class="text-2xl text-red-600" />
                    </span>
                    <!-- <icon icon="ic:baseline-file-download" class="text-2xl" title="Download project" @click="projectList"/>
                    <icon icon="ic:baseline-file-upload" class="text-2xl" title="Upload project" @click="saveProjects"/> -->
                    <!-- <icon icon="cib:svelte" class="text-2xl" title="Export to SvelteKit" @click="activeProject(project)"/> -->
                </div>
                <!-- <button @click="buildProject" class="mx-auto">Build</button> -->
            </div>
        </div>
        <!-- <div class="px-2 py-4 border-b text-gray-400 cursor-pointer text-xs">
            Use this tool to export a website to other frameworks in order to build static websites
        </div> -->
        <div class="w-5/6 flex flex-col border-b text-gray-400 bg-white overflow-x-hidden overflow-y-auto">
            
            <!-- <h5 class="border-b p-4 capitalize text-lg border border-l-0">{{tab}}</h5> -->

            <div class="flex flex-col p-4 bg-white" v-if="settings.tab==='settings'">
                <!-- <label class="text-xs mt-2">Framework</label>
                <select v-model="project.data.framework">
                    <option value="sveltekit" selected>Whoobe for SvelteKit</option>
                </select> -->
                <label class="text-xs mt-2">Project Name</label>
                <input type="text" v-model="project.data.name"/>
                <label class="text-xs mt-2">Website Title</label>
                <input type="text" v-model="project.data.title"/>
                <label class="text-xs mt-2">Description</label>
                <textarea class="w-full" v-model="project.data.description"/>
                
                <label class="text-xs mt-2">Demo Website URL</label>
                <input type="text" class="w-full" v-model="project.data.devServer" placeholder="http://localhost:3000"/>
                <div class="mt-4 mx-auto">
                    <button @click="saveProject" class="bg-purple-600 rounded hover:bg-purple-800 mx-auto text-white">Save</button>
                </div>
            </div>
            <div v-if="settings.tab==='analytics'" class="flex flex-col p-4 bg-white">
                <label class="text-xs mt-2">Analytics</label>
                <input type="text" v-model="project.data.analytics" placeholder="GA-xxxxx"/>
            </div>
            <div v-if="settings.tab==='scripts'" class="flex flex-col p-4 bg-white">
                <div class="flex">
                    <label class="text-xs mr-2">AlpineJS</label>
                    <input type="checkbox" v-model="project.data.alpine"/>
                </div>
                <label class="text-xs mt-2">Custom JS URL</label>
                <input type="text" v-model="project.data.custom_script"/>
                <label class="text-xs mt-2">Custom CSS URL</label>
                <input type="text" v-model="project.data.custom_css"/>
            </div>
            <div v-if="settings.tab==='meta tags'" class="flex flex-col p-4 bg-white">
                <div class="flex items-center">
                    <label class="text-lg mr-2">Open Graph</label>
                    <input type="checkbox" v-model="project.data.meta.og.enabled"/>
                </div>
                
                <div v-if="project.data.meta.og.enabled" class="flex flex-col p-2 bg-gray-200 rounded">
                    <template v-for="item in Object.keys(project.data.meta.og)">
                        <div v-if="item!='enabled'" class="flex flex-col my-2">
                            <label class="text-xs capitalize">{{item.replace('_',' ')}}</label>
                            <input type="text" v-model="project.data.meta.og[item]"/>
                        </div>
                    </template>
                    
                </div>

                <div class="flex items-center mt-4">
                    <label class="text-lg mr-2">Twitter</label>
                    <input type="checkbox" v-model="project.data.meta.twitter.enabled"/>
                </div>
                
                <div v-if="project.data.meta.twitter.enabled" class="flex flex-col p-2 bg-gray-200 rounded">
                    <template v-for="item in Object.keys(project.data.meta.twitter)">
                        <div v-if="item!='enabled'" class="flex flex-col my-2">
                            <label class="text-xs capitalize">{{item.replace('_',' ')}}</label>
                            <input type="text" v-model="project.data.meta.twitter[item]"/>
                        </div>
                    </template>
                    
                </div>
            </div>
            <div v-if="settings.tab==='layout'" class="flex flex-col justify-center items-center">
                <div v-if="project.data.header || project.data.footer" class="preview-md mx-auto border">
                    <span v-if="!project.data.header">To create an header to add to all pages, save a template as page type <strong>header</strong></span>
                    <div v-if="project.data.header" v-html="project.data.header.html"></div>
                    <div class="h-xl text-2xl flex flex-col items-center justify-center">Your page</div>
                    <span v-if="project.data.footer">To create a footer to add to all pages, save a template as page type <strong>footer</strong></span>
                    <div v-if="project.data.footer" v-html="project.data.footer.html"></div>
                </div>
                <div v-else class="mx-auto">
                    <h3 class="mx-auto">No layout defined yet</h3>
                </div>
            </div>
            <div v-if="settings.tab==='homepage'" class="flex flex-col pb-40 overflow-y-auto h-screen">
                <span @click="cms_context='homepage',open=!open" class="ml-2 text-4xl mt-1" title="Select template"><button>Select</button></span>
                <div v-if="project.data.homepage" class="mx-auto">
                    <!-- <span v-if="!project.data.header">To create an header to add to all pages, save a template as page type <strong>header</strong></span>
                    <div v-if="project.data.header" v-html="project.data.header.html"></div> -->
                        <div class="flex items-center justify-center">
                            <!-- <div v-if="project.data.homepage?.html" v-html="project.data.homepage.html" class="preview-md"></div> -->
                            <WebpagePreview context="homepage" v-if="project.data.homepage.blocks"/>
                            <!-- <div class="preview-sm text-center" style="transform-origin:50% 0;" v-if="project.data.homepage?.blocks">
                                
                                <BlockPreview v-if="project.data.header?.blocks" :block="project.data.header.blocks.json.blocks"/>
                                <BlockPreview  :block="project.data.homepage.blocks.json.blocks"/>
                                <BlockPreview v-if="project.data.footer?.blocks" :block="project.data.footer.blocks.json.blocks"/>
                            </div> -->
                        </div>
                    <!-- <div v-if="project.data.homepage" v-html="project.data.homepage.html" class="preview-lg"></div> -->
                    <!-- <span v-if="project.data.footer">To create a footer to add to all pages, save a template as page type <strong>footer</strong></span>
                    <div v-if="project.data.footer" v-html="project.data.footer.html"></div> -->
                </div>
            </div>
            <div v-if="settings.tab==='pages'" class="flex flex-col overflow-y-auto h-screen">
                <div v-if="project.data.pages" class="flex">
                    <div class="w-1/3 p-2">
                        <span @click="cms_context='pages',open=!open" class="ml-2 text-4xl mt-1" title="Select template"><button>Add</button></span>
                        <ul class="m-0">
                            <li class="ml-0 list-none cursor-pointer lowercase flex items-center" :class="previewPage.slug === page?'font-bold':''" v-for="page in Object.keys(project.data.pages)">
                                <span @click="removePage(page)" class="pt-0" title="Remove"><icon icon="ci:off-close" class="text-red-500 text-xl mr-2"/></span><span title="Click to preview" @click="setPreviewPage(page)">{{page}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="w-2/3 flex flex-col items-center justify-center" v-if="previewPage?.blocks || previewPage?.html">
                        <div class="flex items-center justify-start w-full p-2 pt-4"><input class="mr-2 w-3/4" type="text" v-model="newPageSlug"/><button @click="updateSlug">Change Slug</button><button @click="cms_context='compose',open=!open">Compose Page</button></div>
                        <div class="flex items-center justify-center" v-if="previewPage?.slug">
                            <WebpagePreview :context="previewPage.slug"/>

                            <!-- <div v-if="previewPage && previewPage.html" v-html="previewPage.html" class="preview-md"></div>
                            <div class="preview-md" v-if="previewPage && !previewPage.html">
                                <BlockPreview  :block="previewPage.blocks.json.blocks"/>
                            </div> -->
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div v-if="settings.tab==='graphQL'" class="p-2 flex flex-col overflow-y-auto h-screen">
                <div class="w-1/2">
                    <template v-for="context in Object.keys(CMS_SCHEMA.schema)">
                        <div class="flex items-center">
                            <icon  v-if="project.data.graphql[context]" icon="bi:check" class="mt-1 text-2xl text-green-500"/> 
                            <icon v-else icon="mdi:close" class="mt-1 text-2xl text-red-500"/> 
                            {{ context }} <button class="ml-2 dark small" v-if="project.data.graphql[context]" @click="graphQLPages(context)">List</button>
                        </div>
                    </template>
                </div>
              
                <!-- Enable Schema
                    <div class="flex items-center p-1">
                        <input type="checkbox" class="mr-2" :checked="project.data?.graphql[context]?true:false" @change="setGraphQLSchema($event,context)"/> {{ context }} <span @click="cms_context=context,open=!open" class="ml-2 text-4xl mt-1" title="Select template"><icon icon="flat-color-icons:template" :class="project.data?.graphql[context] && project.data.graphql[context]?.template?'':'grayscale'"/></span>
                        <chip v-if="project.data?.graphql[context] && project.data.graphql[context]?.template" @click="cms_context=context,store.editor.document=project.data.graphql[context].template,store.editor.current = project.data.graphql[context].template,getCMSData(context)">{{ project.data?.graphql[context].template.name }}</chip>
                    </div>
                </template> -->
            <!-- <GenerateGraphQL v-if="cms_context" :context="cms_context"/> -->
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
                    <!-- <template v-for="page in graphQLPagesFound.children">
                        {{ page.name }}
                    </template> -->
                    <!-- <div class="font-bold">{{ cms_context }} - webpages</div>
                    <div class="flex flex-wrap w-full" v-for="item in CMS[cms_context]" v-if="cms_context" style="max-width:100%;width:100%;">
                        
                        <icon icon="bi:check" class="text-2xl text-green-500" v-if="fileExists(paths.ssg + '/' + item.slug)"/> 
                        <icon v-else icon="mdi:close" class="text-2xl text-red-500"/>
                        {{ item.slug }}
                        <a :href="PAGESURL + '/' + item.slug.replace('.html','')" target="preview" v-if="fileExists(paths.ssg + '/' + item.slug)" class="mx-2"><icon icon="iconoir:open-in-window" title="Open in a new window"/></a>
                        <span @click="editCMSTemplate"><icon icon="mdi:edit"></icon></span>
                    </div>
                
                <button @click="analyzeLinks">Test</button> -->
                </div>
                <!-- <div class="flex flex-wrap w-full" v-for="item in CMS[cms_context]" v-if="cms_context" style="max-width:100%;width:100%;">
                    {{item.slug}}
                </div> -->
            </div>
             <div class="flex flex-col p-2" v-if="settings.tab==='links analyzer'">
                <template  v-for="item in linksAnalyzed.sort()" v-if="linksAnalyzed">
                    <div class="flex flex-wrap w-full" style="max-width:100%;width:100%;" v-if="item.includes('http') || ( item.slice(0,1) === '/'  && fileExists(paths.ssg + '/' + item.replace('/','')) )">
                            <icon icon="bi:check" class="text-2xl text-green-500"/> 
                            {{ item }}
                            <a :href="PAGESURL + item" target="preview" class="mx-2"><icon icon="iconoir:open-in-window" title="Open in a new window"/></a>
                    </div>
                    <div v-else class="flex flex-wrap w-full" style="max-width:100%;width:100%;" title="Broken link">
                            <icon icon="mdi:close" class="text-2xl text-red-500"/>
                            {{ item }}
                    </div>
                </template>
             </div>
            <!-- <div v-if="tab!='pages' && tab!='settings'">
                <span v-if="!SSG[tab]">To create an header to add to all pages, save a thplate as page type <strong>header</strong></span>
                <div v-if="SSG[tab]" v-html="SSG[tab].html"></div>
                Fonts : <span v-for="font in SSG[tab].fonts" class="pr-2">{{font}}</span>
                <div class="scale-25" v-html="project.data[tab].html">
                </div>
            </div>
            <div v-if="tab==='pages'">
                <template v-for="page in Object.keys ( project.data.pages )">
                    slug {{ page }} {{ project.data.pages[page].name }}
                </template>
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
        <TreeContainer context="templates" :open="open" @close="open=!open" @file="addTemplate"/> 
        
    </div>  
    </div>                    
</template>

<script setup lang="ts">
import { ref , onMounted , inject } from 'vue'
import { project } from '/@/composables/useProject'
import { saveFile , buildClear , openPath , paths , DATA_PATH , PAGESURL, CONFIG_FILE , buildProject , saveStaticPage , fileExists , layoutMainClass , fileExplorer } from '/@/composables/useLocalApi'
import { slugify } from '/@/composables/useUtils'
import { usedFonts , usedLinks , randomID } from '/@/composables/useEditor'
import { CMS_SCHEMA , CMS, getCMSQuery , getCMSSingleQuery ,} from '/@/composables/useGraphCMS'
import { tabberAddTab } from '/@/composables/useNavigation'
//import { store } from '/@/composables/useStore'


const store = inject('useStore')

const props = defineProps ({
    data:Object
})

const editor = store.editor // EDITOR //useStore()
let settings = store.settings 
let message = store.message 
project.path = DATA_PATH + '/' + paths.projects

const options = ref ([
    { tab: 'settings'  },
    { tab: 'layout' },
    { tab: 'homepage' },
    { tab: 'pages' },
    { tab: 'graphQL' },
    { tab: 'links analyzer' },
    { tab: 'analytics' },
    { tab: 'meta tags' },
    { tab: 'scripts' }
])

const tab = ref ('settings')
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
const tabClass = (tab) => {
    return tab === tab.value ? 'bg-white' : ''
}

if ( !project.data?.graphql ){
    project.data['graphql'] = {}
    Object.keys(CMS_SCHEMA.schema).forEach ( context => {
        project.data.graphql[context] = {}
    })
}

const saveProject = async () => {
    store.status.loading =! store.status.loading
    project.path = CONFIG_FILE
    const res = await saveFile(project)
    store.status.loading =! store.status.loading
    //message.data = await res.message
}


const loadFile = async () => {
    const config = await openPath ( '/app/pages/whoobe.config.json' ) 
    project.data = await config.data
}

const editCMSTemplate = () => {
    let template = project.data.graphql[cms_context.value].template
    tabberAddTab ( {
        component: 'Editor',
        label: template.name,
        object: template
    })
}

loadFile()

let previewPage = ref({})
let newPageSlug = ref('')

const setPreviewPage = async (page:String) => {
    previewPage.value = project.data.pages[page]
}

const setPreviewQLPage = async ( page ) => {
    previewQLPageHTML.value = PAGESURL + '/' + page.relativePath.replace('.html','')
}

let linksAnalyzed = ref(null)

const analyzeLinks = async () =>{
    let links = await usedLinks ( project.data )

    // links = await [ ...links.filter(a=>a) ,  usedLinks ( project.data.footer.blocks ) ].filter( a => a )
    // links = await [ ...links , await usedLinks ( project.data.main ) ].filter( a => a )
    //console.log ( links )
    linksAnalyzed.value = await [ ...new Set(links) ].filter(a=>a)

}

analyzeLinks()
if ( project.data.pages ){
    try {
        let initPage = Object.keys ( project.data.pages )
    } catch ( err ){
        console.log ( err )
    }
}

onMounted(()=>{
    if ( project.data.homepage ){
        try {
            homepageID.value = randomID()
            homepage.value = project.data.homepage.blocks
        } catch ( err ){
            message.console ( 'homepage is not defined' )
        }
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
        Object.keys(project.data.pages).forEach ( async ( page ) => {
            
            setTimeout (async()=>{
                templateID.value = randomID()
                template.value = project.data.pages[page].blocks
                console.log ( template.value )
                await saveWebsitePage ( page )
            },1000)
        })
    },1000)
}

const buildHomepage = async () => {
        let pageToCreate = null
        homepage.value = project.data.homepage.blocks
    //setTimeout (async()=>{
        let doc = await document.querySelector('#previewHomepage')
        let html = await doc.innerHTML.replaceAll('<!--v-if-->','')
        pageToCreate = {
            document: project.data.homepage.blocks,
            html: html,
            slug: 'index' ,
            layout:false,
            fonts: project.data.homepage.fonts , //await usedFonts ( project.data.homepage.json.blocks ),
            folder: buildFolder.value,
            seo: {
                title: project.data.title,
                description: project.data.description,
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
    project.data.pages[newPageSlug.value] = project.data.pages[previewPage.value.slug]
    delete project.data.pages[previewPage.value.slug]
    previewPage.value.slug = newPageSlug.value
    saveProject()
}


</script>
