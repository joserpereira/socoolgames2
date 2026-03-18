<template>
    <section>
        <div class="max-w-6xl mx-auto px-6 py-5 mb-14 grid gap-12 items-center">

            <!-- BLOCK 2 - NEWSLETTER -->
            <div class="row mt-24 px-6 text-center">

                <h3 class="text-2xl md:text-3xl font-bold text-green-700 mb-6">
                    {{ props.data.title?.[props.selectedLang] }}
                </h3>

                <form class="flex flex-col md:flex-row gap-4 justify-center mb-3">
                <input 
                    type="email" 
                    :placeholder="props.data.inputPlaceholder?.[props.selectedLang]"
                    class="px-6 py-4 rounded-full border border-gray-300 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <button 
                    type="submit"
                    class="bg-primary hover:bg-darkgreen text-white px-8 py-4 rounded-full font-semibold shadow-md transition"
                >
                    {{ props.data.buttonText?.[props.selectedLang] }}
                </button>
                </form>
                <p class="text-sm text-gray-600">
                    {{ props.data.note?.[props.selectedLang] }}
                </p>

            </div>
        </div>
    </section>
</template>
<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

</script>