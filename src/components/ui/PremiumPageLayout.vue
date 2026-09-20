<template>
  <div class="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
    <div v-if="title || description" class="mb-6 md:mb-8">
      <p v-if="tag" class="mb-1 text-sm font-medium text-[#22C55E]">
        {{ tag }}
      </p>
      
      <h1 class="text-2xl font-bold tracking-tight text-[#17211B] md:text-[32px]">
        {{ title }}
      </h1>
      
      <p v-if="description" class="mt-1 text-sm text-[#66736A] md:mt-2 md:text-base">
        {{ description }}
      </p>
    </div>

    <!-- Optional Slot for Actions -->
    <div v-if="$slots.action" class="mb-6 flex justify-end">
      <slot name="action" />
    </div>
    
    <slot />
  </div>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
