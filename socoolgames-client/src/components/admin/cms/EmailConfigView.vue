<template>
    <div>
        <ListItems ref="listItems" collectionRefName="email-serverconfigs" title="Configs" :columns="data.cols" :createItem="createItem" :editItem="editItem"></ListItems>
    </div>
    <div v-if="data.newItem" class="-z-10">
        <EmailConfigEdit :item="data.item" :saved="saved"></EmailConfigEdit>
    </div>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import ListItems from './ListItems.vue';
    import EmailConfigEdit from './EmailConfigEdit.vue';
    import service from '@/services/emailConfig.service';

    const listItems = ref(null);

    var data = reactive({
        cols: ["configName", "emailType", "active"],
        item: null,
        newItem: false
    })

    const createItem = () => {
      data.item = {
        name: "",
        blocks: []
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