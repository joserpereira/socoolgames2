<template>
    <div v-for="block in data.item.blocks" :key="block._id">
        <!-- {{ block }} -->
          
       <component :is="getBlockComponent(block.type)" :data="block.data" :selectedLang="data.selectedLang"></component> 
    </div>
</template>
<script setup>
    import { reactive, onMounted } from 'vue'
    import pageService from '@/services/page.service';
    import { useRoute } from 'vue-router';
    const componentsUtils = import('@/utils/components.utils');
    const route = useRoute();

    function getBlockComponent(name) {
        return data.components[name]?.component
    }
    const data = reactive({        
        item: {},
        components: {},
        selectedLang: "en"
    })

    onMounted(async () => {
        const slug = route.params.slug
        const result = await pageService.getItemByNameRef(slug);
        data.components = (await componentsUtils).getComponents();
        if (result.status == 200 && result.data.error == 0 && result.data.data)
        {
            console.log("a", result.data.data)
            data.item = result.data.data;
        }
        
    })
    
</script>