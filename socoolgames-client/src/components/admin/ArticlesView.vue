<template>
    <div>
        <ListItems ref="listItems" collectionRefName="articles" title="Articles" :columns="data.cols" :createItem="createItem" :editItem="editItem"></ListItems>
    </div>
    <div v-if="data.newItem" class="-z-10">
        <ArticlesEdit :item="data.item" :saved="saved"></ArticlesEdit>
    </div>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import ListItems from './cms/ListItems.vue';
    import ArticlesEdit from './ArticlesEdit.vue';
    import service from '@/services/article.service';

    const listItems = ref(null);

    var data = reactive({
        cols: ["header.en", "title.en", "active"],
        item: null,
        newItem: false
    })

    const createItem = () => {
      data.item = {
        header: {},
        title: {},
        content: {},
        active: false
      }
      data.newItem = true;
    }

    const editItem = async (item) => {
      const result = await service.getItem(item);

      data.item = result.data.data
      data.newItem = true;
    }

    const saved = async () => {
        listItems.value.fillItems();
    }
</script>