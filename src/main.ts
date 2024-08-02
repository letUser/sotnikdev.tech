import './assets/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/src/message.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(router)

app.mount('#app')

axios.defaults.baseURL = 'https://api.sotnikdev.tech'
