// stores/editor.js
import { defineStore } from 'pinia'
import classes from '/@/composables/tw.classes'

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

export const useEditorStore = defineStore('editor', {
    state: () => ({ 
        elements: null,
        current: null,
        document: null,
        page: null,
        undo: null,
        wiTools: null,
        tool: 'css',
        toolGroup: null,
        helper: '',
        fonts: 'Alfa+Slab+One|Asap+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Barlow|Barlow+Condensed|Bungee+Inline|Expletus+Sans|Lora|Montserrat|Nunito+Sans|Oi|Open+Sans|PT+Sans|Roboto|Roboto+Condensed|Quattrocento|Raleway|Ultra|Yatra+One',
        colors: createColors(),
        showColumns: false,
        preview: false
    }),
    actions: {
        _elements ( payload ){
            this.elements = payload
        },
        _current( payload ){
            this.current = payload
        },
        _document ( payload ){
            this.document = payload
        },
        _page ( payload ){
            this.page = payload
        },
        _undo ( payload ){
            this.undo = payload
        },
        _wiTools ( payload ){
            this.wiTools = payload
        },
        _tool ( payload , current ){
            this.tool = payload
            this.current = current
            this.helper = ''
        },
        _toolGroup ( payload ){
            this.toolGroup = payload
            this.helper = ''
        },
        _helper ( payload ){
            this.helper = payload
        },
        toggleColumns (){
            this.showColumns = !this.showColumns
        },
        _preview (){
            this.preview = !this.preview
        }
    },
    getters: {
        availableElements ( state ){
            return state.elements
        },
        currentDocument ( state ){
            return state.document
        },
        currentBlock (state) {
            return state.current
        },
    },
})