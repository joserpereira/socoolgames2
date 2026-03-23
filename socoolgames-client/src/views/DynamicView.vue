<template>
    <DynamicPage :slugText="data.slugText"></DynamicPage>
</template>

<script setup lang="ts">
    import DynamicPage from '@/components/admin/cms/pages/DynamicPage.vue';
    import { onMounted, reactive } from 'vue'
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    
    const data = reactive({        
        slugText: '' as String
    })

    
    onMounted(() => {    
        data.slugText = route.params.slug;
    })

</script>