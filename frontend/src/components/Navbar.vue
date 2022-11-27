<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { useHeaderStore } from '../store/headerStore';
import { useProductStore } from "../store/productStore";
import { useRouter } from "vue-router";
const productStore = useProductStore();
const headerStore = useHeaderStore();
const router = useRouter();
const sidebarIsOpen = ref(headerStore.mobileNav);
const rotate = ref<any>("");
const isAdmin = ref<boolean | any>(false);
const token = ref<string | any>("");
watchEffect(() => {
    rotate.value = headerStore.mobileNav;
    isAdmin.value = localStorage.getItem("isAdmin");
    token.value = localStorage.getItem("token");
})
const handleSidebar = () => {
    headerStore.handleSidebar(sidebarIsOpen.value = !sidebarIsOpen.value);
};
const navLinks = [
    {
        id: 1,
        name: "New & Featured"
    },

    {
        id: 2,
        name: "Men"
    },

    {
        id: 3,
        name: "Women"
    },

    {
        id: 4,
        name: "Kids"
    }
];

const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("isAdmin");
    window.location.href = router.resolve("/").href
};
</script>
<template>
    <div>
        <header>
            <nav class="w-full h-14 border-b border-gray-100 flex-between px-4">
                <div>
                    <router-link to="/">
                        <Icon icon="simple-icons:nike" class="w-14 h-14" />
                    </router-link>
                </div>

                <div class="hidden lg:block">
                    <ul v-for="link in navLinks" :key="link.id" class="inline-flex">
                        <li class="cursor-pointer p-3 text-gray-800 hover:text-gray-900">{{ link.name }}</li>
                    </ul>
                </div>

                <div class="flex-center space-x-6">
                    <router-link to="/dashboard" tag="h1" v-if="isAdmin === true" class="cursor-pointer dashboard">Dashboard
                    </router-link>
                    <button v-if="token" @click="handleLogOut" class="bg-black text-white text-sm py-1.5 px-2 rounded-md border border-black transition duration-200 ease-in hover:bg-white hover:text-black">Log Out</button>
                    <router-link to="/cart">
                        <div class="relative">
                            <div class="rounded-full ml-1 text-center">
                                <span class="absolute top-1.5 right-2 text-sm font-bold text-red-500">{{
                                        productStore.cartQuantity
                                }}</span>
                            </div>
                            <Icon icon="bi:handbag" class="w-6 h-6 cursor-pointer" />
                        </div>
                    </router-link>
                </div>

                <!-- <div class="flex-center lg:hidden">
                    <div :class="{ 'rotate': rotate }" @click="handleSidebar">
                        <div class="box1 bg-black"></div>
                        <div class="box2 bg-black"></div>
                        <div class="box3 bg-black"></div>
                    </div>
                </div> -->
            </nav>
        </header>
    </div>
</template>

<style scoped>
nav ul li::after {
    content: "";
    width: 0;
    height: 2px;
    background: #000;
    display: block;
    margin: auto;
    transition: 0.5s;
}

nav ul li:hover::after {
    width: 100%;
}

.dashboard::after {
    content: "";
    width: 0;
    height: 2px;
    background: #000;
    display: block;
    margin: auto;
    transition: 0.5s;
}

.dashboard:hover::after {
    width: 100%;
}
</style>