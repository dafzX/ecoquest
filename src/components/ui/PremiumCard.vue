<template>
  <div
    class="overflow-hidden rounded-lg shadow-sm transition-all duration-300"
    :class="[
      padding ? 'p-6 md:p-8' : '',
      gradient ? 'bg-[#F8FBF8]' : 'bg-white',
      hover ? 'hover:shadow-md' : ''
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  padding: {
    type: Boolean,
    default: true
  },
  gradient: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script>
