<template>
    <label class="block font-medium text-start text-sm mt-2">
        {{ props.schema.label }}
    </label>
    <input type="text"
           class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
           v-model="value"
      />
</template>
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import { useVModel } from '@/utils/useVModel';

  const props = defineProps<{
    schema: Object,
    modelValue: string
  }>()

  const emit = defineEmits(["update:modelValue"])

  const value = useVModel<string>(props, "modelValue", emit)

</script>
