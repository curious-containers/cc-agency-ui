import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupInterceptors from './services/setupInterceptors'

createApp(App).use(store).use(router).mount('#app')
setupInterceptors(store)
