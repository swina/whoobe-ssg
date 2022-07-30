<template>
    <BlockPreview v-for="item in data" :block="props.block" :level="props.level" :data="item" :id="randomID()"/>
</template>

<script setup lang="ts">
import { ref , watch , onMounted, inject } from 'vue'
import { CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery, graphQLQuery } from "/@/composables/useGraphCMS"
import { randomID } from '/@/composables/useEditor';

const store = inject ( 'useStore' )

const data = ref([])
const props = defineProps ({
    block: Object,
    level: String,
    limit: Number,
    offset: Number
})

const getData = async () => {
    if ( !store.graphql?.data[props.block.id] ){
        try {
            let res = await graphQLQuery (  { client: props.block.data.client ,  model: props.block.data.model } )
            console.log ( res )
            //store.graphql.data[props.block.id][props.block.data.model] = await res
            data.value = await res
            if ( !store.graphql.data[props.block.id] ){
                store.graphql.data[props.block.id] = {}
                store.graphql.data[props.block.id][props.block.data.model] = await data.value
            }
        } catch ( err ) {
            console.log ( err )
        }
    } else {
        data.value = store.graphql.data[props.block.id][props.block.data.model]
    }
    // const res = await getCMSQuery ( props.block.data.provider )
    // console.log ( 'risposta' ,  await res )
    // const response = await CMS[props.block.data.provider]
    // data.value = response.map ( (record,index) => {
    //     console.log ( index , props.limit - 1)
    //     if( index >= props.offset && index < props.limit  ){
    //         return record
    //     }
    // }).filter ( a => a )
    // return data.value
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