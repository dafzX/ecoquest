<template>
  <main class="mx-auto max-w-107.5 px-4 pb-24 md:hidden">

    <!-- Header -->
    <div class="relative flex items-center py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <div class="min-w-0 pl-12">
        <p class="truncate text-[10px] text-[#98A39C]">
          {{ mission.title }}
        </p>

        <h1 class="text-[15px] font-bold text-[#17211B]">
          Aksi Misi
        </h1>
      </div>
    </div>

    <!-- Progress Card -->
    <section class="rounded-[16px] border border-[#DCEBE0] bg-white p-4">

      <div class="flex items-center justify-between">

        <span
          class="rounded-full bg-[#EAF8EE] px-2.5 py-1 text-[10px] font-semibold text-[#15803D]"
        >
          Langkah {{ stepNumber }}/{{ totalSteps }}
        </span>

        <span class="text-[11px] font-bold text-[#15803D]">
          {{ progress }}%
        </span>

      </div>

      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E5EEE8]">
        <div
          class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div class="mt-6">

        <h2 class="text-[18px] font-bold text-[#17211B]">
          {{ step.title || step.name || step }}
        </h2>

        <p class="mt-2 text-[11px] leading-5 text-[#718078]">
          {{ step.description }}
        </p>

      </div>

      <div class="mt-5 rounded-xl bg-[#F4FBF7] p-4">

        <p class="text-[11px] font-semibold text-[#17211B]">
          Lakukan aksi ini
        </p>

        <p class="mt-1 text-[10px] leading-4 text-[#718078]">
          Selesaikan aksi nyata ini untuk melanjutkan misi.
        </p>

      </div>

      <button
        type="button"
        @click="completeStep"
        class="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[12px] font-semibold text-white transition hover:bg-[#15803D]"
      >
        {{
          stepNumber < totalSteps
            ? 'Selesaikan Langkah Ini'
            : 'Selesaikan Misi'
        }}

        <Check class="h-4 w-4" />
      </button>

    </section>

    <!-- Reward -->
    <section class="mt-4 rounded-[14px] bg-[#17211B] p-4">

      <div class="flex items-center justify-between">

        <div>

          <p class="text-[9px] text-white/50">
            Hadiah Misi
          </p>

          <p class="mt-1 text-[11px] font-bold text-white">
            +{{ mission.xp || 50 }} XP
          </p>

        </div>

        <Zap class="h-5 w-5 text-[#F59E0B]" />

      </div>

    </section>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowLeft, Check, Zap } from 'lucide-vue-next'

const props = defineProps({
  mission: { type: Object, required: true },
  step: { type: Object, required: true },
  stepNumber: { type: Number, required: true },
  totalSteps: { type: Number, required: true },
  completeStep: { type: Function, required: true },
  goBack: { type: Function, required: true }
})

const progress = computed(() => {
  if (!props.totalSteps) return 0

  return Math.round(
    ((props.stepNumber - 1) / props.totalSteps) * 100
  )
})
</script>