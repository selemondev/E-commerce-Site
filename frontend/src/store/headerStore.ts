import { defineStore } from "pinia";
export const useHeaderStore = defineStore({
    id: "headerStore",
    state: () => ({
        mobileNav: false
    }),

    actions: {
        handleSidebar(rotate: boolean) {
            this.mobileNav = this.mobileNav = rotate;
        }
    }
})