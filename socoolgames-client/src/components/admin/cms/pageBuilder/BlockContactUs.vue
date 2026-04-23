<template>
     <!-- SECTION -->
  <section class="max-w-7xl mx-auto px-6 py-16">

    <!-- HEADER -->
    <div class="text-center mb-12">
      <h1 v-if="props.data.title?.[props.selectedLang]" class="text-4xl md:text-5xl font-bold mb-4">
        {{ props.data.title?.[props.selectedLang] }}
      </h1>
      <p v-if="props.data.subTitle?.[props.selectedLang]" class="text-lg text-gray-600 max-w-xl mx-auto">
        {{ props.data.subTitle?.[props.selectedLang] }}
      </p>
    </div>

    <!-- CARD -->
    <div class="bg-secondary rounded-3xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">

      <form class="space-y-6">

        <!-- EMAIL -->
        <div v-if="data.submitted" class="text-center">            
            {{ props.data.thanksMessage?.[props.selectedLang] }}
            
        </div>
        <div v-else>
          <label for="email" class="block mb-2 font-semibold">
            {{ props.data.emailLabel?.[props.selectedLang] }}
          </label>
          <input
            type="email"
            id="email"
            v-model="data.item.email"
            :placeholder="props.data.emailPlaceholder?.[props.selectedLang]"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- MESSAGE -->
        <div v-if="!data.submitted">
          <label for="message" class="block mb-2 font-semibold">
            {{ props.data.messageLabel?.[props.selectedLang] }}
          </label>
          <textarea
            id="message"
            v-model="data.item.message"
            rows="5"
            :placeholder="props.data.messagePlaceholder?.[props.selectedLang]"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>

        <!-- CTA -->
         
        <div class="flex items-center justify-center">
              <div v-if="data.errorMessage" class="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Be Warned</p>
                <p>{{ data.errorMessage }}</p>
            </div>
        </div>                        
        <div v-if="!data.submitted" class="flex items-center justify-center">
            <button
                type="submit" 
                @click.prevent="sendContact"
                class="px-5 bg-primary text-white/80 hover:text-white hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition duration-300">
                {{ props.data.buttonText?.[props.selectedLang] }}
            </button>
        </div>

        <!-- TRUST LINE -->
        <p v-if="!data.submitted" class="text-sm text-center text-gray-600">
          {{ props.data.formNotes?.[props.selectedLang] }}
        </p>

      </form>
    </div>

  </section>
</template>
<script setup lang="ts">
    import { defineProps, reactive } from 'vue';
    import contactusService from "@/services/contactus.service";

    const props = defineProps({        
        data: {
            type: Object
        },        
        selectedLang: {
            type: String
        }
    })

    const data = reactive({
        item: {} as any,
        submitted: false as boolean,
        errorMessage: "" as string
    })
    const sendContact = () => {
        data.errorMessage = "";
        const response = contactusService.validData(data.item);
        if (response) {
            data.errorMessage = response;
            return;
        }
        contactusService.insertItem(data.item, "contactus").then(async (response: any) => {
            if (response && response.data && response.data.data) {
              data.submitted = true;
            } else {
                data.errorMessage = "Opps. Please try again."
            }

          }).catch((error)  => {
            data.errorMessage = error.message;
          })
    }
</script>