<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
</script>
<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>
<style>
.active-class {
  font-weight: bold;
}
</style>