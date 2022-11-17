<script setup lang="ts">
import { useProductStore } from '../store/productStore';
import { ref, watchEffect } from "vue";
import { ProductType } from "../Types/productTypeInterface";
const categoryProducts = ref<any>(null);
const products = ref<any>(null);
const listOfProducts = ref<ProductType[]>([])
const listOfCategoryProducts = ref<ProductType[]>([])
const productStore = useProductStore();
const userInput = ref<string>("");
watchEffect(() => {
    productStore.getCategoryProducts(userInput.value);
    productStore.getProducts();
});

watchEffect(() => {
    listOfCategoryProducts.value = productStore.categoryProducts;
    listOfCategoryProducts.value.forEach((product) => {
        categoryProducts.value = product;
    });

    listOfProducts.value.forEach((product) => {
        products.value = product;
    })
});

const genders = [
    {
        id: 1,
        name: "All"
    },

    {
        id: 2,
        name: "men"
    },

    {
        id: 3,
        name: "women"
    },

    {
        id: 4,
        name: "kids"
    }
];
</script>
<template>
    <div>
        <div class="flex-between mx-6">
            <h1 class="text-xl">New & Featured</h1>
            <select name="genders" class="py-1 px-1 rounded-md border border-gray-600" v-model="userInput">
                <option value="All">All</option>
                <option v-for="gender in genders" :value="gender.name" :key="gender.id">{{ gender.name }}</option>
            </select>
        </div>
        <div class="flex-center my-4">
            <div v-if="!userInput" v-for="product in products" :key="product._id" class="mx-6 space-y-3">
                <img :src="product.image" :alt="product.title" class="w-80 h-80">
                <div class="space-y-1">
                    <div class="flex-between">
                        <h2>{{ product.title }}</h2>
                        <p>{{ product.price }}</p>
                    </div>
                    <p class="text-gray-600">{{ product.desc }}</p>
                </div>
            </div>

            <div v-else-if="userInput === 'All'" v-for="product in products" :key="product.title" class="mx-6 space-y-3">
                <img :src="product.image" :alt="product.title" class="w-80 h-80">
                <div class="space-y-1">
                    <div class="flex-between">
                        <h2>{{ product.title }}</h2>
                        <p>{{ product.price }}</p>
                    </div>
                    <p class="text-gray-600">{{ product.desc }}</p>
                </div>
            </div>

            <div v-else v-for="product in categoryProducts" :key="product._id" class="mx-6 space-y-3">
                <img :src="product.image" :alt="product.title" class="w-80 h-80">
                <div class="space-y-1">
                    <div class="flex-between">
                        <h2>{{ product.title }}</h2>
                        <p>{{ product.price }}</p>
                    </div>
                    <p class="text-gray-600">{{ product.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>