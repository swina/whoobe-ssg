import { reactive } from 'vue'
import { useNavigatorStore  } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
import Block from '/@/composables/useBlockClass'
import Element from '/@/composables/useElementClass'
import jp from 'jsonpath'

const editor = useEditorStore();
const navigation = useNavigatorStore();
export const PREVIEW = 'whoobe-preview'
export const CLIPBOARD = 'whoobe-clipboard'
export const UNDO = 'whoobe-undo'
// by convention, composable function names start with "use"

export const sliderIndex = reactive ({
    index: 0
})

export const sliderTabs = reactive ({
    tabs : []
})

export const tabs = reactive ( {
    tab: 0
})

export const sliderObject = reactive ( {
    slider: null
})

// Create a randomi ID
export function randomID(){
    return 'whoobe-' + Math.random().toString(36).substr(2, 5)
}

export function useStore ( name: String ){
    return !name ? editor : navigation 
}


export function isBlock( block:object ){
    return block?.tag ? true : false
}

export function getLocalStorage ( storage: string , json: boolean = true){
    return json ?
            JSON.parse ( window.localStorage.getItem ( storage) ) :
            window.localStorage.getItem ( storage)
}

export function setLocalStorage ( storage: string , source: any , json: boolean = true ){
    return json ?
            window.localStorage.setItem ( storage , JSON.stringify ( source ) ) :
            window.localStorage.getItem ( storage , source )
}

//clone object and reassign any id to a new random id
export function cloneBlock(o) {
    if ( typeof o != 'object' || !isBlock(o) ) return 
    for (var i in o) {
      //fn.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
        cloneBlock(o[i]);
      } else {
          if ( i === 'id' ){
              o[i] = randomID()
          }
      }
    }
    return o
}


export async function action( action: string , params: any) {
    let navigation: any = useNavigatorStore();
    let obj:any = null , page:object , document:object , block:object , element:object
    if ( params.component === 'Editor' ){
        if ( !params.object ){
            document = await new Block();
            block = await new Element().Flexbox()
            //element = await new Element().Paragraph()
            block.semantic = 'main'
            //block.blocks.push ( element )
            document.name = 'A new template'
            document.json.blocks =  block 
            obj = document
            editor._current ( block )
            editor._tool ( 'elements' , block )
        } else {
            page = params.object
            document = params.object
            obj = document
            !editor._current ? editor._current ( document ) : null   
            editor._page ( page ) 
        }
        editor._document ( document )
        //editor._tool ( 'snippets' )
        setLocalStorage ( PREVIEW , document )
    }
    if ( action === 'addTab' ){
        navigation.tabs.push (  {
            label: params.label,
            component: params.component,
            object: obj
        })
        tabs.tab = navigation.tabs.length - 1
        navigation.tab = navigation.tabs.length - 1
    }
   
}

export function dispatch( action: string , data: any ){
    return false
}

export function dispatchEditorTool( data: any ){
    let editor: any = useEditorStore()
    editor._tool ( data )
    return false
}


export async function createTemplate ( name:String ){
    let document = await new Block();
    let block = await new Element().Flexbox()
    //element = await new Element().Paragraph()
    block.semantic = 'section'
    //block.blocks.push ( element )
    document.name = name ?? 'A new template'
    document.json.blocks =  block 
    editor._document ( document )
    editor._current ( document )
    return document
}

export function selectBlock ( block: object , event: object ){
    event.stopPropagation()
    console.log ( 'Selected Block => '  , block.tag , block.id )
    // block.type === 'container' ?
    //     editor._tool ( 'elements' ) : editor._tool ( 'edit' )
    editor._current ( block )
    return true
}

export function removeBlock(id:string , currentNode:Object ){
    console.log ( currentNode )
    if (currentNode?.id && id == currentNode.id) {
        return currentNode;
    } else {
        var node = null
        for(var index in currentNode.blocks){
            
            node = currentNode.blocks[index];
            if(node?.id === id){
                currentNode.blocks.splice(index,1)
                node.parent = currentNode
                return node;
            }
            removeBlock(id, node );
        }
        return node

    }
}

export function moveBlock (){
    if ( !editor.current ) return
    let component = editor.document
    var parent = jp.parent ( component , '$..blocks[?(@.id=="' + editor.current.id + '")]' )
    if ( parent.length === 1 ) return
    let i
    parent.forEach ( (p,index) => {
        if ( p.id === editor.current.id ){
            i = index
        }
    })
    if ( i > 0 ){
        let obj = Object.assign({},editor.current)
        parent.splice(i,1)
        parent.splice(i-1,0,obj)
    }
    editor._document ( component )
}


// export function createElement ( name: string , options: object ){
//     let element = new Element().createElement ( name )
//     if ( editor.current?.blocks && editor.current.type === 'container' ){
//         editor.current.blocks.push ( element )
//         return true
//     }
//     return false
// }

// export function newElement ( name: String ){
//     if ( !name ) return null
//     return new Element().createElement ( name )
// }

export function createGrid ( cols: number , layout:any ){
    if ( editor.current?.blocks && editor.current.type === 'container' ){
        let grid = new Element().Grid().Cols(this.cols)
        for ( var n=0 ; n < layout.length ; n++ ){
            let el = new Element()
                .Flexbox({
                    direction:'col',
                    colspan:layout[n]
                })
                .setIcon('highlight_alt')
            grid.blocks.push ( el )
        }
        editor.current.blocks.push ( grid )
        editor._helper ( '' )
        return true
    }
    return false
}

export function blockCoords ( e ){
    //if ( e  ) e.stopPropagation()
    if ( !editor.current ) return null
    let el: any = document.querySelector ( '#' + editor.current.id )
    let coords: object = el.getBoundingClientRect()
    if ( e ){
        coords.mouseX = e.clientX
        coords.mouseY = e.clientY
    }
    return coords
}



export function cleanCSS ( css:string ) {
    return css.trim()
    //return css.split(' ').filter ( cl => cl != '').join(' ')
}

export function arrayCSS ( css:string ){
    return css.split(' ').filter ( cl => cl != '')
}

export async function setCSSValue ( css:string ){
    if ( !editor.current ) return
    if ( editor.current.css.css.includes ( css ) ){
        let cl = editor.current.css.css
        cl = cl.replace ( css , '' )
        editor.current.css.css = cl
        return
    } else {
        let current = editor.current.css.css.trim()
        current += ' ' + css 
        editor.current.css.css = current
        return
    }

}

export function updateCSS ( arr:Array , classe:string , valore:string ){
    if ( !classe ) return valore
    let css = classe.split(' ').filter ( cl => cl != '')
    arr.forEach ( a => {
            css = css.filter ( cl => { return cl != a && classe != ' ' } )
    })
    return css.join(' ') + ' ' + valore
}

export function matchCSS ( arr:object , classe:string ){
    let css = ''

    arr.forEach ( a => {
        classe.split ( ' ' ).forEach ( b => {
            b === a ? css = b : null
        })
        // classe.includes ( a ) ?
        //     css = a : null
    })
    return css
}

export function updateColorCSS ( arr:object , classe:string , valore:string , prefix:string ){
    let css = classe.split(' ').filter ( cl => cl != '')
    Object.keys(arr).forEach ( c => {
        arr[c].forEach ( a => {
            css = css.filter ( cl => { return cl != a.replace('bg',prefix) && classe != ' ' } )
        })
    })
    return css.join(' ') + ' ' + valore.replace('bg',prefix)
}

export function matchColorCSS ( arr:object , classe:string , prefix: string ){
    let css = ''
    Object.keys (arr).forEach ( c => {
        arr[c].forEach ( a => {
            classe.includes ( a.replace('bg',prefix) ) ?
                css = a : null
        })
    })
    return css
}

export function blockCSS ( block: Object ){
    return Object.values ( block.css ).join ( ' ' )
}


export function initColors(){
    let element = document.querySelector ( '#setupColors' )
    Object.keys ( editor.colors ).forEach ( cl => { 
        editor.colors[cl].forEach ( color => {
            element.classList.add ( color )
            setTimeout ( () => {
                element.classList.remove ( color )
            }, 2000 )
        })
        console.log ( 'adding colors for =>' , cl )
    })
    console.log ( 'colors loaded !')
    //element.remove()
    navigation._message ( 'Colors loaded !')
}


export function getCurrent (  ){
    return JSON.parse ( window.localStorage.getItem ( 'w-current' ) )
}

export function getEditor () {
    return JSON.parse ( window.localStorage.getItem ( 'editor') )
}