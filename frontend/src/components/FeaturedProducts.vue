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
        name: "men"
    },

    {
        id: 2,
        name: "women"
    },

    {
        id: 3,
        name: "kids"
    }
];
</script>
<template>
    <div>
        <div class="flex-between mx-2 md:mx-6">
            <h1 class="text-xl">New & Featured</h1>
            <select name="genders" class="py-1 px-1 rounded-md border border-gray-600" v-model="userInput">
                <option value="" disabled>All</option>
                <option v-for="gender in genders" :value="gender.name" :key="gender.id">{{ gender.name }}</option>
            </select>
        </div>
        <div>

            <div class="flex flex-wrap mt-3 mx-6 md:flex-center">
                <div v-if="!userInput.valueOf" v-for="product in products" :key="product._id" class="cursor-pointer">
                    <router-link :to="{ name: 'product', params: { id: product._id } }">
                        <div>
                            <img :src="product.image" :alt="product.title" class="w-full h-80">
                            <div class="space-y-1 max-w-md">
                                <div class="flex-between">
                                    <h2>{{ product.title }}</h2>
                                    <p>{{ product.price }}</p>
                                </div>
                                <p class="text-gray-600 line-clamp-1 w-48">{{ product.desc }}</p>
                            </div>
                        </div>
                    </router-link>

                </div>

                <div v-else class="m-4 space-y-3 w-72 md:min-w-[350px] cursor-pointer"
                    v-for="product in categoryProducts" :key="product">
                    <router-link :to="{ name: 'product', params: { id: product._id}}">
                        <div class="bg-[#eee] p-4">
                            <img :src="product.image" :alt="product.title" class="w-full h-80">
                            <div class="space-y-1 mt-2">
                                <div class="flex-between">
                                    <h2>{{ product.title }}</h2>
                                    <p>${{ product.price }}</p>
                                </div>
                                <p class="text-gray-600 line-clamp-1 w-48">{{ product.desc }}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
