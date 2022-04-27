import { reactive } from 'vue'
import { EDITOR } from '/@/composables/useEditor'
import { CONFIG_FILE } from './useLocalApi'
import Project from '/@/composables/useProjectClass'

export const store = reactive({
    status : {
        fileexplorer: null,
        loading: false,
        archive: false,
        dialog: null ,
        dialogCss : 'w-1/3',
        dialogTitle: '',
        current: null,
        previewMode: false 
    },
    message : {
        console: '',
        data: ''
    },
    settings :{
        file: CONFIG_FILE,
        tab: 'settings',
    },
    toolbar: {
        tool: ''
    },
    tabber : {
        tabs : [],
        tab: -1,
        scroll: 0
    },
    useEditorSidebar : {
        sidebar: false,
        tool: '',
        group: ''
    },
    editor : EDITOR,
    project: {
        data: Object ,
        path: ''
    }
})

export const loading = ()=>{
    store.status.loading =! store.status.loading 
}
