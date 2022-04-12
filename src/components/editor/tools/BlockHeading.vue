<template>
    <div v-if="editor.current" class="flex flex-col p-2">
        Heading
        <select v-model="editor.current.level">
            <option v-for="level in heading" :value="level">{{ level }}</option>
        </select>
        Text
        <textarea v-model="editor.current.content" class="my-2 font-mono text-xs"/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
const editor = useEditorStore()

const heading = computed ( () => {
    return [ 1 , 2 , 3 , 4 , 5 , 6 ]
})

const canHaveImage = computed ( () => {
    return editor.current && ( editor.current.type === 'container' || editor.current.element === 'img' ) ?
        true :
        editor._tool ( '' )
})
</script>