<template>
    <div>
        <ListItems ref="listItems" collectionRefName="menus" title="Menus" :columns="data.cols" :createItem="createItem" :editItem="editItem"></ListItems>
    </div>
    <div v-if="data.newItem" class="-z-10">
        <MenuEdit :item="data.item" :saved="saved"></MenuEdit>
    </div>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import ListItems from './ListItems.vue';
    import MenuEdit from './MenusEdit.vue';
    import service from '@/services/menus.service';

    const listItems = ref(null);

    var data = reactive({
        cols: ["name"],
        item: null,
        newItem: false
    })

    const createItem = () => {
      data.item = {
        name: "",
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