<template>
  <div class="min-h-screen">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img style="height: 80px" src="@/assets/images/logo_horiz.webp" class="rounded-xl mx-auto" alt="So Cool Games" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign up to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form action="#" method="POST" class="space-y-6">
            <div>
              <label for="name" class="block text-sm/6 font-medium">Name</label>
              <div class="mt-2">
                <input id="name" v-model="data.user.name" type="text" name="name" required 
                       placeholder="your name"
                       class="block w-full rounded-md bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6" />
                <div v-if="data.errors.name">
                  <div class="text-red-400">{{ data.errors.name }}</div>
                </div>

               </div>
            </div>

            <div>
              <label for="email" class="block text-sm/6 font-medium">Email address</label>
              <div class="mt-2">
                <input id="email" v-model="data.user.email" type="email" placeholder="your email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6" />
                <div v-if="data.errors.email">
                  <div class="text-red-400">{{ data.errors.email }}</div>
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium">Password</label>                
              </div>
              <div class="mt-2">
                <div class="relative">
                  
                  <input id="password"
                    :type="data.showPassword ? 'text' : 'password'"
                    placeholder="select a strong password"
                    v-model="data.user.password" name="password" required autocomplete="current-password" 
                   class="block w-full rounded-md px-3 py-1.5 pr-10 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6" />
                    
                  <button
                    type="button"
                    @click="data.showPassword = !data.showPassword"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-primary">
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
                <div v-if="data.errors.pass">
                  <div class="text-red-400">{{ data.errors.pass }}</div>
                </div>
              </div>
            </div>

            <div>
              <label for="inviteCode" class="block text-sm/6 font-medium ">Invite Code</label>
              <div class="mt-2">
                <input id="inviteCode" v-model="data.user.inviteCode" type="text" name="inviteCode" required placeholder="code" autocomplete="email" 
                      class="block w-full rounded-md px-3 py-1.5 outline-1 -outline-offset-1 placeholder:text-gray focus:outline-2 focus:-outline-offset-2  sm:text-sm/6" />
                <div v-if="data.errors.inviteCode">
                  <div class="text-red-400">{{ data.errors.inviteCode }}</div>
                </div>
              </div>
            </div>
            <div>
              <button @click.prevent="register" 
                class="flex w-full justify-center rounded-md bg-primary text-white px-3 py-1.5 text-sm/6 font-semibold hover:bg-secondary">                
                <div class="loader" v-if="data.loading"></div>Sign up
              </button>
            </div>
            <div v-if="data.errorMessage">
              <div class="text-red-400">{{ data.errorMessage }}</div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import userService from "@/services/user.service";


export default {
  name: "SignupComponent",

  components: {
  },

  setup() {
    const router = useRouter();

    const data = reactive({
      isLoading: false,
      errorMessage: "",
      step: 0,
      userId: "",
      user: {
        name: "",
        email: "",
        password: "",
        inviteCode: ""
      },
      errors: {
        name: "",
        email: "",
        pass: "",
        inviteCode: ""
      },
      showPassword: false,
      loading: false
    });

    onMounted(async () => {
      try {
        data.userId = "";
      } catch (error) {
        console.error("Error during registration setup:", error);
      }
    });


    const register = async () => {
      // console.log("register")

      try {
        data.errorMessage = "";
        //console.log(userService, this.user.name, this.user.companyName, this.user.email, this.user.password)
        var isValid = userService.validateData(
          data.errors,
          data.user.name,
          data.user.email,
          data.user.password,
          data.user.inviteCode
        );
        if (isValid) {
          try {
            data.isLoading = true;
            var item = await userService.insertItem(data.user, "user") as any;
            var responseData = item?.data || item?.response?.data;

            if (responseData != null && responseData.error == 0) {
              if (responseData.data._id == undefined) {
                data.errorMessage = "Error creating user";
                return;
              }
              data.userId = responseData.data._id;
              await router.push("/admin/signin");
            } else {
              if (responseData?.message != null) {
                data.errorMessage = responseData.message;
              } else {
                data.errorMessage = "Error creating user";
              }
            }
            data.isLoading = false;
          } catch (error: unknown) {
            // console.log("error registerStep", error)
            if (
              typeof error === "object" &&
              error !== null &&
              "response" in error &&
              (error as any).response.data &&
              (error as any).response.data.message
            ) {
              data.errorMessage = (error as any).response.data.message;
            } else {
              data.errorMessage = "An unexpected error occurred.";
            }
            data.isLoading = false;
          }
        }
      } catch (error: any) {
        console.error("Validation error:", error);
        data.errorMessage = error.message;
        return;
      }
    };

    return {
      data,
      register,
    };
  },
};
</script>
<style scoped>
.errorMessageStyle {
  white-space: pre-line;
  color: darkred;
}

li {
  padding-bottom: 10px;
}

.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #1A123F; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
  margin-top: 4px;
  position: absolute;
  margin-right: 80px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>