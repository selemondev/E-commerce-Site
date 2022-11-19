<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>
<template>
    <div class="flex-justify-center w-full py-2.5 border-b border-gray-200">
        <div class="relative">
            <div class="absolute flex-center inset-y-0 left-0 pl-3">
                <Icon icon="tabler:search" class="text-xl text-gray-600" />
            </div>

            <div>
                <input type="text" placeholder="Search" class="appearance-none border border-gray-400 rounded-md w-80 py-1.5 px-4 pl-10">
            </div>
        </div>
    </div>
</template>