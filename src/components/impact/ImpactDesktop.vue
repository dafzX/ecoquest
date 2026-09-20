<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1100px] px-6 pb-10">

      <header class="mb-6 flex items-center gap-3 pt-2">
        <div>
          <h1 class="text-[24px] font-bold text-[#17211B]">
            Dampak
          </h1>

          <p class="mt-1 text-sm text-[#718078]">
            Lihat bagaimana aksi kecilmu memberikan dampak untuk bumi.
          </p>
        </div>
      </header>

      <div class="grid grid-cols-[1.35fr_0.65fr] gap-5">

        <div class="space-y-5">

          <!-- Hero -->
          <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-green-800 p-6 text-white shadow-md">

            <div class="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/10"></div>
            <div class="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5"></div>

            <div class="relative">

              <div class="flex items-start justify-between">

                <div>

                  <p class="text-xs font-medium text-white/70">
                    Total Dampak
                  </p>

                  <div class="mt-2 flex items-end gap-3">

                    <span class="text-[48px] font-bold leading-none">
                      {{ Number(totalImpact || 0).toLocaleString() }}
                    </span>

                    <span class="mb-1.5 text-xs text-white/70">
                      poin
                    </span>

                  </div>

                  <p class="mt-3 max-w-md text-xs leading-5 text-white/70">
                    Total kontribusi positifmu untuk lingkungan.
                  </p>

                </div>

                <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Leaf class="h-8 w-8" />
                </div>

              </div>

              <div class="mt-7 max-w-lg">

                <div class="mb-2 flex items-center justify-between">

                  <span class="text-[10px] text-white/70">
                    Progress bulan ini
                  </span>

                  <span class="text-[10px] font-bold">
                    {{ monthlyProgress }}%
                  </span>

                </div>

                <div class="h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    class="h-full rounded-full bg-white transition-all"
                    :style="{ width: `${monthlyProgress}%` }"
                  ></div>
                </div>

                <p class="mt-2 text-[10px] text-white/60">
                  {{ monthlyCurrent }} /
                  {{ monthlyTarget }}
                  poin dampak
                </p>

              </div>

            </div>
          </section>

          <!-- Stats -->
          <section>

            <div class="mb-3 flex items-end justify-between">

              <div>
                <h2 class="text-base font-bold text-[#17211B]">
                  Dampak Lingkungan
                </h2>

                <p class="mt-1 text-[11px] text-[#718078]">
                  Kontribusi positif yang sudah kamu hasilkan.
                </p>
              </div>

              <span class="text-[10px] font-medium text-[#8A958E]">
                Tahun ini
              </span>

            </div>

            <div class="grid grid-cols-4 gap-3">

              <div
                v-for="stat in impactStats"
                :key="stat.label"
                class="rounded-3xl border border-[#E8EDE9] bg-gradient-to-b from-white to-[#F8FAF8] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl"
                  :class="stat.bg"
                >
                  <component
                    :is="stat.icon"
                    class="h-5 w-5"
                    :class="stat.iconColor"
                  />
                </div>

                <p class="mt-4 text-[21px] font-bold text-[#17211B]">
                  {{ stat.value }}
                </p>

                <p class="mt-1 text-[10px] text-[#718078]">
                  {{ stat.label }}
                </p>

              </div>

            </div>
          </section>

          <!-- Breakdown -->
          <section class="rounded-3xl border border-[#E8EDE9] bg-gradient-to-b from-white to-[#F8FAF8] p-6 shadow-sm">

            <div class="mb-5">

              <h2 class="text-base font-bold text-[#17211B]">
                Impact Breakdown
              </h2>

              <p class="mt-1 text-[10px] text-[#8A958E]">
                Distribusi kontribusi dari berbagai eco action.
              </p>

            </div>

            <div class="grid grid-cols-2 gap-x-6 gap-y-5">

              <div
                v-for="item in breakdown"
                :key="item.label"
                class="flex items-center gap-3"
              >

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  :class="item.bg"
                >
                  <component
                    :is="item.icon"
                    class="h-5 w-5"
                    :class="item.iconColor"
                  />
                </div>

                <div class="min-w-0 flex-1">

                  <div class="mb-2 flex items-center justify-between">

                    <span class="text-[10px] font-semibold text-[#17211B]">
                      {{ item.label }}
                    </span>

                    <span class="text-[10px] font-bold text-[#17211B]">
                      {{ item.value }}
                    </span>

                  </div>

                  <div class="h-1.5 overflow-hidden rounded-full bg-[#EEF3EF]">

                    <div
                      class="h-full rounded-full bg-[#22C55E] transition-all"
                      :style="{ width: `${item.progress}%` }"
                    ></div>

                  </div>

                </div>

              </div>

            </div>
          </section>

        </div>

        <!-- Side -->
        <div class="space-y-5">

          <!-- Monthly -->
          <section class="rounded-3xl border border-[#E8EDE9] bg-gradient-to-b from-white to-[#F8FAF8] p-6 shadow-sm">

            <div class="flex items-start justify-between">

              <div>

                <p class="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8A958E]">
                  Target Bulanan
                </p>

                <h2 class="mt-1 text-base font-bold text-[#17211B]">
                  Green September
                </h2>

              </div>

              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
                <Target class="h-5 w-5 text-[#15803D]" />
              </div>

            </div>

            <div class="mt-5">

              <div class="mb-2 flex items-center justify-between">

                <span class="text-[10px] text-[#66736A]">
                  {{ monthlyCurrent }} / {{ monthlyTarget }}
                </span>

                <span class="text-[10px] font-bold text-[#15803D]">
                  {{ monthlyProgress }}%
                </span>

              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#EAF0EC]">

                <div
                  class="h-full rounded-full bg-[#22C55E] transition-all"
                  :style="{ width: `${monthlyProgress}%` }"
                ></div>

              </div>

              <p class="mt-3 text-[10px] leading-4 text-[#8A958E]">

                <template v-if="monthlyCurrent >= monthlyTarget">
                  Target bulan ini sudah tercapai. 🌱
                </template>

                <template v-else>
                  {{ monthlyTarget - monthlyCurrent }}
                  poin lagi untuk mencapai target.
                </template>

              </p>

            </div>

          </section>

          <!-- Motivation -->
          <section class="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-[#E8F8ED] p-6 shadow-sm">

            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Sprout class="h-5 w-5 text-[#15803D]" />
            </div>

            <h3 class="mt-4 text-sm font-bold text-[#17211B]">
              Aksi kecil berdampak besar 🌱
            </h3>

            <p class="mt-2 text-[10px] leading-4 text-[#66736A]">
              Konsistensi kecil setiap hari bisa menciptakan perubahan besar untuk lingkungan.
            </p>

          </section>

        </div>

      </div>

    </div>
  </main>
</template>

<script setup>
import {
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

  actions: {
    type: Array,
    default: () => []
  }
})
</script>