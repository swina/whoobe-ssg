<template>
<div class="flex text-xs h-16 items-center p-2 capitalize">
    {{ option.title }} <input type="checkbox" class="ml-2" :checked="editor.current.css.css.includes ( option.attr )" @change="setChecked"/>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , blockCSS , setCSSValue } from '/@/composables/useActions'

const editor = useStore()

const props = defineProps ({
    option: Object
})

let checked = ref (
    editor.current.css.css.includes ( props.option.attr ) ? true : false
)

let css = ''

const setChecked = ()=>{
    console.log ( editor.current.css.css.includes ( props.option.attr ) )
    if ( editor.current.css.css.includes ( props.option.attr ) ){
        let css = editor.current.css.css
        css = css.replace(props.option.attr,'')
        editor.current.css.css = css
    } else {
        setCSSValue ( props.option.attr )
    }
}
</script>