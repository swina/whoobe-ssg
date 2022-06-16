import { reactive } from 'vue'
import jp from 'jsonpath'
import classes from '/@/composables/tw.classes'

//Init all colors available
function createColors(){
    let allColors = {}
    classes.colors.forEach ( cl => {
        allColors[cl] = [`bg-${cl}-50`]
        allColors[cl].push ( `hover:bg-${cl}-50` )
        for ( let n=1 ; n < 10 ; n++ ){
            allColors[cl].push ( `bg-${cl}-${n*100}` )
            allColors[cl].push ( `hover:bg-${cl}-${n*100}`)
        }
    }) 
    return allColors
}

//reactive editor variables (replace usage of a store)
export const EDITOR = reactive({
    current:Object,     //selected object in the Editor
    document:Object,    //current template
    colors: createColors(),      //available colors
    blockBorders: {
        root: 'border-4 border-purple-500' ,
        rootHover: 'border-4 hover:border-purple-500 border-dashed',
        block: 'border-2 border-red-500' ,
        blockHover: 'border-2 hover:border-red-500 border-dashed',
        element: 'border border-bluegray-700',
        elementHover: 'border hover:border-bluegray-700 border-dashed'
    },
    tool:'',        //Editor tool selected (right toolbar)
    toolGroup:'',   //Tool Group
    wiTools:Object,      //WindiCSS Tools
    helper:'',
    elements:Object,
    preview:false
})


//check if element is a block
export function isBlock( block:object ){
    return block?.tag ? true : false
}

// Create a randomi ID
export function randomID(){
    return 'whoobe-' + Math.random().toString(36).substr(2, 5)
}

//clone object and reassign any id to a new random id
const traverse = function(o) {
    for (var i in o) {
      //fn.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
        traverse(o[i]);
      } else {
          if ( i === 'id' ){
              o[i] = randomID()
          }
      }
    }
    return o
}

//clone object and reassign any id to a new random id
export async function cloneBlock(o:Object) {
    if ( typeof o != 'object' || !isBlock(o) ) return null
    return await traverse(o)
}

//remove block
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

//move block up
export function moveBlock (){
    if ( !EDITOR.current || !EDITOR.document ) return
    console.log ( EDITOR )
    let component = EDITOR.document
    var parent = jp.parent ( component , '$..blocks[?(@.id=="' + EDITOR.current.id + '")]' )
    if ( parent.length === 1 ) return
    let i
    parent.forEach ( (p,index) => {
        if ( p.id === EDITOR.current.id ){
            i = index
        }
    })
    if ( i > 0 ){
        let obj = Object.assign({},EDITOR.current)
        parent.splice(i,1)
        parent.splice(i-1,0,obj)
    }
    EDITOR.document = component
}


// Find a node by a key value and return it
export function returnNode(currentNode,key,value,parent){
    if ( currentNode.hasOwnProperty(key) && currentNode[key] === value ) {
        return { node: currentNode , parent: parent };
    } else {
        try {
            let prevNode = currentNode
            var node = null
            for(var index in currentNode.blocks){
                console.log ( 'node search key ' , node )
                node = currentNode.blocks[index];
                
                if( node.hasOwnProperty(key) && node[key] === value ){
                    return { node:  node , parent: prevNode };
                }
                returnNode(node,key,value ,prevNode );
            }
            return { node:  node , parent: prevNode };
        } catch (err) {
            return null
        }
    }
}

export function usedFonts ( target:Object ) {
    let fonts = jp.query ( target , '$..blocks..font')
    if ( target.font ){
        fonts.push ( target.font )
    }
    let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
    if ( fnts ){
        return fnts.join('|').replaceAll(' ','+')
    }
    return ''
}



export async function BlockData (qry:Object,provider:String) {
    let editor = EDITOR
    let foundData = jp.parent ( editor.document.json , '$..blocks..data..provider')
    console.log ( foundData )
    // editor.current.blocks.forEach ( block => {
    //     if ( block.data?.field ){
    //         if ( qry[block.data.field]?.html ){
    //             block.content = qry[block.data.field].html ? qry[block.data.field].html : ''
    //         } else {
    //             if ( block.tag === 'button' ){
    //                 if  ( block.data?.field ) {
    //                     block.link = qry[block.data.field]
    //                 }
    //             } else {
    //                 if ( qry[block.data.field]?.url ){
    //                     block.image.url = qry[block.data.field].url
    //                 } else {
    //                     if ( qry[block.data.field] ){
    //                         block.content = qry[block.data.field]
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
}

export async function usedLinks ( target:Object ){
    let links = await jp.query ( target , '$..blocks..link' )
    console.log ( links )
    return links
}


export async function setEditorAsset (){
    
}