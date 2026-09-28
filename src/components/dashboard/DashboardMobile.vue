<template>
  <main
    class="mx-auto min-h-screen max-w-107.5 bg-[#F8FAF8] px-4 pb-24 md:hidden"
  >

    <!-- Header -->
    <MobileHeader />

    <!-- Greeting -->
    <section class="relative mb-5 flex items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#EAF7ED] via-[#F4FAF5] to-[#F0F7F8] px-5 py-5">
      <div class="min-w-0 flex-1">
        <h1 class="text-xl font-bold tracking-tight text-gray-900">
          Selamat pagi, {{ currentUser.name }}!
        </h1>

        <p class="mt-1 text-sm leading-5 text-gray-600">
          Saatnya lanjutkan langkah baik hari ini.
        </p>
      </div>

      <div
        aria-hidden="true"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/65 text-[#16834B] shadow-sm"
      >
        <Sprout class="h-7 w-7" />
      </div>
    </section>

    <!-- Level Card -->
    <section
      class="mb-5 rounded-2xl border border-[#E6EEE8] bg-white p-4 shadow-[0_4px_16px_rgba(25,60,38,0.05)] transition-shadow hover:shadow-md active:shadow-md"
    >
      <div class="flex items-center gap-3">

        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
        >
          <Leaf class="h-5 w-5 text-green-500" />
        </div>

        <div class="min-w-0 flex-1">

          <div
            class="flex items-center justify-between"
          >

            <div>
              <p
                class="text-sm font-bold text-gray-900"
              >
                Level {{ currentUser.level }}
              </p>

              <p
                class="mt-0.5 text-xs text-gray-500"
              >
                {{ currentUser.levelName || 'Eco Explorer' }}
              </p>
            </div>

            <span
              class="text-xs font-semibold text-gray-600"
            >
              {{ currentUser.xp }} /
              {{ currentUser.nextLevelXp }} XP
            </span>

          </div>

          <div
            class="mt-3 h-2 overflow-hidden rounded-full bg-[#E5EFE8]"
          >
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
              :style="{
                width: `${levelProgress}%`
              }"
            />
          </div>

        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section
      class="mb-6 grid grid-cols-3 gap-2"
    >

      <!-- Streak -->
      <div
        class="rounded-2xl border border-[#F5E6D7] bg-white px-2 py-3 text-center shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-transform active:scale-[0.98]"
      >
        <Flame
          class="mx-auto h-5 w-5 text-[#F97316]"
        />

        <p
          class="mt-1.5 text-base font-bold text-gray-900"
        >
          {{ currentUser.streak }}
        </p>

        <p
          class="text-xs text-gray-600"
        >
          Streak
        </p>
      </div>

      <!-- Eco Actions -->
      <div
        class="rounded-2xl border border-[#DCEFE1] bg-white px-2 py-3 text-center shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-transform active:scale-[0.98]"
      >
        <Leaf
          class="mx-auto h-5 w-5 text-green-600"
        />

        <p
          class="mt-1.5 text-base font-bold text-gray-900"
        >
          {{ ecoActions }}
        </p>

        <p
          class="text-xs text-gray-600"
        >
          Aksi Eco
        </p>
      </div>

      <!-- Low Carbon -->
      <div
        class="rounded-2xl border border-[#DCEAF4] bg-white px-2 py-3 text-center shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-transform active:scale-[0.98]"
      >
        <Bike
          class="mx-auto h-5 w-5 text-[#168BC2]"
        />

        <p
          class="mt-1.5 text-base font-bold text-gray-900"
        >
          {{ lowCarbonDistance }}
        </p>

        <p
          class="text-xs text-gray-600"
        >
          Rendah Karbon
        </p>
      </div>

    </section>

    <!-- Next Quest -->
    <div>

      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900">
          Quest Berikutnya
        </h2>

        <RouterLink
          to="/missions"
          class="rounded-lg px-2 py-1 text-xs font-semibold text-green-700 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          Lihat Semua
        </RouterLink>
      </div>

      <!-- Ada Quest -->
      <section
        v-if="nextQuest"
        class="mb-5 rounded-2xl border border-[#E6EEE8] bg-white p-4 shadow-[0_4px_16px_rgba(25,60,38,0.05)] transition-shadow hover:shadow-md active:shadow-md"
      >
        <div class="flex gap-3">

          <div
            class="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
          >
            <Recycle class="h-6 w-6 text-green-500" />
          </div>

          <div class="min-w-0 flex-1">

            <div
              class="flex items-start justify-between gap-2"
            >
              <div class="min-w-0">

                <h3
                  class="truncate text-sm font-bold text-gray-900"
                >
                  {{ nextQuest.title }}
                </h3>

                <p
                  class="mt-1 text-xs leading-5 text-gray-600"
                >
                  {{ nextQuest.description }}
                </p>

              </div>

              <span
                class="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700"
              >
                +{{ nextQuest.xp }} XP
              </span>
            </div>

            <div
              class="mt-2 flex items-center justify-between"
            >
              <span class="text-xs text-gray-500">
                {{ nextQuest.step || 'Belum dimulai' }}
              </span>

              <span
                class="text-xs font-semibold text-green-700"
              >
                {{ questProgress }}%
              </span>
            </div>

            <div
              class="mt-2 h-2 overflow-hidden rounded-full bg-[#E5EFE8]"
            >
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
                :style="{
                  width: `${questProgress}%`
                }"
              />
            </div>

          </div>
        </div>

        <RouterLink
          :to="nextQuest.link || `/missions/${nextQuest.id}`"
          class="mt-4 flex h-11 items-center justify-center rounded-xl bg-[#20A94B] text-sm font-semibold text-white shadow-sm transition hover:bg-[#168A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Lanjutkan
        </RouterLink>
      </section>

      <!-- Tidak Ada Quest -->
      <section
        v-else
        class="mb-5 rounded-2xl border border-[#E6EEE8] bg-white p-5 shadow-[0_4px_16px_rgba(25,60,38,0.05)]"
      >
        <div class="text-center">

          <div
            class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8ED]"
          >
            <Leaf class="h-5 w-5 text-green-500" />
          </div>

          <h3
            class="mt-3 text-sm font-bold text-gray-900"
          >
            Tidak ada misi berikutnya
          </h3>

          <p
            class="mt-1 text-xs text-gray-600"
          >
            Semua misi sudah kamu selesaikan.
          </p>

        </div>
      </section>

    </div>

    <!-- Habit -->
    <section
      class="mb-6 rounded-2xl border border-[#E6EEE8] bg-white p-4 shadow-[0_4px_16px_rgba(25,60,38,0.05)] transition-shadow hover:shadow-md active:shadow-md"
    >

      <div
        class="flex items-center justify-between"
      >

        <div>
          <h2
            class="text-base font-bold text-gray-900"
          >
            Progress Kebiasaan
          </h2>

          <p
            class="mt-1 text-xs text-gray-600"
          >
            Konsistensi eco-mu minggu ini
          </p>
        </div>

        <span
          class="text-lg font-bold text-green-700"
        >
          {{ questProgress }}%
        </span>

      </div>

      <div
        class="mt-3 flex items-end justify-between"
      >

        <div>
          <p
            class="text-sm font-semibold text-gray-900"
          >
            Kurangi Plastik
          </p>

          <p
            class="mt-1 text-xs text-gray-600"
          >
            Terus pertahankan kebiasaan baikmu.
          </p>
        </div>

        <TrendingUp
          class="h-4 w-4 text-green-500"
        />

      </div>

      <div
        class="mt-3 h-2 overflow-hidden rounded-full bg-[#E5EFE8]"
      >
        <div
          class="h-full rounded-full bg-gradient-to-r from-[#34C759] to-[#16A34A] transition-[width] duration-500"
          :style="{
            width: `${questProgress}%`
          }"
        />
      </div>

    </section>

    <!-- Impact Header -->
    <div
      class="mb-2 flex items-center justify-between"
    >
      <h2
        class="text-base font-bold text-gray-900"
      >
        Dampakmu
      </h2>

      <RouterLink
        to="/impact"
        class="rounded-lg px-2 py-1 text-xs font-semibold text-green-700 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
      >
        Lihat Semua
      </RouterLink>
    </div>

    <!-- Impact -->
    <section class="grid grid-cols-3 gap-2">

      <!-- CO2 -->
      <div
        class="rounded-2xl border border-[#DCEAF4] bg-white p-3.5 shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-shadow hover:shadow-md active:shadow-md"
      >
        <Cloud
          class="h-5 w-5 text-[#168BC2]"
        />

        <p
          class="mt-2 text-base font-bold text-gray-900"
        >
          {{ impact.co2Saved }}
        </p>

        <p
          class="text-xs leading-4 text-gray-600"
        >
          CO₂ Dihemat
        </p>
      </div>

      <!-- Recycled -->
      <div
        class="rounded-2xl border border-[#DCEFE1] bg-white p-3.5 shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-shadow hover:shadow-md active:shadow-md"
      >
        <Recycle
          class="h-5 w-5 text-green-600"
        />

        <p
          class="mt-2 text-base font-bold text-gray-900"
        >
          {{ impact.wasteRecycled }}
        </p>

        <p
          class="text-xs leading-4 text-gray-600"
        >
          Item Didaur Ulang
        </p>
      </div>

      <!-- Trees -->
      <div
        class="rounded-2xl border border-[#E6EEE8] bg-white p-3.5 shadow-[0_4px_16px_rgba(25,60,38,0.04)] transition-shadow hover:shadow-md active:shadow-md"
      >
        <TreePine
          class="h-5 w-5 text-green-600"
        />

        <p
          class="mt-2 text-base font-bold text-gray-900"
        >
          {{ impact.treesEquivalent }}
        </p>

        <p
          class="text-xs leading-4 text-gray-600"
        >
          Setara Pohon
        </p>
      </div>

    </section>

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
  TreePine,
  TrendingUp
} from 'lucide-vue-next'

import MobileHeader from '@/components/navigation/MobileHeader.vue'

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
