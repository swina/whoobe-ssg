<template>
    <div class="p-2 flex flex-col text-xs" :key="randomID()">
        <label class="capitalize">{{ option.title }}</label>
        <select v-model="optionCSS" class="border-none text-base text-white" @change="setCSSValue()">
            <option value=""></option>
            <option v-for="item in options" :value="item?.label?item.value:item" :key="item">{{ item?.label ? item.label.replace ( option.prefix ,'') : item.replace ( option.prefix , '' ) }}</option>
        </select>
        {{ optionVariantsCSS.join(' ') }}
    </div> 
</template>

<script setup lang="ts">
import { computed , ref , watch} from 'vue'
import classes from '/@/composables/tw.classes'
import { updateCSS , matchCSS } from '/@/composables/useActions'
import { useEditorStore } from '/@/stores/editor'
import { EDITOR , randomID } from '/@/composables/useEditor'

const props = defineProps ({
    option: Object
})

const options = classes[props.option.attr]

const editor = EDITOR //useEditorStore()



const setCSSValue = async () => {
    let css = await updateCSS ( opts , editor.current.css.css , optionCSS.value )
    editor.current.css.css = css
}

// editor.$subscribe((mutation, state) => {
//     optionCSS.value = matchCSS ( opts , editor.current.css.css )
// })

let opts = options.map ( opt => { return opt?.label ? opt.value : opt } )
let variants = ['xs:' , 'sm:' , 'md:', 'lg:' , 'xl:' ]
let optsVariants = []

opts.forEach ( opt => {
    variants.map ( variant => {
        optsVariants.push ( variant + opt )
    })
})

let optionCSS = ref ( matchCSS( opts , editor.current.css.css  ) )
let optionVariantsCSS = ref ([])


watch( () => editor.current, (block) => {
    if ( block?.css ){
        optionVariantsCSS.value = []
        optionCSS.value =  matchCSS( opts , editor.current.css.css  )
        optsVariants.forEach ( a => {
            editor.current.css.css.split(' ').forEach ( b => {
                b === a ? optionVariantsCSS.value.push ( b ) : null
            })
        }) 
    }
  }
)

// editor.$subscribe ( (mutation,state) => {
//     if ( editor.current && editor.current?.css ){
//         optionVariantsCSS.value = []
//         optionCSS.value =  matchCSS( opts , editor.current.css.css  )
//         optsVariants.forEach ( a => {
//             editor.current.css.css.split(' ').forEach ( b => {
//                 b === a ? optionVariantsCSS.value.push ( b ) : null
//             })
//         })
//     }
    
// })
</script>

