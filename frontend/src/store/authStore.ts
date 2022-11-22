import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: "authStore",

    state: () => ({
        token: "" as string
    }),

    actions: {
        async registerUser() {
            
        }
    }
})