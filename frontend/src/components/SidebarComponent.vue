<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useHeaderStore } from "../store/headerStore";
import SidebarLinks from "./SidebarLinks.vue";
const headerStore = useHeaderStore();
const mobileNav = ref<boolean>(false);
watchEffect(() => {
    mobileNav.value = headerStore.mobileNav
});

</script>
<template>
    <transition name="mobileNav" class="animation">
        <div v-if="mobileNav"
            class="fixed h-full items-center flex-col overflow-y-scroll shadow-lg border-r border-gray-400 w-[300px]">
            <SidebarLinks />
        </div>

        <div v-else class="hidden fixed h-full flex-col w-[300px] border-r border-gray-200 overflow-y-scroll lg:block">
            <SidebarLinks />
        </div>
    </transition>
</template>

<style scoped>
.mobileNav-enter-active,
.mobileNav-leave-active {
    transition: all 0.5s ease-in;
}

.mobileNav-enter-from,
.mobileNav-leave-to {
    transform: translateX(-250px)
}

.mobileNav-enter-to {
    transform: translateX(0);
}
</style>