<script setup lang="ts">
import { getDownloadURL, ref as storageRef, uploadBytes } from '@firebase/storage';
import { reactive } from "vue";
import { storage } from "../firebaseConfig";
import { useProductStore } from "../store/productStore";
interface ProductData {
    title: string,
    description: string,
    selectedImage: string | any,
    blob: string,
    color: string,
    price: string,
    inStock: boolean,
    loading: boolean,
    error: string
}
const productData = reactive<ProductData>({
    title: "",
    description: "",
    selectedImage: "",
    blob: "",
    color: "",
    price: "",
    inStock: false,
    loading: false,
    error: ""
});

const productStore = useProductStore();
const fileUpload = (event: { target: any; }) => {
    const target = event.target;
    const file = target.files[0];
    productData.selectedImage = file;
    productData.blob = URL.createObjectURL(file);
};

function removeSelectedImage() {
    productData.selectedImage = "";
};


async function sendProductData() {
    try {
        let sentProductImage;

        const imageReference = storageRef(storage, `product/image${new Date().getTime()}`);
        const snap = await uploadBytes(imageReference, productData.selectedImage);
        const downloadProductImage = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
        sentProductImage = downloadProductImage;
        await productStore.sendProducts(productData.title, productData.description, productData.selectedImage, productData.color, productData.inStock, productData.price)
    } catch (err:any) {
        productData.error = err.message;
    }
}
</script>
<template>
    <div>
        
    </div>
</template>