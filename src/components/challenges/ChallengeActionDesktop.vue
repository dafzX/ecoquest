<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-5xl px-6 py-8">

      <div class="mb-7 flex items-center gap-3">
        <button
          type="button"
          @click="goBack"
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2EAE5] bg-white text-[#405047] transition hover:bg-[#F4FBF7]"
        >
          <ArrowLeft class="h-4 w-4" />
        </button>

        <div>
          <p class="text-xs text-[#98A39C]">
            {{ challenge.title }}
          </p>

          <h1 class="text-xl font-bold text-[#17211B]">
            Challenge Action
          </h1>
        </div>
      </div>

      <div class="grid grid-cols-[1fr_320px] gap-6">

        <section class="rounded-3xl border border-[#E5EEE8] bg-white p-7">

          <div class="mb-6">
            <span class="inline-flex rounded-full bg-[#EAF8EE] px-3 py-1 text-xs font-semibold text-[#15803D]">
              Step {{ currentStepNumber }} dari {{ totalSteps }}
            </span>

            <h2 class="mt-4 text-2xl font-bold text-[#17211B]">
              {{ currentStep.title }}
            </h2>

            <p class="mt-2 text-sm leading-6 text-[#66736A]">
              {{ currentStep.description }}
            </p>
          </div>

          <div class="rounded-2xl bg-[#F4FBF7] p-6">
            <div class="flex items-start gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DCFCE7]">
                <component
                  :is="getCategoryIcon(challenge.category)"
                  class="h-6 w-6 text-[#15803D]"
                />
              </div>

              <div>
                <p class="text-sm font-bold text-[#17211B]">
                  Lakukan aksi ini
                </p>

                <p class="mt-1 text-xs leading-5 text-[#66736A]">
                  Selesaikan aksi nyata ini untuk melanjutkan challenge.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="$emit('complete')"
            class="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-sm font-semibold text-white transition hover:bg-[#15803D]"
          >
            {{ currentStepNumber < totalSteps ? 'Selesaikan Langkah Ini' : 'Selesaikan Challenge' }}
            <Check class="h-4 w-4" />
          </button>
        </section>

        <aside class="space-y-5">

          <section class="rounded-2xl border border-[#E5EEE8] bg-white p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-baseline gap-1">
                <p class="text-sm font-medium text-[#718078]">
                  Step
                </p>

                <p class="mt-1 text-lg font-bold text-[#17211B]">
                  {{ completedSteps }}/{{ totalSteps }}
                </p>
              </div>

              <div class="flex items-center gap-1.5 rounded-full bg-[#EAF8EE] px-3 py-1">
                <Check class="h-3 w-3 text-[#15803D]" />
                <span class="text-xs font-bold text-[#15803D]">
                  {{ progress }}%
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mt-5 h-2 overflow-hidden rounded-full bg-[#E5EEE8]">
              <div
                class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </section>

          <section class="rounded-2xl bg-[#17211B] p-5">
            <p class="text-xs text-white/50">
              Challenge Reward
            </p>

            <div class="mt-2 flex items-center justify-between">
              <span class="text-sm font-bold text-white">
                Special Badge & 500 XP
              </span>

              <Trophy class="h-6 w-6 text-[#4ADE80]" />
            </div>
          </section>

        </aside>
      </div>
    </div>
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