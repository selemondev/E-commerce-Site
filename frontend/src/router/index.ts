import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
const routes = [

    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            auth: false
        }
    },

    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            auth: false
        }
    },

    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            auth: false
        }
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: (() => import("../views/Dashboard.vue")),
        meta: {
            auth: true
        }
    },

    {
        path: "/product/:id",
        name: "product",
        component: (() => import("../views/ProductView.vue")),
        meta: {
            auth: true
        }
    },

    {
        path: "/cart",
        name: "cart",
        component: (() => import("../views/CartView.vue")),
        meta: {
            auth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkExactActiveClass: "active-class"
});

const currentUser = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");
        resolve(token);
        reject
    })
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.auth == true)) {
        if (await currentUser()) {
            next()
        } else {
            next("/login")
        }
    } else {
        next()
    }
})


export default router;