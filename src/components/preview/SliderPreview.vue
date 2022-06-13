<template>
    <component :is="component" :id="block.id" :class="blockCSS(block)" class="relative" :x-data="getData()">
        <div class="flex flex-row w-full" v-if="block.data.mode==='tabs'">
            <template v-for="(tab,n) in block.blocks.length" :key="tab">
                <div @click="index=n" :x-on:click="slideClick(n)" class="carousel_tab cursor-pointer"  :class="tabCSS(n)" :data-active="n===index?true:false" :data-tab="n"  :data-css-active="block.data.css.active" :data-css="block.data.css.default + ' ' + block.data.css.hover" :x-bind:class="bindClass(block,n)">
                    <span v-if="block.data.mode==='tabs'">{{ block.data.slides[n].name }}</span>
                </div>
            </template>
        </div>
        <div v-for="(element,i) in block.blocks" class="slide-content" :x-show="getSlideShow(i)">
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

        <div v-if="block.data && block.data?.settings?.navigation.enabled && block.data.mode === 'slider'" :data-slider="block.id" class="carousel_prev absolute left-0 top-0 bottom-0 flex flex-col justify-center z-modal cursor-pointer">
            <span ><icon :icon="sliderNav('prev').icon" :x-on:click="slidePrev()" :class="sliderNav('prev').css"/></span>
        </div>
        <div :data-slider="block.id" class="carousel_next absolute right-0 top-0 bottom-0 flex flex-col justify-center z-modal cursor-pointer" 
            v-if="block.data && block.data?.settings?.navigation.enabled && block.data.mode === 'slider'">
            <span ><icon :icon="sliderNav('next').icon" :x-on:click="slideNext()" :class="sliderNav('next').css"/></span>
        </div>
        <div v-if="block.data && block.data?.settings?.navigation?.dots && block.data.mode === 'slider'" class="absolute left-0 z-modal cursor-pointer bottom-0 m-auto flex p-2  w-full justify-center">
            <template  v-for="(slide,i) in block.blocks">
                <div class="mx-2 h-6 w-6 shadow-xl text-white flex items-center justify-center rounded-full bg-bluegray-500"  :x-on:click="slideTo(i)">{{i+1}}</div>
            </template>
        </div>
    </component>
</template>

<script setup lang="ts">

import { ref , onUnmounted, onMounted , computed } from 'vue'
import { blockCSS , randomID } from '/@/composables/useActions'
import { store } from '/@/composables/useStore'
import Alpine from 'alpinejs'
const editor = store.editor //useStore()

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

const dotClasse = ( i:Number ) => {
    return index.value != i ? 'bg-black' : 'bg-bluegray-400'
}

const rnd = randomID().replace('whoobe-','')

const tabCSS = (n) => {
    return n != index.value ? 
        props.block.data.css.default + ' ' + props.block.data.css.hover :
        props.block.data.css.active 
}
let timeout = ''

let data = {}
data['slide_'+rnd] = 0
data['slides_' + rnd ] = props.block.blocks.length

const slidesData = computed(() => {
    
    return data

    //return '{ slide_' + rnd + ':0 , slides_' + rnd + ':' + props.block.blocks.length + timeout + ', i:0 }' //, slides:' + slides.length + '}'
})

const alpineReactive = Alpine.reactive(data)

//console.log( alpineReactive )




const slideClick = (index) => {
    return "slide_" + rnd + " = " + index //+ "'"
}

const slide = (index) => {
    return '"slide_'+rnd + '"===' + index //+ "'"
}
const sliderNav = (direction:String) => {
    return { 
        icon: props.block.data.settings.navigation.icons[direction] , 
        css: props.block.data.settings.navigation.icons.css 
    }
}


const slidePrev = ()=>{
    index.value > 0 ? index.value -= 1 : index.value = 0
    return 'slide_' + rnd + ' > 0 ? slide_' + rnd + ' -= 1 : slide_' + rnd + ' = slides_' + rnd + '-1';
}

const slideNext = ()=>{
    index.value < props.block.blocks.length -1 ? index.value += 1 : index.value = 0
    return 'slide_' + rnd + ' < (slides_' + rnd + '-1) ? slide_' + rnd + ' += 1 : slide_' + rnd + ' = 0';
}

const slideTo = (i) => {
    index.value = i 
    return 'slide_' + rnd + ' = ' + i
}
const bindClass = ( block:Object , index) => {
    return "{'" + block.data.css.active + "' : slide ==='" +  index + "'}"
}

const prev = () => {
    index.value > 0 ? index.value-- : null
}

const next = () => {
    index.value < (props.block.blocks.length-1) ? index.value++ : null
}

const timer = ref(null)

const getData = () => {
    return '{slide_' + rnd + ':0,slides_' + rnd + ':' + props.block.blocks.length + '}'
}

const getSlideShow = (i:Number) => {
    return 'slide_' + rnd + '===' + i
}

onMounted( async()=>{
    let carousel = document.getElementById(props.block.id)
    let slides = document.querySelectorAll('.slide-content')
    if ( props.block.data.settings.autoplay ){
        timer.value = await setInterval ( () => {
            index.value < props.block.blocks.length -1 ? index.value += 1 : index.value = 0
            data['slide_' + rnd] = index.value
            let attrib = JSON.stringify(data).replaceAll('"','')
            carousel.setAttribute('x-data',attrib)

        }, parseInt ( props.block.data.settings.autoplay ))
        // slides.forEach ( (el,index) => {
        //     let attr = 'slide_' + rnd + '===' + index
        //     el.setAttribute ( 'x-show' , attr )
        // })
    } else {
        //carousel.setAttribute('x-data',JSON.stringify(data))
    }
    

})

onUnmounted (() => {
    clearInterval( timer.value )
    timer.value = null
})


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