<template>
<Block v-for="item in data" :block="props.block" :level="props.level" :data="item">
</Block>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CMS_SCHEMA , CMS ,  getCMSQuery, getCMSSingleQuery } from "/@/composables/useGraphCMS"
import { EDITOR } from '/@/composables/useEditor';

const data = ref([])
const props = defineProps ({
    block: Object,
    level: String
})
const getData = async () => {
    const res = await getCMSQuery ( props.block.data.provider )
    console.log ( 'risposta' ,  await res )
    data.value = await CMS[props.block.data.provider]
}
if ( props.block ){
    getData()
}
</script>