<script setup lang="ts">
import { Icon } from "@iconify/vue";
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
                    <Icon icon="simple-icons:nike" class="w-14 h-14" />
                </div>

                <div class="hidden lg:block">
                    <ul v-for="link in navLinks" :key="link.id" class="inline-flex">
                        <li class="cursor-pointer p-3 text-gray-800 hover:text-gray-900">{{ link.name }}</li>
                    </ul>
                </div>

                <div>
                    <Icon icon="bi:handbag" class="w-6 h-6" />
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
</style>