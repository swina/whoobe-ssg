import { reactive } from 'vue'
import Project from '/@/composables/useProjectClass'
import jp from 'jsonpath'

export const project = reactive ( {
    data: new Project() ,
    path: ''
})

export const exportDocument = async (html:String , template:Object) =>{
    if ( !html ) return
    let page = template
    let fonts = jp.query ( page.json.blocks , '$..blocks..font') 
    let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
    let anims = jp.query ( page.json.blocks , '$..blocks[?(@.gsap.animation)]') 
    let animations = anims.map ( a => { return { id: a.id , gsap: a.gsap }}) 
    const exportPage = {
        html : html,
        json: template.json,
        fonts: fnts,
        title: page.name,
        description: page.description,
        preview: page.image,
        animations: animations,
        tags: page.tags.join(','),
        js: page.json.blocks.data.js,
        analytics: page.analytics || null
    }
    return exportPage
    
}