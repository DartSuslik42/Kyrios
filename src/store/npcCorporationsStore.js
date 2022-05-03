import {createStore} from 'vuex'
import {npcCorporationsModule} from "./npcCorporationsModule.js";
import {lpTradesModule} from "./lpTradesModule.js"


export default createStore({
    state:{},       // data
    getters:{},     // computed
    mutations:{},   // change data      $store.commit('name', params)
    actions:{},
    modules:{npcCorporationsModule , lpTradesModule},
})
