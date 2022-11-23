<script setup lang="ts">
import SidebarComponent from '../components/SidebarComponent.vue';
</script>

<template>
    <div class="flex h-full">
        <router-view/>
        <SidebarComponent />
    </div>
</template>