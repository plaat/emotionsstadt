import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
    state () {
      return {
        intro: true,
        einW: false,
        deutsch: true,
        english: false,
        curAdj: '',
        map: false
      }
    },
    mutations: {
     intro(state){
      state.intro = !state.intro;
     },
     accept(state){
      state.einW = true;
     },
     deutsch(state){
      state.deutsch = true;
      state.english = false;
     },
     english(state){
      state.english = true;
      state.deutsch = false;
     },
     umfBack(state, adj){
      state.curAdj = adj
     },
     backToMap(state){
      state.map = true
     }
    },
})
const app = createApp(App)

app.use(router)

app.mount('#app')
app.use(store)