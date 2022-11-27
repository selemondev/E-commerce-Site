<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ProductType } from '../Types/productTypeInterface';
import { useProductStore } from '../store/productStore';
const productStore = useProductStore();
const cartProducts = ref<ProductType | any>([]);
watchEffect(() => {
    productStore.cart.forEach((product: ProductType[]) => {
        cartProducts.value = product
    });
});

const handleRemoveFromCart = (cartProducts: ProductType) => {
    productStore.removeFromCart(cartProducts);
}
</script>
<template>
    <div class="overflow-y-auto h-96 py-2 px-4">
        <div v-if="productStore.cartQuantity === 0" class="mt-32 grid place-items-center">
            <h2 class="font-bold text-2xl">Your Cart Is Empty</h2>
        </div>
        <div v-else
            class="max-h-96 py-2 space-y-2 bg-gray-100 border border-gray-200 rounded-md w-full grid place-items-center px-6 my-4 md:px-4 md:h-32 md:flex md:justify-between md:items-center md:space-y-0">
            <div>
                <img :src="cartProducts.image" :alt="cartProducts.title" class="w-28 h-28 rounded-md">
            </div>

            <div>
                <p class="line-clamp-1">{{ cartProducts.title }}</p>
            </div>

            <div>
                <p class="font-bold">Price: ${{ cartProducts.price }}</p>
            </div>

            <div>
                <span>Quantity: {{ productStore.itemQuantity(cartProducts.quantity) }}</span>
            </div>

            <div class="flex items-center space-x-2">
                <button @click="handleRemoveFromCart(cartProducts)"
                    class="py-1 rounded-md px-2 text-white bg-black">-</button>
                <p>{{ productStore.itemQuantity(cartProducts.quantity) }}</p>
                <button @click="productStore.addToCart(cartProducts)"
                    class="py-1 rounded-md px-2 text-white bg-black">+</button>
            </div>
        </div>
    </div>
    <div v-if="productStore.cartQuantity > 0"
        class="mt-10 w-full grid place-items-center bg-white absolute z-5 md:mt-16">
        <p class="font-bold text-2xl">Total: ${{ productStore.productTotal.toFixed(2) }}</p>
    </div>
</template>