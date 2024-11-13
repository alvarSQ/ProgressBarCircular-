import './assets/main.scss'

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Vue3ColorPicker)
app.use(router)
app.mount('#app')
