<template>
    <DynamicPage slugText="home"></DynamicPage>
</template>
<script lang="ts">

    export default {
        name: "HomeView"
    }
</script>
<script setup lang="ts">
    import { formatUrl } from "@/utils/url.utils";
    import DynamicPage from '@/components/admin/cms/pages/DynamicPage.vue';

    // eslint-disable-next-line no-undef
    defineExpose({ formatUrl });
</script>