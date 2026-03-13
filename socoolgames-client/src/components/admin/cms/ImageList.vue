<template>

<!-- Loading -->
    <div v-if="data.loading" class="text-center py-10 text-gray-500">
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
            <th class="ps-3">Name</th>
            <th class="p-3 w-32 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <!-- Table Rows -->
          <tr
            v-on:mouseover="data.hoverId=item._id"
            v-on:mouseleave="data.hoverId=''"
            v-for="item in data.items"
            :key="item._id"
            class="border-t hover:bg-gray-400 hover:text-black  even:bg-text-gray-600 "
       
          >
            <!-- <td class="p-3 hover:text-gray-600 gap-2 description-cell">
              <span class="dot" :class="item.active ? 'dotselected' : ''"></span>
              
            </td> -->
            <td class="p-3 hover:text-gray-600 gap-2 description-cell">
              
              <span >{{ item.original }}</span>
            </td>
            <td v-if="data.hoverId!==item._id"></td>
              
            <td class="flex pt-2 justify-center"
                v-else>
              <button
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
      <div class="flex justify-center">
        <button v-if="data.page > 1" @click.prevent="previousPage" class="m-3 font-extrabold">&lt;&lt;</button>
        <button v-else disabled="true" @click.prevent="previousPage" class="m-3">&lt;&lt;</button>
        <div class="m-3">{{ data.page }}</div>
        <button v-if="data.total > (data.page * data.limit)" @click.prevent="nextPage" class="m-3 font-extrabold">&gt;&gt;</button>
        <button v-else disabled="true" @click.prevent="nextPage" class="m-3">&gt;&gt;</button>
    </div>
    </div>
    <div v-if="data.errorMessage" class="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p class="font-bold">Be Warned</p>
      <p>{{ data.errorMessage }}</p>
    </div>
    <div class="mt-5">
        <ImageUploader :newItem="newItem"></ImageUploader>
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
<script setup lang="ts">

    import { ref, onMounted, reactive, defineExpose } from "vue"
    import ConfirmationModel from "@/components/common/ConfirmationModal.vue";
    import ImageUploader from "@/components/admin/cms/ImageUploader.vue"
    import Toast from "@/components/common/toastComponent";
    import userService from "@/services/user.service";
    import imageService from "@/services/common/image.service";

    const confirmationModelActive = ref(false);
    const toast = new Toast();

    var data = reactive({
        authenticated: false,
        idToDelete: "",
        isLoading: false,
        confirmationMessage: "",
        items: [],
        hoverId: "",
        error: "",
        search: '' as string,
        page: 1,
        skip: 0,
        limit: 6,
        total: 0,
        errorMessage: ""
    })

    onMounted(() => {
      
      userService.getAdminBoard().then(
        (response) => {
          if (response.status == 200) {
            data.authenticated = true; 
            getData()
          }

        },
        () => {
            data.errorMessage = "Failed to get image list.";
/*          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
*/            
        }
      );
    });

    const closeConfirmation = async (result: boolean) => {
      confirmationModelActive.value = false;
      const id = data.idToDelete;
      
      if (result && id) {
        try {          
          imageService.deleteItem(id).then((response: any) => {
            if (response && response.data && response.data.error === 0) {
                data.items = data.items.filter(item => (((item as any)?._id) !== id));
                // refresh
                getData();
            }
          }).catch((error) => {
            console.log("Problem deleting link. Please try again.", error)
          })
        } catch (error: unknown) {
          console.error("closeConfirmation", error);
          toast.error("Something went wrong! Please try again.");
        }
      }
    };

    const deleteClick = (id) => {
      data.idToDelete = id;
      data.confirmationMessage = "Are you sure you want to <b>delete</b>?";
      confirmationModelActive.value = true;
    }

    const getData = async () => {
      data.isLoading = true;
      data.items = [];
      const skip = (data.page - 1) * data.limit;

      var result = await imageService.getItems(skip, data.limit, data.search)
      
      if (result.data.data) {
          data.total = result.data.count
          data.items = result.data.data;
          data.isLoading = false;
      }
    };

    const newItem = async () => {
      getData();
    }

    const nextPage = () => {
      data.page = data.page + 1;
      getData();
    }

    const previousPage = () => {
      if (data.page > 1) {
        data.page = data.page - 1;
        getData();
      }        
    }


    defineExpose({ getData, newItem })
</script>