import './assets/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/src/message.scss'

import { createApp } from 'vue'
import { createI18n } from 'petite-vue-i18n'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import messages from '@intlify/unplugin-vue-i18n/messages'

const [a, b] = navigator.language ?? 'en'
const i18n = createI18n({
  locale: a + b,
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.use(i18n) // set global scope for i18n
app.use(router)

app.mount('#app')

axios.defaults.baseURL = 'https://api.sotnikdev.tech'
