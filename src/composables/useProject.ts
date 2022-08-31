import { reactive } from 'vue'
//import Project from '/@/composables/useProjectClass'
import jp from 'jsonpath'

export const project = reactive ( {
    data: Object ,
    path: ''
})

export const exportDocument = async (html:String , template:Object) =>{
    if ( !html ) return
    let page:any = template
    let fonts:any = jp.query ( page.json.blocks , '$..blocks..font') 
    let fnts:any = [ ...new Set ( fonts.filter ( (a:string) => { return a } ) )]
    let anims:any = jp.query ( page.json.blocks , '$..blocks[?(@.gsap.animation)]') 
    let animations = anims.map ( (a:any) => { return { id: a.id , gsap: a.gsap }}) 
    
    const exportPage:any = {
        html : html,
        json: page.json,
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