<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

    <header class="relative flex items-center justify-center py-4">

      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Dampak
      </span>

    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 p-5 text-white shadow-md">

      <div class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"></div>

      <div class="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-white/5"></div>

      <div class="relative">

        <div class="flex items-center justify-between">

          <div>

            <p class="text-[9px] font-medium text-white/70">
              Total Dampak
            </p>

            <div class="mt-1 flex items-end gap-2">

              <span class="text-[28px] font-bold leading-none">
                {{ Number(totalImpact || 0).toLocaleString() }}
              </span>

              <span class="mb-0.5 text-[9px] text-white/70">
                poin
              </span>

            </div>

            <p class="mt-1 text-[8px] text-white/70">
              Total kontribusi positifmu untuk lingkungan.
            </p>

          </div>

          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Leaf class="h-6 w-6 text-white" />
          </div>

        </div>

        <div class="mt-5">

          <div class="mb-1.5 flex items-center justify-between">

            <span class="text-[8px] text-white/70">
              Progress bulan ini
            </span>

            <span class="text-[8px] font-bold">
              {{ monthlyProgress }}%
            </span>

          </div>

          <div class="h-1.5 overflow-hidden rounded-full bg-white/15">

            <div
              class="h-full rounded-full bg-white transition-all"
              :style="{ width: `${monthlyProgress}%` }"
            ></div>

          </div>

          <p class="mt-2 text-[8px] text-white/60">
            {{ monthlyCurrent }} /
            {{ monthlyTarget }}
            poin dampak
          </p>

        </div>

      </div>

    </section>

    <!-- Stats -->
    <section class="mt-4">

      <div class="mb-3 flex items-end justify-between">

        <div>

          <h2 class="text-[12px] font-bold text-[#17211B]">
            Dampak Lingkungan
          </h2>

          <p class="mt-0.5 text-[8px] text-[#718078]">
            Kontribusi positif yang sudah kamu hasilkan.
          </p>

        </div>

        <span class="text-[8px] font-semibold text-[#8A958E]">
          Tahun ini
        </span>

      </div>

      <div class="grid grid-cols-2 gap-2">

        <div
          v-for="stat in impactStats"
          :key="stat.label"
          class="rounded-2xl border border-[#DCEBE0] bg-gradient-to-b from-white to-[#F8FAF8] p-3 shadow-sm"
        >

          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg"
            :class="stat.bg"
          >
            <component
              :is="stat.icon"
              class="h-4 w-4"
              :class="stat.iconColor"
            />
          </div>

          <p class="mt-2 text-[15px] font-bold text-[#17211B]">
            {{ stat.value }}
          </p>

          <p class="mt-0.5 text-[8px] text-[#718078]">
            {{ stat.label }}
          </p>

        </div>

      </div>

    </section>

    <!-- Monthly -->
    <section class="mt-5 rounded-2xl border border-[#DCEBE0] bg-gradient-to-b from-white to-[#F8FAF8] p-4 shadow-sm">

      <div class="flex items-center justify-between">

        <div>

          <p class="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8A958E]">
            Target Bulanan
          </p>

          <h2 class="mt-1 text-[13px] font-bold text-[#17211B]">
            Green September
          </h2>

        </div>

        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF8EE]">
          <Target class="h-4 w-4 text-[#15803D]" />
        </div>

      </div>

      <div class="mt-4">

        <div class="mb-1.5 flex items-center justify-between">

          <span class="text-[8px] text-[#66736A]">
            {{ monthlyCurrent }} /
            {{ monthlyTarget }} poin
          </span>

          <span class="text-[8px] font-bold text-[#15803D]">
            {{ monthlyProgress }}%
          </span>

        </div>

        <div class="h-1.5 overflow-hidden rounded-full bg-[#EAF0EC]">

          <div
            class="h-full rounded-full bg-[#22C55E]"
            :style="{ width: `${monthlyProgress}%` }"
          ></div>

        </div>

        <p class="mt-2 text-[8px] leading-3.5 text-[#8A958E]">

          <template v-if="monthlyCurrent >= monthlyTarget">
            Target bulan ini sudah tercapai. 🌱
          </template>

          <template v-else>
            Tinggal
            {{ monthlyTarget - monthlyCurrent }}
            poin lagi untuk mencapai target bulan ini.
          </template>

        </p>

      </div>

    </section>

    <!-- Breakdown -->
    <section class="mt-5">

      <div class="mb-3">

        <h2 class="text-[12px] font-bold text-[#17211B]">
          Rincian Dampak
        </h2>

        <p class="mt-0.5 text-[8px] text-[#718078]">
          Distribusi kontribusi dari berbagai aksi ramah lingkungan.
        </p>

      </div>

      <div class="space-y-2">

        <article
          v-for="item in breakdown"
          :key="item.label"
          class="rounded-2xl border border-[#DCEBE0] bg-gradient-to-b from-white to-[#F8FAF8] p-3 shadow-sm"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              :class="item.bg"
            >
              <component
                :is="item.icon"
                class="h-4 w-4"
                :class="item.iconColor"
              />
            </div>

            <div class="min-w-0 flex-1">

              <div class="flex items-center justify-between gap-2">

                <p class="truncate text-[9px] font-semibold text-[#17211B]">
                  {{ item.label }}
                </p>

                <span class="shrink-0 text-[9px] font-bold text-[#17211B]">
                  {{ item.value }}
                </span>

              </div>

              <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-[#EEF3EF]">

                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{ width: `${item.progress}%` }"
                ></div>

              </div>

            </div>

          </div>

        </article>

      </div>

    </section>

    <!-- Motivation -->
    <section class="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-[#E8F8ED] p-4 shadow-sm">

      <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
        <Sprout class="h-4 w-4 text-[#15803D]" />
      </div>

      <h3 class="mt-3 text-[11px] font-bold text-[#17211B]">
        Aksi kecil berdampak besar 🌱
      </h3>

      <p class="mt-1 text-[8px] leading-3.5 text-[#66736A]">
        Konsistensi kecil setiap hari bisa menciptakan perubahan besar untuk lingkungan.
      </p>

    </section>

  </main>
</template>

<script setup>
import {
  ArrowLeft,
  Leaf,
  Target,
  Sprout
} from 'lucide-vue-next'

defineProps({
  totalImpact: {
    type: Number,
    default: 0
  },

  monthlyCurrent: {
    type: Number,
    default: 0
  },

  monthlyTarget: {
    type: Number,
    default: 500
  },

  monthlyProgress: {
    type: Number,
    default: 0
  },

  impactStats: {
    type: Array,
    default: () => []
  },

  breakdown: {
    type: Array,
    default: () => []
  },

  visibleActions: {
    type: Array,
    default: () => []
  },

  showAllActions: {
    type: Boolean,
    default: false
  },

  goBack: {
    type: Function,
    required: true
  }
})

defineEmits([
  'toggle:showAllActions'
])
</script>