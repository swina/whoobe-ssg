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