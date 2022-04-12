/**
 * Customizer panel options
 * @label   => Option label
 * @filter  => Apply only to elements with type === filter
 * @components => Array of components for each group
 * 
 * @components => 
 *  @name   *String => component name  
 *  @attr   *String => variable from the twclasses
 *  @title  *String => option title
 *  @css    String  => extra class to assign to the option
 *  @icon   String  => material icon name if control uses an icon
 *  @negative Boolean => true = slider has negative values
 */
const twgroups = [
    { label: 'grid' , filter: ['grid'] , components: [
        { name: 'Options' , attr: 'gridgap' , title: 'grid gap'}
    ]},
    { label: 'flex' , filter: ['flex','mansory' ] , components: [
        { name: 'Options' , attr: 'colspan' , title: 'grid column span' , prefix: 'md:col-span-'},
        { name: 'Options' , attr: 'flexdirection' , title: 'direction' , prefix: 'flex-' },
        { name: 'Options' , attr: 'flexwrap' , title: 'wrap' , prefix: 'flex-'},
        { name: 'Options' , attr: 'flexgrow' , title: 'grow' , prefix: 'flex-'},
        { name: 'Options' , attr: 'flexshrink' , title: 'shrink' , prefix: 'flex-'},
        { name: 'Options' , attr: 'flexorder' , title: 'order' , prefix: 'flex-'}
    ]},
    {
        label: 'box align / justify' , filter: ['grid','flex','menu','document'] , components: [
            { name: 'Options' , attr: 'alignitems' , title: 'Align items' ,  prefix: 'items-' },
            { name: 'Options' , attr: 'aligncontent' , title: 'Align content' , prefix: 'content-' },
            { name: 'Options' , attr: 'alignself' , title: 'Align self' ,  prefix: 'self-'},
            { name: 'Options' , attr: 'justifycontent' , title: 'Justify content' ,  prefix: 'justify-' },
            { name: 'Options' , attr: 'justifyitems' , title: 'Justify items' ,  prefix: 'justify-items-' },
            { name: 'Options' , attr: 'justifyself' , title: 'justify self' ,  prefix: 'justify-self-' },
        ]
    },
    { label: 'position', components : [ 
        { name: 'Options' , attr: 'positionelement' , title: 'position' },
        { name: 'Options' , attr: 'zindex' , title: 'z index' , prefix: 'z-' },
        // { name: 'Position' , attr: 'position' },
        { name: 'Checkbox' , attr: 'top-0' , title: 'top' , css: 'float-left' },
        { name: 'Checkbox' , attr: 'left-0' , title: 'left' , css: 'float-left'  },
        { name: 'Checkbox' , attr: 'bottom-0' , title: 'bottom' , css: 'float-left' },
        { name: 'Checkbox' , attr: 'right-0' , title: 'right' , css: 'float-none' },
        { name: 'Options' , attr: 'objectfit' , title: 'Object fit' , prefix: 'object-'}
    ]},
    { label: 'dimension' , components: [ 
        { name: 'Options' , attr: 'width' , title: 'width' , prefix: 'w-' },
        { name: 'Options' , attr: 'maxWidth' , title: 'Max Width' , prefix: 'max-w-'},
        { name: 'Options' , attr: 'height' , title: 'height' , prefix: 'h-' } ,
        { name: 'Options' , attr: 'maxHeight' , title: 'Max height' , prefix: 'max-h-'},
    ]},
    { label: 'typography' , components: [ 
        { name: 'Button' , group: 'text-decoration' , attr: 'italic' , title : 'italic' , icon: 'format_italic' , css: 'float-left'},
        { name: 'Button' , group: 'text-decoration' , attr: 'underline' , title : 'underline' , icon: 'format_underline' , css: 'float-left'},
        { name: 'Button' , group: 'text-decoration' , attr: 'line-through' , title : 'strikethrough' , icon: 'format_strikethrough' , css: 'float-left'},
        { name: 'Button' , group: 'text-decoration' , attr: 'uppercase' , title : 'uppercase' , icon: 'arrow_upward', css: 'float-left'},
        { name: 'Button' , group: 'text-decoration' , attr: 'lowercase' , title : 'lowercase' , icon: 'arrow_downward', css: 'float-left'},
        { name: 'Button' , group: 'text-decoration' , attr: 'capitalize' , title : 'capitalize' , icon: 'text_fields' , css: 'float-none'},
        //{ name: 'Color' , attr: 'textcolor' }, 
        { name: 'BlockFont', title: 'Font' , prefix: null },
        { name: 'Options' , attr: 'textSize' , title: 'size' , prefix : 'text-' },
        { name: 'Options' , attr: 'textAlign' , title: 'Align' , prefix: 'text-'},
        { name: 'Options' , attr: 'fontWeight' , title: 'weight' , prefix: 'font-'},
        { name: 'Range' , attr: 'textOpacity' , title: 'opacity' , prefix: 'text-'},
        { name: 'Options' , attr: 'textSpacing' , title: 'letter spacing' , prefix: 'tracking-' },
        { name: 'Options' , attr: 'textlineheight' , title: 'line height' , prefix: 'leading-'},
        { name: 'TextFont' , attr: 'textfont' },
    ]},
    { label: 'text color' , components: [ 
        { name: 'BlockColor', title: 'text color' , prefix: 'text' },
    ]},
    { label: 'background color' , components: [ 
        { name: 'BlockColor', title: 'background color' , prefix: 'bg' },
    ]},
    { label: 'background' , components: [
        { name: 'Image'     , attr: null , title: 'Image' , prefix: null },
        { name: 'Options' , attr: 'bgSize' , title: 'Size' , prefix: 'bg-' },
        { name: 'Options' , attr: 'bgPosition' , title: 'Position' , prefix: 'bg-' },
        { name: 'Options' , attr: 'bgRepeat' , title: 'Repeat' , prefix: 'bg-' },
        { name: 'Options' , attr: 'bgOpacity' , title: 'Opacity' , prefix: 'bg-opacity-' },
        { name: 'Options' , attr: 'bgAttachment' , title: 'attachment' , prefix: 'bg-' },
        { name: 'Options' , attr: 'bgClip' , title: 'Clip' , prefix: 'bg-clip-' },
        { name: 'Options' , attr: 'bgOrigin' , title: 'Origin' , prefix: 'bg-origin-' },
        { name: 'Options' , attr: 'blur' , title: 'filter blur' , prefix: 'blur-' }
    ]},
    { label: 'gradient' , components: [ 
        { name: 'BgGradient' , attr: 'from' , title: 'gradient from' , css: 'float-left' , group: true },
        // { name: 'BgGradient' , attr: 'via' , title: 'gradient via' , css: 'float-left' , group: true },
        // { name: 'BgGradient' , attr: 'to' , title: 'gradient to' , css: 'float-left' , group: true },
        { name: 'Options' , attr: 'gradient' , title: 'direction' , css: 'flex w-full' , prefix: 'gradient-' },
        { name: 'BgGradientPresets' , attr: 'gradientPreset' , title: 'Presets' , css: 'flex w-full' , group: true },
    ]},
    { label: 'padding', components : [ 
        { name: 'Options' , attr: 'padding' , title: 'all' , prefix: 'p-' },
        { name: 'Options' , attr: 'paddingTop' , title: 'top', prefix: 'pt-' },
        { name: 'Options' , attr: 'paddingBottom' , title: 'bottom' , prefix: 'pb-' },
        { name: 'Options' , attr: 'paddingLeft' , title: 'left' , prefix: 'pl-' },
        { name: 'Options' , attr: 'paddingRight' , title: 'right' , prefix: 'pr-' },
        { name: 'Options' , attr: 'paddingHorizontal' , title: 'horizontal' , prefix: 'px-' },
        { name: 'Options' , attr: 'paddingVertical' , title: 'vertical' , prefix: 'py-' },
        // { name: 'Range' , attr: 'padding' , title: 'all'},
        // { name: 'Range' , attr: 'paddingTop' , title: 'top'},
        // { name: 'Range' , attr: 'paddingBottom' , title: 'bottom'},
        // { name: 'Range' , attr: 'paddingLeft' , title: 'left'},
        // { name: 'Range' , attr: 'paddingRight' , title: 'right'},
    ] }, 
    
    { label: 'margin', components : [ 
        { name: 'Options' , attr: 'margin' , title: 'all' , negative: true , prefix: 'm-' },
        { name: 'Options' , attr: 'marginTop' , title: 'top', negative: true , prefix: 'mt-' },
        { name: 'Options' , attr: 'marginBottom' , title: 'bottom', negative: true , prefix: 'mb-' },
        { name: 'Options' , attr: 'marginLeft' , title: 'left', negative: true , prefix: 'ml-' },
        { name: 'Options' , attr: 'marginRight' , title: 'right', negative: true , prefix: 'mr-' },
        { name: 'Options' , attr: 'marginHorizontal' , title: 'horizontal', negative: true , prefix: 'mx-' },
        { name: 'Options' , attr: 'marginVertical' , title: 'vertical', negative: true , prefix: 'my-' },
        { name: 'Options' , attr: 'marginAuto' , title: 'auto' , prefix: 'm-' }
    ] },
    { label: 'border', components : [ 
        { name: 'Options' , attr: 'border' , title: 'all' , prefix: 'border-' },
        { name: 'Options' , attr: 'borderTop' , title: 'top' , prefix: 'border-t-'},
        { name: 'Options' , attr: 'borderRight' , title: 'right' , prefix: 'border-r-'},
        { name: 'Options' , attr: 'borderBottom' , title: 'bottom' , prefix: 'border-b-' },
        { name: 'Options' , attr: 'borderLeft' , title: 'left' , prefix: 'border-l-' },
        { name: 'Options' , attr: 'borderType' , title: 'type' , prefix: 'border-'  },
        { name: 'BlockColor' , attr: 'bordercolor' , title: 'color' , prefix: 'border' },
        { name: 'Options' , attr: 'borderOpacity' , title: 'opacity', prefix: 'border-opacity-' }
    ]},
    { label: 'rounded / shadow / opacity', components : [ 
        { name: 'Options' , attr: 'rounded' , title: 'rounded' , prefix: 'rounded-'  },
        { name: 'Options' , attr: 'shadow' , title: 'shadow' , prefix: 'shadow-'},
        { name: 'Checkbox' , attr: 'grayscale' , title: 'grayscale' , prefix: '' },
        { name: 'Options' , attr: 'opacity' , title: 'opacity' ,  prefix: 'opacity-'} 
    ]},
    { label: 'CSS Animation', components : [ 
        { name: 'Options' , attr: 'animation' , title: 'animation', prefix: 'animate-'}
    ]},
    { label: 'Transition', components : [ 
        { name: 'Options' , attr: 'transition' , title: 'type' , prefix: 'transition-'},
        { name: 'Options' , attr: 'transitionDuration' , title: 'duration' , prefix: 'duration-'},
        { name: 'Options' , attr: 'transitionTiming' , title: 'ease' , prefix: 'ease-'},
        { name: 'Options' , attr: 'transitionDelay' , title: 'transition delay', prefix: 'delay-'}
    ]},
    { label: 'transform', components : [ 
        { name: 'Options' , attr: 'skewX' , required: 'transform' , title: 'Skew X' , prefix: 'skew-x-'  },
        { name: 'Options' , attr: 'skewY' , required: 'transform' , title: 'Skew Y' , prefix: 'skew-y-'},
        { name: 'Options' , attr: 'rotate' , required: 'transform' , title: 'Rotate' , prefix: 'rotate-' },
        { name: 'Options' , attr: 'clipPath' , required: 'transform' , title: 'clip path' , prefix: ''},
        { name: 'Options' , attr: 'rotate3D' , title: 'Perspective' , prefix: 'perspective-'} 
    ]}, 
    { label: 'spacing', components : [ 
        //{ name: 'Options' , attr: 'spacing' , title: 'all' , prefix: 'spacing-' },
        { name: 'Options' , attr: 'spacingY' , title: 'between Y' , prefix: 'space-y-'},
        { name: 'Options' , attr: 'spacingX' , title: 'between X' , prefix: 'space-x-'},
    ] },
    
]
 
export default twgroups