<script setup lang="ts">
import axios from "axios";
import { useProductStore } from "../store/productStore";
import { ProductType } from "../Types/productTypeInterface";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
const productStore = useProductStore();
const product = ref<ProductType[]>([]);
const route = useRoute();
const fetchProduct = async () => {
    const response = await axios.get(`http://localhost:5000/api/products/find/product/${route.params.id}`);
    product.value.push(response.data)
};

watchEffect(() => {
    fetchProduct();
});

const handleAddToCart = (product: ProductType) => {
    product.forEach((item:ProductType) => {
        productStore.addToCart(item)
    })
}
</script>
<template>
    <div v-for="item in product" :key="item._id" class="w-full min-h-screen md:grid-layout">
        <div class="flex flex-col mt-2 space-x-8 md:flex md:flex-row">
            <div>
                <img :src="item.image" :alt="item.title" class="px-2 rounded-md md:w-80 md:h-80">
            </div>

            <div class="py-4 space-y-3 md:py-0">
                <h1 class="text-2xl">{{ item.title }}</h1>
                <p class="max-w-sm">{{ item.desc }}</p>
                <span class="flex-center space-x-2">
                    <p class="w-5 h-5 rounded-md" :style="{ backgroundColor: item.color }"></p>
                    <p>{{ item.color }}</p>
                </span>
                <p>Price: ${{ item.price }}</p>
                <button @click="handleAddToCart(product)" class="py-2 px-10 rounded-md bg-black text-white border border-black hover:bg-white hover:text-black transition duration-200 ease-in">Buy Now</button>
            </div>
        </div>
    </div>
</template>