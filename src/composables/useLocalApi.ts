import { reactive } from 'vue'
import jp from 'jsonpath'
const endpoint = import.meta.env.VITE_APP_LOCAL_API
export const PAGESURL = import.meta.env.VITE_APP_PAGES_URL
export const DATA_PATH = import.meta.env.VITE_APP_DATA_PATH
export const CONFIG_FILE = '/app/pages/whoobe.config.json'

export const paths = { 
    templates : '/templates',
    uikits: '/uikits',
    projects: '/projects',
    current: '/current',
    build: '/build',
    svelte: '/svelte',
    pages: '/pages',
    ssg: '/app/pages/dist',
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
    console.log ( localData )
}

export async function fileExplorer ( path:string ){
    const res = await fetch ( endpoint + '/tree' + paths[path] )
    return await res.json()
}

export async function openPath ( path:string ) {
    const res = await fetch ( endpoint + '/file?path=' + path )
    try {
        return await res.json()
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
    console.log ( localData )
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
    const ok = await res.json()
    return ok
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


export const saveStaticPage = async ( page: Object ) => {
    console.log ( page )
    let doc = page
    if ( page.slug === 'header' ) {
        SSG.header = {
            html: page.html,
            fonts: page.fonts.split(',')
        }
        return
    }

    if ( page.slug === 'footer' ) {
        SSG.footer = {
            html: page.html,
            fonts: page.fonts.split(',')
        }
        return
    }
    
    let fonts = page.fonts.split(',')
    fonts = [ ...fonts , ...SSG.header.fonts , ...SSG.footer.fonts ]
    fonts = [ ...new Set(fonts) ].join('|')

    let header = ''
    let footer = ''
    SSG.header ? header = SSG.header.html : null
    SSG.footer ? footer = SSG.footer.html : null
    !page.include.header ? header = '' : null
    !page.include.footer ? footer = '' :  null

    let fontsLink = ''
    if ( fonts ){
        fontsLink = `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${fonts.replaceAll(',','|')}">`
    }
    doc.html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <title>${page.document.name}</title>
            <meta name="description" content="${page.document.description}">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="keywords" content="${page.document.tags.join(',')}">
            <!--Material-icons-->
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            ${fontsLink}
            <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer=""></script>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/assets/css/output.css">
            <link rel="stylesheet" href="/assets/css/animations.css">
            <link rel="icon" href="/favicon.ico" /> 
        </head>
        <body>
        ${header}
        ${page.html}
        ${footer}
        </body>
    </html>`
    console.log ( doc )
    await fetch ( endpoint + '/save/html/' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    })
}