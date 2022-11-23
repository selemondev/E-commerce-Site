import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import CreateView from "../views/CreateView.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: (() => import("../views/DashboardView.vue")),
        children: [
            {
                path: "/dashboard/create",
                component: CreateView
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkExactActiveClass: "active-class"
});

export default router;