<template>
  <main class="mx-auto max-w-[430px] px-4 pb-28 md:hidden">
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
        Challenge Detail
      </span>
    </header>

    <!-- Challenge Image -->
    <div class="relative mt-2 h-[180px] overflow-hidden rounded-2xl bg-[#DCFCE7]">
      <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#BBF7D0]"></div>
      <div class="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-[#ECFDF5]"></div>

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/80">
          <component :is="getCategoryIcon(challenge.category)" class="h-10 w-10 text-[#22C55E]" />
        </div>
      </div>

      <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#15803D]">
        {{ challenge.category }}
      </div>
    </div>

    <!-- Main Info -->
    <div class="mt-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-[23px] font-bold leading-tight text-[#17211B]">
            {{ challenge.title }}
          </h1>
          <p class="mt-1 text-[11px] font-medium text-[#22C55E]">
            {{ challenge.participants }} Peserta Bergabung
          </p>
        </div>
      </div>

      <p class="mt-3 text-[12px] leading-5 text-[#66736A]">
        {{ challenge.description }}
      </p>
    </div>

    <!-- Progress -->
    <section class="mt-5 rounded-2xl border border-[#E5EEE8] bg-white p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold text-[#17211B]">Progress Komunitas</p>
          <p class="mt-1 text-[10px] text-[#98A39C]">Mari capai target bersama!</p>
        </div>
        <span class="text-[11px] font-bold text-[#22C55E]">{{ challenge.progress }}%</span>
      </div>
      <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF1EC]">
        <div class="h-full rounded-full bg-[#22C55E] transition-all" :style="{ width: `${challenge.progress}%` }"></div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-[10px] text-[#98A39C]">{{ challenge.daysLeft }} hari lagi</span>
        <span class="text-[10px] font-medium text-[#66736A]">{{ challenge.progress }}% selesai</span>
      </div>
    </section>

    <!-- Reward -->
    <section class="mt-5 rounded-2xl bg-[#17211B] p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/15">
          <Trophy class="h-5 w-5 text-[#4ADE80]" />
        </div>
        <div>
          <p class="text-[10px] text-white/50">Challenge Reward</p>
          <p class="mt-0.5 text-[13px] font-semibold text-white">Special Badge & 500 XP</p>
        </div>
      </div>
    </section>

    <!-- Action -->
    <button
      type="button"
      @click="$emit('join')"
      class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(34,197,94,0.18)] transition hover:bg-[#16A34A] active:scale-[0.98]"
    >
      {{ challenge.joined ? 'Lanjutkan Challenge' : 'Ikuti Challenge' }}
      <ArrowRight class="h-4 w-4" />
    </button>
  </main>
</template>

<script setup>
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-vue-next'

defineProps({
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
  }
})

defineEmits(['join'])
</script>
