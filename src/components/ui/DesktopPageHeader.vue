<template>
  <section class="mb-7 flex items-end justify-between pt-2">
    <div>
      <p v-if="tag" class="mb-1 text-sm font-medium text-[#22C55E]">
        {{ tag }}
      </p>

      <h1 class="text-[28px] font-bold text-[#17211B]">
        {{ title }}
      </h1>

      <p v-if="description" class="mt-1 text-sm text-[#66736A]">
        {{ description }}
      </p>
    </div>

    <!-- Optional slot for right-aligned actions (e.g., buttons, dropdowns) -->
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
