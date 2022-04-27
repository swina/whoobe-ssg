import { reactive } from 'vue'
import { GraphQLClient , gql } from 'graphql-request';
import { EDITOR } from './useEditor'


export const CMS_URL:String = import.meta.env.VITE_APP_GRAPHCMS_CONTENT_API
const graphcmsClient = new GraphQLClient(CMS_URL);

export const CMS_SCHEMA = reactive({
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
                query getPageBySluf($slug: String) {
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

export const CMS =  reactive ( {
    pages:Object,
    page:Object,
    posts:Object,
    post:Object,
    products:Object,
    product:Object
})

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