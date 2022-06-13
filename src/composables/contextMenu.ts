import { reactive } from 'vue'

export const event = reactive ({
    data: null
})

export function openContextMenu ( e:object ){
    console.log ( 'open context menu' )
    let ctxMenu = document.querySelector ( '#contextMenu' )
    ctxMenu.classList.remove ( 'hidden' )
    ctxMenu.style.left = `${e.pageX-50||e.clientX-50}px`
    ctxMenu.style.top =`${e.pageY-30||e.clientY-30}px`
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
    ctxMenu.style.left = `${e.pageX-10||e.clientX-10}px`
    ctxMenu.style.top =`${e.pageY-50||e.clientY-50}px`
}

export function closeCtx ( id:String ){
    document.querySelector ( `#${id}` ).classList.add('hidden')
}


