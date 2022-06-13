<template>
    <div class="p-2 flex flex-col" v-if="store.editor.current" :key="store.editor.current.id" :ql="isGraphQL">
        GraphQL endpoints 
        <select v-model="store.editor.current.data.client" @change="config.model=''">
            <option value=""></option>
            <option v-for="cl in graphqlClients" :value="cl">{{cl}}</option>
        </select>
        Model
        <select v-model="store.editor.current.data.model" @change="setQLModel">
            <option value=""></option>
            <option v-if="store.editor.current.data.client" v-for="model in Object.keys(graphqlConfig[store.editor.current.data.client].schema)" :value="model">{{model}}</option>
        </select>

        <div v-if="store.editor.current.data.client && store.editor.current.data.model && !store.editor.current.data?.child" class="my-2">
            <div class="flex items-center my-2">Loop Item <input class="ml-2 border" type="checkbox" v-model="store.editor.current.data.isLoop"></div>
            
                <div class="grid grid-cols-2 mt-4">
                    <div>
                        Limit <input type="number" v-model="store.editor.current.data.limit" min="0" class="ml-2 w-12">
                    </div>
                    <div class="flex items-center">
                        Offset <input type="number" v-model="store.editor.current.data.offset" min="0" class="ml-2 w-12">
                    </div>
                </div>
            
        </div>

        <div v-if="store.editor.current.data.client && store.editor.current.data.model && store.editor.current.data?.child" class="my-2" title="to set a field select a block as target content">
            Fields
            <div class="flex flex-wrap">
                <template v-for="field in store.editor.current.data.schema.query.fields">
                    <chip class="m-1" :class="field===store.editor.current.data?.field ? 'bg-purple-700':'bg-gray-700'" @click="setQLField(field)">{{field}}</chip>
                </template>
            </div>
        </div>
        <div class="absolute flex items-center justify-center w-full bottom-0 mb-20 " v-if="store.editor.current.data.client && store.editor.current.data.model && !store.editor.current.data?.child">
            <button class="bg-purple-600 mx-auto" @click="generateGraphQLPages">Generate all pages</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject , ref , computed } from 'vue'
import { graphqlClients , graphqlConfig , graphQLQuery , graphQLCurrent , CMS } from '/@/composables/useGraphCMS';

const store = inject('useStore')

let data = ref(null)

console.log ( CMS )

const config = ref ( {
    client: null,
    model: '',
    schema: null,
    isLoop: false,
    limit: 8,
    offset:0
})

const isGraphQL = computed ( () => {
    if ( graphQLCurrent[store.editor.current.parent] ){
        console.log ( 'is graphql' )
        store.editor.current.data.client = graphQLCurrent[store.editor.current.parent].client
        store.editor.current.data.model = graphQLCurrent[store.editor.current.parent].model
        store.editor.current.data.schema = graphQLCurrent[store.editor.current.parent].schema
        store.editor.current.data.child = true
        
        return true
    }
    return false
})

let cc = ref(graphQLCurrent)

if ( graphQLCurrent ){
    if ( graphQLCurrent[store.editor.current.parent] ){
        console.log ( 'has graphql parent')
        //cc.value = graphQLCurrent[store.editor.current.parent]
    }
}


const setQLModel = async () => {
    store.status.loading = true
    store.editor.current.data.schema = graphqlConfig[store.editor.current.data.client].schema[store.editor.current.data.model]
    graphQLCurrent[store.editor.current.id] = store.editor.current.data
    if ( store.editor.current.data.model ){
        data.value = await graphQLQuery ( store.editor.current.data )
        store.graphql.data[store.editor.current.id] = await data.value
    }    
    store.status.loading = false

    //delete store.editor.current.data.general
}

const setQLField = (field:String) => {
    //if ( !store.editor.current.data?.client ) {
        if ( store.editor.current.data?.field && store.editor.current.data.field === field ){
            delete store.editor.current.data.field
            store.editor.current.content = ''
        } else {
            store.editor.current.data['field'] = field
            if ( store.editor.current.element === 'img' ){
                store.editor.current.image.url = store.graphql.data[store.editor.current.parent][store.editor.current.data.model][0][field].url
            } else {
                store.editor.current.content = store.graphql.data[store.editor.current.parent][store.editor.current.data.model][0][field]
            }
        }
    //}

}

const generateGraphQLPages = () => {
    store.message.console = 'Generate pages ...\n'
    store.message.console += 'Endpoint : ' + store.editor.current.data.client + '\nModel : ' + store.editor.current.data.model + '\n'
    store.message.console += 'Limit : ' + store.editor.current.data.limit + '\nOffset : ' + store.editor.current.data.offset 
}


</script>