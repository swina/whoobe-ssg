<template>
    <div class="bars toolbar bg-bluegray-800" :class="$attrs.class">
        <template v-for="(tab,index) in store.tabber.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="selectTab(index)">{{ tab.label }} 
                <div @click="tabberRemoveTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template>
        <div v-if="!store.tabber.tabs">whoobe</div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'
import { tabberRemoveTab } from '/@/composables/useNavigation'
import { EDITOR } from '../composables/useEditor';
import { store } from '/@/composables/useStore'

const editor = store.editor //EDITOR //useStore()
//let tabber = store.tabber

const props = defineProps({
    tab: Number
})

const active = ( index: number ) => {
    if ( index === 0 && store.tabber.tab === 0 ) return 'bg-purple-600'
    if ( store.tabber.tabs.length === 1 ) return 'bg-purple-600'
    if ( props.tab <= (store.tabber.tabs.length - 1 ) ){
        return parseInt(props.tab) === parseInt(index) ? 'bg-purple-600' : 'bg-bluegray-700'
    } else {
        selectTab ( store.tabber.tabs.length - 1 )
        return parseInt(store.tabber.tabs.length-1) === parseInt(index) ? 'bg-purple-600' : 'bg-bluegray-700'
    }
}

const selectTab = ( index: Number ) => {
    if ( store.tabber.tabs[index]?.component && store.tabber.tabs[index].component === 'Editor' ){
        //save current scroll before to open a new tab
        try {
            let target = document.querySelector('.editor-container')
            store.tabber.tabs[tabber.tab].scroll = target.scrollTop
        } catch (err ){
            console.log ( err )
        }        
        store.tabber.tab = index 
        editor.document = store.tabber.tabs[index].object 
        editor.current = store.tabber.tabs[index].object.json.blocks 
        try {
            target.scrollTo(0,store.tabber.tabs[tabber.tab].scroll)
        } catch (err) {
            console.log ( 'no scroll target')
        }
    } else {
        store.tabber.tab = index
    }
}

</script>