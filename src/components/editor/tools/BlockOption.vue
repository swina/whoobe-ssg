<template>
    <div class="p-2 flex flex-col text-xs">
        <label class="capitalize">{{ option.title }}</label>
        <select v-model="optionCSS" class="border-none" @change="setCSSValue()">
            <option value=""></option>
            <option v-for="item in options" :value="item?.label?item.value:item" :key="item">{{ item?.label ? item.label.replace ( option.prefix ,'') : item.replace ( option.prefix , '' ) }}</option>
        </select>
        {{ optionVariantsCSS.join(' ') }}
    </div> 
</template>

<script setup lang="ts">
import { computed , ref  } from 'vue'
import classes from '/@/composables/tw.classes'
import { updateCSS , matchCSS } from '/@/composables/useActions'
import { useEditorStore } from '/@/stores/editor'

const props = defineProps ({
    option: Object
})

const options = classes[props.option.attr]

const editor = useEditorStore()



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

let optionCSS = ref ('')
let optionVariantsCSS = ref ([])


editor.$subscribe ( (mutation,state) => {
    optionVariantsCSS.value = []
    optionCSS.value =  matchCSS( opts , editor.current.css.css  )
    optsVariants.forEach ( a => {
        editor.current.css.css.split(' ').forEach ( b => {
            b === a ? optionVariantsCSS.value.push ( b ) : null
        })
    })
    //optionVariantsCSS.value = matchCSS ( optsVariants , editor.current.css.css ) 
})

//const optionCSS = ref ({})

// const paddingCSS = ref ({})

// let prefix = ref('')

// const paddings = ref ( 
//     [ 
//         { label: 'padding' , prefix: `${props.prefix.value}-` },
//         { label: 'Left' , prefix: `${props.prefix.value}l-`},
//         { label: 'Right' , prefix: `${props.prefix.value}r-` },
//         { label: 'Top' , prefix: `${props.prefix.value}t-`},
//         { label: 'Bottom' , prefix: `${props.prefix.value}b-` },
//         { label: 'Horizontal' , prefix: `${props.prefix.value}x-`},
//         { label: 'Vertical' , prefix: `${props.prefix.value}y-`} 
//     ]
// )

// const options = ref ( classes.padding.map ( padding => padding.replace('p-','') ))

// paddings.value.forEach ( label => {
//     options.value.forEach ( value => {
//         console.log ( editor.current.css.css.includes ( `${label.prefix}${value}`) , `${label.prefix}${value}` )
//         editor.current.css.css.includes ( `${label.prefix}${value}` ) ?
//             paddingCSS.value[label.label] = value : null
//     })
// })



// const changeCSS = (label:String ,prfx:String )=>{
//     let css = prfx + paddingCSS.value[label] 
//     let elementCSS = editor.current.css.css.split(' ')
    
//     options.value.forEach ( value => {
//         console.log (`${prfx}${value}`)
//         elementCSS = elementCSS.filter ( cl => { return cl != `${prfx}${value}`  } )
//     })
//     editor.current.css.css = elementCSS.join(' ') 
//     if ( paddingCSS.value[label] )
//         setCSSValue ( css )
// }
</script>