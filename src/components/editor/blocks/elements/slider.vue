<template>
    <div 
        @click="selectBlock(block,$event)"
        :id="block.id" class="flex flex-col border-yellow-400 border-2 border-dashed m-2 w-full border p-1 relative" 
        :class="'z-' + level">
        <div class="absolute top-0 right-0 m-1 flex items-center">
            <span class="text-xs text-gray-300 p-1">{{ block.data.mode }}</span>
            <span @click="newSlide" title="Add slide"><icon icon="mdi:add"/></span>
            <span @click="duplicateSlide" class="mx-2" title="Duplicate current slide"><icon icon="mdi:content-duplicate"/></span>
            <span @click="removeSlide" class="mx-2" title="Remove current slide"><icon icon="mdi:delete"/></span>
            <span @click="selectBlock ( slider , $event ) , editor._tool ( 'slider' , editor.current )" title="Settings"><icon icon="mdi:settings"/></span>
        </div>
        <div class="flex flex-row w-full">
            <template v-for="(tab,n) in slider.blocks.length" :key="tab">
                <span @click="index=n,sliderIndex.index=n,selectBlock(slider.blocks[n],$event)" class="px-1 text-center text-sm" :class="tabCSS(n)">
                    <span v-if="slider.data.mode==='tabs'">{{ slider.data.slides[n].name }}</span>
                    <span v-else> Slide {{ n + 1 }}</span>
                </span>
            </template>
        </div>
        <div :class="block.css.css">
            <template v-for="(element,i) in slider.blocks">
                <block
                    v-if="element.type === 'container' && index === i"
                    :block="element"
                    :level="level+1"/> 
                <Element
                    :id="element.id"
                    :element="element"
                    v-if="element.type !='container' && element.type != 'slider'  && index === i"
                    :level="parseInt(level)+1"
                    />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref  } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useStore, selectBlock , cloneBlock , blockCSS ,removeBlock, sliderObject , sliderIndex } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu'
import Element from '/@/composables/useElementClass'
const editor = useStore()

const index = ref(0)


const props = defineProps ( {
    block: Object,
    level: Number
})


const classe = computed(()=>{
    return Object.values ( slider.value.blocks[index.value].css ).join ( ' ' )
})

const slider = ref ( props.block )

sliderObject.slider = slider.value

const contextMenu = ( event: object , flag: boolean )=>{
    flag ?
        openContextMenu(event) :
        toggleContext(event)
}

const tabCSS = (n)=>{
    return n != sliderIndex.index ? 
        slider.value.data.css.default + ' ' + slider.value.data.css.hover :
        slider.value.data.css.active 
}

const duplicateSlide = () => {
    let slide = cloneBlock ( slider.value.blocks[sliderIndex.index] )
    slider.value.data.slides.push ( { name: 'new slide' } ) 
    slider.value.blocks.push ( slide )
}

const newSlide = () =>{
    let slide = new Element().Flexbox().setCss('p-8 w-full')
    slider.value.data.slides.push ( { name: 'new slide' } ) 
    slider.value.blocks.push ( slide )
    selectBlock ( slide , editor.current )
}

const removeSlide = () => {
    slider.value.data.slides.splice ( sliderIndex.index , 1)
    slider.value.blocks.splice ( sliderIndex.index , 1)
    sliderIndex.index = slider.value.blocks.length - 1
}
</script>