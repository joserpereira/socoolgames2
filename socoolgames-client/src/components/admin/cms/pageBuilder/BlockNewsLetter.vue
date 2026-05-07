<template>
    <section>
        <div class="max-w-7xl mx-auto px-6 py-5 mb-14 grid items-center">

            <!-- BLOCK 2 - NEWSLETTER -->
            <div class="row mt-24 px-6 text-center">

                <h3 class="text-2xl md:text-3xl font-bold text-green-700 mb-6">
                    {{ props.data.title?.[props.selectedLang] }}
                </h3>


                <form v-if="!data.sucessMessage" class="flex flex-col md:flex-row gap-4 justify-center mb-3">
                    <input 
                        type="email" 
                        :placeholder="props.data.inputPlaceholder?.[props.selectedLang]"
                        v-model="data.email"
                        class="px-6 py-4 rounded-full border border-gray-300 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button 
                        type="submit"
                        class="bg-primary hover:bg-darkgreen text-white px-8 py-4 rounded-full font-semibold shadow-md transition"
                        @click.prevent="subscribeNewsletter"
                    >
                        {{ props.data.buttonText?.[props.selectedLang] }}
                    </button>
                    
                </form>
                <p v-if="!data.sucessMessage" class="text-sm text-gray-600 mt-5">
                    {{ props.data.note?.[props.selectedLang] }}
                </p>                
            </div>
            <div v-if="data.sucessMessage" class="mx-5 mt-3 bg-blue-100 border-t border-b border-gray-300 text-blue-700 px-4 py-3" role="alert">
                <p class="font-bold">Newsletter</p>
                <p class="text-sm">{{ data.sucessMessage }}</p>
            </div>
            <div v-if="data.errorMessage" class="mx-5 mt-3 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Be Warned</p>
                <p>{{ data.errorMessage }}</p>
            </div>
        </div>
    </section>
</template>
<script setup>
    import { reactive } from 'vue';
    import utilsService from '@/services/common/utils.service';
    import emailSubscriptionService from "@/services/emailSubscription.service"

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    const data = reactive({
        email: "",
        errorMessage: "",
        sucessMessage: ""
    })

    const subscribeNewsletter = async () => {
        data.errorMessage = "";
        data.sucessMessage = "";
        try
        {
            if ((data.email || "") === "") {
                data.errorMessage = "Please fill email"
                return;
            }
            if (!utilsService.validateEmail(data.email)) {
                data.errorMessage = "This is not a valid email";
                return;
            }
            const item = {
                email: data.email,
                type: "newsletter",
                templateName: "newsletter",
                language: props.selectedLang
            }

            const result = await emailSubscriptionService.insertItem(item, "newsletter");
            if (result.status == 200 || result.data.error == 0) {
                data.sucessMessage = "Subscribed";
            }
            else {
                data.errorMessage = "Ooops. Please try again.";
            }
        } catch {
            data.errorMessage = "Ooops. Please try again.";
        }
    }

    defineExpose({ data })

</script>