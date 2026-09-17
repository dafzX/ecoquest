<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

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
        Impact
      </span>
    </header>

    <!-- Impact Hero -->
    <section class="relative overflow-hidden rounded-2xl bg-[#15803D] p-5 text-white">
      <div class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-white/5"></div>

      <div class="relative">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[9px] font-medium text-white/70">Total Impact</p>
            <div class="mt-1 flex items-end gap-2">
              <span class="text-[28px] font-bold leading-none">{{ totalImpact.toLocaleString() }}</span>
              <span class="mb-0.5 text-[9px] text-white/70">points</span>
            </div>
            <p class="mt-1 text-[8px] text-white/70">Total kontribusi positifmu untuk lingkungan.</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Leaf class="h-6 w-6 text-white" />
          </div>
        </div>

        <div class="mt-5">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[8px] text-white/70">Progress bulan ini</span>
            <span class="text-[8px] font-bold">{{ monthlyProgress }}%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div class="h-full rounded-full bg-white transition-all" :style="{ width: `${monthlyProgress}%` }"></div>
          </div>
          <p class="mt-2 text-[8px] text-white/60">
            {{ monthlyCurrent }} / {{ monthlyTarget }} impact points
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="mt-4">
      <div class="mb-3 flex items-end justify-between">
        <div>
          <h2 class="text-[12px] font-bold text-[#17211B]">Dampak Lingkungan</h2>
          <p class="mt-0.5 text-[8px] text-[#718078]">Kontribusi positif yang sudah kamu hasilkan.</p>
        </div>
        <span class="text-[8px] font-semibold text-[#8A958E]">Tahun ini</span>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div v-for="stat in impactStats" :key="stat.label" class="rounded-xl border border-[#DCEBE0] bg-white p-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg" :class="stat.bg">
            <component :is="stat.icon" class="h-4 w-4" :class="stat.iconColor" />
          </div>
          <p class="mt-2 text-[15px] font-bold text-[#17211B]">{{ stat.value }}</p>
          <p class="mt-0.5 text-[8px] text-[#718078]">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Monthly Goal -->
    <section class="mt-5 rounded-xl border border-[#DCEBE0] bg-white p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8A958E]">Monthly Goal</p>
          <h2 class="mt-1 text-[13px] font-bold text-[#17211B]">Green September</h2>
        </div>
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF8EE]">
          <Target class="h-4 w-4 text-[#15803D]" />
        </div>
      </div>

      <div class="mt-4">
        <div class="mb-1.5 flex items-center justify-between">
          <span class="text-[8px] text-[#66736A]">{{ monthlyCurrent }} / {{ monthlyTarget }} points</span>
          <span class="text-[8px] font-bold text-[#15803D]">{{ monthlyProgress }}%</span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-[#EAF0EC]">
          <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${monthlyProgress}%` }"></div>
        </div>
        <p class="mt-2 text-[8px] leading-3.5 text-[#8A958E]">
          Tinggal {{ monthlyTarget - monthlyCurrent }} points lagi untuk mencapai target bulan ini.
        </p>
      </div>
    </section>

    <!-- Impact Breakdown -->
    <section class="mt-5">
      <div class="mb-3">
        <h2 class="text-[12px] font-bold text-[#17211B]">Impact Breakdown</h2>
        <p class="mt-0.5 text-[8px] text-[#718078]">Distribusi kontribusi dari berbagai eco action.</p>
      </div>

      <div class="space-y-2">
        <article v-for="item in breakdown" :key="item.label" class="rounded-xl border border-[#DCEBE0] bg-white p-3">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" :class="item.bg">
              <component :is="item.icon" class="h-4 w-4" :class="item.iconColor" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2">
                <p class="truncate text-[9px] font-semibold text-[#17211B]">{{ item.label }}</p>
                <span class="shrink-0 text-[9px] font-bold text-[#17211B]">{{ item.value }}</span>
              </div>
              <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-[#EEF3EF]">
                <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${item.progress}%` }"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>



    <!-- Motivation -->
    <section class="mt-5 rounded-xl border border-[#DDEFE2] bg-[#EAF8EE] p-4">
      <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
        <Sprout class="h-4 w-4 text-[#15803D]" />
      </div>
      <h3 class="mt-3 text-[11px] font-bold text-[#17211B]">Small actions matter 🌱</h3>
      <p class="mt-1 text-[8px] leading-3.5 text-[#66736A]">
        Konsistensi kecil setiap hari bisa menciptakan perubahan besar untuk lingkungan.
      </p>
    </section>

  </main>
</template>

<script setup>
import { ArrowLeft, Leaf, Target, Sprout } from 'lucide-vue-next'

defineProps({
  totalImpact: Number,
  monthlyCurrent: Number,
  monthlyTarget: Number,
  monthlyProgress: Number,
  impactStats: Array,
  breakdown: Array,
  visibleActions: Array,
  showAllActions: Boolean,
  goBack: Function
})

defineEmits(['toggle:showAllActions'])
</script>
