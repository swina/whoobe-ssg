export default class Project {
    name: string
    title: string
    description: string
    devserver: string
    framework: string
    homepage: object
    header: object
    footer: object
    layout: object
    pages: object
    fonts: object
    animations: object
    headless: object
    scripts:Object
    analytics: string
    meta: Object
    init: boolean


    constructor(){
        this.name = "A new website"
        this.title = "My website"
        this.description = "A new website create with whoobe"
        this.devserver = "http://localhost:3000"
        this.framework = "sveltekit"
        this.homepage = {}
        this.header = {}
        this.footer = {}
        this.layout = {}
        this.pages = {}
        this.fonts = []
        this.animations = []
        this.headless = {
            cms: false,
            store: false
        },
        this.analytics = ''
        this.scripts = {
            js : [],
            css: []
        }
        this.meta = {
            og: {
                enabled: false,
                image: '',
                url: '',
                site_name: '',
                locale: 'en_US',
                user_id: '',
                app_id: ''
            },
            twitter: {
                enabled: false,
                publisher: '',
                author: '',
                image: '',
                video: ''
            }
        }
        this.init = true
    }


}
