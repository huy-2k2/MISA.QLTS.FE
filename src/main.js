import { createApp } from 'vue'
import App from './App.vue'
import emitter from './common/emitter';
import { toCurrency, toCurrentDate, toRounded } from './js/convert';
import  _enum  from './resource/enum';
import toastMessages from './resource/toastMessages';
import store from './store';
import router from './router';

const app = createApp(App)
app.config.globalProperties.toCurrency = toCurrency
app.config.globalProperties.toCurrentDate = toCurrentDate
app.config.globalProperties.toRounded = toRounded
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$enum = _enum;
app.config.globalProperties.toastMessages = toastMessages;
app.use(store)
app.use(router)
app.mount('#app')

