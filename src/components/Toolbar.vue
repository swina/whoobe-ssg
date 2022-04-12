<template>
    <div class="bars toolbar bg-bluegray-800" :class="$attrs.class">
        <template v-for="(tab,index) in tabber.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="selectTab(index)">{{ tab.label }} 
                <div @click="tabberRemoveTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template>
        <div v-if="!tabber.tabs">whoobe</div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'
import { tabber , tabberRemoveTab } from '/@/composables/useNavigation'

const editor = useStore()

const active = ( index: number ) => {
    return parseInt(tabber.tab) === parseInt(index) ? 'bg-purple-600' : 'bg-bluegray-700'
}

const selectTab = ( index: Number ) => {
    if ( tabber.tabs[index]?.component && tabber.tabs[index].component === 'Editor' ){
        //save current scroll before to open a new tab
        try {
            let target = document.querySelector('.editor-container')
            tabber.tabs[tabber.tab].scroll = target.scrollTop
        } catch (err ){
            console.log ( err )
        }        
        //switch tab
        
        tabber.tab = index 
        editor._document ( tabber.tabs[index].object )
        editor._current ( tabber.tabs[index].object.json.blocks )
        
        try {
            target.scrollTo(0,tabber.tabs[tabber.tab].scroll)
        } catch (err) {
            console.log ( 'no scroll target')
        }
    } else {
        tabber.tab = index
    }
}

</script>