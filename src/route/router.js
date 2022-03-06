import VueRouter from "vue-router";
import LPStore from "../components/pages/LP-Store.vue"
import BPStore from "../components/pages/BP-Store.vue"
import MainPage from "../components/pages/BP-Store.vue"

const routes = [
    { path: '/', component: MainPage, redirect: '/home' },
    { path: '/lp_store', component: LPStore , children : [
            { path: ':corp_id(\\d+)', component: LPStore, alias : [':corp_id']}
        ]},
    { path: '/bp_store', component: BPStore},
]
const router = new VueRouter({
    routes : routes,
    mode: 'history',
})

export default router