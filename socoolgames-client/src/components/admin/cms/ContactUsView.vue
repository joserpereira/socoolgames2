<template>
    <div>
        <!-- :createItem="createItem" :editItem="editItem" -->
        <ListItems ref="listItems" collectionRefName="contactus" title="Contact Us" :columns="data.cols" ></ListItems>
    </div>
    <!-- <div v-if="data.newItem" class="-z-10">
        <EmailTemplateEdit :item="data.item" :saved="saved"></EmailTemplateEdit>
    </div> -->
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import ListItems from './ListItems.vue';
    // import EmailTemplateEdit from './EmailTemplateEdit.vue';
    // import service from '@/services/contactus.service';

    const listItems = ref(null);

    var data = reactive({
        cols: ["email", "message"],
        item: null,
        newItem: false
    })

    // const createItem = () => {
    //   data.item = {
    //     emailSubject: {
    //         "pt":"",
    //         "en":""
    //     },
    //     emailName: {
    //         "pt":"",
    //         "en":""
    //     },
    //     emailContent: {
    //         "pt": "",
    //         "en": "",
    //     }
    //   }
    //   data.newItem = true;
    // }

    // const editItem = async (item) => {
    //   const result = await service.getItem(item);

    //   data.item = result.data.data
    //   data.newItem = true;
    // }

    // const saved = async () => {
    //     listItems.value.fillItems();
    // }
</script>