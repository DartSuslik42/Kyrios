import Vue from 'vue'
import Vuex from 'vuex'
import {npcCorporationsModule} from "./npcCorporationsModule.js";
Vue.use(Vuex)

export default new Vuex.Store({
    state:{},       // data
    getters:{},     // computed
    mutations:{},   // change data      $store.commit('name', params)
    actions:{},
    modules:{npcCorporationsModule},
})
