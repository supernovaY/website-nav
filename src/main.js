import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia';
const pinia = createPinia()

createApp(App).use(pinia).use(ElementPlus).mount('#app')
