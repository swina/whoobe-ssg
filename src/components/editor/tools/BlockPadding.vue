<template>
    <div class="p-2 flex flex-col">
        <template v-for="padding in paddings">
            <label class="capitalize">{{ padding.label }}</label>
            <select v-model="paddingCSS[padding.label]" @change="changeCSS(padding.label,padding.prefix)">
                <option value=""></option>
                <option v-for="option in options" :value="option" :key="padding.label + '-' + option">{{ option }}</option>
            </select>
        </template>
        <component :is="test"/>
    </div> 
</template>

<script setup lang="ts">
import { computed , ref , defineAsyncComponent } from 'vue'
import classes from '/@/composables/tw.classes'
import { setCSSValue , matchCSS } from '/@/composables/useActions'
import { useEditorStore } from '/@/stores/editor'

const editor = useEditorStore()
const paddingCSS = ref ({})
let prefix = ref('')

const paddings = ref ( 
    [ 
        { label: 'padding' , prefix: 'p-' },
        { label: 'Left' , prefix: 'pl-'},
        { label: 'Right' , prefix: 'pr-' },
        { label: 'Top' , prefix: 'pt-'},
        { label: 'Bottom' , prefix: 'pb-' },
        { label: 'Horizontal' , prefix: 'px-'},
        { label: 'Vertical' , prefix: 'py-'} 
    ]
)

const test = computed ( () => {
    return defineAsyncComponent ( () => import ( './BlockFont.vue' ) ) 
} )

const options = ref ( classes.padding.map ( padding => padding.replace('p-','') ))

paddings.value.forEach ( label => {
    options.value.forEach ( value => {
        editor.current.css.css.includes ( `${label.prefix}${value}` ) ?
            paddingCSS.value[label.label] = value : null
    })
})


const changeCSS = (label:String ,prfx:String )=>{
    let css = prfx + paddingCSS.value[label] 
    let elementCSS = editor.current.css.css.split(' ')
    
    options.value.forEach ( value => {
        console.log (`${prfx}${value}`)
        elementCSS = elementCSS.filter ( cl => { return cl != `${prfx}${value}`  } )
    })
    editor.current.css.css = elementCSS.join(' ') 
    if ( paddingCSS.value[label] )
        setCSSValue ( css )
}
</script>