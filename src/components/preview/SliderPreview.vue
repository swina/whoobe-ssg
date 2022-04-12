<template>
    <component :is="component" :id="block.id" :class="blockCSS(block)" class="relative" :x-data="slidesData()">
        <div class="flex flex-row w-full" v-if="block.data.mode==='tabs'">
            <template v-for="(tab,n) in block.blocks.length" :key="tab">
                <div @click="index=n" :x-on:click="slideClick(n)" class="carousel_tab cursor-pointer"  :class="tabCSS(n)" :data-active="n===index?true:false" :data-tab="n"  :data-css-active="block.data.css.active" :data-css="block.data.css.default + ' ' + block.data.css.hover" :x-bind:class="bindClass(block,n)">
                    <span v-if="block.data.mode==='tabs'">{{ block.data.slides[n].name }}</span>
                </div>
            </template>
        </div>
        <div v-for="(element,i) in block.blocks" class="slide-content" :x-show="slide(i)">
            <BlockPreview
                v-if="element.type === 'container'"
                :block="element"
                :class="block.data.settings.animation"/>
            <ElementPreview
                :id="element.id"
                :element="element"
                v-if="element.type !='container' && element.type != 'slider'"
                :class="block.data.settings.animation"/>
        </div>

        <div :data-slider="block.id" class="carousel_prev absolute left-0 top-0 bottom-0 flex flex-col justify-center z-modal cursor-pointer" 
            v-if="block.data.mode === 'slider'">
            <span @click="prev"><icon :icon="sliderNav('prev').icon" :x-on:click="slidePrev()" :class="sliderNav('prev').css"/></span>
        </div>
        <div :data-slider="block.id" class="carousel_next absolute right-0 top-0 bottom-0 flex flex-col justify-center z-modal cursor-pointer" 
            v-if="block.data.mode === 'slider'">
            <span @click="next"><icon :icon="sliderNav('next').icon" :x-on:click="slideNext()" :class="sliderNav('next').css"/></span>
        </div>
    </component>
</template>

<script setup lang="ts">
import { ref  } from 'vue'
import { useStore , blockCSS } from '/@/composables/useActions'

const editor = useStore()

let index = ref ( 0 )

const props = defineProps ({
    block: Object
})

const component = ref ( 'carousel' )

const slider = props.block

const classe = (i) => {
    let css = ''
    return i === index.value ? css : css += ' '
}

const tabCSS = (n) => {
    return n != index.value ? 
        props.block.data.css.default + ' ' + props.block.data.css.hover :
        props.block.data.css.active 
}

const slidesData = () => {
    return '{slide:0,slides:' + props.block.blocks.length + '}' //, slides:' + slides.length + '}'
}
const slideClick = (index) => {
    return "slide = " + index //+ "'"
}
const slide = (index) => {
    return "slide===" + index //+ "'"
}
const sliderNav = (direction:String) => {
    return { 
        icon: props.block.data.settings.navigation.icons[direction] , 
        css: props.block.data.settings.navigation.icons.css 
    }
}

const slidePrev = ()=>{
    return 'slide > 0 ? slide -= 1 : null';
}

const slideNext = ()=>{
    return 'slide < (slides-1) ? slide += 1 : null';
}

const bindClass = ( block:Object , index) => {
    return "{'" + block.data.css.active + "' : slide ==='" +  index + "'}"
}

const prev = () => {
    index.value > 0 ? index.value-- : null
}

const next = () => {
    console.log ( index , index.value < props.block.blocks.length ? 'next' : 'end' )
    index.value < (props.block.blocks.length-1) ? index.value++ : null
}


</script>

<style>
.fade-in-slide {
  animation: fadeIn 1.5s;
}
.slide-left {
    animation: slideLeft 1s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@keyframes slideLeft {
  0% {
      opacity:0;
      transform: translateX(100%);
  }
  100% {
      opacity:1;
      transform: translateX(0%);
  }
}
</style>