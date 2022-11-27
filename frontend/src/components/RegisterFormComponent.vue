<script setup lang="ts">
import { Icon } from "@iconify/vue"
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, sameAs, minLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import axios from "axios";
const router = useRouter();
interface FormData {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    loading: boolean,
    emailError: string,
    error: ""
};
const formData = reactive<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    loading: false,
    emailError: "",
    error: ""
});

const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email address is required", required), email },
        username: { required: helpers.withMessage("Username is required", required) },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
        confirmPassword: { required: helpers.withMessage("Confirm password is required", required), sameAs: sameAs(formData.password) }
    }
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    const response = await v$.value.$validate();
    if (response) {
        formData.loading = true;
        await axios.post('http://localhost:5000/api/auth/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }).then(response => {
            formData.loading = false;
            window.location.href = router.resolve("/login").href
        }).catch((err) => {
            formData.loading = false
            console.log(err.message)
        });
    }
};

</script>
<template>
    <div class="grid-layout w-full min-h-screen">
        <div class="max-w-sm w-72 mt-4 md:w-80">
            <form @submit.prevent="handleSubmit()" class="w-full shadow-md rounded-md py-6 px-6 border border-gray-200">

                <div class="grid-layout space-y-2">
                    <Icon icon="simple-icons:nike" class="w-14 h-14" />
                    <h1 class="font-Inter text-black font-bold">Create an account </h1>
                </div>

                <div v-if="formData.error" class=py-2>
                    <div class="grid-layout rounded-md w-full h-10 bg-[#F8D7DA]">
                        <h2 class="text-red-500 text-md">{{ formData.error }}</h2>
                    </div>
                </div>

                <div :class="[v$.username.$error ? 'pb-0' : 'pb-3']">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" placeholder="Username" class="form-input" v-model="formData.username" />
                    <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-3']">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" placeholder="Email" class="form-input" v-model="formData.email" />
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                    <p class="error" v-if="formData.emailError">{{ formData.emailError }}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-3']">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password" />
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.confirmPassword.$error ? 'pb-0' : 'pb-3']">
                    <label for="confirm password" class="form-label">Confirm Password</label>
                    <input type="password" placeholder="Re-type Password" class="form-input"
                        v-model="formData.confirmPassword" />
                    <p class="error" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
                </div>

                <div>
                    <button class="form-btn grid-layout" v-if="formData.loading">
                        <LoaderComponent />
                    </button>

                    <button v-else class="form-btn">
                        Sign Up
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>