<template>
    <div>
        <ListItems ref="listItems" collectionRefName="email-subscriptions" title="Subscriptions" :columns="data.cols" :createItem="createItem" :editItem="editItem"></ListItems>
    </div>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import ListItems from './ListItems.vue';
    import service from '@/services/emailSubscription.service';

    const listItems = ref(null);

    var data = reactive({
        cols: ["email", "type","language", "createdAt", "isActive"],
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

</script>