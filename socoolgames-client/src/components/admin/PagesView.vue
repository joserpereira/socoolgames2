<template>
    <div>
        <ListItems collectionRefName="pages" title="Pages" :columns="data.cols" :createItem="createItem" :editItem="editItem"></ListItems>
    </div>
    <div v-if="data.newItem">
        <PagesEdit :item="data.item"></PagesEdit>
    </div>
</template>
<script setup>
    import { reactive } from 'vue'
    import ListItems from './cms/ListItems.vue';
    import PagesEdit from './PagesEdit.vue';
    import pageService from '@/services/page.service';

    var data = reactive({
        cols: ["name", "nameRef", "active"],
        item: null,
        newItem: false
    })

    const createItem = () => {
      data.item = {}
      data.newItem = true;
    }

    const editItem = async (item) => {
      const result = await pageService.getItem(item);

      data.item = result.data.data
      data.newItem = true;
    }

</script>

<!-- <script>
import ListItems from './cms/ListItems.vue';
 export default {
    name: "PagesComponent",
    components: {
        ListItems
    },
    data() {
        return {
            cols: ["name", "nameRef"]
        }
    }
 }
    
</script> -->