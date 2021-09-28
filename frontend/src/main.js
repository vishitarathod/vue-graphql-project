import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import store from './store/index'
// import apollo from './apolloClient'
import { createProvider } from './vue-apollo'
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueLoaders)
new Vue({
  render: h => h(App),
  router:router,
  store:store,
  apolloProvider: createProvider(),
}).$mount('#app')
