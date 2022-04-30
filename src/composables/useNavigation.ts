import { reactive } from 'vue'
import { useStore  } from '/@/composables/useActions'

import Element from '/@/composables/useElementClass'
import Block from '/@/composables/useBlockClass'

import { PREVIEW , setLocalStorage } from '/@/composables/useActions'
import { EDITOR } from '/@/composables/useEditor'
import { CONFIG_FILE } from './useLocalApi'
const editor = useStore()

import { store } from '/@/composables/useStore'


export const status = reactive ({
    fileexplorer: null,
    loading: false,
    archive: false,
    dialog: null ,
    dialogCss : 'w-1/3',
    dialogTitle: '',
    current: null,
    previewMode: false
})

// export const settings = reactive({
//     file: CONFIG_FILE,
//     tab: 'settings',
// })

export const toolbar = reactive({
    tool: ''
})

export const loading = ()=>{
    status.loading =! status.loading 
}

//TABBER 
export const tabber = reactive ({
     tabs : [],
     tab: -1,
     scroll: 0
})

export async function tabberAddTab( params: any) {
    let tabber = store.tabber
    await saveCurrentTab()
    let obj:any = null , page:object , document:object , block:object , element:object
    if ( params.component === 'Editor' ){
        if ( !params.object ){
            console.log ( 'creating new template ...' )
            document = await new Block();
            block = await new Element().Container()//Flexbox({direction:'col'})
            //block.semantic = 'main'
            document.name = 'A new template'
            document.json.blocks =  block 
            obj = document
            //await editor._document ( document )
            //await editor._current ( block )
            EDITOR.document = document
            EDITOR.current = block
            //await editor._tool ( 'elements' , block )
            //console.log ( editor.document )
            tabber.tabs.push (  {
                label: params.label,
                component: params.component,
                object: document
            })
        } else {
            document = params.object
            obj = document
            //editor._document ( obj )
            //editor._current ( obj ) 
            EDITOR.document = obj
            EDITOR.current = obj 
            tabber.tabs.push (  {
                label: params.label,
                component: params.component,
                object: document
            })          
        }
        setLocalStorage ( PREVIEW , document )
        tabber.tab = tabber.tabs.length - 1
    } else {
        if ( tabber.tabs ){
            let isTab = tabber.tabs.filter ( ( t , index ) => t.component === params.component )
            if ( !isTab.length ){
                tabber.tabs.push (  {
                    label: params.label,
                    component: params.component,
                    object: obj
                })
                tabber.tab = tabber.tabs.length - 1
            } else {
                tabber.tabs.forEach ( (tab,index) => {
                    if ( tab.component === params.component ){
                        tabber.tab = index
                    }
                })
            }
        } else {
            tabber.tabs.push (  {
                label: params.label,
                component: params.component,
                object: obj
            })
            tabber.tab = tabber.tabs.length - 1
        }
    }
    return 
}


export async function saveCurrentTab(){
    let tabber = store.tabber
    if ( tabber.tabs.length ){
        if ( tabber.tabs[tabber.tab]?.component && tabber.tabs[tabber.tab].component === 'Editor' ){
            let target = document.querySelector ( '.editor-container' )
            tabber.tabs[tabber.tab].object = EDITOR.document //editor.document
            tabber.tabs[tabber.tab].scroll = target.scrollTop
        }
    }
    return 
}

export async function tabberRemoveTab ( index: number ){
    console.log ( 'removing tab' )
    await store.tabber.tabs.splice ( index , 1)
    if ( store.tabber.tabs && store.tabber.tabs.length > 0 ) {
        store.tabber.tab = store.tabber.tabs.length - 1
        console.log ( store.tabber.tab )
    }
    //await index > 0 ? store.tabber.tab = store.tabber.tabs.length -1 : store.tabber.tab = -1
    //switchToEditor()
    return
}

export async function switchToEditor (){
    let tabber = store.tabber
    let isEditor = false
    tabber.tabs.forEach ( (tab,index) => {
        if ( tab.component === 'Editor' ){
            tabber.tab = index
            isEditor = true
        }
    })
    if ( !isEditor ) tabber.tab = -1
    
}

//EDITOR REACTIVE
export const useEditorSidebar = reactive ({
    sidebar: false,
    tool: '',
    group: ''
})