import { reactive } from 'vue'
import jp from 'jsonpath'

const endpoint = import.meta.env.VITE_APP_LOCAL_API
export const PAGESURL = import.meta.env.VITE_APP_PAGES_URL
export const DATA_PATH = import.meta.env.VITE_APP_DATA_PATH
export const PAGES_PATH = import.meta.env.VITE_APP_PAGES
export const CONFIG_FILE = import.meta.env.VITE_APP_PAGES_ROOT + '/whoobe.config.json'
import { message } from './useUtils'
import { fstat } from 'fs'
import { store } from './useStore'

export const API_URL = import.meta.env.VITE_APP_LOCAL_API

const CONFIG = await openPath ( CONFIG_FILE )

export const paths = { 
    templates : '/templates',
    uikits: '/uikits',
    projects: '/projects',
    current: '/current',
    assets: '/assets',
    images: '/images',
    build: '/build',
    svelte: '/svelte',
    pages: '/pages',
    ssg: PAGES_PATH,
    url: PAGESURL
}


export const fileTree = reactive({
    folders:Object,
    lastSource:Object,
    lastTarget:Object,
    reload:false
})

export const SSG = reactive({
    header:'',
    footer:''
})



export const currentFolder = reactive({
    path: null
})

export const localData = reactive ( {
    folders: null,
    files: {}
})

export const template = reactive ( {
    json: null
})


export async function Archive ( path:string ) {
    const res = await fetch ( endpoint + paths[path] )
    localData.folders = await res.json()
    //console.log ( localData )
}

export async function fileExplorer ( path:string ){
    const res = await fetch ( endpoint + '/tree' + paths[path] )
    return await res.json()
}

export async function openPath ( filePath:string ) {
    
    const res = await fetch ( endpoint + '/file?path=' + filePath )
    try {
        let data = await res.json()
        data.path = filePath
        //console.log ( await res )
        return await data
    } catch ( err ) {
        const body = await res.text()
        return body    
    }
} 

export const openFolder = async ( folder )=>{
    const res = await fetch ( endpoint + '/folders/' + folder )
    localData.files[folder] = await res.json()
}

export const openSubFolder = async ( folder , subfolder )=>{
    const res = await fetch ( endpoint + '/folders/' + folder + '?folder=' + subfolder )
    const json = await res.json()
    localData.files[folder][subfolder] = json
    //console.log ( localData )
}

export const openFile = async ( folder , name ) => {
    const res = await fetch ( endpoint + '/file/' + folder + '/' + name )
    template.json = await res.json() ?? res
    return 
}

export const saveFile = async ( json:Object ) => {
    let data = { data: json , path: json.path }
    const res = await fetch ( endpoint + '/file/save' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    return await res.json() ?? res
}



export const moveFile = async ( source:String , target: String , filename:String , fs:Object ) => {
    const mv = await fetch ( endpoint + '/move?source=' + source + '&target=' + target + '&filename=' + filename )
    return await mv.json() ?? mv 
}

export const deleteFile = async ( path:String ) => {
    const rm = await fetch ( endpoint + '/delete?path=' + path )
    return await rm.json() ?? rm
}

export const renameFile = async ( path:String , source:String , name:String ) => {
    const rm = await fetch ( endpoint + '/rename?path=' + path + '&source=' + source + '&name=' + name )
    return await rm.json() ?? rm
}

export const activeProject = async ( json:Object ) => {
    await fetch ( endpoint + '/current' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json) 
    })
}

export const addFolder = async ( context: String , name: String ) => {
    const folder = name ? name : prompt ( 'Folder name ?')
    const res = await fetch ( endpoint + '/folder/add?name=' + folder + '&context=' + context )
    const result = await res.json()
    return result
}

export const newFolder = async ( path: String , name : String ) => {
    //const res = await fetch ( endpoint + '/folder/create' + '&path=' + path )
    await fetch ( endpoint + '/folder/create' , {
        body: path + '/' + name
    })
}

export const saveSveltePage = async ( page: Object ) => {
    await fetch ( endpoint + '/svelte/page' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(page) 
    })
}

export const loadConfig = async () => {
    let config = await openPath ( CONFIG_FILE )
    return await config
}
export const buildClear = async (folder:String='') => {
    const message = await fetch ( endpoint + '/build/clear?folder=' + folder)
    return 'Build cleared'

}
export const saveStaticPage = async ( page: Object ) => {
    let config = CONFIG //await openPath ( CONFIG_FILE )
    let doc = await page
    let headerFonts = []
    let footerFonts = []
    

    let fonts = jp.query ( page.document.json.blocks , '$..blocks..font' )
    config.data?.header ?
        headerFonts = jp.query ( config.data.header.blocks.json.blocks , '$..blocks..font' ) : null
    config.data?.footer ?
        footerFonts = jp.query ( config.data.footer.blocks.json.blocks , '$..blocks..font' ) : null
    fonts =  [ ...new Set( [ ...fonts , ...footerFonts , ...headerFonts ] ) ].filter( a => a ).join('|').replaceAll(' ','+')
    //console.log ( fonts )
    
    let header = ''
    let footer = ''
    
    config.data.header ? header = config.data.header.html : null
    config.data.footer ? footer = config.data.footer.html : null
    
    page?.layout ?
        !page.layout ? header = '' : null : null
    page?.layout ?
        !page.layout ? footer = '' : null : null
    // !page.layout ? header = '' : null
    // !page.layout ? footer = '' :  null
    
   let mainCSS = ''
   if ( config.data?.main ){
        let main = jp.query ( config.data.main.blocks.json.blocks.css , '$..css').filter( a => a) 
        let mainContainer = [ ...main , ...jp.query ( config.data.main.blocks.json.blocks.css , '$..container' ).filter ( a => a )]
        mainContainer ?
            mainCSS = mainContainer.join( ' ' ) : null
   }
    let fontsLink = ''
    if ( fonts ){
        fontsLink = `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${fonts}">`
    }
    let seo = {
        title: page.document.name,
        description: page.document.description,
        keywords: page.document?.tags ? page.document.tags : null
    }
    if ( page?.seo ){
        seo = page.seo
    }
    
    let analytics = ''
    if ( config.data.analytics ){
        analytics = `<!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.data.analytics}"></script>
                    <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${config.data.analytics}');
                </script> `
    }
    page.html = page.html.replaceAll('http://localhost:8080','')
    //message.console += seo.title + ' created \n'
    //<meta name="keywords" content="${page?.document?.tags.join(',')}">
    doc.html = `<!DOCTYPE html>
    <html lang="${store.status?.locale.split('-')[0]}">
        <head>
            <title>${seo.title}</title>
            <meta name="description" content="${seo.description}">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="keywords" content="${seo.keywords?seo.keywords.join(','):seo.title}">
            <!--Material-icons-->
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            ${fontsLink}
            <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer=""></script>
            <!--<script type="module" src="https://cdn.skypack.dev/twind/shim" defer></script>-->
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/assets/css/output.css">
            <!--<link rel="stylesheet" href="/assets/css/animations.css">-->
            <link rel="icon" href="/favicon.ico" />
            
            <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
            ${analytics}
        </head>
        <body>
        ${header}
        ${page.html}
        ${footer}
        </body>
    </html>`
    
    
    //        <div class="${mainCSS} whoobe-layout-container">
    //</div>
    
    const saved = await fetch ( endpoint + '/save/html/' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    })
    //console.log ( saved )
}

export async function buildProject (){
    let config = await openPath ( CONFIG_FILE )
    message.console = "Whoobe SSG\n"
    message.console += "Building website ...\n"
    let page =  {
        html: config.data.homepage.html,
        slug: 'index',
        document: config.data.homepage.blocks,
        fonts: config.data.homepage.blocks,
        layout: false
    }
    let saved = await saveStaticPage ( page )
    message.console += '- created homepage\n'
    if ( config.data.pages ){
        Object.keys(config.data.pages).forEach ( async (pg) => {
            page = {
                html: config.data.pages[pg].html,
                slug: config.data.pages[pg].slug,
                document: config.data.pages[pg].blocks,
                fonts: config.data.pages[pg].blocks,
                layout: true
            }
            saved = await saveStaticPage ( page )
            message.console += '- created ' + config.data.pages[pg].slug + '\n'
        })
    }
}

export async function fileExists( filePath:String ){
    const res = await fetch ( endpoint + '/fileExists?path=' + filePath )
    try {
        return await res.json()
    } catch ( err ) {
        const body = await res.text()
        return body    
    }
    // try {
    //     await openPath ( filePath ) 
    //     return true
    // } catch ( err ) {
    //     return false
    // }
}

export async function  layoutMainClass () {
    let config = await openPath ( CONFIG_FILE )
    if ( config.data?.main ){
        let mainCSS = ''
        let main = jp.query ( config.data.main.blocks.json.blocks.css , '$..css').filter( a => a) 
        let mainContainer = [ ...main , ...jp.query ( config.data.main.blocks.json.blocks.css , '$..container' ).filter ( a => a )]
        mainContainer ?
            mainCSS = mainContainer.join( ' ' ) : null
        return mainCSS
   }
   return ''
}

export async function graphQLRequest ( config ) {
    try {
        const res = await fetch ( endpoint + '/graphql' ,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config) 
        })
        return res.json()
    } catch ( err ){
        return { error: err }
    }
}