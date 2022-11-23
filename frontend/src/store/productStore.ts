import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { getProducts } from "../utils/productUrl";
import { ProductType } from "../Types/productTypeInterface";
export const useProductStore = defineStore({
    id: 'productStore',
    state: () => ({
        categoryProducts: [] as ProductType[],
        products: [] as ProductType[]
    }),

    actions: {
        async getCategoryProducts(userInput:string) {
            const response = await axios.get(`${getProducts}?category=${userInput}`);
            this.categoryProducts.push(response.data);
        },

        async getProducts() {
            const response = await axios.get(getProducts);
            this.products.push(response.data)
        },

        async sendProducts(title: string, description: string, color: string, price: string, inStock: boolean, selectedImage: string,) {
            
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}