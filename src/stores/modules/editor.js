const editor = {
    state: () => ({ 
        elements: null,
        current: null,
        document: null,
        page: null ,
    }),
    mutations: {
        elements ( state , payload ){
            state.elements = payload 
        },
        current ( state , payload ){
            console.log ( payload )
            state.current = payload
        },    
        document ( state , payload ){
            state.document = payload
        },
        page ( state , payload ){
            state.page = payload
        },
    },
    getters: {
        state(state) {
          return state;
        },
    }
}

export default editor