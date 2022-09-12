<template>
    <a v-if="getLink" :href="getLink" :title="getLinkTitle()">
        <component
            v-if="element"
            :key="randomID"
            :id="`${refID}${element.id}`"
            :ref="element.id"
            :is="component" 
            :type="element.type" 
            :class="classe"
            :style="element.style"
            :value="element.value" 
            v-html="getContent"
            :href="getLink"
            :src="getImage" 
            placeholder="" 
            :alt="element.tag==='image'?element.image?.tag?element.image.tag:'image':''"
            :data-id="element.id"
            :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
            :data-click="element.events.click">
        </component>
    </a>
    <component
        v-if="element && !getLink"
        :id="element.id"
        :key="randomID"
        :ref="element.id"
        :is="component" 
        :type="element.type" 
        :class="classe"
        :style="element.style"
        :value="element.value" 
        v-html="getContent"
        :href="getLink"
        :src="getImage" 
        placeholder="" 
        :alt="element.tag==='image'?element.image?.tag?element.image.tag:'image':''"
        :data-id="element.id"
        :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
        :data-click="element.events.click">
    </component>

</template>

<script setup lang="ts">
import { computed , ref , onMounted, inject } from 'vue'
import { message , ObjectValueByKey , getFormData } from '/@/composables/useUtils';
import { graphQLRequest  } from '/@/composables/useLocalApi'
import { assertObjectTypeIndexer } from '@babel/types';
import { randomID } from '/@/composables/useActions'


const store = inject('useStore')
const refID = randomID().replace('whoobe-','')
const props = defineProps (
    {
        element: Object,
        id: String,
        data: null,
        slug: String
    }
)

let element = props.element

if ( props.data && props.element.tag === 'button'){
    element.link = props.data[element.data.field]
}

const component = computed ( () => {
    return props.element.level ? 
        props.element.element + props.element.level : 
        props.element.element
})


const classe = computed ( () => {
    //if ( props.element.alpine && props.element.alpine.hasOwnProperty('x-bind:class') ) return ''
    return Object.values ( props.element.css ).join ( ' ' )
})

const blockId = ref(props.element.id)

const graphQL = ref ('')

const getContent = computed( () =>{
    if ( props.element.element != 'img' ){
        if ( props.data ){
            return props.element.data.field.split('.').reduce((o,i)=> o[i], props.data )
        }
        return props.element.content
    } 
    return props.element.content
})

  const getImage = computed(()=>{
    if ( props.data && props.element.data?.field ){
        return props.element.data.field.split('.').reduce((o,i)=> o[i], props.data ).url
    }
    return props.element.image && props.element.image.url ? props.element.image.url : 'no-image.png'
})

const getLink = computed(() => {
    if ( props.data && props.element.tag === 'button'){
        console.log ( props.data[element.data.field])
        if ( props.data[element.data.field] ){
            return props.data[element.data.field]
        }
    } 
    if ( props.data && props.element.link.includes('{slug}') ){
        return props.element.link.replace('{slug}',props.data.slug)
    }
    return element.link ? element.link : ''
    
})

const getLinkTitle = () => {
    if ( props.data && props.element.data.attributes?.title ){
        let title = props.element.data.attributes.title.replace ( '{data.' , '' ).replace('}','')
        return props.data[title]
    }
}

onMounted( async () => {
    try {
        let element:any = document.querySelector ( '#' + props.element.id )
        if ( element.events?.click ){
            console.log ( 'Parent=>' , element.parent() )
            getFormData ( props.element.id )
            // console.log ( props.block.attributes.id )
            // let form:any = document.querySelector ( '#' + props.block.data.attributes.id )
            // console.log ( form )
            // getFormData ( props.block.data.attributes.id )
            // form.addEventListener('submit', async function(event:any) {
            //     event.preventDefault();
            //     const formData = await new FormData(getFormData('#' + blockId.value ))
            //     console.log ( formData )
            //     let response:any = await fetch(props.block.events.click,{method:'POST',body: formData })
            //     console.log ( await response )
            // })
            // console.log ( form )
        }
        if ( props.element?.alpine ) {
            //message.console = 'Settings AlpineJS directives'
            let element = document.querySelector ( '#' + props.element.id )
            Object.keys ( props.element.alpine ).forEach ( attr => {
                element.setAttribute(attr,props.element.alpine[attr])
            })
        }
        if ( props.element.data?.attributes ) {
            let element = document.querySelector(`[data-id="${props.element.id}"]`)
            //let element = document.querySelector ( '#' + refID+props.element.id )
            await Object.keys ( props.element.data.attributes ).forEach ( attr => {
                if ( props.data && attr === 'title' ){
                    // let title = attr.replace ( '{element.data.' , '' ).replace('}','')
                    let title = props.element.data.attributes.title.replace ( '{data.' , '' ).replace('}','')
                    element.setAttribute ( 'title' ,  props.data[title] )
                } else {
                    element.setAttribute ( attr , props.element.data.attributes[attr] )
                }
            })
        }
    } catch( err ) {
        message.console = err + '\nElement ID = ' + props.element.id
    }
})

// onMounted( () => {
//     if ( props.element?.alpine ) {
//         let element = document.querySelector ( '#' + blockId.value )
//         console.log ( element , blockId.value )
//         Object.keys ( props.element.alpine ).forEach ( attr => {
//             console.log  ( attr )
//             //element.setAttribute(attr,props.block.alpine[attr])
//         })
//     }
// })
</script>

<script lang="ts">
console.log ( document.querySelectorAll('button') ) ;

</script>