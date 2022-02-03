import VueRouter from "vue-router";
import LPStore from "../components/pages/LP-Store.vue"
//TODO : remove foo
const Foo = { template: '<div>foo</div>'}

const routes = [
    { path: '/', component: Foo },
    { path: '/lp_store', component: LPStore },
    { path: '/lp_store/:corp_id', component: LPStore },
    { path: '/foo', component: Foo},
]
const router = new VueRouter({
    routes : routes,
    mode: 'history',
})

export default router