<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { useHeaderStore } from '../store/headerStore';
const headerStore = useHeaderStore();
const sidebarIsOpen = ref(headerStore.mobileNav);
const rotate = ref<any>("");
const isAuthenticated = ref<boolean>(false);
watchEffect(() => {
    rotate.value = headerStore.mobileNav;
})
const handleSidebar = () => {
    headerStore.handleSidebar(sidebarIsOpen.value = !sidebarIsOpen.value);
};

const showDropDownMenu = ref<boolean>(false);
const handleToggleDropDownMenu = () => {
    return showDropDownMenu.value = !showDropDownMenu.value;
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
]
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
                    <router-link to="/dashboard" tag="h1" class="cursor-pointer dashboard">Dashboard</router-link>
                    <Icon icon="bi:handbag" class="w-6 h-6 cursor-pointer" />
                </div>

                <div class="flex-center lg:hidden">
                    <div :class="{ 'rotate': rotate }" @click="handleSidebar">
                        <div class="box1 bg-black"></div>
                        <div class="box2 bg-black"></div>
                        <div class="box3 bg-black"></div>
                    </div>
                </div>
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