<template>
    <div class="bg-white relative flex flex-col shadow border">
        <!-- <Icon icon="mdi:close" class="absolute top-0 right-0 text-3xl text-white z-modal cursor-pointer" @click="editor.helper('')"/>
        <div class="panelTitle">Grid Layout</div> -->
        <div class="flex items-center p-4">
            Columns 
            <select v-model="cols" class="h-8 w-16 ml-2">
                <option v-for="n in 6" :value="n" :key="n">{{n}}</option>
            </select>
        </div>
        <div class="grid my-4 p-4" :class="'grid-cols-' + cols">
            <template v-for="layout in colSpans[cols]">
                <template v-for="colspan in layout" :key="colspan">
                    <div class="flex flex-col m-1 border border-dashed border-gray-500 bg-bluegray-100 items-center justify-center cursor-pointer" :class="'col-span-' + colspan" @click="createGrid(colspan,layout)" :title="layout">
                        {{ colspan }}
                    </div>
                </template>
            </template>
        </div>
        <small class="m-auto">Click on a layout to create the grid</small>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { createGrid } from '/@/composables/useActions'
import { EDITOR } from '/@/composables/useEditor';

        const editor = EDITOR //useEditorStore()
        let n = ref(1)
        let cols = ref(3)
        let colSpans = ref ( {
            "1" : [ [1] ],
            "2" : [ [1 , 1] ],
            "3" : [ [1,1,1] , [1,2] , [2,1] ],
            "4" : [ [1,1,1,1], [2,2] , [1,3] , [1,1,2] , [1,2,1] , [ 2 , 1 , 1] , [ 3,1 ] ] ,
            "5" : [ [1,1,1,1,1],[1,1,1,2] , [1,1,3] , [1,4] , [1,1,2,1] , [1,2,1,1] , [ 1, 3 ,1] , [ 2,1,1,1] , [3,1,1] , [3,2] , [4,1] ],
            "6" : [ [1,1,1,1,1,1],[1,1,1,1,2] , [1,1,1,3] , [1,1,4] , [1,5] , [1,1,1,2,1] , [1,1,2,1,1] , [1,1,3,1] , [1,2,1,1,1] , [1,3,1,1] , [1,4,1] , [2,1,1,1,1] , [3,1,1,1] , [4,1,1] , [5,1] ],
        })
</script>
