import Vue from 'vue'
import App from './App.vue'
import npcCorporationsStore from "store/npcCorporationsStore.js";
import number_formatter from "./js/number_formatter.js";

Vue.prototype.$format = {
    EVE_number : number_formatter,
}

import 'assets/css/main.css'

let app = new Vue({
    el:'#app',
    store : npcCorporationsStore,
    render: a => a(App),
})