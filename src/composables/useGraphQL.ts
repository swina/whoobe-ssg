import { reactive , provide } from 'vue'
import { GraphQLClient , gql } from 'graphql-request';
import { graphqlConfig } from './directus'
import { store } from './useStore'

const log = console.log

export const configAll =  graphqlConfig 

//get all graphql endpoints
const ep = import.meta.env.VITE_APP_GRAPHQL_ENDPOINT

log ( 'API store' , store )

//set gQLClients object for each endpoint  (client name and url)
const endpoints = ep.split(';')
const gQLClients = endpoints.map ( ep => {
    let endp = ep.split('@')
    return { client: endp[0] , url: endp[1] }
})

//returns all graphQL Enpoints available
export const graphqlClients = gQLClients.map ( cl => { return cl.client } )

//set the graphqlClient
//@ client : client name ( ex. directus, must correspond to an env variable VITE_APP_GRAPHQL_ENDPOINT )
//a corresponding file name .ts in ./composables (ex. directus.ts)
export async function setGraphqlClient ( client ){
    return new GraphQLClient( gQLClients.filter(a=>a.client===client)[0].url )
}

export async function graphQLData ( config:Object ){
    //import client configuration from file
    let configClient = graphqlConfig[config.client] //await import(`./${config.client}`)
    store.graphql['config'] = configClient
    //load configuration
    let qryConfig = configClient
    console.log ( qryConfig )
    //qryConfig['url'] = gQLClients.filter(a=>a.client===config.client)[0].url.replace('graphql','')
    let client = await setGraphqlClient ( config.client )
    let query = qryConfig.schema[config.model].query
    
    // list data 
    if ( !config.slug ){
        let params = {}
        params['lang'] = store.status.locale
        console.log ( params , query.list )
        const data = await client.request ( query.list , params )
        console.log ( await data )
        log ( await graphQLCollectionFields ( config ))
        return await data[config.model]
    } 
    // single by slug
    if ( config.slug ){
        let params = {}
        params['lang'] = store.status.locale
        params['slug'] = config.slug
        const data = await client.request ( query.single , params )
        log ( await graphQLCollectionFields ( config ))
        return await data[config.model]
    }
    return null
    
}


export async function graphQLCollectionFields ( config:Object ){
    let configClient = graphqlConfig[config.client]
    let translations = config.model + '_translations'
    let fields = await fetch ( configClient.url + '/fields/' + translations )
    log ( await fields )
}

export async function isGraphQLContainer ( config:Object , parent:String ){
    if ( config?.client && config?.model && !parent ) {
        return true
    }
    return false
}

export async function graphQLDirectus ( collection:String ){
    let configClient = graphqlConfig.directus
    let query = configClient.schema[collection].query.list
    let client = await setGraphqlClient ( 'directus' )
    const data = await client.request ( query )
    log ( collection , ' data => ' , await data )
    // const response = await fetch ( configClient.url + '/items/' + collection )
    // const data = await response.json()
    store.directus[collection] = await data[collection]
    log ( data[collection] , store )
}

export async function graphQLTemplateSave (template:Object){
    let configClient = graphqlConfig.directus
    log ( configClient )
    let params = {
        name: template.name ,
        blocks: template
    } 
    const data = await fetch ( configClient.url + '/items/templates' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params) 
    })
    return await data
}

export async function graphQLProjectSave (project:Object){
    let configClient = graphqlConfig.directus
    log ( configClient )
    let params = {
        name: project.name ,
        json: project
    } 
    const data = await fetch ( configClient.url + '/items/projects' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params) 
    })
    return await data
}