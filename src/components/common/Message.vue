<template>
    <div class="z-modal w-full fixed left-0 bottom-0 p-5 text-center h-32  shadow-lg" v-if="message.data || newMsg" @click="setTimer" style="z-index:99999999999999999999;">
        <div class="m-auto w-1/3 border shadow-lg p-5 bg-bluegray-800 text-white text-lg border-0 border-transparent border-l-6  border-l-purple-700">
            {{ message.data || newMsg }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useNavigatorStore } from '/@/stores/navigator'
//import { message } from '/@/composables/useUtils';
import { store } from '/@/composables/useStore'

const navigation = useNavigatorStore()
let message = store.message

onMounted( () => {
    setTimer()
})

let newMsg = computed ( () => {
    return message.data 
})

watch ( newMsg , (newValue,oldValue) => {
    if ( newValue )
        setTimer()
})



const setTimer = ()=>{

    setTimeout ( () => {
        store.message.data = ''
    },4000)
}
</script>