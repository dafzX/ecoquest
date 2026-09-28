<template>
  <main class="hidden min-h-screen bg-[#F8FAF8] md:block">
    <div class="mx-auto max-w-270 pb-10">

      <!-- Desktop Header -->
      <section class="mb-6 rounded-3xl bg-gradient-to-br from-[#EAF7ED] via-[#F4FAF5] to-[#F0F7F8] px-6 py-5">
        <div class="flex items-center gap-4">
          <DesktopPageHeader
            class="mb-0 min-w-0 flex-1 border-0 pb-0 pt-0"
            :title="`Selamat pagi, ${currentUser.name}!`"
            description="Saatnya lanjutkan langkah baik hari ini."
          />
          <div
            aria-hidden="true"
            class="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/65 text-[#16834B] shadow-sm sm:flex"
          >
            <Sprout class="h-9 w-9" />
          </div>
        </div>
      </section>

      <!-- Desktop Grid -->
      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <!-- Left Column -->
        <div class="space-y-6 xl:col-span-2">

          <div
            class="flex flex-col gap-6 rounded-3xl border border-[#E6EEE8] bg-white p-5 shadow-[0_6px_24px_rgba(25,60,38,0.05)] sm:p-7 xl:flex-row"
          >

            <!-- Level Info -->
            <div class="flex-1 border-b border-[#E8EDE9] pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
              <div class="flex items-center gap-4">

                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
                >
                  <Leaf class="h-6 w-6 text-green-500" />
                </div>

                <div>
                  <p class="text-base font-bold text-gray-900">
                    Level {{ currentUser.level }}
                  </p>

                  <p class="mt-0.5 text-sm text-gray-500">
                    {{ currentUser.levelName || 'Eco Explorer' }}
                  </p>
                </div>

              </div>

              <div class="mt-6 flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-600">
                  {{ currentUser.xp }} /
                  {{ currentUser.nextLevelXp }} XP
                </span>
              </div>

              <div
                class="mt-3 h-2.5 overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
                  :style="{ width: `${levelProgress}%` }"
                />
              </div>
            </div>

            <!-- Impact -->
            <div class="flex-1 xl:pl-2">

              <p class="mb-4 text-sm font-semibold text-gray-900">
                Dampakmu
              </p>

              <div
                class="flex items-center justify-between gap-2 text-center"
              >

                <!-- Streak -->
                <div>
                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#F5E6D7] bg-[#FFF7ED]"
                  >
                    <Flame class="h-4 w-4 text-[#F97316]" />
                  </div>

                  <p
                    class="mt-2 text-xs font-bold text-gray-900"
                  >
                    {{ currentUser.streak }} Hari
                  </p>

                  <p class="text-[11px] text-gray-500">
                    Streak
                  </p>
                </div>

                <!-- CO2 -->
                <div>
                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#DCEAF4] bg-[#F0F9FF]"
                  >
                    <Cloud class="h-4 w-4 text-[#168BC2]" />
                  </div>

                  <p
                    class="mt-2 text-xs font-bold text-gray-900"
                  >
                    {{ impact.co2Saved }} kg
                  </p>

                  <p class="text-[11px] text-gray-500">
                    CO₂ Dihemat
                  </p>
                </div>

                <!-- Eco Actions -->
                <div>
                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#DCEFE1] bg-[#F0FAF2]"
                  >
                    <Leaf class="h-4 w-4 text-green-500" />
                  </div>

                  <p
                    class="mt-2 text-xs font-bold text-gray-900"
                  >
                    {{ ecoActions }}
                  </p>

                  <p class="text-[11px] text-gray-500">
                    Aksi Eco
                  </p>
                </div>

                <!-- Low Carbon -->
                <div>
                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#DCEAF4] bg-[#F0F9FF]"
                  >
                    <Bike class="h-4 w-4 text-[#168BC2]" />
                  </div>

                  <p
                    class="mt-2 text-xs font-bold text-gray-900"
                  >
                    {{ lowCarbonDistance }} km
                  </p>

                  <p class="text-[11px] text-gray-500">
                    Rendah Karbon
                  </p>
                </div>

              </div>
            </div>
          </div>

          <!-- Next Quest -->
          <div>
            <h2 class="mb-4 text-lg font-bold text-gray-900">
              Quest Berikutnya
            </h2>

            <!-- Ada Quest -->
            <div
              v-if="nextQuest"
              class="rounded-2xl border border-[#E6EEE8] bg-white p-6 shadow-[0_4px_20px_rgba(25,60,38,0.05)] transition-shadow hover:shadow-md"
            >
              <div class="flex items-start justify-between">

                <div class="flex gap-4">

                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7ED]"
                  >
                    <Recycle class="h-6 w-6 text-green-500" />
                  </div>

                  <div>
                    <h3 class="text-base font-bold text-gray-900">
                      {{ nextQuest.title }}
                    </h3>

                    <p class="mt-1 text-sm leading-5 text-gray-600">
                      {{ nextQuest.description }}
                    </p>

                    <div
                      class="mt-4 flex w-full max-w-80 items-center justify-between"
                    >
                      <span class="text-xs font-medium text-gray-500">
                        {{ nextQuest.step || 'Belum dimulai' }}
                      </span>

                      <span class="text-xs font-bold text-green-700">
                        {{ questProgress }}%
                      </span>
                    </div>

                    <div
                      class="mt-2 h-2 w-full max-w-80 overflow-hidden rounded-full bg-[#E5EFE8]"
                    >
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
                        :style="{ width: `${questProgress}%` }"
                      />
                    </div>
                  </div>
                </div>

                <div class="text-right">

                  <span
                    class="inline-block rounded-full bg-[#EAF8EE] px-3 py-1.5 text-sm font-bold text-green-700"
                  >
                    +{{ nextQuest.xp }} XP
                  </span>

                  <RouterLink
                    :to="nextQuest.link || `/missions/${nextQuest.id}`"
                    class="mt-4 block rounded-xl bg-[#20A94B] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#168A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:translate-y-0"
                  >
                    Lanjutkan
                  </RouterLink>

                </div>

              </div>
            </div>

            <!-- Tidak Ada Quest -->
            <div
              v-else
              class="flex min-h-37.5 items-center justify-center rounded-2xl border border-[#E6EEE8] bg-white p-6 shadow-[0_4px_20px_rgba(25,60,38,0.05)]"
            >
              <div class="text-center">

                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8ED]"
                >
                  <Leaf class="h-6 w-6 text-green-500" />
                </div>

                <h3 class="mt-3 text-base font-bold text-gray-900">
                  Tidak ada misi berikutnya
                </h3>

                <p class="mt-1 text-sm text-gray-600">
                  Semua misi sudah kamu selesaikan.
                </p>

              </div>
            </div>
          </div>

        </div>

        <!-- Right Column -->
        <div>

          <h2
            class="mb-4 text-lg font-bold text-gray-900"
          >
            Progress Kebiasaan
          </h2>

          <div
            class="rounded-2xl border border-[#E6EEE8] bg-white p-6 shadow-[0_4px_20px_rgba(25,60,38,0.05)]"
          >

            <div class="flex items-start justify-between">

              <div>
                <h3
                  class="text-base font-bold text-gray-900"
                >
                  Kurangi Plastik
                </h3>

                <p
                  class="mt-1 text-sm text-gray-600"
                >
                  Terus pertahankan kebiasaan baikmu.
                </p>
              </div>

              <span
                class="text-xl font-bold text-green-700"
              >
                {{ questProgress }}%
              </span>

            </div>

            <div
              class="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E5EFE8]"
            >
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
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
                    class="text-sm font-bold text-gray-900"
                  >
                    {{ currentUser.streak }} hari streak
                  </p>

                  <p
                    class="text-xs text-gray-500"
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
                    class="text-sm font-bold text-gray-900"
                  >
                    Pencapaian berikutnya
                  </p>

                  <p
                    class="text-xs text-gray-500"
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
  Sprout,
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
