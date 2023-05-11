import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import { toCurrency, toCurrentDate, toRounded } from './js/convert';
const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.toCurrency = toCurrency
app.config.globalProperties.toCurrentDate = toCurrentDate
app.config.globalProperties.toRounded = toRounded
app.config.globalProperties.emitter = emitter;
app.mount('#app')
