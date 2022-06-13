<template>
    <BlockPreview v-for="item in data" :block="props.block" :level="props.level" :data="item" :id="randomID()"/>
</template>

<script setup lang="ts">
import { ref , watch , onMounted } from 'vue'
import { CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery } from "/@/composables/useGraphCMS"
import { randomID } from '/@/composables/useEditor';

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
    getData()
})

watch ( () => props.offset , (offset) => {
    getData()
})

onMounted(()=>{
    getData()
})
</script>