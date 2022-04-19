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
    <button class="bg-bluegray-800 border-0" @click="randomGradient">Randomize</button>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , blockCSS , updateColorCSS, matchCSS } from '/@/composables/useActions'
import classes from '/@/composables/tw.classes'
import { EDITOR } from '/@/composables/useEditor';
const editor = EDITOR //useStore()

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
    //console.log ( Object.values ( gradient.value ).join ( ' ' ) )
    let direction = editor.current.css.css.split(' ').filter ( gr => gr.includes('bg-gradient') )
    //console.log ( direction )
    return Object.values ( gradient.value ).join ( ' ' )  + ' ' + direction ?? direction[0]
}

Object.keys ( gradient.value ).forEach ( prefix => {
    let found = blockCSS ( editor.current ).split(' ').filter( a => a != '').filter( b =>  b.includes(prefix) )[0]
    if ( found ) 
        gradient.value[prefix] = found 
})
let allColors = ref ( Object.values ( editor.colors ).reduce ( (a,b) => [ ...a , ...b] , []).filter(c=> !c.includes('hover')) )
let colors = allColors.value

const randomGradient = () => {
    matchGradient('from-',true)
    matchGradient('via-',true)
    matchGradient('to-',true)
    let color1 = colors[parseInt(Math.random() * (colors.length - 0) + 0)].replace('bg-','from-');
    let color2 = colors[parseInt(Math.random() * (colors.length - 0) + 0)].replace('bg-','to-');
    let color3 = colors[parseInt(Math.random() * (colors.length - 0) + 0)].replace('bg-','via-');
    gradient.value.from = color1
    gradient.value.via = color3
    gradient.value.to = color2
    setColor ( color1 )
    setColor ( color2 )
    setColor ( color3 )
}

const matchGradient = (prefix:String,reset:Boolean=false) => {
    let cl = editor.current.css.css.split ( ' ' )
        let arr = colors.map ( a => a.replace('bg-',prefix) )
        arr.forEach ( color => {
            if ( cl.includes ( color ) ) {
                console.log ( color )
                reset ? 
                    editor.current.css.css = editor.current.css.css.replace ( color , '' ) :
                        gradient.value[prefix.replace('-','')] = color
            }
        })
    
}

const clearGradient = () => {
    setColor ( 'from-transparent' )
    setColor ( 'to-transparent' )
}

matchGradient ( 'from-' )
matchGradient ( 'via-')
matchGradient ( 'to-' )
</script>

