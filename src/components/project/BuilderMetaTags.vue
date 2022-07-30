<template>
    <div class="flex flex-col p-4 bg-white">
        <div class="flex items-center">
            <label class="text-lg mr-2">Open Graph</label>
            <input type="checkbox" v-model="store.project.data.meta.og.enabled"/>
        </div>
        
        <div v-if="store.project.data.meta.og.enabled" class="flex flex-col p-2 bg-gray-200 rounded">
            <template v-for="item in Object.keys(store.project.data.meta.og)">
                <div v-if="item!='enabled'" class="flex flex-col my-2">
                    <label class="text-xs capitalize">{{item.replace('_',' ')}}</label>
                    <input type="text" v-model="store.project.data.meta.og[item]"/>
                </div>
            </template>
            
        </div>

        <div class="flex items-center mt-4">
            <label class="text-lg mr-2">Twitter</label>
            <input type="checkbox" v-model="store.project.data.meta.twitter.enabled"/>
        </div>
        
        <div v-if="store.project.data.meta.twitter.enabled" class="flex flex-col p-2 bg-gray-200 rounded">
            <template v-for="item in Object.keys(store.project.data.meta.twitter)">
                <div v-if="item!='enabled'" class="flex flex-col my-2">
                    <label class="text-xs capitalize">{{item.replace('_',' ')}}</label>
                    <input type="text" v-model="store.project.data.meta.twitter[item]"/>
                </div>
            </template>
            
        </div>
    </div> 
</template>

<script setup lang="ts">
import { inject } from 'vue'
import Project  from '/@/composables/useProjectClass'
const store = inject('useStore')


if ( !store.project.data?.meta ){
    let project = new Project()
    store.project.data['meta'] = project.meta
}

</script>