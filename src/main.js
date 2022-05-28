import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locale/i18n'
import naive from 'naive-ui'
import './index.css'

createApp(App).use(router).use(i18n).use(naive).use(createPinia()).mount('#app')

