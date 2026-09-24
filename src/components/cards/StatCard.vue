<template>
  <div class="h-full rounded-lg border border-[#E8EDE9] bg-white p-3 md:p-5">

    <div class="flex items-start justify-between gap-1">
      <div
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl md:h-11 md:w-11"
        :class="iconBackground"
      >
        <component
          :is="icon"
          class="h-4 w-4 md:h-5 md:w-5"
          :class="iconColor"
        />
      </div>

      <span
        v-if="label"
        class="truncate rounded-full bg-[#F5F8F5] px-1.5 py-1 text-[8px] font-medium text-[#66736A] md:px-2.5 md:text-[11px]"
      >
        {{ label }}
      </span>
    </div>

    <div class="mt-3 md:mt-5">
      <p class="truncate text-[10px] text-[#66736A] md:text-sm">
        {{ title }}
      </p>

      <div class="mt-1 flex min-w-0 items-end gap-1">
        <p class="truncate text-[20px] font-bold leading-none text-[#17211B] md:text-[26px]">
          {{ value }}
        </p>

        <span
          v-if="suffix"
          class="mb-0.5 truncate text-[9px] text-[#98A39C] md:text-sm"
        >
          {{ suffix }}
        </span>
      </div>
    </div>

    <div v-if="progress !== undefined" class="mt-3 md:mt-4">
      <div class="mb-1.5 flex items-center justify-between">
        <span class="text-[9px] text-[#98A39C] md:text-xs">
          Progress
        </span>

        <span class="text-[9px] font-medium text-[#66736A] md:text-xs">
          {{ progress }}%
        </span>
      </div>

      <div class="h-1.5 overflow-hidden rounded-full bg-[#EAF0EB]">
        <div
          class="h-full rounded-full bg-[#22C55E] transition-all"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  value: {
    type: [String, Number],
    required: true
  },

  suffix: {
    type: String,
    default: ''
  },

  label: {
    type: String,
    default: ''
  },

  icon: {
    type: Object,
    required: true
  },

  iconBackground: {
    type: String,
    default: 'bg-[#EAF8EE]'
  },

  iconColor: {
    type: String,
    default: 'text-[#22C55E]'
  },

  progress: {
    type: Number,
    default: undefined
  }
})
</script>