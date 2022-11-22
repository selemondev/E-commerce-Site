import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: (() => import("../views/DashboardView.vue"))
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkExactActiveClass: "active-class"
});

export default router;