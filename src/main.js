import { createApp } from "vue";

import router from "./route/router.js";
import App from './App.vue'
import npcCorporationsStore from "store/npcCorporationsStore.js";
import number_formatter from "./js/number_formatter.js";

import 'assets/css/main.css'

const formatterSet = {
    EVE_number : number_formatter,
}

createApp(App)
    .use(npcCorporationsStore)
    .use(router)
    .provide('$format', formatterSet)
    .mount('#app')
