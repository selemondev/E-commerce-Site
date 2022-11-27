import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { getProducts } from "../utils/productUrl";
import { ProductType } from "../Types/productTypeInterface";
import { useStorage } from "@vueuse/core"
export const useProductStore = defineStore({
    id: 'productStore',
    state: () => ({
        categoryProducts: [] as ProductType[],
        products: [] as ProductType[],
        cart: useStorage('cart', [] as any[]),
    }),

    getters: {
        cartQuantity: (state) => {
            return state.cart?.length;
        },

        itemQuantity: (state) => (product: ProductType) => {
            const item = state.cart.find((item) => item.id === product._id);
            return item?.quantity;
        },

        productTotal: (state) => {
            return state.cart.reduce((val, item) => val + item.quantity * item.price, 0)
        }
    },

    actions: {
        async getCategoryProducts(userInput:string) {
            const response = await axios.get(`${getProducts}?category=${userInput}`);
            this.categoryProducts.push(response.data);
        },

        async getProducts() {
            const response = await axios.get(getProducts);
            this.products.push(response.data)
        },

        addToCart(product:ProductType) {
            const item = this.cart.find((item) => item._id === product._id);
            if (item) {
                item.quantity++;
            } else {
                this.cart.push({...product, quantity: 1});
            };
        },

        removeFromCart(product:ProductType) {
            const item = this.cart.find((item) => item._id === product._id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    this.cart = this.cart.filter((item) => item._id !== product._id);
                }
            };
        },

    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}