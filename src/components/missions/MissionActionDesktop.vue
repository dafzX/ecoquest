<template>
  <main class="hidden md:block">

    <div class="min-h-screen px-8 py-8">

      <div class="mx-auto max-w-3xl">

        <!-- Header -->
        <div class="mb-8 flex items-center justify-between">

          <button
            type="button"
            @click="goBack"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm"
          >
            <ArrowLeft class="h-5 w-5" />
          </button>

          <div
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
          >
            <Zap class="h-4 w-4 text-[#F59E0B]" />

            <span class="text-sm font-semibold text-[#334155]">
              +{{ mission.xp || 50 }} XP
            </span>
          </div>

        </div>

        <!-- Main Card -->
        <div
          class="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8"
        >

          <div class="mb-6 flex items-center justify-between">

            <span
              class="rounded-full bg-[#F0FDF4] px-4 py-1.5 text-sm font-semibold text-[#15803D]"
            >
              Langkah {{ stepNumber }} dari {{ totalSteps }}
            </span>

            <span class="text-sm font-bold text-[#15803D]">
              {{ progress }}% Selesai
            </span>

          </div>

          <div class="mb-8 h-2 overflow-hidden rounded-full bg-[#E2E8F0]">

            <div
              class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
              :style="{ width: `${progress}%` }"
            ></div>

          </div>

          <!-- Step Info -->
          <div>

            <h2 class="text-2xl font-bold text-[#0F172A]">
              {{ step.title || step.name || step }}
            </h2>

            <p class="mt-2 text-base leading-relaxed text-[#64748B]">
              {{ step.description }}
            </p>

          </div>

          <!-- Action Hint -->
          <div
            class="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
          >

            <h3 class="font-semibold text-[#0F172A]">
              Aksi yang Perlu Dilakukan
            </h3>

            <p class="mt-1 text-sm text-[#64748B]">
              Selesaikan aksi di atas dengan sungguh-sungguh untuk melanjutkan tahapan ini.
            </p>

          </div>

          <!-- Button -->
          <button
            type="button"
            @click="completeStep"
            class="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#22C55E] py-4 text-base font-bold text-white transition hover:bg-[#15803D] active:scale-[0.99]"
          >

            {{
              stepNumber < totalSteps
                ? 'Selesaikan Langkah Ini'
                : 'Selesaikan Misi'
            }}

            <Check class="h-5 w-5" />

          </button>

        </div>

      </div>

    </div>

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