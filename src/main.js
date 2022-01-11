import Vue from 'vue'
import App from './App.vue'
import npcCorporationsStore from "store/npcCorporationsStore.js";

const app = new Vue({
    el:'#app',
    store : npcCorporationsStore,
    render: a => a(App),
})