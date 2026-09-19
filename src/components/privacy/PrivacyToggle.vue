<template>
  <div class="flex items-center gap-3 px-4 py-3.5 border-b border-[#EEF3EF] last:border-none">
    
    <!-- Icon -->
    <div
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
      :class="iconBg"
    >
      <component :is="icon" class="h-4 w-4" :class="iconColor" />
    </div>

    <!-- Text -->
    <div class="min-w-0 flex-1">
      <p class="text-[11px] font-semibold text-[#17211B]">
        {{ title }}
      </p>
      <p class="mt-0.5 text-[8px] leading-4 text-[#8A958E]">
        {{ description }}
      </p>
    </div>

    <!-- Toggle Button -->
    <button
      type="button"
      @click="$emit('update:modelValue', !modelValue)"
      class="relative h-5 w-9 shrink-0 rounded-full transition"
      :class="modelValue ? 'bg-[#22C55E]' : 'bg-[#D8E1DB]'"
    >
      <span
        class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
        :class="modelValue ? 'left-[18px]' : 'left-0.5'"
      ></span>
    </button>
    
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  iconBg: {
    type: String,
    default: 'bg-[#EAF8EE]'
  },
  iconColor: {
    type: String,
    default: 'text-[#15803D]'
  }
})

defineEmits(['update:modelValue'])
</script>