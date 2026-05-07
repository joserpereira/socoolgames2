<template>
    <div class="flex justify-items-stretch items-center mb-2">
        <span class="flex-none1 me-3">
            {{ props.title }} 
        </span>
        <span class="flex-none1">
            <button type="button" :disabled="!data.authenticated" class="bg-primary text-xs px-4 py-2 rounded-full text-white hover:bg-secondary hover:text-black" @click.prevent="createClick">Create</button>
        </span>
        <span class="grow me-5">
            <!-- @keyup="onSearchChange"
          v-model="data.search" -->
            <input type="text" placeholder="Search..."                    
                   class="w-full rounded-xl backdrop-blur ms-5 ps-3 py-2
                          placeholder-black/40 focus:outline-none focus:ring-1 focus:ring-black"
        />
        </span>
    </div>
    <!-- Loading -->
    <div v-if="data.isLoading" class="text-center py-10 text-gray-500">
      Loading...
    </div>

    <!-- Empty -->
    <div
      v-else-if="data.items.length === 0"
      class="text-center py-10 border rounded-lg text-gray-500"
    >
      No Items Found.
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto rounded-lg shadow">
      <table class="w-full text-sm">
        <thead class="text-left">
          <tr>
            <!-- <th class="p-3">Name</th>
            <th class="p-6">Description</th> -->
            <th class="ps-3" v-for="value in props.columns" :key="value">{{ value.split('.')[0] }}</th>
            <th class="p-3 w-32 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <!-- Table Rows -->
          <tr
            v-for="item in data.items"
            v-on:mouseover="data.hoverId=item._id"
            v-on:mouseleave="data.hoverId=''"
            :key="item._id"
            class="border-t hover:bg-gray-400 hover:text-black even:bg-text-gray-600">
            <td v-for="(value, index) in props.columns" :key="index" 
              :class="index == 0 ? 'p-3 hover:text-gray-600 gap-2 description-cell' : 'p-3 gap-2 description-cell'">
              
              <span v-if="value.indexOf('.') >= 0">{{ item[value.split('.')[0]]?.[value.split('.')[1]] ?? "" }}</span>
              <span v-else :class="data.selectedId == item._id ? '' : 'line-clamp-5'" style="white-space: pre;">{{ (item[value] || "") }}</span>
            </td>
            <td v-if="data.hoverId!==item._id"></td>
              
            <td class="flex pt-2 justify-center"             
                v-else>
              <button title="View"
                @click="viewClick(item._id)"
                class="hover:bg-blue-800 hover:text-white hover:rounded-lg p-1 icons">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
              
              <button title="Edit Item"
                @click="editClick(item._id)"
                class="hover:bg-blue-800 hover:text-white hover:rounded-lg p-1 icons">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />  
                </svg>
              </button>

              <button title="Duplicate Item"
                @click="duplicateClick(item)"
                class="hover:bg-blue-800 hover:text-white hover:rounded-lg p-1 icons">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
              </button>

              <button title="Delete Item"
                @click="deleteClick(item._id)"
                class="text-red-600 hover:bg-red-800 hover:rounded-lg p-1 icons">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <button title="Previous Page" v-if="data.page > 1" @click.prevent="previousPage" class="m-3 font-extrabold">&lt;&lt;</button>
      <button title="You are at first page" v-else disabled="true" @click.prevent="previousPage" class="m-3">&lt;&lt;</button>
      <div class="m-3">{{ data.page }}</div>
      <button title="Next Page" v-if="data.total > (data.page * data.limit)" @click.prevent="nextPage" class="m-3 font-extrabold">&gt;&gt;</button>
      <button title="You are at last page" v-else disabled="true" @click.prevent="nextPage" class="m-3">&gt;&gt;</button>
    </div>
    <div>
      <ConfirmationModel  
        aria-hidden="true"
        tabindex="100"
        id="confirmationModal"
        :modalActive="confirmationModelActive"
        :message="data.confirmationMessage"
        @close="closeConfirmation">
      </ConfirmationModel>
    </div>

</template>
<script lang="ts">
export default {
  name: "ListItems",
};
</script>
<script setup lang="ts">
    import type { PropType } from 'vue'
    import { ref, onMounted, reactive } from "vue"
    import instanceService from '@/services/instance.service';
    import ConfirmationModel from "@/components/common/ConfirmationModal.vue";
    import Toast from "@/components/common/toastComponent";
    import userService from "@/services/user.service";
    const props = defineProps({
        collectionRefName: {
          type: String
        },
        title: {
            type: String,
            default: ""
        }, 
        columns: {
            type: Array as PropType<string[]>,
            default: () => []
        },
        createItem: {
          type: Function
        },
        editItem: {
          type: Function
        }


    });

    const confirmationModelActive = ref(false);
    const toast = new Toast();

    const createClick = () => {
      if (props?.createItem)
        props.createItem();
    }

    var data = reactive({
        authenticated: false,
        idToDelete: "",
        isLoading: false,
        confirmationMessage: "",
        items: [] as any[],
        hoverId: "",
        page: 1,
        skip: 0,
        limit: 6,
        total: 0,
        search: "",
        selectedId: "",
        confirmationAction: "", // delete or duplicate
        itemToDuplicate: null as any
    })

    onMounted(() => {      
        fillItems()
    });

    const nextPage = () => {
      data.page = data.page + 1;
      fillItems();
    }

    const previousPage = () => {
      if (data.page > 1) {
        data.page = data.page - 1;
        fillItems();
      }
        
    }

    const duplicateClick = (item: any) => {
      data.idToDelete = item.id;
      data.confirmationMessage = "Are you sure you want to <b>duplicate</b>?";
      data.confirmationAction = "duplicate";
      data.itemToDuplicate = item;  
      confirmationModelActive.value = true;
    }
    const editClick = (item: any) => {
      if (props?.editItem != null)
        props.editItem(item); 
    }

    const viewClick = (item: any) => {
      if (data.selectedId == item)
        data.selectedId = "";
      else
        data.selectedId = item;
    }

    const closeConfirmation = async (result: boolean) => {
      confirmationModelActive.value = false;
      if (data.confirmationAction == "delete") {
        deleteItem(data.idToDelete, result);
      }
      else if (data.confirmationAction == "duplicate") {
        await duplicateItem(data.itemToDuplicate, result);
        data.itemToDuplicate = null;
      }
      data.confirmationAction = ""
    };

    const duplicateItem = async (item: any, result: boolean) => {
      if (!result || !item)
        return;

      try {
        instanceService.duplicateItem(props?.collectionRefName ?? "", item, props?.collectionRefName ?? "").then((response: any) => {
            if (response && response.data && response.data.error === 0) {
                // refresh
                fillItems();
                toast.info("Item duplicated successfully.");
            }
          }).catch((error: any) => {
            console.log("Problem duplicating item. Please try again.", error)
            toast.error("Problem duplicating item. Please try again.");
          }) 
      } catch (error: any) {
        toast.error("Something went wrong! Please try again.");        
      }

    }

    const deleteItem = async (id: string,result: boolean) => {
      if (result && id) {
        try {          
          instanceService.deleteItem(props?.collectionRefName ?? "", id).then((response: any) => {
            if (response && response.data && response.data.error === 0) {
                // refresh
                fillItems();
                toast.info("Item deleted successfully.");
            }
          }).catch((error: any) => {
            console.log("Problem deleting item. Please try again.", error)
            toast.error("Problem deleting item. Please try again.");
          })
        } catch (error: unknown) {
          console.error("closeConfirmation", error);
          toast.error("Something went wrong! Please try again.");
        }        
      }
    }
    const deleteClick = (id: any) => {
      data.idToDelete = id;
      data.confirmationMessage = "Are you sure you want to <b>delete</b>?";
      data.confirmationAction = "delete";
      confirmationModelActive.value = true;
    }
    const fillItems = async () => {
      userService.getAdminBoard().then(
        
        async (response: any) => {
          if (response.status == 200) {
            data.authenticated = true;
            data.items = [];
            const skip = (data.page - 1) * data.limit;

            var result = await instanceService.getItems(props?.collectionRefName ?? "",
              skip, data.limit, data.search)
            
            if (result.data.data) {
              data.items = result.data.data;
              data.total = result.data.count
            }
          } 
          else {
            toast.error("Something went wrong! Please try again.");
          }     
        },
        (error: any) => {
          data.isLoading = false;
          toast.error("Something went wrong! Please try again.");
          console.log("Problem getting items. Please try again.", error)
  /*          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  */            
      })
    };

    defineExpose({ fillItems })
</script>