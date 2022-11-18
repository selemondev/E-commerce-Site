<script setup lang="ts">
import { useProductStore } from '../store/productStore';
import { ref, watchEffect } from "vue";
import { ProductType } from "../Types/productTypeInterface";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
const modules = [Navigation];
const categoryProducts = ref<any>(null);
const products = ref<any>(null);
const listOfProducts = ref<ProductType[]>([])
const listOfCategoryProducts = ref<ProductType[]>([])
const productStore = useProductStore();
const userInput = ref<string>("");
watchEffect(() => {
    productStore.getCategoryProducts(userInput.value);
    console.log(userInput.value)
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
        <div class="flex-between mx-6">
            <h1 class="text-xl">New & Featured</h1>
            <select name="genders" class="py-1 px-1 rounded-md border border-gray-600" v-model="userInput">
                <option value="" disabled>All</option>
                <option v-for="gender in genders" :value="gender.name" :key="gender.id">{{ gender.name }}</option>
            </select>
        </div>
        <div>
            <swiper :navigation="true" :modules="modules" class=" w-full h-full flex-center my-4 overflow-x-scroll">
                <div v-if="!userInput.valueOf" v-for="product in products" :key="product._id" class="mx-6 space-y-3">
                    <swiper-slide><img :src="product.image" :alt="product.title" class="w-[200px] h-80">
                        <div class="space-y-1">
                            <div class="flex-between">
                                <h2>{{ product.title }}</h2>
                                <p>{{ product.price }}</p>
                            </div>
                            <p class="text-gray-600 line-clamp-1">{{ product.desc }}</p>
                        </div>
                    </swiper-slide>
                </div>

                <div v-else v-for="product in categoryProducts" :key="product.desc" class="mx-6 space-y-3">
                    <swiper-slide>
                        <img :src="product.image" :alt="product.title" class="min-w-[300px] h-80">
                        <div class="space-y-1">
                            <div class="flex-between">
                                <h2>{{ product.title }}</h2>
                                <p>{{ product.price }}</p>
                            </div>
                            <p class="text-gray-600 max-w-[200px] line-clamp-1">{{ product.desc }}</p>
                        </div>
                    </swiper-slide>
                </div>
            </swiper>
        </div>

        <div class="w-72 text-center">
            <swiper style="--swiper-navigation-color: #000" :navigation="true" :modules="modules" class="mySwiper">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <swiper-slide>Slide 6</swiper-slide>
                <swiper-slide>Slide 7</swiper-slide>
                <swiper-slide>Slide 8</swiper-slide>
                <swiper-slide>Slide 9</swiper-slide>
            </swiper>
        </div>
    </div>
</template>