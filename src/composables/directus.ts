import { gql } from 'graphql-request';

export const graphqlConfig = {
    'directus' : {
        url: 'http://localhost:8055',
        schema:{
            pages: {
                query: {
                    list: gql`
                    query($lang:String){
                        pages {
                            id
                            translations (filter:{languages_id:{id:{_eq:$lang}}}) {
                                slug
                                title
                                abstract
                                tags
                                seo_title
                                seo_description
                            }
                            featuredImage
                            imageUrl
                            status
                            author {
                                email
                                first_name
                                last_name
                            }
                            date_updated 
                        }
                    }`,
                    listParams: ['lang'],
                    single: gql`
                    query($slug:String,$lang:String) {
                        pages(filter:{slug:{ _eq:$slug }}) {
                            id
                            translations (filter:{languages_id:{id:{_eq:$lang}}}) {
                                slug
                                title
                                abstract
                                html
                                tags
                                seo_title
                                seo_description
                            }
                            featuredImage
                            imageUrl
                            status
                            author {
                                email
                                first_name
                                last_name
                            }
                            date_updated
                        }
                    }
                    `,
                    params: ['slug,lang'],
                    name: 'title',
                    fields: ['featuredImage','author.email','author.first_name','autor.last_name','status','date_updated'],
                    translations: 'pages_translations',
                    translationsFields : [ 'title' , 'slug' , 'abstract' , 'html' , 'tags'],
                    translationsSEO : { title: 'seo_title' , description: 'seo_description' , keyword: 'tags' },
                    seo: {
                        title: 'seo_title',
                        description: 'seo_description',
                        keywords: 'tags'
                    }
                }
            },  
            templates : {
                query: {
                    list : gql`
                        query {
                            templates {
                                id
                                name
                                category {
                                    name
                                }
                                status
                                blocks
                                date_updated
                            }
                        }
                    `
                    , 
                    single: gql`
                        query($slug:String) {
                            templates(filter:{slug:{ _eq:$slug }}) {
                                id
                                name
                                category {
                                    name
                                }
                                status
                                blocks
                                date_updated
                            }
                        }
                    `,
                    category: gql`
                        query($category:String) {
                            templates(filter:{category: {name: { _eq:$category } }}) {
                                id
                                name
                                category {
                                    name
                                }
                                status
                                blocks
                                date_updated
                            }
                        }
                    `,
                    insert: gql`
                    {
                        mutation addTemplate ($template:AddTemplateInput!) { 
                            addTemplate(input: [$object] {
                                template {
                                    name
                                    blocks
                                } 
                            }
                        }
                    }`,
                    fields: [ 'name' , 'category.name' ],
                    key: 'id'
                },

            },
            templates_categories: {
                query: {
                    list: gql`
                    query { 
                            templates_categories {
                                id
                                name 
                            }
                    }
                    `,
                    single: gql`
                    query ( $id:ID! ){
                        templates_categories {
                            id
                            name
                            description
                        }
                    }
                    `,
                    fields: ['name'],
                    key: 'id'
                },
            },
            projects: {
                query: {
                    list: gql`
                    query { 
                            projects {
                                id
                                name 
                            }
                    }
                    `,
                    single: gql`
                    query ( $id:ID! ){
                        projects {
                            id
                            name
                            json
                        }
                    }
                    `,
                    fields: ['name'],
                    key: 'id'
                },
            },
            languages: {
                query: {
                    list: gql`
                    query { 
                            languages {
                                id
                            }
                    }
                    `,
                    single: gql`
                    query ( $id:ID! ){
                        languages {
                            id
                        }
                    }
                    `,
                    fields: ['id'],
                    key: 'id'
                },
            }
        }
    }
}