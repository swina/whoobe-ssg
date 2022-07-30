import { reactive } from 'vue'

export const event = reactive ({
    data: null
})

export function openContextMenu ( e:object , fixed:Boolean ){
    console.log ( 'open context menu' )
    let ctxMenu = document.querySelector ( '#contextMenu' )
    ctxMenu.classList.remove ( 'hidden' )
    let offsetX = 50
    let offsetY = 30
    let left = `${e.pageX-50||e.clientX-50}px`
    let top = `${e.pageY-30||e.clientY-30}px`
    let height = ctxMenu.getBoundingClientRect().height 
    if ( window.innerWidth - e.clientX < 300 ){
        left = `${window.innerWidth-300}px`
    }
    if ( e.clientY + height > window.innerHeight ){
        top = `${window.innerHeight-height-50}px` 
    }
    ctxMenu.style.left = left // `${e.pageX-50||e.clientX-50}px`
    ctxMenu.style.top = top //`${e.pageY-30||e.clientY-30}px`
    ctxMenu.style.minHeight = 100
}

export function toggleContext ( e:object ){
    let ctxMenu = document.querySelector ( '#contextMenu' )
    ctxMenu?.classList.add ( 'hidden' )
}

export function openContextDialog ( e:object , classe:string ){
    
    let dialog = document.querySelector ( '#contextDialog' )
    // if ( dialog.classList.contains('hidden') ){
    //     dialog.classList.remove ( 'hidden' )
    //     classe ? dialog.classList.add ( classe ) : null
    // } else {
    //     dialog.classList.add ( 'hidden' )
    // }
}

export function openCtx ( id:String , e:object ){
    e.preventDefault()
    let ctxMenu = document.querySelector ( `#${id}` )
    ctxMenu.classList.remove ( 'hidden' )
    let height = ctxMenu.getBoundingClientRect().height 
    console.log ( window.innerWidth )
    let left = `${e.pageX-10||e.clientX-10}px`
    let top = `${e.pageY-50||e.clientY-50}px`
    if ( window.innerWidth - e.clientX < 300 ){
        left = `${window.innerWidth-300}px`
    }
    if ( e.clientY + height > window.innerHeight ){
        top = `${window.innerHeight-height-50}px` 
    }
    ctxMenu.style.left = left //`${e.pageX-10||e.clientX-10}px`
    ctxMenu.style.top = top //`${e.pageY-50||e.clientY-50}px`
}

export function closeCtx ( id:String ){
    document.querySelector ( `#${id}` ).classList.add('hidden')
}


