import { createApp } from 'vue'
import App from './App.vue'
import emitter from './common/emitter';
import convert from './js/convert';
import stringExtension from './js/stringExtension'
import  _enum  from './data/enum';
import resource from './data/resource';
import store from './store';
import router from './router';

stringExtension()

const app = createApp(App)
app.config.globalProperties.convert = convert
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$enum = _enum;
app.config.globalProperties.resource = resource;
app.config.globalProperties.$router = router;
app.use(store)
app.use(router)
app.mount('#app')

