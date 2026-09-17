<template>
  <div class="mx-auto max-w-[430px] px-4 pb-28 md:hidden">
    <!-- Header -->
    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white active:scale-95"
      >
        <ArrowLeft class="h-[18px] w-[18px]" />
      </button>
      <span class="text-[13px] font-semibold text-[#17211B]">
        Mission Detail
      </span>
    </header>

    <!-- Mission Image -->
    <div class="relative mt-2 h-[180px] overflow-hidden rounded-2xl bg-[#DCFCE7]">
      <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#BBF7D0]"></div>
      <div class="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-[#ECFDF5]"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/80">
          <component :is="getCategoryIcon(mission.category)" class="h-10 w-10 text-[#22C55E]" />
        </div>
      </div>
      <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#15803D]">
        {{ mission.category }}
      </div>
    </div>

    <!-- Main Info -->
    <div class="mt-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-[11px] font-medium text-[#22C55E]">
            Step {{ mission.currentStep }} of {{ mission.totalSteps }}
          </p>
          <h1 class="mt-1 text-[23px] font-bold leading-tight text-[#17211B]">
            {{ mission.title }}
          </h1>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 rounded-full bg-[#EAF8EE] px-3 py-1.5">
          <Zap class="h-3.5 w-3.5 text-[#22C55E]" />
          <span class="text-[11px] font-bold text-[#15803D]">
            +{{ mission.xp }} XP
          </span>
        </div>
      </div>
      <p class="mt-3 text-[12px] leading-5 text-[#66736A]">
        {{ mission.description }}
      </p>
    </div>

    <!-- Progress -->
    <section class="mt-5 rounded-2xl border border-[#E5EEE8] bg-white p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold text-[#17211B]">Progress</p>
          <p class="mt-1 text-[10px] text-[#98A39C]">Selesaikan langkah ini untuk mendapatkan XP.</p>
        </div>
        <span class="text-[11px] font-bold text-[#22C55E]">
          {{ mission.progress }}%
        </span>
      </div>
      <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF1EC]">
        <div class="h-full rounded-full bg-[#22C55E] transition-all" :style="{ width: `${mission.progress}%` }"></div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-[10px] text-[#98A39C]">{{ mission.completedDays }} dari {{ mission.totalDays }} hari</span>
        <span class="text-[10px] font-medium text-[#66736A]">{{ mission.progress }}% selesai</span>
      </div>
    </section>

    <!-- What to do -->
    <section class="mt-5">
      <h2 class="text-[14px] font-bold text-[#17211B]">Apa yang harus dilakukan?</h2>
      <div class="mt-3 space-y-2.5">
        <div v-for="(step, index) in mission.steps" :key="step" class="flex items-start gap-3 rounded-xl border border-[#E5EEE8] bg-white p-3">
          <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" :class="index < mission.completedSteps ? 'bg-[#22C55E] text-white' : 'bg-[#EAF8EE] text-[#15803D]'">
            <Check v-if="index < mission.completedSteps" class="h-3.5 w-3.5" />
            <span v-else class="text-[10px] font-bold">{{ index + 1 }}</span>
          </div>
          <div>
            <p class="text-[11px] font-semibold text-[#17211B]">{{ step }}</p>
            <p v-if="index === 0" class="mt-1 text-[10px] leading-4 text-[#98A39C]">
              Gunakan kembali barang yang masih bisa digunakan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reward -->
    <section class="mt-5 rounded-2xl bg-[#17211B] p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/15">
          <Trophy class="h-5 w-5 text-[#4ADE80]" />
        </div>
        <div>
          <p class="text-[10px] text-white/50">Mission Reward</p>
          <p class="mt-0.5 text-[13px] font-semibold text-white">+{{ mission.xp }} XP</p>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <div class="rounded-xl bg-white/5 px-3 py-2.5">
          <p class="text-[9px] text-white/40">Streak</p>
          <div class="mt-1 flex items-center gap-1">
            <Flame class="h-3.5 w-3.5 text-[#4ADE80]" />
            <span class="text-[11px] font-semibold text-white">+1 Day</span>
          </div>
        </div>
        <div class="rounded-xl bg-white/5 px-3 py-2.5">
          <p class="text-[9px] text-white/40">Impact</p>
          <div class="mt-1 flex items-center gap-1">
            <Leaf class="h-3.5 w-3.5 text-[#4ADE80]" />
            <span class="text-[11px] font-semibold text-white">Eco Action</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Continue -->
    <button
      type="button"
      @click="$emit('continue')"
      class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(34,197,94,0.18)] transition hover:bg-[#16A34A] active:scale-[0.98]"
    >
      Continue Quest
      <ArrowRight class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight, Zap, Check, Trophy, Flame, Leaf } from 'lucide-vue-next'

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
