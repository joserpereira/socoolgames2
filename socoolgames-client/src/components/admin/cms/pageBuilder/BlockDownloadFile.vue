<template>
    <!-- ══════════════════ FORM / CTA ══════════════════ -->
    <section id="receber" class="bg-[#e8f0d0] py-16 fade d4">
    <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="font-display font-black text-4xl text-[#1a1808] mb-2">
        Recebe já o teu <span class="text-primary">ebook gratuito</span> <span class="star text-2xl">⭐</span>
        </h2>
        <p class="text-[#4a4428] text-base mb-8" v-html="props.data.subTitle?.[props.selectedLang]">
        </p>

        <!-- Language + submit row -->
        <div class="flex flex-col sm:flex-row gap-3 bg-white rounded-full px-2 py-2 shadow-md border border-[#ddd8c0] mb-5">
        <!-- radio group -->
        <!-- <div class="flex items-center gap-4 px-4 flex-1">
            <label class="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#3a3818]">
            <input type="radio" name="lang" value="en" class="accent-primary" />
            Inglês
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#3a3818]">
            <input type="radio" name="lang" value="pt" checked class="accent-primary" />
            Português
            </label>
        </div> -->
            <input 
                type="email" 
                :placeholder="props.data.inputPlaceholder?.[props.selectedLang]"
                v-model="data.email"
                class="px-6 py-4 rounded-full text-gray-700 border border-gray-300 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
            />
            <button class="btn-pulse bg-primary hover:bg-secondary transition-colors text-white font-display font-black text-base tracking-widest uppercase px-8 py-3 rounded-full shadow-md whitespace-nowrap">
                {{ props.data.buttonText?.[props.selectedLang] }}
            </button>
        </div>

        <!-- trust row -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#3a6418]" v-html="props.data.footer?.[props.selectedLang]">
        </div>
    </div>
    </section>
</template>
<script setup>
    import { defineProps, defineExpose, reactive } from 'vue';
    import { formatUrl } from "@/utils/url.utils";

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
    })

    defineExpose({ formatUrl, props, data });

</script>