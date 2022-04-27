<template>
    <a v-if="getLink" :href="getLink">
        <component
            v-if="element"
            :id="element.id"
            :ref="element.id"
            :is="component" 
            :type="element.type" 
            :class="classe"
            :style="element.style"
            :value="element.value" 
            v-html="getContent"
            :href="getLink"
            :src="getImage" 
            :placeholder="element.placeholder" 
            :alt="element.tag==='image'?element.image?.tag?element.image.tag:'image':''"
            :data-id="element.id"
            :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
            :data-click="element.events.click">
        </component>
    </a>
    <component
        v-if="element && !getLink"
        :id="element.id"
        :ref="element.id"
        :is="component" 
        :type="element.type" 
        :class="classe"
        :style="element.style"
        :value="element.value" 
        v-html="getContent"
        :href="getLink"
        :src="getImage" 
        :placeholder="element.placeholder" 
        :alt="element.tag==='image'?element.image?.tag?element.image.tag:'image':''"
        :data-id="element.id"
        :data-icon="element.tag==='iconify' || element.tag === 'icon'?element.data.icon:null"
        :data-click="element.events.click">
    </component>

</template>

<script setup lang="ts">
import { computed , ref , onMounted } from 'vue'
import { message} from '/@/composables/useUtils';

const props = defineProps (
    {
        element: Object,
        id: String,
        data: Object
    }
)

let element = props.element

if ( props.data && props.element.tag === 'button'){
    console.log ( props.data[element.data.field])
    element.link = props.data[element.data.field]
}

const component = computed ( () => {
    // return props.element.link ? 
    //     'a' : 
    return props.element.level ? 
        props.element.element + props.element.level : 
        props.element.element
})


const classe = computed ( () => {
    return Object.values ( props.element.css ).join ( ' ' )
})

const blockId = ref(props.element.id)

const getContent = computed(()=>{
    if ( props.data && props.element.tag === 'button'){
        element.link = props.data[props.element.data.field]
        return props.element.content
    }
    if ( props.data && props.element.data?.field ){
        return props.data[props.element.data.field]
    }
    return props.element.content
})

const getImage = computed(()=>{
    if ( props.data && props.element.data?.field ){
        return props.data[props.element.data.field].url
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
    return element.link ? element.link : ''
    
})

onMounted( () => {
    try {
        if ( props.element?.alpine ) {
            //message.console = 'Settings AlpineJS directives'
            let element = document.querySelector ( '#' + props.element.id )
            Object.keys ( props.element.alpine ).forEach ( attr => {
                element.setAttribute(attr,props.element.alpine[attr])
            })
        }
        if ( props.element.data?.attributes ) {
            
            let element = document.querySelector ( '#' + props.element.id )
            Object.keys ( props.element.data.attributes ).forEach ( attr => {
                element.setAttribute ( attr , props.element.data.attributes[attr] )
            })
        }
    } catch( err ) {
        console.log ( 'Element ID ' , props.element.id )
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