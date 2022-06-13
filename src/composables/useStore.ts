import { reactive, toRefs } from 'vue'
import { EDITOR } from '/@/composables/useEditor'
import { CMS } from '/@/composables/useGraphCMS'
import { CONFIG_FILE } from './useLocalApi'
import Project from '/@/composables/useProjectClass'

export const store = reactive({
    status : {
        fileexplorer: null,
        loading: false,
        archive: false,
        dialog: null ,
        dialogCss : 'w-1/2',
        dialogTitle: '',
        dialogConfirm: false,
        dialogAction: '',
        current: null,
        currentFile: null,
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
    graphql : {
        data: CMS
    },
    project: {
        data: Object ,
        path: ''
    },
    clipboard : null,

})

export const useStore = () => {
    return toRefs(store)
}
export const loading = ()=>{
    store.status.loading =! store.status.loading 
}
