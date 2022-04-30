export default class Element {

    constructor(){
        this.id = this.randomID()
        this.blocks = []
        this.css = {
            css: "" ,
            container: "" 
        }
        this.tailwind = {}
        this.font = ""
        this.style = ""
        this.content = ""
        this.description = ""
        this.categories = []
        this.alpine = {}
        this.events = {
            display: null,
            hide: null,
            mouseenter: null,
            mouseleave: null,
            click: null,
            focus: null,
            blur: null,
            keydown: null
        }
        this.data = {}
        this.gsap = {
            animation: null,
            ease: null,
            duration: 0,
            delay:0
        }
        this.link = ''
        this.anchor = ''
        this.image = {
            url: null,
            alt: 'image'
        }
        this.type = 'element'
        this.tag = 'element'
        this.editable = false
        this.icon = 'highlight_alt'
        this.helper = null
        this.dialog = null
    }

    randomID(){
        return 'whoobe-' + Math.random().toString(36).substr(2, 5)
    }

    Groups(){
        return [ 
            {
                label: 'containers'  , 
                elements: [ 
                    {
                        name: 'Grid',
                        icon: 'bi:grid-3x3' 
                    }, 
                    {
                        name: 'Flexbox' ,
                        icon: 'arcticons:orange-flex'
                    },
                    {
                        name: 'Container' ,
                        icon: 'octicon:container-24'
                    }
                ],
            } ,
            { 
                label:'text',
                elements: [ 
                    { 
                        name: 'Heading' ,
                        icon: 'bx:heading' ,
                    }, 
                    {
                        name: 'Paragraph',
                        icon: 'bi:text-paragraph' 
                    },
                    { 
                        name: 'Inline Text',
                        icon: 'carbon:string-text'
                    }, 
                    {
                        name: 'Span',
                        icon: 'fluent:dual-screen-span-20-regular'
                    },
                    {
                        name: 'Blockquote',
                        icon: 'tabler:blockquote'
                    },
                    {
                        name: 'Code',
                        icon: 'bi:code-slash'
                    }

                ]
            },
            {
                label: 'media',
                elements: [ 
                    {
                        name: 'Image' ,
                        icon: 'akar-icons:image' 
                    }, 
                    {
                        name: 'Slider' ,
                        icon: 'ri:slideshow-line' 
                    },
                    { 
                        name: 'Video',
                        icon: 'bx:movie'
                    },
                    { 
                        name: 'Youtube',
                        icon: 'foundation:social-youtube' 
                    }, 
                    {
                        name: 'Vimeo',
                        icon: 'fa6-brands:vimeo' 
                    },
                    // {
                    //     name: 'MIcon',
                    //     icon: 'crop_original'
                    // },
                    {
                        name: 'Iconify',
                        icon: 'line-md:iconify2'
                    },
                    {
                        name: 'Download',
                        icon: 'ant-design:download-outlined'
                    }
                ]
            },
            {
                label: 'form',
                elements: [ 
                    {
                        name: 'Form' ,
                        icon: 'mdi:form-select' 
                    }, 
                    { 
                        name: 'Input Text',
                        icon: 'bi:input-cursor'
                    },
                    { 
                        name: 'Email',
                        icon: 'carbon:email' 
                    }, 
                    // {
                    //     name: 'Hidden',
                    //     icon: 'input' 
                    // },
                    {
                        name: 'Number',
                        icon: 'carbon:character-whole-number'
                    },
                    {
                        name: 'Checkbox',
                        icon: 'bx:checkbox-checked'
                    },
                    {
                        name: 'Textarea',
                        icon: 'bi:textarea-resize'
                    },
                    {
                        name: 'Select',
                        icon: 'entypo:select-arrows'
                    },
                    {
                        name: 'Submit',
                        icon: 'ic:baseline-smart-button'
                    },
                    {
                        name: 'Reset',
                        icon: 'ic:baseline-smart-button'
                    },
                    {
                        name: 'Button',
                        icon: 'ic:baseline-smart-button'
                    }
                ]
            }
        ]
    }

    
    createElement(element,options){
        return element === 'Grid'       ? this.Grid(options) : 
            element === 'Flexbox'       ? this.Flexbox(options) :
            element === 'Container'     ? this.Container(options) :
            element === 'Heading'       ? this.Heading(options) : 
            element === 'Paragraph'     ? this.Paragraph() :
            element === 'Inline Text'   ? this.InlineText() :
            element === 'Span'          ? this.Span() :
            element === 'Blockquote'    ? this.Blockquote() :
            element === 'Code'          ? this.Code() :
            element === 'Image'         ? this.Image() :
            element === 'Slider'        ? this.Slider() :
            element === 'Video'         ? this.Video() :
            element === 'Youtube'       ? this.YTVideo() :
            element === 'Vimeo'         ? this.VimeoVideo() :
            element === 'MIcon'         ? this.Icon() : 
            element === 'Iconify'       ? this.Iconify() : 
            element === 'Download'      ? this.Download() : 
            element === 'Form'          ? this.Form() :
            element === 'Input Text'    ? this.InputText() :
            element === 'Email'         ? this.InputEmail() :
            element === 'Textarea'      ? this.InputTextarea() :
            element === 'Checkbox'      ? this.InputCheckbox() :
            element === 'Number'        ? this.InputNumber() :
            element === 'Hidden'        ? this.InputHidden() :
            element === 'Select'        ? this.InputSelect() :
            element === 'Submit'        ? this.InputSubmit() :
            element === 'Reset'         ? this.InputReset() :
            element === 'Button'        ? this.Button() : null
    }

    setIcon(icon){
        this.icon = icon
        return this
    }

    setTag(tag){
        this.tag = tag
        return this
    }

    setCss(css){
        this.css.css = css
        return this
    }

    setContent(content){
        this.content = content
        return this
    }
    
    setImage(image){
        this.image = image
        return this
    }

    setSemantic(semantic){
        this.semantic = semantic
        return this
    }

    

    Grid(){
        this.blocks = []
        this.type = 'container'
        this.tag = 'grid'
        this.css.container = 'md:grid flex flex-col'
        this.element = 'div'
        this.helper = 'blocks/helpers/Grid.vue'
        this.dialog = 'md:w-1/3'
        return this
    }



    Cols(cols=1){
        this.css.container += ' md:grid-cols-' + cols
        // for ( let n=0; n < cols ; n++){
        //     this.blocks.push ( new Element().Flexbox() )
        // }       
        return this
    }

    Container(options){
        this.blocks = []
        this.type = 'container'
        this.tag = 'container'
        this.element = 'div'
        return this
    }

    Flexbox(options={direction:null,colspan:null}){
        this.blocks = []
        this.type = 'container'
        this.tag = 'flex'
        this.css.container = 'flex' 
        this.css.container += options.direction ? ' flex-' + options.direction : '' 
        this.css.container += options.colspan ? ' col-span-' + options.colspan : ''
        this.element = 'div'
        return this
    }

    Slider(){
        this.blocks = []
        this.type = 'slider'
        this.tag = 'flex'
        this.element = 'slider'
        this.label = 'Slider'
        this.icon = 'video_library'
        this.css.css = 'w-full h-1/3'
        this.css.container = 'flex flex-col'
        return this
    }

    Heading(level=1){
        this.level = level
        this.element = 'h'
        this.content = 'Heading ' + level
        this.icon = 'title'
        this.editable = true
        this.helper = 'blocks/helpers/Heading.vue'
        this.dialog = 'md:w-40'
        return this
    }

    Paragraph(){
        this.element = 'p'
        this.label = 'Rich Text'
        this.icon = 'subject'
        this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor dignissim convallis aenean. Imperdiet massa tincidunt nunc pulvinar.'
        this.editable = true
        return this
    }

    InlineText(){
        this.element = 'div'
        this.label = 'Inline text'
        this.icon = 'text_snippet'
        this.content = 'Inline text'
        this.editable = true
        return this
    }

    Span(){
        this.element = 'span'
        this.label = 'Span'
        this.icon = 'text_format'
        this.content = 'Simple text'
        this.editable = true
        return this
    }

    Blockquote(){
        this.element = 'blockquote'
        this.content = 'This is a quote'
        this.editable = true
        return this
    }

    Code(){
        this.element = 'pre'
        this.content = 'Code goes here'
        this.editable = true
        return this
    }

    Image(){
        this.element = 'img'
        this.label = 'Image'
        this.icon = 'insert_photo'
        this.content = ''
        this.css.css = 'w-40 h-auto'
        return this
    }

    

    Video(){
        this.element = 'video'
        this.label = 'Video'
        this.icon = 'movie'
        this.content = ''
        this.type = 'video'
        this.src = ''
        this.options = {
            controls: true,
            autoplay: true,
            loop: true
        }
        return this
    }

    YTVideo(){
        this.src = "https://youtube.com/embed/"
        this.label = 'Youtube Video'
        this.type = 'video'
        this.tag = 'youtube'
        this.element = 'iframe'
        return this
    }

    VimeoVideo(){
        this.src = "https://player.vimeo.com/video/"
        this.label = 'Vimeo Video'
        this.type = 'video'
        this.tag = 'vimeo'
        this.element = 'iframe'
        return this
    }

    Icon(){
        this.label = 'Material Icon'
        this.data = { icon:  'home' }
        this.tag = "micon"
        this.css.css = 'text-xl'
        this.content = 'home'
        this.css.container = 'material-icons'
        this.element = 'i'
        return this
    }

    Iconify(){
        this.label = 'Iconify'
        this.data = { icon:  'fa:home' }
        this.tag = "icon"
        this.css.css = 'iconify text-2xl'
        this.content = ''
        this.css.container = ''
        this.element = 'i'
        return this
    }

    Download(){
        this.label = 'File'
        this.icon = 'download'
        this.content = 'Download'
        this.type = 'file'
        this.tag = 'file'
        this.element = 'button'
        return this
    }

    Form(){
        this.type = 'container'
        this.blocks = []
        this.tag = 'form'
        this.element = 'form'
        this.success = ''
        this.error = ''
        this.action = ''
        this.css.container = 'flex flex-col'
        this.semantic = 'form'
        this.data['attributes'] = {
            name: 'form',
            id: 'form-id',
            action: '',
            method: 'post'
        }
        return this
    }

    inputElement(){
        this.element = 'input'
        this.data.attributes = {
            name: '',
            id: '',
            placeholder: '',
            required: false
        }
        this.placeholder = ''
        this.content = ''
        this.value = ''
        this.icon = 'input'
        return this
    }

    InputText(){
        this.inputElement()
        this.type = 'text'
        this.tag = 'input'
        this.placeholder = 'Input'
        return this
    }

    InputEmail(){
        this.inputElement()
        this.type = 'email'
        this.tag = 'input'
        this.placeholder = 'Email'
        return this
    }

    InputNumber(){
        this.inputElement()
        this.tag = 'input'
        this.type = 'number'
        return this
    }

    InputHidden(){
        this.inputElement()
        this.tag = 'input'
        this.type = 'hidden'
        return this
    }

    InputCheckbox(){
        this.inputElement()
        this.tag = 'input'
        this.type = 'checkbox'
        return this
    }

    InputTextarea(){
        this.data.attributes = {
            name: '',
            id: '',
            placeholder: ''
        }
        this.element = 'textarea'
        this.tag = 'input'
        this.type = 'textarea'
        this.placeholder = 'type here'
        return this
    }

    InputSelect(){
        this.inputElement()
        this.element = 'select'
        this.data.options = [ 'option a' , 'option b' , 'option c']
        this.tag = 'select'
        this.type = 'select'
        return this
    }

    InputSubmit(){
        this.element = 'button'
        this.tag = 'submit'
        this.type = 'button'
        this.value = 'Submit'
        this.content = 'Submit'
        return this
    }

    InputReset(){
        this.InputSubmit()
        this.tag = 'reset'
        this.value = 'Reset'
        this.content = 'Reset'
        return this
    }

    Button(){
        this.type = 'button'
        this.element = 'button'
        this.tag = 'button'
        this.content = 'button'
        this.value = 'button'
        this.editable = true
        return this
    }
    
}