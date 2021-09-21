import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {router} from './router';
import BaseButton from './components/base/Button.vue'
// import Vuex from 'vuex';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import store from './store/index'
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.component('BaseButton',BaseButton)
Vue.use(VueLoaders)
// Vue.use(Vuex);
new Vue({
  render: h => h(App),
  router:router,
  store:store
}).$mount('#app')
