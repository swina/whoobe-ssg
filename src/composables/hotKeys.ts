import { onMounted } from 'vue'
//import { useEditorStore } from '/@/stores/editor'
//import { useNavigatorStore } from '/@/stores/navigator'
import { getLocalStorage , setLocalStorage , CLIPBOARD , UNDO , PREVIEW } from '/@/composables/useActions'
import { cloneBlock, removeBlock , EDITOR } from '/@/composables/useEditor';
import { store } from '/@/composables/useStore'
const editor = EDITOR //store.editor //useEditorStore()
//const navigation = useNavigatorStore()

let message = store.message 

// by convention, composable function names start with "use"
export function hotKeys() {
    console.log ( 'mounting hotkeys' )
    //onMounted(()=>{ 
        window.addEventListener("keydown", e => {

            //Editor HotKeys
            //
            
            // if ( e.altKey ){
            //      console.log ( e.altKey , e.code )
            // }
            // delete block
            if ( e.altKey && e.code === 'KeyX' ){
                if ( editor.current && editor.document ){
                    setLocalStorage ( UNDO , editor.document.json )
                    //window.localStorage.setItem('whoobe-undo' , JSON.stringify(editor.document.json ))
                    removeBlock ( editor.current.id , editor.document.json.blocks )
                    //navigation._message ( 'Block removed' )
                }
            }
            if ( e.altKey && e.code === 'KeyZ' ){
                console.log ( 'Undo delete block' )  
                editor.document.json = getLocalStorage ( UNDO ) 
                //JSON.parse ( window.localStorage.getItem ( 'whoobe-undo' ) )
            }

            if ( e.altKey && e.code === 'KeyD' ){
                console.log ( 'Duplicate block' )  
            }
            if ( e.altKey && e.code === 'KeyC' ){
                if ( editor.current )
                    setLocalStorage ( CLIPBOARD , editor.current )
            }
            if ( e.altKey && e.code === 'KeyQ' ){
                if ( editor.current )
                    e.stopImmediatePropagation()
                    setLocalStorage ( CLIPBOARD , editor.current )
            }
            if ( e.altKey && e.code === 'KeyV' ){
                e.stopImmediatePropagation()
                let block = cloneBlock ( getLocalStorage ( CLIPBOARD ) )
                if ( block ){
                    editor.current.blocks.push ( block )
                }
            }
            if ( e.altKey && e.code === 'KeyB' ){
                if ( editor.current ){
                    editor._tool ( 'snippets' )
                }
            }
            if ( e.altKey && e.code === 'KeyN' ){
                if ( editor.current ){
                    editor._tool ( 'elements' )
                }
            }
            if ( e.altKey && e.code === 'KeyG' ){
                e.stopImmediatePropagation()
                store.message.data = 'Copy css & style'
                if ( editor.current ){
                    store.clipboard = {
                        css: editor.current.css,
                        style: editor.current.style,
                        font: editor.current.font
                    }
                }
                return
            }
            if ( e.altKey && e.code === 'KeyH' ){
                e.stopImmediatePropagation()
                store.message.data = 'Paste css & style' 
                console.log ( editor.current )
                if ( editor.current && store.clipboard && store.clipboard?.css ){
                    console.log ( editor.current.id )
                    editor.current.css = store.clipboard.css
                    editor.current.style = store.clipboard.style
                    editor.current.font = store.clipboard.font
                    store.clipboard = null
                }
                return
            }
            if ( e.altKey && e.code === 'KeyA' ){
                if ( editor.preview ) {
                    //editor._preview()
                    return
                }
                if ( editor.document ){
                    setLocalStorage ( PREVIEW , editor.document )
                    //editor._preview ( )
                }
            }
            if ( e.altKey && e.code === 'Comma' ){
                if ( editor.current ){
                    //editor._tool ( 'css' )
                }
            }
           
        }) 
        
    //})
}

