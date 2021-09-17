import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "./pages/MainPage";
import RoutesPage from "./pages/RoutesPage";
import VehiclesPage from "./pages/VehiclesPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/routes',
        component: RoutesPage
    },
    {
        path: '/vehicles',
        component: VehiclesPage
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})