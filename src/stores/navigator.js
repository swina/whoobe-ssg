// stores/navigator.js
import { defineStore } from 'pinia'

export const useNavigatorStore = defineStore('navigation', {
    state: () => ({ 
        sidebar: true,
        tabs:[],
        tab: -1,
        currentTab: null,
        message: '',
        uikits: {},
        currentKit: null,
        loading: false
    }),
    actions: {
        _sidebar(){
            this.sidebar = !this.sidebar
        },
        _tabs( payload ){
            this.tabs = payload
        },
        _addTab ( payload ){
            this.tabs.push ( payload )
            this.currentTab = payload.component
            this.tab = this.tabs.length - 1
        },
        _selectTab ( payload ){
            this.currentTab = this.tabs[payload].component
            //this.tab = payload
        },
        _tab ( payload ){
            this.tab = payload
        },
        _message ( payload ){
            this.message = payload
        },
        _uikits ( payload ){
            this.uikits[payload.name] = payload.data
        },
        _currentKit ( payload ){
            this.currentKit = payload
        },
        _loading (){
            this.loading = !this.loading 
        }
    },
    getters: {
        // getters receive the state as first parameter
        isSidebarActive(state) {
            return state.sidebar
        },
        getTabs(state){
            return state.tabs
        },
        currentTab(state){
            return state.tab
        },
    },
})