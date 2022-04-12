<template>
 <input type="text" v-model="folder" @change="setFolder"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { status } from '/@/composables/useNavigation'
let folder = ref('new folder')

const setFolder = (e:Object) => {
    console.log ( folder.value , e )
}
</script>
