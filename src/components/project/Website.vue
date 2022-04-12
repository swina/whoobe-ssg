<template>
    <!-- <div  class="p-4 md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-12 pr-20 top-0 left-0 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        </div>
    <FileExplorer context="projects" :open="open" @close="open=!open" @file="loadFile"/>
    <div class="overflow-hidden max-h-screen min-h-screen mt-0 inset-0 website bg-bluegray-200 pt-8 p-2" style="max-height:100vh;margin:0;">
        <div class="flex flex-row w-full border border-black"> 
            <div class="w-1/6 flex flex-col border-r border-black text-lg text-gray-500">
                <div class="px-2 py-4 border-b border-gray-700 text-gray-500 cursor-pointer text-xs">
                    <div class="flex flex-row justify-around text-2xl">
                        <icon icon="ic:baseline-save" class="text-2xl" title="Save project" @click="saveProject"/>
                        <icon icon="ic:baseline-file-download" class="text-2xl" title="Download project" @click="projectList"/>
                        <icon icon="ic:baseline-file-upload" class="text-2xl" title="Upload project" @click="saveProjects"/>
                        <icon icon="ic:baseline-web" class="text-2xl" title="Export to builder" @click="saveProject"/>
                    </div>
                </div>
                <div v-if="projects" class="flex flex-col">
                    <select v-model="projectName" @change="loadProject">
                        <option value="">Select a project</option>
                        <option v-for="item in projects" :value="item">{{ item.split('.')[0] }}</option>
                    </select>
                </div>
            </div> -->

    <div v-if="project" class="bg-bluegray-500 p-1 text-white">
        Project: {{ project.data.name }}
    </div>    
    <div class="flex w-full border" v-if="project">
        <div class="w-1/4">
            <div class="px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="tab='settings'" :class="tab==='settings'?'bg-white':''">
                Settings
            </div>
            <div class="px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="tab='header'" :class="tab==='header'?'bg-white':''">
                Header
            </div>
            <div class="px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="tab='homepage'" :class="tab==='homepage'?'bg-white':''">
                Homepage
            </div>
            <div class="px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="tab='pages'"  :class="tab==='pages'?'bg-white':''">
                Pages
            </div>
            <div class="px-2 py-4 border-b border-gray-300 hover:bg-white cursor-pointer" @click="tab='footer'" :class="tab==='footer'?'bg-white':''">
                Footer
            </div>
            <div class="px-2 py-4 border-b border-gray-300 text-gray-500 cursor-pointer text-xs">
                <div class="flex flex-row justify-around text-2xl">
                    <icon icon="ic:baseline-save" class="text-2xl" title="Save project" @click="saveFile(project)"/>
                    <!-- <icon icon="ic:baseline-file-download" class="text-2xl" title="Download project" @click="projectList"/>
                    <icon icon="ic:baseline-file-upload" class="text-2xl" title="Upload project" @click="saveProjects"/> -->
                    <icon icon="cib:svelte" class="text-2xl" title="Export to SvelteKit" @click="activeProject(project)"/>
                </div>
            </div>
        </div>
        <!-- <div class="px-2 py-4 border-b text-gray-400 cursor-pointer text-xs">
            Use this tool to export a website to other frameworks in order to build static websites
        </div> -->
        <div class="w-5/6 flex flex-col border-b text-gray-400 overflow-x-hidden">
            
            <!-- <h5 class="border-b p-4 capitalize text-lg border border-l-0">{{tab}}</h5> -->

            <div class="flex flex-col p-4 bg-white" v-if="tab==='settings'">
                <label class="text-xs mt-2">Framework</label>
                <select v-model="project.data.framework">
                    <option value="sveltekit" selected>Whoobe for SvelteKit</option>
                </select>
                <label class="text-xs mt-2">Project Name</label>
                <input type="text" v-model="project.data.name"/>
                <label class="text-xs mt-2">Website Title</label>
                <input type="text" v-model="project.data.title"/>
                <label class="text-xs mt-2">Description</label>
                <textarea class="w-full" v-model="project.data.description"/>
                <label class="text-xs mt-2">Analytics</label>
                <input type="text" v-model="project.data.analytics" placeholder="GA-xxxxx"/>
                <label class="text-xs mt-2">Demo Website URL</label>
                <input type="text" class="w-full" v-model="project.data.devServer" placeholder="http://localhost:3000"/>
                <div class="mt-4 mx-auto">
                    <button @click="saveProject" class="bg-purple-600 rounded hover:bg-purple-800 mx-auto text-white">Save</button>
                </div>
            </div>
            <div v-if="tab!='pages' && tab!='settings'">
                {{ project.data[tab].title }}
                <div class="scale-25" v-html="project.data[tab].html">
                </div>
            </div>
            <div v-if="tab==='pages'">
                <template v-for="page in Object.keys ( project.data.pages )">
                    slug {{ page }} {{ project.data.pages[page].name }}
                </template>
            </div>
        </div>  
        <Preview class="hidden" v-if="editor.document"/>
    </div>                      
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { project } from '/@/composables/useProject'
import { saveFile , activeProject } from '/@/composables/useLocalApi'
import { useStore } from '/@/composables/useActions'

const editor = useStore()
const props = defineProps ({
    data:Object
})

if ( project ){
    console.log ( project.data )
}
const tab = ref ('settings')
// let mode = ref ( 'list' )
//let project = ref ( props.data )
// let projectName = ref ('')
// let current = ref (null)

const tabClass = (tab) => {
    return tab === tab.value ? 'bg-white' : ''
}


// const listProjects = async () => {
//     const list = await  fetch ( 'http://localhost:9000/projects' )
//     projects.value = await list.json()
//     console.log( projects )
// }

// const loadProject = async () => {
//     const resp = await fetch ( 'http://localhost:9000/projects/' + projectName.value )
//     current.value = await resp.json()
// }

// const saveProject = async () =>{
//     const saved = await fetch ( 'http://localhost:9000/project/' + project.name.replaceAll(' ','-').toLowerCase() ,{
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(project) 
//     })
//     console.log ( await saved.json() )
// }
// listProjects()
</script>
<!-- 
<style>
select , textarea {  padding:5px; }
input { border:0; border-bottom: 1px solid #566ebb; }
</style> -->

<!-- import { mapState } from 'vuex'
import { codemirror } from 'vue-codemirror-lite'
import dragula from 'dragula'

export default {
    name: 'WebsiteProject',
    data:()=>({
        tab: 'settings',
        framework: '',
        project: {
            name: '',
            framework: '',
            pages:{}, 
            homepage: {},
            header: {},
            footer: {},
            fonts:null,
            animations:null,
            analytics:null,
            title: 'My website',
            description: 'A website created with whoobe',
            analytics: '',
            devServer: 'http://localhost:3000'
        },
        kits: false,
        kit: null,
        newPage: null,
        preview: null,
        edit: false,
        html: '',
        current: {}, 
        currentNode: null,
        changeTitle: null,
        newRoute: false,
        changeSlug: null,
        nodes: null,
        treeDisplayData: null
    }),
    components:{
        codemirror ,
        'BlockContainerPrvw'    : () => import ( '@/components/blocks/preview/BlockContainer.vue'),
    },

    computed:{
        ...mapState ( ['editor','desktop'] ),
        
    },
    watch:{
        '$store.state.editor.project' : function(value){
            if ( !value ) return
            this.project = value
        },
        project (value){
            this.currentTab ( this.tab )
        }
    },
    methods: {
        
        currentTab(tab){
            this.tab = tab
            this.newPage = null
        },
        tabClass ( tab ){
            return this.tab === tab ? 'bg-white' : ''
        },
        projectTree(){
            let nodes = []
            if ( this.project && this.project.pages ){
                let pages = Object.keys(this.project.pages)
                const pagesNodes= pages.map ( slug => { 
                        if ( slug ){
                            return { 
                                slug: this.project.pages[slug].slug , 
                                text: this.project.pages[slug].title , 
                                preview: this.project.pages[slug].preview  ,
                                title: this.project.pages[slug].title 
                            }
                        } else {
                            return {
                                slug: slug,
                                text: 'new page (drag here)',
                                preview: null,
                                title: 'new page'
                            }
                        }
                    })
                nodes = [
                            { 
                                text: 'Header ' ,
                                nodes : this.project.header ? [ {text:this.project.header.title,preview:this.project.header.preview , type: 'header'}] : [],
                                type: 'header',
                                status: false 
                            },
                            { 
                                text: 'pages' , 
                                nodes: pagesNodes,
                                status: false,
                                type: 'page'
                            },
                            { text: 'Footer ' , 
                                nodes: this.project.footer ? [ { text: this.project.footer.title , preview: this.project.footer.preview , type: 'footer'} ] : [] ,
                                status: false,
                                type: 'footer'
                            },
                    
                ]
            }
            this.nodes = nodes
            this.treeDisplayData = nodes
        },
        setNodeStatus(n){
            this.nodes[n].status = !this.nodes[n].status
        },
        isOpen(node){
            console.log ( this.current[node] )
            return false
        },
        saveSettings(){
            window.localStorage.setItem ( 'whoobe-project' , JSON.stringify (this.project) )
            this.$store.dispatch ( 'project' , this.project )
            this.$eventBus ( 'notification' ,'Project saved' )
            this.projectTree()   
        },
        saveProjectAs(){
            this.$saveProjectAs()
        },
        importProject(){
            this.$dialogBus ( 'importProject' )
        },
        exportProject(){
            this.$exportProject()
        },
        addComp ( template ){
            console.log ( template )
            this.newPage = template
            
        },
        previewLoaded(){
            console.log ( 'Preview loaded' )
            let page = document.getElementById('content')
            try {
                let html = page.innerHTML
                html = html.replaceAll ( 'http://localhost:3030/' , '' )
                
                let exportPage = this.$exportPage ( html, this.newPage )
                if ( this.tab != 'pages' ){
                    this.project[this.tab] = exportPage
                    this.saveSettings()
                } else {
                    let slug = this.$slugify ( this.newPage.name )
                    this.project.pages[slug] = exportPage
                    this.saveSettings()
                }
            } catch ( error ) {
                console.log ( error )
            }
        },
        addRoute(){
            if ( !this.changeSlug ){
                this.project.pages['home'] = {}
            } else {
                this.project.pages[this.changeSlug] = {}
            }
            this.newRoute = false
            this.saveSettings()
        },
        addDocument(target){
            let exportPage = this.$exportPage ( this.editor.html )
            let slug = this.$slugify ( exportPage.title )
            exportPage.slug = slug
            target === 'page' ?
                this.project.pages[slug] = exportPage :
                    this.project[target] = exportPage
            this.saveSettings()  
                          
        },
        removeDocument ( slug , target , index ){
            console.log ( 'remove=>' , slug , target , index )
            if ( target === 'page' ){
                let el = document.querySelector ( '#page_' + index )
                el.classList.add ( 'hidden' )
                if ( !slug ){
                    delete this.project.pages.home
                } else {
                    delete this.project.pages[slug]
                }
            } else {
                this.project[target] = {}
            }
            this.preview = null
            this.saveSettings()
        },
        updatePage(slug){
            let oldPage = this.project.pages[slug]
            if ( !this.changeSlug ){
                this.project.pages['home'] = oldPage
                this.project.pages['home'].slug = 'home'
            } else {
                this.project.pages[this.changeSlug] = oldPage
                this.project.pages['home'].slug = this.changeSlug
                delete this.project.pages[slug]
            }
            this.saveSettings()
        }
    },
    mounted(){
        let  target = document.querySelector('#previewTemplate') 
        if ( target ){
            target.addEventListener ( 'change' , (e) => {
                if ( e ) console.log ( 'changed' )
            })
        }
        let project = window.localStorage.getItem ( 'whoobe-project' ) 
        if ( project ){
            this.project = JSON.parse ( project ) 
            this.$store.dispatch ( 'project' , JSON.parse ( project ) )
            this.projectTree()
        }
        //if ( this.$attrs.options ){
            var drake = dragula([document.querySelectorAll('.project-pages'),document.querySelector('.project-page')])
            console.log ( drake.containers )
            let vm = this
            var drake = dragula({
                isContainer: function (el) {
                    if ( el.classList.contains ( 'project-page') ){
                        return true
                    }
                },
                copy: true,
                copySortSource: false
            });
            // let vm = this
            drake.on ( 'drop' , (el,target,source,sibling) => {
                console.log ( el )
                if ( el.classList.contains ( 'project-page' ) ){
                    console.log ( el.getAttribute ( 'data-page' ) , el.getAttribute ( 'data-kit') )
                    let page = vm.desktop.uikits[el.getAttribute('data-kit')].templates[el.getAttribute('data-page')]
                    target.appenChild ( el )
                    vm.addComp ( page )
                }
            })
        //}
    }

}
</script>

<style>
.CodeMirror {
    height: 30rem;
}
</style> -->