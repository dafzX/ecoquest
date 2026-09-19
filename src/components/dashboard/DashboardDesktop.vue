<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1080px] px-6 pb-8">

      <!-- Desktop Header -->
      <DesktopPageHeader
        :title="`Selamat pagi, ${currentUser.name}! 👋`"
        description="Saatnya lanjutkan langkah baik hari ini."
      />

      <!-- Desktop Grid -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <!-- Left Column -->
        <div class="space-y-6 lg:col-span-2">

          <!-- Level Card -->
          <div
            class="flex flex-col gap-6 rounded-2xl border border-[#E8EDE9] bg-white p-6 md:flex-row"
          >

            <!-- Level Info -->
            <div class="flex-1 border-r border-[#E8EDE9] pr-6">
              <div class="flex items-center gap-4">

                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
                >
                  <Leaf class="h-6 w-6 text-[#22C55E]" />
                </div>

                <div>
                  <p class="text-sm font-bold text-[#17211B]">
                    Level {{ currentUser.level }}
                  </p>

                  <p class="text-xs text-[#66736A]">
                    {{ currentUser.levelName || 'Eco Explorer' }}
                  </p>
                </div>

              </div>

              <div class="mt-6 flex items-center justify-between">
                <span class="text-xs font-medium text-[#66736A]">
                  {{ currentUser.xp }} /
                  {{ currentUser.nextLevelXp }} XP
                </span>
              </div>

              <div
                class="mt-2 h-2 overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{ width: `${levelProgress}%` }"
                />
              </div>
            </div>

            <!-- Impact -->
            <div class="flex-1 pl-2">

              <p class="mb-4 text-xs font-semibold text-[#17211B]">
                Dampakmu
              </p>

              <div
                class="flex items-center justify-between gap-2 text-center"
              >

                <!-- Streak -->
                <div>
                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#E8EDE9] bg-[#F8FAF8]"
                  >
                    <Flame class="h-4 w-4 text-[#F97316]" />
                  </div>

                  <p
                    class="mt-2 text-[10px] font-bold text-[#17211B]"
                  >
                    {{ currentUser.streak }} Hari
                  </p>
                </div>

                <!-- CO2 -->
                <div>
                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#E8EDE9] bg-[#F8FAF8]"
                  >
                    <Cloud class="h-4 w-4 text-[#22C55E]" />
                  </div>

                  <p
                    class="mt-2 text-[10px] font-bold text-[#17211B]"
                  >
                    {{ impact.co2Saved }} kg
                  </p>

                  <p class="text-[9px] text-[#66736A]">
                    CO₂ Dihemat
                  </p>
                </div>

                <!-- Eco Actions -->
                <div>
                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#E8EDE9] bg-[#F8FAF8]"
                  >
                    <Leaf class="h-4 w-4 text-[#22C55E]" />
                  </div>

                  <p
                    class="mt-2 text-[10px] font-bold text-[#17211B]"
                  >
                    {{ ecoActions }}
                  </p>

                  <p class="text-[9px] text-[#66736A]">
                    Eco Actions
                  </p>
                </div>

                <!-- Low Carbon -->
                <div>
                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#E8EDE9] bg-[#F8FAF8]"
                  >
                    <Bike class="h-4 w-4 text-[#22C55E]" />
                  </div>

                  <p
                    class="mt-2 text-[10px] font-bold text-[#17211B]"
                  >
                    {{ lowCarbonDistance }} km
                  </p>

                  <p class="text-[9px] text-[#66736A]">
                    Low Carbon
                  </p>
                </div>

              </div>
            </div>
          </div>

          <!-- Next Quest -->
          <div>
            <h2 class="mb-4 text-base font-bold text-[#17211B]">
              Quest Berikutnya
            </h2>

            <!-- Ada Quest -->
            <div
              v-if="nextQuest"
              class="rounded-2xl border border-[#E8EDE9] bg-white p-6"
            >
              <div class="flex items-start justify-between">

                <div class="flex gap-4">

                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
                  >
                    <Recycle class="h-6 w-6 text-[#22C55E]" />
                  </div>

                  <div>
                    <h3 class="text-sm font-bold text-[#17211B]">
                      {{ nextQuest.title }}
                    </h3>

                    <p class="mt-1 text-xs text-[#66736A]">
                      {{ nextQuest.description }}
                    </p>

                    <div
                      class="mt-4 flex w-64 items-center justify-between"
                    >
                      <span class="text-[10px] font-medium text-[#66736A]">
                        {{ nextQuest.step || 'Belum dimulai' }}
                      </span>

                      <span class="text-[10px] font-bold text-[#22C55E]">
                        {{ questProgress }}%
                      </span>
                    </div>

                    <div
                      class="mt-1.5 h-1.5 w-64 overflow-hidden rounded-full bg-[#E5EFE8]"
                    >
                      <div
                        class="h-full rounded-full bg-[#22C55E]"
                        :style="{ width: `${questProgress}%` }"
                      />
                    </div>
                  </div>
                </div>

                <div class="text-right">

                  <span
                    class="inline-block rounded-full bg-[#EAF8EE] px-3 py-1 text-xs font-bold text-[#15803D]"
                  >
                    +{{ nextQuest.xp }} XP
                  </span>

                  <RouterLink
                    :to="nextQuest.link || `/missions/${nextQuest.id}`"
                    class="mt-4 block rounded-lg bg-[#22C55E] px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#15803D]"
                  >
                    Lanjutkan
                  </RouterLink>

                </div>

              </div>
            </div>

            <!-- Tidak Ada Quest -->
            <div
              v-else
              class="flex min-h-[150px] items-center justify-center rounded-2xl border border-[#E8EDE9] bg-white p-6"
            >
              <div class="text-center">

                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8ED]"
                >
                  <Leaf class="h-6 w-6 text-[#22C55E]" />
                </div>

                <h3 class="mt-3 text-sm font-bold text-[#17211B]">
                  Tidak ada misi berikutnya
                </h3>

                <p class="mt-1 text-xs text-[#66736A]">
                  Semua misi sudah kamu selesaikan.
                </p>

              </div>
            </div>
          </div>

        </div>

        <!-- Right Column -->
        <div>

          <h2
            class="mb-4 text-base font-bold text-[#17211B]"
          >
            Progress Kebiasaan
          </h2>

          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-6"
          >

            <div class="flex items-start justify-between">

              <div>
                <h3
                  class="text-sm font-bold text-[#17211B]"
                >
                  Kurangi Plastik
                </h3>

                <p
                  class="mt-1 text-xs text-[#66736A]"
                >
                  Terus pertahankan kebiasaan baikmu.
                </p>
              </div>

              <span
                class="text-lg font-bold text-[#22C55E]"
              >
                {{ questProgress }}%
              </span>

            </div>

            <div
              class="mt-4 h-2 overflow-hidden rounded-full bg-[#E5EFE8]"
            >
              <div
                class="h-full rounded-full bg-[#22C55E]"
                :style="{
                  width: `${questProgress}%`
                }"
              />
            </div>

            <div
              class="mt-6 space-y-4 border-t border-[#E8EDE9] pt-6"
            >

              <!-- Streak -->
              <div class="flex items-center gap-3">

                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7ED]"
                >
                  <Flame
                    class="h-4 w-4 text-[#F97316]"
                  />
                </div>

                <div>
                  <p
                    class="text-xs font-bold text-[#17211B]"
                  >
                    {{ currentUser.streak }} hari streak
                  </p>

                  <p
                    class="text-[10px] text-[#66736A]"
                  >
                    Streak aktif
                  </p>
                </div>

              </div>

              <!-- Achievement -->
              <div class="flex items-center gap-3">

                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F9FF]"
                >
                  <Trophy
                    class="h-4 w-4 text-[#0EA5E9]"
                  />
                </div>

                <div>
                  <p
                    class="text-xs font-bold text-[#17211B]"
                  >
                    Pencapaian berikutnya
                  </p>

                  <p
                    class="text-[10px] text-[#66736A]"
                  >
                    Gunakan botol minum reusable selama 14 hari
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import {
  Bike,
  Cloud,
  Flame,
  Leaf,
  Recycle,
  Trophy
} from 'lucide-vue-next'

import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'

defineProps({
  currentUser: {
    type: Object,
    required: true
  },

  ecoActions: {
    type: Number,
    default: 0
  },

  lowCarbonDistance: {
    type: Number,
    default: 0
  },

  nextQuest: {
    type: Object,
    default: null
  },

  questProgress: {
    type: Number,
    default: 0
  },

  levelProgress: {
    type: Number,
    default: 0
  },

  impact: {
    type: Object,
    required: true
  }
})
</script>