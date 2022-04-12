<template>
    <div class="flex flex-col p-2 col-span-2">
        Font Family
        <select v-model="selectedFont" @change="setFont" class="border-none text-xs">
            <option v-for="(font,index) in options" :value="font" :key="font"> {{ font }}</option>
        </select>
        <div class="flex flex-wrap justify-around py-2">
            <button v-for="button in buttons" :key="button.css" class="square" :class="button.css" @click="setCSSValue(button.css,$event)" :title="button.css">{{ button.label }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import classes from '/@/composables/tw.classes'
import { updateCSS , matchCSS, setCSSValue } from '/@/composables/useActions'

const sizes = classes.textSize
const weights = classes.fontWeight
const editor = useEditorStore()
const fonts = editor.fonts
const options = fonts.replaceAll('+',' ').split('|')
let buttons = ref ( [
    { label: 'I' , css: 'italic' },
    { label: 'U' , css: 'underline' },
    { label: 'aa' , css: 'capitalize' },
    { label: 'aa' , css: 'uppercase' },
    { label: 'aa' , css: 'lowercase' },
])
let selectedFont = ref(
    editor.current.font ? editor.current.font : ''
)
let selectedSize = ref('')
let selectedWeight = ref ('')

selectedSize.value = matchCSS ( sizes , editor.current.css.css )

const setFont = computed( () => {
    editor.current.style = `font-family:"${selectedFont.value}"` 
    editor.current.font = selectedFont.value
})
const setSize = computed( () => {
    editor.current.css.css = updateCSS ( sizes , editor.current.css.css , selectedSize.value )
    
})

const setWeight = computed ( () => {
    editor.current.css.css = updateCSS ( weights , editor.current.css.css , selectedWeight.value )
})


</script>