import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCk_sveW27-yXF61NwslqyRQN1I7xIjsNo",
    authDomain: "fullstack-ecommerce-d3a0f.firebaseapp.com",
    projectId: "fullstack-ecommerce-d3a0f",
    storageBucket: "fullstack-ecommerce-d3a0f.appspot.com",
    messagingSenderId: "316942360450",
    appId: "1:316942360450:web:5a7355480459f729cdf99b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
    storage
}