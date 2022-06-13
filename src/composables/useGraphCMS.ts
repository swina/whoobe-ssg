import { reactive , provide } from 'vue'
import { GraphQLClient , gql } from 'graphql-request';
import { EDITOR } from './useEditor'

const ep = import.meta.env.VITE_APP_GRAPHQL_ENDPOINT
const endpoints = ep.split(';')
const gQLClients = endpoints.map ( ep => {
    let endp = ep.split('@')
    return { client: endp[0] , url: endp[1] }
})

export const graphqlClients = gQLClients.map ( cl => { return cl.client } )

export const CMS_URL:String = import.meta.env.VITE_APP_GRAPHCMS_CONTENT_API

var graphcmsClient = new GraphQLClient('https://1xikguiz.directus.app/graphql')//CMS_URL);
//const graphc = new GraphQLClient('https://1xikguiz.directus.app/graphql')

export const _CMS_SCHEMA = reactive({
    schema:{
        pages: {
            query: {
                list: gql`
                {
                pages {
                        id
                        title
                        slug
                        abstract
                        featuredImage {
                            url
                        }
                        content {
                            html
                            raw
                        }
                        tags
                    }
                }`,
                single: gql`
                query ($slug: String) {
                  pages(where: { slug: $slug }) {
                    slug
                    title
                    content {
                        html
                        raw
                    }
                    abstract
                    featuredImage {
                        url
                    }
                    tags
                  }
                }
              `,
                params: 'slug',
                name: 'title',
                fields: ['slug','title','content','abstract' , 'featuredImage' , 'tags'],
                seo: {
                    title: 'title',
                    description: 'abstract',
                    keywords: 'tags'
                }
            }
        },
        posts: {
            query : {
                list: 'getCMSPosts',
                single: 'getCMSPost'
            }
        }
    }
})

export const CMS_SCHEMA = reactive({
    schema:{
       pages: {
            query: {
                list: gql`
                {
                pages {
                        id
                        slug
                        title
                        abstract
                        featuredImage
                    }
                }`,
                single: gql`
                query($slug:String) {
                    pages(filter:{slug:{ _eq:$slug }}) {
                        id
                        title
                        featuredImage
                        slug
                        html
                        tags
                    }
                }
                `,
                params: 'slug',
                name: 'title',
                fields: ['slug','title','html','abstract' , 'featuredImage','tags'],
                seo: {
                    title: 'title',
                    description: 'abstract',
                    keywords: 'tags'
                }
            }
        }
    }
})

export const graphqlConfig = {
    'directus' : {
        schema:{
            pages: {
                query: {
                    list: gql`
                    {
                    pages {
                            id
                            slug
                            title
                            abstract
                            featuredImage
                        }
                    }`,
                    single: gql`
                    query($slug:String) {
                        pages(filter:{slug:{ _eq:$slug }}) {
                            id
                            title
                            featuredImage
                            slug
                            html
                            tags
                        }
                    }
                    `,
                    params: 'slug',
                    name: 'title',
                    fields: ['slug','title','html','abstract' , 'featuredImage','tags'],
                    seo: {
                        title: 'title',
                        description: 'abstract',
                        keywords: 'tags'
                    }
                }
            }
        }
    },
    graphcms: {
        schema:{
            pages: {
                query: {
                    list: gql`
                    {
                    pages {
                            id
                            title
                            slug
                            abstract
                            featuredImage {
                                url
                            }
                            content {
                                html
                                raw
                            }
                            tags
                        }
                    }`,
                    single: gql`
                    query ($slug: String) {
                      pages(where: { slug: $slug }) {
                        slug
                        title
                        content {
                            html
                            raw
                        }
                        abstract
                        featuredImage {
                            url
                        }
                        tags
                      }
                    }
                  `,
                    params: 'slug',
                    name: 'title',
                    fields: ['slug','title','content','abstract' , 'featuredImage' , 'tags'],
                    seo: {
                        title: 'title',
                        description: 'abstract',
                        keywords: 'tags'
                    }
                }
            }
        }
    }
}

console.log ( gQLClients , graphqlConfig )

export const CMS =  reactive ( {} )

export const graphQLCurrent = reactive ({})

export async function setGraphqlClient ( client ){
    return new GraphQLClient( gQLClients.filter(a=>a.client===client)[0].url )
}

export async function graphQLQuery ( config ){
    let client = await setGraphqlClient ( config.client )
    const data = await client.request ( config.schema.query.list )
    return await data
}



export async function getCMSQuery(schema){
    let query = CMS_SCHEMA.schema[schema].query.list
    console.log ( query )
    const data = await graphcmsClient.request( query )
    console.log ( await data )
    CMS[schema] = await data[schema]
}

export async function getCMSSingleQuery(schema:String,param:String){
    let query = CMS_SCHEMA.schema[schema].query.single
    let params = {}
    params[CMS_SCHEMA.schema[schema].query.params] = param
    const data = await graphcmsClient.request( query , params )
    return await data
}

export async function getCMSPages(){
    const data = await graphcmsClient.request(
    gql`
        {
        pages {
            id
            title
            slug
        }
        }
    `
    );
    CMS.pages = await data.pages
}

export async function getCMSPage(slug:String){
    const data = await graphcmsClient.request(
        gql`
        query getPageBySluf($slug: String) {
          pages(where: { slug: $slug }) {
            title
            content {
                html
                raw
            }
            
          }
        }
      `,
      {
        slug: slug,
      }
    );
    //console.log ( 'response ' , await data )
    CMS.page = await data.pages[0]
}