<script setup lang="ts">
import { Icon } from "@iconify/vue";
const sideBarLinkMenu = [
    {
        id: 1,
        children: [
            {
                id: 1,
                name: "Dashboard",
                icon: "material-symbols:dashboard-outline",
                path: "#"
            },

            {
                id: 10,
                name: "Create",
                icon: "material-symbols:create-new-folder-outline",
                path: "/dashboard/create"
            },


            {
                id: 2,
                name: "Notifications",
                icon: "ic:outline-notifications",
                path: "#"
            },

            {
                id: 3,
                name: "Customers",
                icon: "ci:group",
                path: "#"
            },

            {
                id: 4,
                name: "Messages",
                icon: "majesticons:messages-line",
                path: "#"
            },

            {
                id: 5,
                name: "Discounts",
                icon: "ic:outline-discount",
                path: "#"
            },

            {
                id: 6,
                name: "Billing",
                icon: "system-uicons:document-list",
                path: "#"
            },

            {
                id: 7,
                name: "Performance",
                icon: "tabler:activity-heartbeat",
                path: "#"
            },

            {
                id: 8,
                name: "Help",
                icon: "ic:round-help-outline",
                path: "#"
            },

            {
                id: 9,
                name: "Settings",
                icon: "ph:gear",
                path: "#"
            }
        ]
    },
]
</script>
<template>
    <div>
        <div class="px-4 pt-2 pb-20 flex flex-col">
            <div v-for="link in sideBarLinkMenu" :key="link.id">
                <transition name="slide" class="animation">
                    <div>
                        <ul class="flex flex-col pt-5 space-y-4">
                            <li v-for="menu in link.children" :key="menu.name"
                                class="flex items-center space-x-4 group">
                                <span class="p-2 text-gray-600 bg-gray-200 rounded-xl group-hover:text-black">
                                    <Icon class="fill-current" :icon="menu.icon" />
                                </span>
                                <span>
                                    <router-link :to="menu.path" class="text-sm text-gray-600 group-hover:text-black group-hover:font-semibold">{{ menu.name }}</router-link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<style scoped>
.slide-enter-active {
    transition: all 0.3s ease-out;
}

.slide-leave-active {
    transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
