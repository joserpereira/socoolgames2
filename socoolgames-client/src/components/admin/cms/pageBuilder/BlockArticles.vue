<template>
  <!-- ════════════════════════════════ ARTICLES SECTION ════════════════════════════════ -->
  <section class="py-14 animate-fadeup delay-200">
    <div class="max-w-7xl mx-auto px-5">

      <h2 class="font-display font-black text-3xl text-center text-[#1e1a10] mb-2"
          v-html="props.data.title[props.selectedLang]">
      </h2>
      <div class="flex justify-center mb-10">
        <div class="h-1 w-32 rounded-full bg-yellow-500"></div>
      </div>

      <!-- Main content + sidebar grid -->
      <div class="grid gap-8" :class="props.data.showRelated || props.data.showNewsletter ? 'md:grid-cols-3' : ''">

        <!-- ── ARTICLES GRID (2-col inside) ── -->
        <div class="md:col-span-2 space-y-6" :set="indexT = -1">
          <div v-for="(value, index) in data.articleSchema" :key="index" class="grid gap-5" :class="'sm:grid-cols-'+value"  >
            <div v-for="index2 in value" :key="index2" :set="indexT = indexT + 1" >
              <div v-if="value > 0" class="article-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e0cc] sm:col-span-1">
                <picture v-if="data.articles[indexT]?.image" class="h-36 bg-[#d8e8c0]">
                    <source class="h-36 bg-[#d8e8c0]" media="(width < 640px)" :srcset="formatUrl(baseUrl + (data.articles[indexT].image?.[props.selectedLang] || data.articles[indexT].image).thumb)" />
                    <source class="h-36 bg-[#d8e8c0]" media="(width <= 768px)" :srcset="formatUrl(baseUrl + (data.articles[indexT].image?.[props.selectedLang] || data.articles[indexT].image).medium)" />
                    <img loading="lazy" class="h-36 w-full bg-[#d8e8c0] rounded-t-2xl shadow-xl w-full" alt="Criança a utilizar jogo criativo no telemóvel"
                            :src="formatUrl(baseUrl + (data.articles[indexT].image?.[props.selectedLang] || data.articles[indexT].image).large)" />
                </picture>
                <div v-else class="h-36 bg-[#d8e8c0] flex items-center justify-center text-5xl">🖼️</div>
                <div class="p-4">
                  <p class="text-yellow-500 font-black text-xs mb-1" v-if="data.articles[indexT]?.header?.[props.selectedLang]">
                    {{ data.articles[indexT]?.header[props.selectedLang] }}
                  </p>
                  <h3 class="font-display font-black text-sm leading-snug text-[#1e1a10] mb-2">
                    {{ data.articles[indexT]?.title[props.selectedLang] }}
                  </h3>
                  <p class="text-[#6a6050] text-xs leading-relaxed mb-3">
                    {{ data.articles[indexT]?.content[props.selectedLang].split('\n')[0] }}
                  </p>
                  <p class="text-[#9a9080] text-xs mb-3" :title="dateTimeUtils.formatUTCDateOptionalToUser(data.articles[indexT]?.updatedAt ?? data.articles[indexT]?.createdAt)">{{ dateTimeUtils.getDateText(data.articles[indexT]?.updatedAt ?? data.articles[indexT]?.createdAt, false) }}</p>
                  <router-link :to="'/' + props.selectedLang + '/article/'+data.articles[indexT]?.slug" class="block text-center bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-secondary transition-colors">{{ t('article.readArticle') }}</router-link>
                </div>
              </div>
            </div>
          </div>          
        </div>

        <!-- ── SIDEBAR ── -->
        <aside class="space-y-6" v-if="props.data.showRelated || props.data.showNewsletter">
          <div v-if="props.data.showRelated" class="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e0cc]">
            <h3 class="font-display font-black text-base text-[#1e1a10] mb-4" v-html="props.data.otherTitle?.[props.selectedLang]">              
            </h3>
            <ul class="space-y-1">
              <li v-for="value in numberOfRelatedArticlesToFetch" :key="value">
                <div v-show="data.articles[indexT] !== undefined" >
                  <div :set="indexT = indexT + 1" class="border-t border-[#f0e8d8]">
                  <a :href="'/' + props.selectedLang + '/article/'+data.articles[indexT]?.slug" 
                      class="sidebar-link flex items-center justify-between gap-2 py-3 px-3 rounded-xl text-sm font-semibold text-[#3a3020] hover:text-primary transition-all">
                    <span>{{ data.articles[indexT]?.title[props.selectedLang] }}</span>
                    <span class="text-primary text-lg shrink-0">›</span>
                  </a>
                </div>
                </div>
              </li>
            </ul>
          </div>

          <MiniNewsLetter v-if="props.data.showNewsletter" />
        </aside>

      </div>
    </div>
  </section>    
</template>
<script setup>
    import { defineProps, defineExpose, onMounted, reactive } from 'vue';
    import { formatUrl } from "@/utils/url.utils";
    import articleService from '@/services/article.service';
    import dateTimeUtils from '@/utils/dateTime.utils';
    import MiniNewsLetter from "@/components/admin/cms/pageBuilder/MiniNewsLetter.vue";
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();

    const baseUrl = process.env.VUE_APP_API_URL;    
    const numberOfRelatedArticlesToFetch = 4; 
    const data = reactive({
        articles: [],
        articleSchema: []
    });
    const props = defineProps({        
        data: {
            type: Object
        },
        selectedLang: {
            type: String
        }
    })

    onMounted(() => {
      data.articleSchema = (props.data.articleSchema ?? "2-3").split("-").map(num => parseInt(num));
      const totalItems = data.articleSchema.reduce((partialSum, a) => partialSum + a, 0);
      // console.log("Article Schema:", data.articleSchema);
      articleService.getItems(totalItems+(props.data.showRelated ? numberOfRelatedArticlesToFetch : 0), true).then(res => {
        if (res.data && res.data.error == 0 && res.data.data) {
          data.articles = res.data.data;
          // console.log("Articles:", data.articles);
        }
      }).catch(err => {
        console.error("Error fetching articles:", err);
      })
    })

    defineExpose({ formatUrl });

</script>