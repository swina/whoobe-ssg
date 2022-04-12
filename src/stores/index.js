import { createStore } from 'vuex';
import editor from './modules/editor.js'
import navigation from './modules/navigation'

const store = createStore({
    modules: {
      editor: editor,
      navigation: navigation
    }
  })

export default store

