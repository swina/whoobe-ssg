<template>
    <component 
        :ref="blockId" 
        :key="blockId" 
        :class="classe" 
        :id="blockId"
        :style="stile"
        :is="semantic">
        <template v-for="element in block.blocks" :key="element.id">
            <BlockPreview :block="element" v-if="element.type === 'container' && !element.data?.isLoop" :data="$attrs.data" :slug="$attrs.slug"/>
            <BlockLoopPreview :block="element" v-if="element.data?.isLoop" :limit="element.data.limit" :offset="element.data.offset"/>
            <ElementPreview :element="element" :key="randomID" v-if="element.type != 'container' && element.type != 'slider' && element.tag != 'icon' && element.tag != 'iconify'" :data="$attrs.data" :slug="$attrs.slug"/>
            <IconPreview :element="element" v-if="element.tag === 'icon' || element.tag === 'iconify'"/>
            <SliderPreview :block="element" v-if="element.type === 'slider'"/>
        </template>
    </component>
</template>

<script setup lang="ts">
import { computed , ref , onMounted , useAttrs , inject} from 'vue'
import { randomID } from '/@/composables/useActions'
import { message } from '/@/composables/useUtils';
import { graphQLRequest } from '/@/composables/useLocalApi'

const store = inject ( 'useStore') 
const props = defineProps (
    {
        block: Object
    }
)

const attrs = useAttrs()
const graphQLData = ref ({})

const stile = computed ( () => {
    let st = props.block.style
    if ( props.block.image?.url ){
        st += `;background-image:url(${props.block.image.url})`
    }
    return st
})

const semantic = computed( () => {
    return props.block.semantic ? props.block.semantic : 'div'
})
const classe = computed( ()  => {
    return Object.values ( props.block.css ).join ( ' ' )
})

const blockId = ref( randomID() ) //props.block.id)
onMounted( () => {
    try {
        if ( props.block?.alpine ) {
            //message.console = 'Settings AlpineJS directives'
            let element = document.querySelector ( '#' + blockId.value )
            Object.keys ( props.block.alpine ).forEach ( attr => {
                element.setAttribute(attr,props.block.alpine[attr])
            })
        }
        if ( props.block.data?.attributes ) {
            let element = document.querySelector ( '#' + blockId.value )
            Object.keys ( props.block.data.attributes ).forEach ( attr => {
                element.setAttribute ( attr , props.block.data.attributes[attr] )
            })
        }
        
    } catch( err ) {
        message.console = err
    }
})


</script>