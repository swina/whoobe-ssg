<template>
    <div class="p-4 flex flex-col">
        <div v-if="!store.editor.current.parent" class="flex flex-col">
            Select GraphQL endpoint 
            <select v-model="store.editor.current.data.client">
                <option value=""></option>
                <option v-for="cl in graphqlClients" :value="cl">{{cl}}</option>
            </select>
            Model
            <select v-model="store.editor.current.data.model">
                <option value=""></option>
                <option v-if="store.editor.current.data.client" v-for="model in Object.keys(graphqlConfig[store.editor.current.data.client].schema)" :value="model">{{model}}</option>
            </select>
            <div class="flex flex-col" v-if="store.status.locales && store.status.locales.length > 1">
                Lanaguage
                <select v-model="store.status.locale" @change="updateData">
                    <option v-for="locale in store.status.locales" :value="locale">{{ locale }}</option>
                </select>
            </div>
            <button @click="setQLModel" class="mt-4 m-auto">Confirm</button>
        </div>
            <div v-if="store.editor.current.parent" class="flex flex-col justify-center">
               
                <div class="flex flex-wrap my-2">
                    <!-- <template v-for="field in graphqlConfig[store.editor.current.data.client].schema[store.editor.current.data.model].query.fields">
                        <chip class="m-1" :class="store.editor.current.parent && field===store.editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'" @click="setQLField(field)">{{field}}</chip>
                    </template> -->
                    <template v-if="store.graphql.config.schema[store.editor.current.data.model].query?.translations" v-for="field in store.graphql.config.schema[store.editor.current.data.model].query.translationsFields">
                        <chip class="m-1" :class="store.editor.current.parent && field===store.editor.current.data?.field ? 'bg-purple-700':'bg-blue-500'" @click="setQLFieldTranslation(field)">{{field}}-{{store.status.locale.split('-')[0]}}</chip>
                    </template>
                    <template v-for="field in store.graphql.config.schema[store.editor.current.data.model].query.fields">
                        <chip class="m-1" :class="store.editor.current.parent && field===store.editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'" @click="setQLField(field)">{{field}}</chip>
                    </template>
                </div>
                <button @click="store.status.dialog=null" class="mt-4 m-auto">Confirm</button>
            </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref  } from 'vue'
import { graphqlClients, graphqlConfig , graphQLCurrent } from '/@/composables/useGraphCMS';
import { graphQLData } from '/@/composables/useGraphQL'
const store = inject ( 'useStore' )

let index = ref(0)
let current = store.editor.current

const setQLModel = async () => {
    store.status.loading = true
    store.editor.current.data.schema = graphqlConfig[store.editor.current.data.client].schema[store.editor.current.data.model]
    graphQLCurrent[store.editor.current.id] = store.editor.current.data
    if ( store.editor.current.data.model ){
        store.graphql.data[store.editor.current.id] = {}
        store.graphql.data[store.editor.current.id][store.editor.current.data.model] = await graphQLData ( store.editor.current.data )
    }    
    store.status.loading = false
    store.editor.tool = 'graphql'
    store.status.dialog = null
}

const setQLField = (field:String) => {
    if ( store.editor.current.data?.client && store.editor.current.parent ) {
        if ( store.editor.current.data?.field && store.editor.current.data.field === field ){
            delete store.editor.current.data.field
            store.editor.current.content = ''
        } else {

            store.editor.current.data['field'] = field
            let content = field.split('.').reduce((o,i)=> o[i], store.graphql.data[store.editor.current.parent][store.editor.current.data.model][index.value])
            let prefix = ''
                // if ( store.editor.current.data.client === 'directus' ){
                //     prefix = graphqlConfig[store.editor.current.data.client].url + 'assets/'
                // }
                // console.log( prefix )
            if ( store.editor.current.element === 'img' ){
                content = prefix + content
                if ( !content?.url ){
                    content = { url: content }                    
                } 
                store.editor.current.image = content
            } else {
                store.editor.current.content = content
            }
        }
        store.editor.tool = 'graphql'            
        

    }
}

const setQLFieldTranslation = (field:String) => {
    if ( store.editor.current.data?.client && store.editor.current.parent ) {
        if ( store.editor.current.data?.field && store.editor.current.data.field === field ){
            delete store.editor.current.data.field
            store.editor.current.content = ''
        } else {
            store.editor.current.data['field'] = field
            let content = field.split('.').reduce((o,i)=> o[i], store.graphql.data[store.editor.current.parent][store.editor.current.data.model][index.value].translations[0])
            let prefix = ''
            //     if ( store.editor.current.data.client === 'directus' ){
            //         prefix = graphqlConfig[store.editor.current.data.client].url + 'assets/'
            //     }
            //     console.log( prefix )
            if ( store.editor.current.element === 'img' ){
                content = prefix + content
                if ( !content?.url ){
                    content = { url: content }                    
                } 
                store.editor.current.image = content
            } else {
                store.editor.current.content = content
            }
        }
        store.editor.tool = 'graphql'            
        

    }
}

const updateData = async () => {
    store.status.loading = true
    store.editor.current.data.schema = graphqlConfig[store.editor.current.data.client].schema[store.editor.current.data.model]
    graphQLCurrent[current.id] = store.editor.current.data
    store.graphql.data[store.editor.current.id] = {}
    store.graphql.data[store.editor.current.id][store.editor.current.data.model] = []
    try { 

        if ( store.editor.current.data.model ){
            data.value = await graphQLData(store.editor.current.data) //graphQLQuery ( store.editor.current.data )
            store.graphql?.data ? null : store.graphql = { data: null }
            store.graphql.data[store.editor.current.id][store.editor.current.data.model] = await data.value
        }    
        store.status.loading = false
    } catch (err ){
        store.status.loading = false
        console.log ( err)
    }
    

    //delete store.editor.current.data.general

}


</script>