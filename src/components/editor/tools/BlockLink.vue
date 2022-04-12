<template>
    <div class="flex flex-col p-2" v-if="editor.current">
        Link
        <input type="text" v-model="editor.current.link"/>
        Anchor
        <input type="text" v-model="editor.current.anchor"/>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '/@/composables/useActions'

const editor = useStore()

</script>