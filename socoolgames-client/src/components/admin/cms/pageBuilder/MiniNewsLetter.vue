<template>
<!-- Newsletter mini CTA -->
    <div class="bg-[#edf5e0] rounded-2xl p-5 border border-[#c8e0a0]">
        <p class="font-display font-black text-sm text-primary mb-2">{{ t("newsletter.title") }}</p>
        <p class="text-xs text-[#4a6030] leading-relaxed mb-3">{{ t("newsletter.description") }}</p>
        <input v-model="data.email" type="email" 
               :placeholder="t('newsletter.emailPlaceholder')" class="w-full text-xs bg-white border border-[#c8e0a0] rounded-lg px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-[--color-brand-green-light]" />
        <button class="w-full bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors"
                @click.prevent="subscribeNewsletter">
            {{ t("newsletter.subscribeButton") }}
        </button>
        <div v-if="data.sucessMessage" class="mx-5 mt-3 bg-blue-100 border-t border-b border-gray-300 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">Newsletter</p>
            <p class="text-sm">{{ data.sucessMessage }}</p>
        </div>
        <div v-if="data.errorMessage" class="mx-5 mt-3 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Be Warned</p>
            <p>{{ data.errorMessage }}</p>
        </div>
    </div>
</template>
<script setup>
    import { reactive } from 'vue';
    import utilsService from '@/services/common/utils.service';
    import emailSubscriptionService from "@/services/emailSubscription.service"
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();

    const props = defineProps({        
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