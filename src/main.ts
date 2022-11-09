import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

// createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')