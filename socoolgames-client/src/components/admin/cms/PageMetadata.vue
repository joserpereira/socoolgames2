<template>
    <div class="grid grid-cols-1">
        <div class="relative mt-2">
            <input type="text" class="input rounded-xl px-3 py-3 mt-4 peer w-full border-b placeholder:text-transparent" 
                    required
                    maxlength="100"
                    id="pageTitle"                    
                    v-model="pageTitleModel"
                    placeholder="Page Title" />
            <label for="pageTitle" 
                    class="absolute rounded ms-4 mt-7 left-0 ml-3 mx-10 -translate-y-6 bg-white px-3 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">Page Title</label>
        </div>
        <div class="relative mt-2">
            <textarea
                class="input rounded-xl px-3 py-3 mt-4 peer w-full border-b placeholder:text-transparent resize-none"
                required
                maxlength="100"
                id="description"
                v-model="pageDescription"
                placeholder="Description"
                rows="2"></textarea>

            <label
                for="description"
                class="absolute rounded left-0 ml-3 mt-7 px-3 bg-white text-sm duration-100 ease-linear
                    -translate-y-6
                    peer-placeholder-shown:translate-y-0
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-500"
            >
                Description
            </label>
        </div>
        <div class="relative mt-2">
            <textarea
                class="input rounded-xl px-3 py-3 mt-4 peer w-full border-b placeholder:text-transparent resize-none"
                required
                maxlength="100"
                id="keywords"
                v-model="pageKeywords"
                placeholder="Keywords"
                rows="2"></textarea>

            <label
                for="keywords"
                class="absolute rounded left-0 ml-3 mt-7 px-3 bg-white text-sm duration-100 ease-linear
                    -translate-y-6
                    peer-placeholder-shown:translate-y-0
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-500">
                Keywords
            </label>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { defineProps, defineEmits, computed } from 'vue'

    const props = defineProps({        
        item: Object,
        currentLang: String
    })

    const emit = defineEmits(['update:item'])

    const pageTitleModel = computed({
        get() {
            return props.item?.pageTitle?.[props.currentLang] || ''
        },
        set(value) {
            const updated = {
                ...props.item,
                pageTitle: {
                    ...(props.item.pageTitle || {}),
                    [props.currentLang]: value
                }
            }

            emit('update:item', updated)
        }
    })
    const pageDescription = computed({
        get() {
            return props.item?.pageDescription?.[props.currentLang] || ''
        },
        set(value) {
            const updated = {
                ...props.item,
                pageDescription: {
                    ...(props.item.pageDescription || {}),
                    [props.currentLang]: value
                }
            }

            emit('update:item', updated)
        }
    })

    const pageKeywords = computed({
        get() {
            return props.item?.pageKeywords?.[props.currentLang] || ''
        },
        set(value) {
            const updated = {
                ...props.item,
                pageKeywords: {
                    ...(props.item.pageKeywords || {}),
                    [props.currentLang]: value
                }
            }

            emit('update:item', updated)
        }
    })
</script>