export default class Project {
    name: string
    title: string
    description: string
    devserver: string
    framework: string
    homepage: object
    header: object
    footer: object
    pages: object
    fonts: object
    animations: object
    analytics: string
    init: boolean


    constructor(){
        this.name = "A new website"
        this.title = "My website"
        this.description = "A new website create with whoobe"
        this.devserver = "http://localhost:3001"
        this.framework = "sveltekit"
        this.homepage = {}
        this.header = {}
        this.footer = {}
        this.pages = {}
        this.fonts = []
        this.animations = []
        this.analytics = ''
        this.init = true
    }


}
