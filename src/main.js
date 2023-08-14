import { createApp } from 'vue'
import App from './App.vue'
import register from './layouts/components/register'
import iconPark from './plugin/icon-park'
import 'element-plus/theme-chalk/display.css'
import store from './store'
import { setupRouter } from '@/router'

const app = createApp(App)

app.use(store)
register(app)
iconPark(app)

setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))
