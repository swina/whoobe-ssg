<template>
<div class="flex flex-col col-span-2 p-2 text-sm">
    <div class="flex justify-around items-center w-full cursor-pointer">
        <div class="flex flex-col items-center">
            From
            <div class="h-10 w-10 rounded-full border" @click="colorContext='from',showColors=true" :class="gradient.from.replace('from','bg')"></div>
        </div>
        <div class="flex flex-col items-center">
            Via
            <div class="h-10 w-10 rounded-full border" @click="colorContext='via',showColors=true" :class="gradient.via.replace('via','bg')"></div>
        </div>
        <div class="flex flex-col items-center">
            To
            <div class="h-10 w-10 rounded-full border" @click="colorContext='to',showColors=true" :class="gradient.to.replace('to','bg')"></div>
        </div>
    </div>
    <div v-if="showColors" class="my-4">
        <div class="m-auto capitalize text-center font-bold">{{ colorContext }}</div>
        <template v-for="color in Object.keys(editor.colors)" :key="color">
            <div class="flex flex-row flex-wrap justify-around my-1 cursor-pointer">
                <template v-for="bgcolor in editor.colors[color]" :key="bgcolor">
                    <div v-if="!bgcolor.includes('hover:')" class="h-4 w-4 border border-gray-800 rounded-full" :class="bgcolor" :title="bgcolor" @click="setColor (bgcolor)">
                    </div>
                </template>
            </div>
        </template>
    </div>
    <div class="h-20 w-full my-2 border border-bluegray-900" :class="getGradient()"/>
    <!-- Direction
    <select v-model="gradient.direction">
        <option v-for="direction in gradientSet" :value="direction.value">{{ direction.label }}</option>
    </select> -->
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , blockCSS , updateColorCSS } from '/@/composables/useActions'
import classes from '/@/composables/tw.classes'

const editor = useStore()

//const bggradient = ref ( classes.bggradient )

//const gradientSet = ref ( classes.gradient )

let gradient = ref ({
    from : '',
    via : '',
    to: ''
})

let showColors = ref ( false )

let colorContext = ref ( '' )

const setColor = (color) => {
    showColors.value = false
    gradient.value[colorContext.value] = color.replace ( 'bg' , colorContext.value)
    editor.current.css.css = updateColorCSS ( editor.colors , editor.current.css.css , color , colorContext.value )
}

const getGradient = ()=>{
    console.log ( Object.values ( gradient.value ).join ( ' ' ) )
    return Object.values ( gradient.value ).join ( ' ' ) 
}

Object.keys ( gradient.value ).forEach ( prefix => {
    let found = blockCSS ( editor.current ).split(' ').filter( a => a != '').filter( b =>  b.includes(prefix) )[0]
    if ( found ) 
        gradient.value[prefix] = found 
})

</script>

