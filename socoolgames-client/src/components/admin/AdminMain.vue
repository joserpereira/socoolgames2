<template>


    <div>Dashboard</div>
    <div class="mx-auto p-4">
        <div v-if="loading">Loading Pages...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Pages</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.stats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.stats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.stats.deleted }}</div>
            </div>
        </div>
    </div>
    <div class="mx-auto p-4">
        <div v-if="loadingArticles">Loading Articles...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Articles</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.articlestats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.articlestats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.articlestats.deleted }}</div>
            </div>
        </div>
    </div>
    <div class="mx-auto p-4">
        <div v-if="loadingFiles">Loading Files...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Files</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.filestats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.filestats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.filestats.deleted }}</div>
            </div>
        </div>
    </div>
    <div class="mx-auto p-4">
        <div v-if="loadingImages">Loading Images...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Images</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.imagestats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.imagestats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.imagestats.deleted }}</div>
            </div>
        </div>
    </div>
    <div class="mx-auto p-4">
        <div v-if="loadingSubscriptions">Loading Subscriptions...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Subscriptions</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.substats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.substats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.substats.deleted }}</div>
            </div>
        </div>
    </div>
    <div class="mx-auto p-4">
        <div v-if="loadingUsers">Loading Users...</div>
        <div v-else>            
            <div class="flex flex-wrap justify-center ">
                <h2 class="text-xl font-bold">Users</h2>
            </div>
            <div class="flex flex-wrap justify-center ">
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Total: {{ data.userstats.total }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Active: {{ data.userstats.active }}</div>
                <div class="basis-1/5 rounded bg-white mx-2 text-black text-center p-10 mt-3">Deleted: {{ data.userstats.deleted }}</div>
            </div>
        </div>
        <div v-if="data.errorMessage">{{ data.errorMessage }}</div>
    </div>
</template>
<script lang="ts">
    import { onMounted, reactive, ref } from "vue";
    import pageService from "@/services/page.service";
    import userService from "@/services/user.service";
    import articleService from "@/services/article.service";
    import fileService from "@/services/common/file.service";
    import imageService from "@/services/common/image.service";
import emailSubscriptionService from "@/services/emailSubscription.service";
    //import categoryService from "@/services/category.service";

    export default {
        name: 'DashboardComponent',
        setup() {
            
          var data = reactive({
            stats: {} as any,
            userstats: {} as any,
            articlestats: {} as any,
            filestats: {} as any,
            imagestats: {} as any,
            substats: {} as any,
            categorystats: {} as any,
            errorMessage: "" as string
          })

          const loading = ref(false);
          const loadingUsers = ref(false);
          const loadingArticles = ref(false);
          const loadingFiles = ref(false);
          const loadingImages = ref(false);
          const loadingSubscriptions = ref(false);
          //const loadingCategories = ref(false);
          
          onMounted(async () => {
                getData();   
                getUserData();         
                getArticleData();         
                getFileData();         
                getImageData();         
                getSubscriptionsData();

                //getCategoriesData();         
          });

          const getData = async () => {
            try {
                loading.value = true;
                pageService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.stats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loading.value = false;
            } catch {
                loading.value = false;
                console.debug("error getting samples")
            }
          }

          const getUserData = async () => {
            try {
                loadingUsers.value = true;
                userService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.userstats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loadingUsers.value = false;
            } catch {
                loadingUsers.value = false;
                console.debug("error getting samples")
            }
          }

          const getArticleData = async () => {
            try {
                loadingArticles.value = true;
                articleService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.articlestats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loadingArticles.value = false;
            } catch {
                loadingArticles.value = false;
                console.debug("error getting samples")
            }
          }

          const getFileData = async () => {
            try {
                loadingFiles.value = true;
                fileService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.filestats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loadingFiles.value = false;
            } catch {
                loadingFiles.value = false;
                console.debug("error getting samples")
            }
          }
          
          const getImageData = async () => {
            try {
                loadingImages.value = true;
                imageService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.imagestats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loadingImages.value = false;
            } catch {
                loadingImages.value = false;
                console.debug("error getting samples")
            }
          }

           const getSubscriptionsData = async () => {
            try {
                loadingSubscriptions.value = true;
                emailSubscriptionService.getStats().then((response: any) => {
                if (response && response.data && response.data.data) {
                    data.substats = response.data.data
                }
                }).catch((error: any) => {
                    data.errorMessage = error.message || "Error fetching stats";
                });
                loadingSubscriptions.value = false;
            } catch {
                loadingSubscriptions.value = false;
                console.debug("error getting samples")
            }
          }

          return {
            data, loading, loadingUsers, loadingArticles, loadingFiles, loadingImages, loadingSubscriptions
          }

        }
    };
</script>