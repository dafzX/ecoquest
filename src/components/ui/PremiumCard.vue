<template>
  <div
    class="overflow-hidden rounded-2xl border border-[#DCEBE0] transition-all duration-300"
    :class="[
      padding ? 'p-6 md:p-8' : '',
      gradient ? 'bg-[#F8FBF8]' : 'bg-white',
      hover ? 'hover:border-[#9DD8AD]' : ''
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
