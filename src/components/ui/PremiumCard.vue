<template>
  <div
    class="rounded-3xl border border-[#E8EDE9] shadow-[0_8px_30px_rgba(23,33,27,0.04)] overflow-hidden transition-all duration-300"
    :class="[
      padding ? 'p-6 md:p-8' : '',
      gradient ? 'bg-gradient-to-b from-white to-[#F8FAF8]' : 'bg-white',
      hover ? 'hover:shadow-[0_12px_40px_rgba(23,33,27,0.08)] hover:-translate-y-1' : ''
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
