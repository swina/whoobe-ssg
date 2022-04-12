/**
 * Functions and constants used by the customizer
 *  
 * 
*/
// import { useEditorStore } from '/@/stores/editor';
// const editor = useEditorStore()
// const fonts = editor.fonts.replaceAll('+',' ').split('|')
const fonts = ''
const values = [0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]
const pixels = [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ]
const percs =  [ 'full','1/2',
'1/3',
'2/3',
'1/4',
'3/4',
'1/5',
'2/5',
'3/5',
'4/5',
'1/6',
'2/6',
'4/6',
'5/6',
'1/12',
'2/12',
'3/12',
'4/12',
'5/12',
'7/12',
'8/12',
'9/12',
'10/12',
'11/12'
]

const dimensions = [
    'none',
    'px',
    'full',
    'screen',
    'min',
    'max',
    'prose',
    'xs',
    'sm',
    'md',
    'lg','xl','2xl','3xl','screen-sm','screen-md','screen-lg','screen-xl','screen-2xl','0','1','1.5','2','4','8','10','12','14','18','20','24','1/2','1/3','3/5','11/12','4rem','60px']

const colors = [ 'gray' , 'bluegray' , 'brown' , 'red', 'yellow' , 'orange' , 'green' , 'lime' , 'teal' , 'blue' , 'indigo' , 'purple' , 'pink' ]

function setPercs ( prefix ){
    let arr = []
    percs.forEach ( perc => {
        arr.push ( prefix + '-' + perc)
    })
    return arr 
}
function setClass ( prefix , negative ){
    let arr = []
    if ( negative ){
        let neg = pixels
        neg.slice().reverse().forEach ( v => {
            arr.push ( '-' + prefix + '-' + parseInt(v/4) )
        })
        arr.push(' ')
    }
    pixels.forEach ( v => {
        arr.push ( prefix + '-' + parseInt(v/4) )
    })
    
    return arr
}

function setOpacity ( prefix ){
    let arr = []
    for ( var n=0 ; n < 5 ; n++ ){
        arr.push ( prefix + '-' + (n*25) )
    }
    return arr
}

function setColors ( prefix ){
    let arr = ['transparent','white','black']
    colors.forEach ( color => {
        arr.push ( prefix + '-' + color)
        //arr.push ( 'hover:' + prefix + '-' + color )
    })
    return arr
}

function setSizes ( prefix ){
    let arr = dimensions.map ( size => prefix + size )
}


var classes = {
    width: dimensions.map ( size => 'w-' + size ),
    height: dimensions.map ( size => 'h-' + size),
    maxWidth : dimensions.map ( size => 'max-w-' + size ),
    maxHeight : dimensions.map ( size => 'max-h-' + size) ,
    semantics:['article','aside','details','div','figcaption','figure','footer','form','header','hero','label','main','mark','nav','product','section','span','summary','time'],
    textSize: [
        'text-xs' , 
        'text-sm' , 
        'text-base' , 
        'text-lg' , 
        'text-xl' , 
        'text-2xl' , 
        'text-3xl' , 
        'text-4xl' , 
        'text-5xl' , 
        'text-6xl' , 
        'text-7xl' , 
        'text-8xl' , 
        'text-9xl' , 
        'text-10xl' , 
        'text-20xl'
    ],
    textAlign: [
        'text-left',
        'text-center',
        'text-right',
        'text-justify'
    ],
    textlineheight: [
        'leading-none',
        'leading-tight',
        'leading-snug',
        'leading-normal',
        'leading-relaxed',
        'leading-loose'
    ],
    textSpacing: [
        'tracking-tighter',
        'tracking-tight',
        'tracking-normal',
        'tracking-wide',
        'tracking-wider',
        'tracking-widest'
    ],
    textOpacity: setOpacity('text-opacity'),
    textcolor: setColors('text'),
    fontfamily: fonts,
    fontWeight: [
        'font-thin',
        'font-extralight',
        'font-light',
        'font-normal',
        'font-medium',
        'font-semibold',
        'font-bold',
        'font-extrabold',
        'font-black'
    ],
    bgOpacity: setOpacity('bg-opacity'),
    bgSize :  [
        'bg-auto',
        'bg-cover',
        'bg-contain'
    ],
    bgPosition : [
        'bg-center',
        'bg-top',
        'bg-bottom',
        'bg-left',
        'bg-left-top',
        'bg-left-bottom',
        'bg-right',
        'bg-right-top',
        'bg-right-bottom'
    ],
    bgRepeat : [
        'bg-no-repeat',
        'bg-repeat',
        'bg-repeat-x',
        'bg-repeat-y',
        'bg-repeat-round',
        'bg-repeat-space'
    ],
    bgAttachment: [
        'bg-fixed',
        'bg-local',
        'bg-scroll'
    ],
    bgClip: [
        'bg-clip-border',
        'bg-clip-padding',
        'bg-clip-content',
        'bg-clip-text'
    ],
    bgOrigin: [
        'bg-origin-border',
        'bg-origin-padding',
        'bg-origin-content'
    ],
    opacity: setOpacity('opacity'),
    colors: colors,
    bgcolor : setColors('bg'),
    from: setColors('from'),
    to: setColors('to'),
    via: setColors('via'),
    gradient: [
            
        { label: 'Top'          , value: 'bg-gradient-to-t'     },
        { label: 'Top Right'    , value: 'bg-gradient-to-tr'    },
        { label: 'Right'        , value: 'bg-gradient-to-r'     },
        { label: 'Bottom Right' , value: 'bg-gradient-to-br'    },
        { label: 'Bottom'       , value: 'bg-gradient-to-b'     },
        { label: 'Bottom Left'  , value: 'bg-gradient-to-bl'    },
        { label: 'Left'         , value: 'bg-gradient-to-l'     },
        { label: 'Top Left'     , value: 'bg-gradient-to-tl'    }
    ],
    blur:[ 'blur-1' , 'blur-2' , 'blur-3' , 'blur-4' , 'blur-5' , 'blur-sm' , 'blur-md' , 'blur-lg' , 'blur-xl' , 'blur-2xl' , 'blur-3xl' ],
    flexdirection : [ 'flex-col' , 'flex-row' , 'flex-col-reverse' , 'flex-row-reverse' ],
    flexorder:[
        'order-first',
        'order-last',
        'order-none'
    ],
    flexwrap: [
        'flex-wrap',
        'flex-nowrap',
        'flex-wrap-reverse'
    ],
    flexgrow: [
        'flex-grow',
        'flex-grow-0',
    ],
    flexshrink: [
        'flex-shrink',
        'flex-shrink-0'
    ],
    zindex: [
        'z-auto',
        'z-0',
        'z-1',
        'z-2',
        'z-3',
        'z-4',
        'z-5',
        'z-6',
        'z-7',
        'z-8',
        'z-9',
        'z-10',
        'z-20',
        'z-30',
        'z-40',
        'z-50',
        'z-max',
        'z-top',
        'z-2xtop'
    ],
    gridcols: [
        'md:grid-cols-1',
        'md:grid-cols-2',
        'md:grid-cols-3',
        'md:grid-cols-4',
        'md:grid-cols-5',
        'md:grid-cols-6',
        'md:grid-cols-7',
        'md:grid-cols-8',
        'md:grid-cols-9',
        'md:grid-cols-10',
        'md:grid-cols-11',
        'md:grid-cols-12',
        'md:grid-cols-none',
    ],
    colspan: [
        'md:col-span-auto',
        'md:col-span-1',
        'md:col-span-2',
        'md:col-span-3',
        'md:col-span-4',
        'md:col-span-5',
        'md:col-span-6',
        'md:col-span-7',
        'md:col-span-8',
        'md:col-span-9',
        'md:col-span-10',
        'md:col-span-11',
        'md:col-span-12',
        'md:col-span-full',
    ],
    gridgap: [ 
        'gap-1' , 
        'gap-2' , 
        'gap-3' , 
        'gap-4' , 
        'gap-5' , 
        'gap-6' , 
        'gap-8', 
        'gap-10' , 
        'gap-12', 
        'gap-16', 
        'gap-20', 
        'gap-24', 
        'gap-32', 
        'gap-40', 
        'gap-48', 
        'gap-56', 
        'gap-64' 
    ],
    alignitems: [
        'items-start',
        'items-center',
        'items-end',
        'items-baseline',
        'items-stretch'
    ],
    aligncontent: [
        'content-start',
        'content-center',
        'content-end',
        'content-between',
        'content-around',
        'content-evenly'
    ],
    alignself: [
        'self-auto',
        'self-start',
        'self-center',
        'self-end',
        'self-stretch'
    ],
    justifycontent: [
        'justify-start',
        'justify-center',
        'justify-end',
        'justify-between',
        'justify-around',
        'justify-evenly'
    ],
    justifyitems: [
        'justify-items-auto',
        'justify-items-start',
        'justify-items-center',
        'justify-items-end',
        'justify-items-stretch',
    ],
    justifyself: [
        'justify-self-auto',
        'justify-self-start',
        'justify-self-center',
        'justify-self-end',
        'justify-self-stretch',
    ],
    bordercolor: setColors('border'),
    border: [
        'border',
        'border-2',
        'border-4',
        'border-8'
    ],
    borderTop: [
        'border-t',
        'border-t-2',
        'border-t-4',
        'border-t-8'
    ],
    borderLeft: [
        'border-l',
        'border-l-2',
        'border-l-4',
        'border-l-8'
    ],
    borderRight: [
        'border-r',
        'border-r-2',
        'border-r-4',
        'border-r-8'
    ],
    borderBottom: [
        'border-b',
        'border-b-2',
        'border-b-4',
        'border-b-8'
    ],
    borderOpacity: setOpacity('border-opacity'),
    padding: setClass('p'),
    paddingTop: setClass('pt'),
    paddingBottom: setClass('pb'),
    paddingLeft: setClass('pl'),
    paddingRight: setClass('pr'),
    paddingHorizontal: setClass('px'),
    paddingVertical: setClass('py'),
    spacingY: setPercs('space-y'),
    spacingX: setPercs('space-x'),
    //spacingBottom: setPercs('pb'),
    //spacingLeft: setPercs('pl'),
    //spacingRight: setPercs('pr'),
    margin: setClass('m',true),
    marginTop: setClass('mt',true),
    marginBottom: setClass('mb',true),
    marginLeft: setClass('ml',true),
    marginRight: setClass('mr',true),
    marginHorizontal: setClass('mx',true),
    marginVertical: setClass('my',true),
    marginAuto:['m-auto'],
    borderType:[
        'border-solid',
        'border-dashed',
        'border-dotted',
        'border-double',
        'border-none'
    ],
    positionelement: [
        'static',
        'fixed',
        'absolute',
        'relative',
        'sticky',
        'modal'
    ],
    positionTop: [ 'top-0' ],
    positionLeft: [ 'left-0' ],
    positionBottom: [ 'bottom-0'],
    positionRight: [ 'right-0'] ,
    objectfit: [
        'object-contain',
        'object-cover',
        'object-fill',
        'object-none',
        'object-scale'
    ],
    rotate : [
        'rotate-0',
        'rotate-1',
        'rotate-2',
        'rotate-3',
        'rotate-6',
        'rotate-12',
        'rotate-45',
        'rotate-90',
        'rotate-180',
        '-rotate-0',
        '-rotate-1',
        '-rotate-2',
        '-rotate-3',
        '-rotate-6',
        '-rotate-12',
        '-rotate-45',
        '-rotate-90',
        '-rotate-180',
    ],
    skewX: [
        'skew-x-0',
        'skew-x-1',
        'skew-x-2',
        'skew-x-3',	
        'skew-x-6',
        'skew-x-12',
        '-skew-x-0',
        '-skew-x-1',
        '-skew-x-2',
        '-skew-x-3',	
        '-skew-x-6',
        '-skew-x-12',
    ],
    skewY: [
        'skew-y-0',
        'skew-y-1',
        'skew-y-2',
        'skew-y-3',	
        'skew-y-6',
        'skew-y-12',
        '-skew-y-0',
        '-skew-y-1',
        '-skew-y-2',
        '-skew-y-3',	
        '-skew-y-6',
        '-skew-y-12',
    ],
    rotate3D: [
        'perspective-rotate3dX', 
        'perspective-rotate3dX-inverse',
        'perspective-rotate3dY',
        'perspective-rotate3dY-inverse',
    ],
    rounded: [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full'
    ],
    shadow: [
        'shadow',
        'shadow-xs',
        'shadow-sm',
        'shadow-md',
        'shadow-lg',
        'shadow-xl',
        'shadow-2xl'
    ],
    grayscale : ['grayscale'],
    animation: [
        'animate-none',
        'animate-ping',
        'animate-bounce',
        'animate-spin',
        'animate-pulse',
        'animate-slidein',
        'animate-slideout'
    ],
    clipPath: [
        { label: 'diagonal'     , value: 'clip-path-diagonal'},
        { label: 'diagonal inverse'     , value: 'clip-path-diagonal-reverse'},
        { label: 'angle left'   , value: 'clip-path-angle-left'}, 
        { label: 'angle right'  , value: 'clip-path-angle-right'},
        { label: 'arrow left'   , value: 'clip-path-arrow-left' }, 
        { label: 'arrow right'  , value :'clip-path-arrow-right'},
        { label: 'triangle'     , value : 'clip-path-triangle'} , 
        { label: 'circle'       , value: 'clip-path-circle'} , 
        { label: 'tag down'     , value: 'clip-path-tag-down' } , 
        { label: 'trapezoid left' , value: 'clip-path-trapezoid-left'}, 
        { label: 'trapezoid right', value: 'clip-path-trapezoid-right'}, 
        { label: 'rombus'       , value: 'clip-path-rombus'}, 
        { label: 'parallelogram' , value: 'clip-path-parallelogram'} ,
        { label: 'parallelogram inverse' , value: 'clip-path-parallelogram-inverse'} ,
        { label: 'frame'        , value: 'clip-path-frame'},  
        { label: 'cross'        , value: 'clip-path-cross'} ,
        { label: 'stairs'       , value : 'clip-path-stairs'} ,
        { label: 'stairs 2'     , value: 'clip-path-stairs-2' }
    ],
    transition: [
        'transition-none',
        'transition-all',
        'transition',
        'transition-colors',
        'transition-opacity',
        'transition-shadow',
        'transition-transform'
    ],
    transitionDuration: [
        'duration-75',
        'duration-100',
        'duration-150',
        'duration-200',
        'duration-300',
        'duration-500',
        'duration-700',
        'duration-1000'
    ],
    transitionTiming: [
        'ease-linear',
        'ease-in',
        'ease-out',
        'ease-in-out'
    ],
    transitionDelay: [
        'delay-75',
        'delay-100',
        'delay-150',
        'delay-200',
        'delay-300',
        'delay-500',
        'delay-700',
        'delay-1000'
    ],

}

export default classes