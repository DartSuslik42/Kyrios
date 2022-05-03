
import { createRouter , createWebHistory} from "vue-router";

import LPStore from "../components/pages/LP-Store.vue"
import BPStore from "../components/pages/BP-Store.vue"
import MainPage from "../components/pages/BP-Store.vue"

const routes = [
    {
        path: '/home',
        alias : ['/'],
        component: MainPage,
    },
    {
        path: '/lp_store',
        children : [
            {
                path: ':corp_id(\\d+)',
                alias : [':corp_id'],
                component: LPStore,
                sensitive: true,
            }
        ],
        component: LPStore
    },
    {
        path: '/bp_store',
        component: BPStore
    },
]

export default createRouter({
    history : createWebHistory(),
    routes : routes,
})