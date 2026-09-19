<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

    <div class="flex items-center gap-3 py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <div class="min-w-0">
        <p class="truncate text-[8px] text-[#98A39C]">
          {{ challenge.title }}
        </p>

        <h1 class="text-[15px] font-bold text-[#17211B]">
          Challenge Action
        </h1>
      </div>
    </div>

    <section class="rounded-[16px] border border-[#DCEBE0] bg-white p-4">

      <div class="flex items-center justify-between">
        <span class="rounded-full bg-[#EAF8EE] px-2.5 py-1 text-[8px] font-semibold text-[#15803D]">
          Step {{ currentStepNumber }}/{{ totalSteps }}
        </span>

        <span class="text-[9px] font-bold text-[#15803D]">
          {{ progress }}%
        </span>
      </div>

      <div class="mt-3 h-[5px] overflow-hidden rounded-full bg-[#E5EEE8]">
        <div
          class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div class="mt-6">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCFCE7]">
          <component
            :is="getCategoryIcon(challenge.category)"
            class="h-6 w-6 text-[#15803D]"
          />
        </div>

        <h2 class="mt-4 text-[18px] font-bold text-[#17211B]">
          {{ currentStep.title }}
        </h2>

        <p class="mt-2 text-[10px] leading-5 text-[#718078]">
          {{ currentStep.description }}
        </p>
      </div>

      <div class="mt-5 rounded-xl bg-[#F4FBF7] p-4">
        <p class="text-[10px] font-semibold text-[#17211B]">
          Lakukan aksi ini
        </p>

        <p class="mt-1 text-[9px] leading-4 text-[#718078]">
          Selesaikan aksi nyata ini untuk melanjutkan challenge.
        </p>
      </div>

      <button
        type="button"
        @click="$emit('complete')"
        class="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[11px] font-semibold text-white transition hover:bg-[#15803D]"
      >
        {{ currentStepNumber < totalSteps ? 'Selesaikan Langkah Ini' : 'Selesaikan Challenge' }}
        <Check class="h-4 w-4" />
      </button>
    </section>

    <section class="mt-4 rounded-[14px] bg-[#17211B] p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[8px] text-white/50">
            Challenge Reward
          </p>

          <p class="mt-1 text-[10px] font-bold text-white">
            Special Badge & 500 XP
          </p>
        </div>

        <Trophy class="h-5 w-5 text-[#4ADE80]" />
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import {
  ArrowLeft,
  Check,
  Trophy
} from 'lucide-vue-next'

const props = defineProps({
  challenge: {
    type: Object,
    required: true
  },

  getCategoryIcon: {
    type: Function,
    required: true
  },

  goBack: {
    type: Function,
    required: true
  },

  completedSteps: {
    type: Number,
    required: true
  },

  totalSteps: {
    type: Number,
    required: true
  },

  progress: {
    type: Number,
    required: true
  }
})

defineEmits(['complete'])

const currentStepNumber = computed(() => {
  if (!props.totalSteps) return 1

  return Math.min(
    props.completedSteps + 1,
    props.totalSteps
  )
})

const currentStep = computed(() => {
  return (
    props.challenge.steps?.[
      currentStepNumber.value - 1
    ] || {
      title: 'Challenge selesai',
      description:
        'Semua aksi dalam challenge sudah selesai.'
    }
  )
})
</script>