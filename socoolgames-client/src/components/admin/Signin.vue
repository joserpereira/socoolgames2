<template>
  <div class="min-h-screen">

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img style="height: 80px" src="@/assets/images/logo_horiz.webp" class="rounded-xl mx-auto" alt="So Cool Games" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
              <label for="email" class="block text-sm/6 font-medium">Email address</label>
              <div class="mt-2">
                <input v-model="data.user.email" id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md px-3 py-1.5 text-base placeholder:text-gray-500 sm:text-sm/6" />
               </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium">Password</label>
                <div class="text-sm">
                <a href="#" class="font-semibold text-primary hover:text-secondary">Forgot password?</a>
                </div>
              </div>
              <div class="mt-2 relative">
                <!-- <input v-model="data.password" id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" /> -->
                  <input
                    v-model="data.user.password"
                    :type="data.showPassword ? 'text' : 'password'"
                    id="password"
                    name="password"
                    required
                    v-on:keyup="passwordKeyUp"
                    autocomplete="current-password"
                    class="block w-full rounded-md px-3 py-1.5 pr-10
                          text-base"
                  />
                <button
                  type="button"
                  @click="data.showPassword = !data.showPassword"
                  class="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  <!-- olho aberto -->
                  <svg 
                    v-if="!data.showPassword"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                  <!-- olho fechado -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>

                </button>
              </div>
            </div>

            <div>
              <button @click.prevent="submit" type="submit" 
                     class="flex w-full justify-center rounded-md bg-primary text-white px-3 py-1.5 text-sm/6 font-semibold hover:bg-secondary">
                <div class="loader" v-if="data.loading"></div> Sign in
              </button>
            </div>
            <div style="white-space: pre; " v-if="data.errorMessage">
              <div class="text-red-400">{{ data.errorMessage }}</div>
            </div>
        <p class="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?
            <a href="/admin/signup" class="font-semibold text-primary hover:text-secondary">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { login } from "@/services/common/_authentication.service";
// import authService from "@/services/common/auth.service";
import store from "@/store";
export default {
    name: 'SigninComponent',

    setup() {
      const router = useRouter();

      const data = reactive({
        user: {
          email: "",
          password: ""
        },
        name: "",
        email: "",
        password: "",
        backUrl: "",
        errorMessage: "",
        showPassword: false,
        loading: false
      });

      onMounted(async () => {
        const route = useRoute();
        data.backUrl = route.query.back as string;
      });

      const passwordKeyUp = async (e) => {
        if (e.keyCode == 13) {
          submit();
        }
      }

      const submit = async () => {
        try {
          // Call the authentication service to sign in
          data.loading = true;
          store.dispatch("auth/login", data.user).then(
            () => {
              if (data.backUrl && data.backUrl !== "") {
                router.push(data.backUrl);
              } else {
                router.push("/admin/");
              }

            },
            (error: any) => {
              data.loading = false;
              data.errorMessage = "Sign in failed. Please check your credentials.";
              console.debug("error", error)
              //console.log("error loading", error);
                // (error.response &&
                //   error.response.data &&
                //   error.response.data.message) ||
                // error.message ||
                // error.toString();
            }
          ).catch(() => {
            console.log("login error");
            
          })
          // var result = await authService.login(data.email, data.password);

          // if (result.user) {
            
          // } else {
          //   data.loading = false;
          //   data.errorMessage = "Sign in failed. Please check your credentials.";
          //   if (result.data?.message)
          //     data.errorMessage = data.errorMessage + "\n" + result.data?.message;
          // }
        } catch (error) {
          data.loading = false;
          //console.error("Sign in error:", error);
          data.errorMessage = "Validation failed. Please try again later or contact support.";
        }
      };
      return {
        data,
        passwordKeyUp,
        submit,
      };
    }
};

</script>
<style>
.loader1 {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #1A123F; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
  margin-top: 4px;
  position: absolute;
  margin-right: 75px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>