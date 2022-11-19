<script setup lang="ts">
import { Icon } from "@iconify/vue";
const sidebarMenu = [
    {
        id: 1,
        label: "Dashboard",
        icon: "material-symbols:dashboard-outline"
    },

    {
        id: 2,
        label: "Notifications",
        icon: "ion:ios-notifications-outline"
    },

    {
        id: 3,
        label: "Statistics",
        icon: "ion:trending-up"
    },

    {
        id: 4,
        label: "Payment",
        icon: "ph:currency-dollar-thin"
    },

    {
        id: 5,
        label: "Products",
        icon: "iconoir:shopping-bag"
    },

    {
        id: 6,
        label: "Customers",
        icon: "ant-design:usergroup-delete-outlined"
    },
    {
        id: 7,
        label: "Settings",
        icon: "ph:gear"
    },

    {
        id: 8,
        label: "Log Out",
        icon: "heroicons-outline:arrow-left-on-rectangle"
    }
];

</script>
<template>
    <div v-for="link in sidebarMenu" :key="link.id"
        class="flex-justify-center group ml-8 text-xl space-x-3 animation-hover xl:justify-start">
        <Icon :icon="link.icon" class="text-2xl group-hover:text-white" />
        <h3 class="hidden text-black xl:inline-block group-hover:text-white">{{ link.label }}</h3>
    </div>
</template>