<script setup lang="ts">
import Sidebarlinks from './Sidebarlinks.vue';
</script>
<template>
    <div class="hidden flex-col items-center fixed h-full border border-gray-200 sm:flex xl:items-start xl:w-[300px]">
        <div class="w-full border-b border-gray-200">
            <div class="flex-justify-center ">
                <img src="https://api.iconify.design/simple-icons:nike.svg" alt="Nike" class="w-14 h-14">
            </div>
        </div>

        <div class="mt-4 space-y-2">
            <Sidebarlinks />
        </div>
    </div>
</template>