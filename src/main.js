import Vue from 'vue'

import VueRouter from "vue-router";
import router from "./route/router.js";

import App from './App.vue'
import npcCorporationsStore from "store/npcCorporationsStore.js";
import number_formatter from "./js/number_formatter.js";

import 'assets/css/main.css'

Vue.prototype.$format = {
    EVE_number : number_formatter,
}
Vue.use(VueRouter)

const app = new Vue({
    el:'#app',
    store : npcCorporationsStore,
    router : router,
    render: a => a(App),
}).$mount('#app')