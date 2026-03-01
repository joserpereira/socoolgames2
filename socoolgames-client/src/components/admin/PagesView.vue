<template>
    <div>
        <ListItems title="Pages" :colums="data.cols" :createItem="createItem" ></ListItems>
    </div>
    <div v-if="data.newItem">
        <PagesEdit></PagesEdit>
    </div>
</template>
<script setup>
    import { reactive } from 'vue'
    import ListItems from './cms/ListItems.vue';
    import PagesEdit from './PagesEdit.vue';
    
    var data = reactive({
        cols: ["name", "nameRef"],
        newItem: false
    })

    const createItem = () => {
      console.log("aaaaaaaaaaa")
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