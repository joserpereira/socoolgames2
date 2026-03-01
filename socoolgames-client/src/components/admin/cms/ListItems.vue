<template>
    <div class="flex justify-items-stretch items-center mb-2">
        <span class="flex-none1 me-3">
            {{ props.title }}
        </span>
        <span class="flex-none1">
            <button type="button" class="rounded-xl p-2 bg-secondary" @click.prevent="createClick">Create</button>
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
            <th v-for="value in data.colums" :key="value">{{ value }}</th>
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
            class="border-t hover:bg-gray-50 hover:text-gray-600 even:bg-[#241c36] "
            :class="data.selectedItem?._id === item._id ? 'bg-indigo-900 text-white even:bg-indigo-900' : ''"
          >
            <td class="p-3 hover:text-gray-600 gap-2 description-cell">
              <span class="dot" :class="item.active ? 'dotselected' : ''"></span>
              <span class="ps-3">{{ item.title }}</span>
            </td>

            <td class="p-3 gap-2 description-cell text-gray-400  hover:text-gray-900">
              {{ item.description }}
            </td>
            <td   v-show="data.hoverId!==item._id"  class="flex even:bg-[#0F252A] over:bg-gray-50"></td>
              
            <td class="flex hover:text-gray-600 hover:bg-gray-50 pt-2 justify-center"             
                v-show="data.hoverId===item._id">
              <button
                @click="edit(item._id)"
                class="hover:bg-blue-800 hover:text-white hover:rounded-lg p-1 icons">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />  
                </svg>
              </button>

              <button
                @click="remove(item._id)"
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
</template>
<script setup>
    import { defineProps, reactive } from 'vue'
    const props = defineProps({
        title: {
            type: String,
            default: ""
        }, 
        colums: {
            type: Array,
            default: () => []
        },
        createItem: {
          type: Function
        }

    });

    const createClick = () => {
      props.createItem();
    }

    var data = reactive({
        isLoading: false,
        items: []
    })
</script>