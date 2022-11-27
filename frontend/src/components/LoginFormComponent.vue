<script setup lang="ts">
import { Icon } from "@iconify/vue"
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, minLength } from "@vuelidate/validators";
import { reactive, computed, watchEffect, ref } from "vue";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "vue-router";
import LoaderComponent from "../components/LoaderComponent.vue";
import { loginUrl } from "../utils/authUrl";
import axios from "axios";
const router = useRouter();
const isAdmin = ref<boolean | any>(false);

watchEffect(() => {
    isAdmin.value = localStorage.getItem("isAdmin")
})
interface FormData {
    email: string,
    password: string,
    loading: boolean,
    error: string
};

const formData = reactive<FormData>({
    email: "",
    password: "",
    loading: false,
    error: ""
});
const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email address is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
    }
});

const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
    const response = await v$.value.$validate();
    if (response) {
        formData.loading = true;
        await axios.post(loginUrl, {
            email: formData.email,
            password: formData.password
        }).then((response: AxiosResponse) => {
            localStorage.setItem("token", response.data?.accessToken);
            localStorage.setItem("isAdmin", response.data?.isAdmin);
            window.location.href = router.resolve("/").href
            formData.loading = false;
        }).catch((err: AxiosError) => {
            formData.loading = false;
            console.log(err.message)
        });
    };
};

</script>
<template>
    <div class="grid-layout w-full min-h-screen">
        <div class="max-w-sm w-72 mt-4 md:w-80">
            <form @submit.prevent="handleSubmit()" class="w-full shadow-md rounded-md py-6 px-6 border border-gray-200">

                <div class="grid-layout space-y-2">
                    <Icon icon="simple-icons:nike" class="w-14 h-14" />
                    <h1 class="font-Inter text-black font-bold">Sign into your account</h1>
                </div>

                <div v-if="formData.error" class=py-2>
                    <div class="grid-layout rounded-md w-full h-10 bg-[#F8D7DA]">
                        <h2 class="text-red-500 text-md">{{ formData.error }}</h2>
                    </div>
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-3']">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" placeholder="Email" class="form-input" v-model="formData.email" />
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-3']">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password" />
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

                <div class="pb-3">
                    <button type="submit" class="form-btn grid-layout" v-if="formData.loading">
                        <LoaderComponent />
                    </button>

                    <button type="submit" v-else class="form-btn">
                        Sign In
                    </button>
                </div>

                <div class="md:grid-layout">
                    <h1 class="text-sm cursor-pointer">Don't have an account yet?
                        <router-link to="/register" tag="span"
                            class="text-sm text-gray-600 hover:font-bold hover:text-black">
                            Register
                        </router-link>
                    </h1>
                </div>

            </form>
        </div>
    </div>
</template>