<template>
  <div class="hidden md:block">
    <div class="mx-auto max-w-6xl px-6 py-8">
      <!-- Desktop Header -->
      <div class="mb-7 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="goBack"
            class="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2EAE5] bg-white text-[#405047] transition hover:bg-[#F4FBF7]"
          >
            <ArrowLeft class="h-4 w-4" />
          </button>
          <div>
            <p class="text-xs text-[#98A39C]">Missions</p>
            <h1 class="text-xl font-bold text-[#17211B]">Mission Detail</h1>
          </div>
        </div>
        <div class="flex items-center gap-1.5 rounded-full bg-[#EAF8EE] px-4 py-2">
          <Zap class="h-4 w-4 text-[#22C55E]" />
          <span class="text-sm font-bold text-[#15803D]">+{{ mission.xp }} XP</span>
        </div>
      </div>

      <!-- Desktop Content -->
      <div class="grid grid-cols-[1.05fr_0.95fr] gap-7">
        <!-- Left -->
        <div>
          <div class="relative h-[360px] overflow-hidden rounded-3xl bg-[#DCFCE7]">
            <div class="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#BBF7D0]"></div>
            <div class="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#ECFDF5]"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="flex h-48 w-48 items-center justify-center rounded-full bg-white/60">
                <div class="flex h-32 w-32 items-center justify-center rounded-full bg-white/80">
                  <component :is="getCategoryIcon(mission.category)" class="h-20 w-20 text-[#22C55E]" />
                </div>
              </div>
            </div>
            <div class="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#15803D]">
              {{ mission.category }}
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm font-medium text-[#22C55E]">
              Step {{ mission.currentStep }} of {{ mission.totalSteps }}
            </p>
            <div class="mt-1 flex items-center justify-between gap-5">
              <h2 class="text-3xl font-bold text-[#17211B]">{{ mission.title }}</h2>
              <span class="text-sm font-semibold text-[#66736A]">{{ mission.progress }}%</span>
            </div>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-[#66736A]">
              {{ mission.description }}
            </p>
          </div>
        </div>

        <!-- Right -->
        <div class="space-y-5">
          <!-- Progress -->
          <section class="rounded-2xl border border-[#E5EEE8] bg-white p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-[#17211B]">Your Progress</h3>
                <p class="mt-1 text-xs text-[#98A39C]">Keep going to complete this mission.</p>
              </div>
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8EE]">
                <span class="text-xs font-bold text-[#15803D]">{{ mission.progress }}%</span>
              </div>
            </div>
            <div class="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EAF1EC]">
              <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${mission.progress}%` }"></div>
            </div>
            <div class="mt-3 flex justify-between text-xs">
              <span class="text-[#98A39C]">{{ mission.completedDays }} / {{ mission.totalDays }} hari</span>
              <span class="font-medium text-[#15803D]">{{ mission.daysLeft }} hari tersisa</span>
            </div>
          </section>

          <!-- Steps -->
          <section class="rounded-2xl border border-[#E5EEE8] bg-white p-6">
            <h3 class="text-sm font-bold text-[#17211B]">Apa yang harus dilakukan?</h3>
            <div class="mt-4 space-y-3">
              <div v-for="(step, index) in mission.steps" :key="step" class="flex items-center gap-3 rounded-xl bg-[#F8FBF9] p-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="index < mission.completedSteps ? 'bg-[#22C55E] text-white' : 'bg-[#EAF8EE] text-[#15803D]'">
                  <Check v-if="index < mission.completedSteps" class="h-4 w-4" />
                  <span v-else class="text-xs font-bold">{{ index + 1 }}</span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-[#17211B]">{{ step }}</p>
                  <p class="mt-0.5 text-[11px] text-[#98A39C]">Langkah {{ index + 1 }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Reward -->
          <section class="rounded-2xl bg-[#17211B] p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/50">Mission Reward</p>
                <div class="mt-1 flex items-center gap-2">
                  <Zap class="h-4 w-4 text-[#4ADE80]" />
                  <span class="text-base font-bold text-white">+{{ mission.xp }} XP</span>
                </div>
              </div>
              <Trophy class="h-7 w-7 text-[#4ADE80]" />
            </div>
          </section>

          <button
            type="button"
            @click="$emit('continue')"
            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-sm font-semibold text-white transition hover:bg-[#16A34A] active:scale-[0.99]"
          >
            Continue Quest
            <ArrowRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight, Check, Trophy, Zap } from 'lucide-vue-next'

defineProps({
  mission: {
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
  }
})

defineEmits(['continue'])
</script>
