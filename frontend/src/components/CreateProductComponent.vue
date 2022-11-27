<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { storage } from "../firebaseConfig";
import { reactive, computed, ref, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { useRouter } from 'vue-router';
import LoaderComponent from "./LoaderComponent.vue";
const router = useRouter();
const isAdmin = ref<boolean | any>(false);
const token = ref<string | any>("");
const loading = ref(false);

watchEffect(() => {
    isAdmin.value = localStorage.getItem("isAdmin");
    token.value = localStorage.getItem("token");
});

const config = {
    headers: {
        Authorization: ` Bearer: ${token.value}`
    }
}

interface ProductData {
    title: string,
    selectedImage: any,
    description: string,
    blob: string,
    error: string,
    loading: boolean,
    price: string,
    color: string,
    categories: Object,
    inStock: boolean,
    select: string
};

const productData = reactive<ProductData>({
    title: "",
    selectedImage: "",
    description: "",
    price: "",
    blob: "",
    error: "",
    color: "",
    categories: [],
    inStock: false,
    loading: false,
    select: ""
});
const fileUpload = (event: any) => {
    const target = event.target;
    const file = target.files[0];
    productData.selectedImage = file;
    productData.blob = URL.createObjectURL(file);
}
const rules = computed(() => {
    return {
        title: { required: helpers.withMessage("Product title is required", required) },
        description: { required: helpers.withMessage("Product title is required", required) },
        color: { required: helpers.withMessage("Product color is required", required) },
        price: { required: helpers.withMessage("Product price is required", required) },
        categories: { required: helpers.withMessage("Product categories is required", required) },
        selectedImage: { required: helpers.withMessage("Product Image is required", required) }
    }
});
const v$ = useVuelidate(rules, productData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (isAdmin) {
        if (result) {
            loading.value = true;
            let productImage;
            const imageReference = storageRef(storage, `images/${new Date().getTime()}`);
            const snap = await uploadBytes(imageReference, productData.selectedImage);
            const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
            productImage = downloadImageUrl;
            await axios.post('http://localhost:5000/api/products/create', {
                image: productImage,
                title: productData.title,
                desc: productData.description,
                color: productData.color,
                price: productData.price,
                inStock: productData.inStock,
                categories: productData.categories
            }, config);
            loading.value = false;
            setTimeout(() => {
                productData.title = "",
                    productData.description = "",
                    productData.blob = ""
            }, 1000);
            router.push("/")
        }
    } else {
        console.log("You are not an admin")
    }
};
const removeSelectedImage = () => {
    return productData.blob = "";
}
</script>
<template>
    <div class="grid-layout w-full min-h-screen">
        <div class="max-w-sm w-72 mt-4 md:w-96">
            <form @submit.prevent="handleSubmit()" class="w-full shadow-md rounded-md py-6 px-6 border border-gray-200">

                <div class="grid-layout space-y-2">
                    <Icon icon="simple-icons:nike" class="w-14 h-14" />
                </div>

                <div class="grid-layout">
                    <div v-if="!productData.blob">
                        <label for="fileUpload" class="grid-layout w-20 h-20 rounded-full bg-gray-200">
                            <Icon icon="material-symbols:android-camera-outline"
                                class="text-xl text-black cursor-pointer" />
                        </label>
                        <input type="file" hidden name="fileUpload" id="fileUpload" @change="fileUpload">
                        <p class="error" v-if="v$.selectedImage.$error">{{ v$.selectedImage.$errors[0].$message }}</p>
                    </div>
                    <div v-else>
                        <img :src="productData.blob" alt="blob" class="w-48 h-48 rounded-sm">
                        <div class="grid-center" @click="removeSelectedImage()">
                            <p class="text-red-500 hover:text-red-600 cursor-pointer py-2">Remove selected image</p>
                        </div>
                    </div>
                </div>

                <div v-if="productData.error" class=py-2>
                    <div class="grid-layout rounded-md w-full h-10 bg-[#F8D7DA]">
                        <h2 class="text-red-500 text-md">{{ productData.error }}</h2>
                    </div>
                </div>

                <div :class="[v$.title.$error ? 'pb-0' : 'pb-3']">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" placeholder="Title" class="form-input" v-model="productData.title" />
                    <p class="error" v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.description.$error ? 'pb-0' : 'pb-3']">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" placeholder="Description" class="form-input" v-model="productData.description" />
                    <p class="error" v-if="v$.description.$error">{{ v$.description.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.color.$error ? 'pb-0' : 'pb-3']">
                    <label for="color" class="form-label">Color</label>
                    <input type="text" placeholder="Color" class="form-input" v-model="productData.color" />
                    <p class="error" v-if="v$.color.$error">{{ v$.color.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.price.$error ? 'pb-0' : 'pb-3']">
                    <label for="color" class="form-label">Price</label>
                    <input type="text" placeholder="Price" class="form-input" v-model="productData.price" />
                    <p class="error" v-if="v$.price.$error">{{ v$.price.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.categories.$error ? 'pb-0' : 'pb-3']">
                    <label for="categories" class="form-label">Categories</label>
                    <input type="text" placeholder="e.g men, women, kids" class="form-input"
                        v-model="productData.categories" />
                    <p class="error" v-if="v$.categories.$error">{{ v$.categories.$errors[0].$message }}</p>
                </div>

                <div class="pb-3">
                    <label for="inStock" class="form-label">InStock</label>
                    <select name="genders" class="py-1 mt-2 px-1 w-full rounded-md border border-gray-600"
                        v-model="productData.select">
                        <option value="" disabled>All</option>
                        <option value="Yes" name="Yes">Yes</option>
                        <option value="No" name="No">No</option>
                    </select>
                </div>

                <div class="pb-3">
                    <button type="submit" class="form-btn grid-layout" v-if="productData.loading">
                        <LoaderComponent />
                    </button>

                    <button type="submit" v-else class="form-btn">
                        Create product
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>