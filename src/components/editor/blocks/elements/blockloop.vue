<template>
<Block v-for="(item,index) in data" :block="props.block" :level="props.level" :data="item" :id="randomID()">
</Block>
</template>

<script setup lang="ts">
import { ref , watch , onMounted , reactive } from 'vue'
import { CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery } from "/@/composables/useGraphCMS"
import { randomID } from '/@/composables/useEditor';

import { store } from '/@/composables/useStore'

const editor = store.editor

const data = ref([])
const props = defineProps ({
    block: Object,
    level: String,
    limit: Number,
    offset: Number
})

const getData = async () => {
    const res = await getCMSQuery ( props.block.data.provider )
    console.log ( 'risposta' ,  await res )
    const response = await CMS[props.block.data.provider]
    data.value = response.map ( (record,index) => {
        console.log ( index , props.limit - 1)
        if( index >= props.offset && index < props.limit  ){
            return record
        }
    }).filter ( a => a )
    return data.value
}

watch ( () => props.limit , (limit) => {
    store.message.console = 'limit changed to ' + limit
    getData()
})

watch ( () => props.offset , (offset) => {
    store.message.console = 'offset changed to ' + offset
    getData()
})

if ( props.block ){
    getData()
}

onMounted(()=>{
    getData()
})

</script>