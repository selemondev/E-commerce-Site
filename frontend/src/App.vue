<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
import DashboardView from './views/DashboardView.vue';
import { ref } from "vue";
const token = ref(false)
</script>
<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>
<style>
.active-class {
  font-weight: bold;
}
</style>