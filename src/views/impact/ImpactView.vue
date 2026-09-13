<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <!-- Header -->
        <header class="flex items-center justify-between py-3">
          <div class="flex items-center gap-2">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22C55E]"
            >
              <Leaf class="h-4 w-4 text-white" />
            </div>

            <h1 class="text-sm font-bold text-[#17211B]">
              EcoQuest
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="relative flex h-7 w-7 items-center justify-center"
            >
              <Bell class="h-4 w-4 text-[#405047]" />

              <span
                class="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#22C55E]"
              ></span>
            </button>

            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCFCE7] text-[9px] font-bold text-[#15803D]"
            >
              DA
            </div>
          </div>
        </header>

        <!-- Intro -->
        <section class="mb-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-[17px] font-bold text-[#17211B]">
                Dampakmu
              </h2>

              <p class="mt-0.5 text-[9px] text-[#718078]">
                Lihat kontribusi positif yang sudah kamu buat.
              </p>
            </div>

            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F8ED]"
            >
              <Globe2 class="h-4 w-4 text-[#22C55E]" />
            </div>
          </div>
        </section>

        <!-- Period Filter -->
        <div
          class="mb-4 flex rounded-xl border border-[#DCEBE0] bg-white p-1"
        >
          <button
            v-for="period in periods"
            :key="period.value"
            type="button"
            class="flex-1 rounded-lg py-2 text-[9px] font-semibold transition"
            :class="
              selectedPeriod === period.value
                ? 'bg-[#22C55E] text-white'
                : 'text-[#718078]'
            "
            @click="selectedPeriod = period.value"
          >
            {{ period.label }}
          </button>
        </div>

        <!-- Impact Stats -->
        <section class="mb-4 grid grid-cols-3 gap-2">

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <Recycle class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ currentImpact.plastic }}
            </p>

            <p class="mt-0.5 text-[7px] leading-3 text-[#718078]">
              Plastik<br />
              Dikurangi
            </p>

            <p class="mt-1 text-[7px] font-semibold text-[#22C55E]">
              +12%
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]"
            >
              <Cloud class="h-3.5 w-3.5 text-[#3B82F6]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ currentImpact.co2 }}
            </p>

            <p class="mt-0.5 text-[7px] leading-3 text-[#718078]">
              CO₂<br />
              Dikurangi
            </p>

            <p class="mt-1 text-[7px] font-semibold text-[#22C55E]">
              +18%
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ECFDF5]"
            >
              <TreePine class="h-3.5 w-3.5 text-[#059669]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ currentImpact.trees }}
            </p>

            <p class="mt-0.5 text-[7px] leading-3 text-[#718078]">
              Pohon<br />
              Ditanam
            </p>

            <p class="mt-1 text-[7px] font-semibold text-[#22C55E]">
              +8%
            </p>
          </div>

        </section>

        <!-- Impact Trend -->
        <section
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-[11px] font-bold text-[#17211B]">
                Tren Dampakmu
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Aktivitas dampak selama periode ini
              </p>
            </div>

            <div
              class="flex items-center gap-1 text-[8px] font-semibold text-[#22C55E]"
            >
              <TrendingUp class="h-3 w-3" />
              +12%
            </div>
          </div>

          <!-- Chart -->
          <div class="mt-4">

            <div class="flex h-[125px] items-end gap-2">

              <div
                v-for="item in trendData"
                :key="item.label"
                class="flex h-full flex-1 flex-col items-center justify-end"
              >

                <div
                  class="flex w-full flex-1 items-end justify-center"
                >
                  <div
                    class="w-[65%] rounded-t-md bg-[#22C55E]"
                    :style="{
                      height: `${item.value}%`
                    }"
                  ></div>
                </div>

                <span class="mt-2 text-[7px] text-[#98A39C]">
                  {{ item.label }}
                </span>

              </div>

            </div>

          </div>
        </section>

        <!-- Impact by Category -->
        <section
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3"
        >

          <div class="mb-4">
            <h2 class="text-[11px] font-bold text-[#17211B]">
              Dampak berdasarkan Kategori
            </h2>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              Kontribusi aksi eco yang kamu lakukan
            </p>
          </div>

          <div class="space-y-3">

            <div
              v-for="category in categories"
              :key="category.name"
            >

              <div class="mb-1 flex items-center justify-between">

                <div class="flex items-center gap-2">

                  <div
                    class="flex h-6 w-6 items-center justify-center rounded-lg"
                    :class="category.bg"
                  >
                    <component
                      :is="category.icon"
                      class="h-3 w-3"
                      :class="category.color"
                    />
                  </div>

                  <span class="text-[8px] font-medium text-[#17211B]">
                    {{ category.name }}
                  </span>

                </div>

                <span class="text-[8px] font-semibold text-[#718078]">
                  {{ category.value }}%
                </span>

              </div>

              <div class="h-[5px] rounded-full bg-[#E8EFEA]">
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{
                    width: `${category.value}%`
                  }"
                ></div>
              </div>

            </div>

          </div>
        </section>

        <!-- Total Impact -->
        <section
          class="rounded-[14px] border border-[#BBF7D0] bg-[#ECFDF5] p-3"
        >
          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white"
            >
              <Leaf class="h-5 w-5 text-[#22C55E]" />
            </div>

            <div>
              <p class="text-[8px] text-[#15803D]">
                Total kontribusi
              </p>

              <p class="mt-0.5 text-[14px] font-bold text-[#14532D]">
                {{ totalImpact }} Eco Actions
              </p>

              <p class="mt-0.5 text-[7px] text-[#4D7C5A]">
                Terus lakukan aksi kecil untuk dampak yang lebih besar.
              </p>
            </div>

          </div>
        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1400px] px-6 pb-10">

          <!-- Header -->
          <section class="mb-7 flex items-end justify-between">

            <div>
              <p class="mb-1 text-sm font-medium text-[#22C55E]">
                Environmental Impact
              </p>

              <h1 class="text-[28px] font-bold text-[#17211B]">
                Dampakmu
              </h1>

              <p class="mt-1 text-sm text-[#66736A]">
                Lihat seberapa besar kontribusi positif yang telah kamu buat.
              </p>
            </div>

            <!-- Period -->
            <div
              class="flex rounded-xl border border-[#E8EDE9] bg-white p-1"
            >
              <button
                v-for="period in periods"
                :key="period.value"
                type="button"
                class="rounded-lg px-5 py-2 text-xs font-medium"
                :class="
                  selectedPeriod === period.value
                    ? 'bg-[#22C55E] text-white'
                    : 'text-[#66736A]'
                "
                @click="selectedPeriod = period.value"
              >
                {{ period.label }}
              </button>
            </div>

          </section>

          <!-- Stats -->
          <section class="mb-5 grid grid-cols-3 gap-5">

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8ED]"
                >
                  <Recycle class="h-5 w-5 text-[#22C55E]" />
                </div>

                <span class="text-[10px] font-semibold text-[#22C55E]">
                  +12%
                </span>

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                Plastik Dikurangi
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                {{ currentImpact.plastic }}
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                item plastik
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]"
                >
                  <Cloud class="h-5 w-5 text-[#3B82F6]" />
                </div>

                <span class="text-[10px] font-semibold text-[#22C55E]">
                  +18%
                </span>

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                CO₂ Dikurangi
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                {{ currentImpact.co2 }}
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                kg CO₂e
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF5]"
                >
                  <TreePine class="h-5 w-5 text-[#059669]" />
                </div>

                <span class="text-[10px] font-semibold text-[#22C55E]">
                  +8%
                </span>

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                Pohon Ditanam
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                {{ currentImpact.trees }}
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                pohon
              </p>
            </div>

          </section>

          <!-- Charts -->
          <section class="grid grid-cols-[1.4fr_1fr] gap-5">

            <!-- Trend -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-6"
            >

              <div class="flex items-center justify-between">

                <div>
                  <h2 class="text-sm font-bold text-[#17211B]">
                    Tren Dampakmu
                  </h2>

                  <p class="mt-1 text-xs text-[#98A39C]">
                    Perkembangan dampak berdasarkan periode
                  </p>
                </div>

                <div class="flex items-center gap-1 text-xs font-semibold text-[#22C55E]">
                  <TrendingUp class="h-4 w-4" />
                  +12%
                </div>

              </div>

              <div class="mt-7 flex h-[230px] items-end gap-5">

                <div
                  v-for="item in trendData"
                  :key="item.label"
                  class="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <div class="flex w-full flex-1 items-end justify-center">
                    <div
                      class="w-[55%] rounded-t-lg bg-[#22C55E]"
                      :style="{
                        height: `${item.value}%`
                      }"
                    ></div>
                  </div>

                  <span class="mt-3 text-[10px] text-[#98A39C]">
                    {{ item.label }}
                  </span>

                </div>

              </div>

            </div>

            <!-- Category -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-6"
            >

              <h2 class="text-sm font-bold text-[#17211B]">
                Dampak berdasarkan Kategori
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                Distribusi kontribusi eco action
              </p>

              <div class="mt-6 space-y-5">

                <div
                  v-for="category in categories"
                  :key="category.name"
                >

                  <div class="mb-2 flex items-center justify-between">

                    <div class="flex items-center gap-2">

                      <component
                        :is="category.icon"
                        class="h-4 w-4"
                        :class="category.color"
                      />

                      <span class="text-xs font-medium text-[#17211B]">
                        {{ category.name }}
                      </span>

                    </div>

                    <span class="text-xs font-semibold text-[#718078]">
                      {{ category.value }}%
                    </span>

                  </div>

                  <div class="h-1.5 rounded-full bg-[#E8EFEA]">
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{
                        width: `${category.value}%`
                      }"
                    ></div>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>
      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Leaf,
  Bell,
  Recycle,
  Cloud,
  TreePine,
  TrendingUp,
  Bike,
  Droplets,
  Zap,
  Globe2
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

const selectedPeriod = ref('week')

const periods = [
  {
    label: 'Minggu Ini',
    value: 'week'
  },
  {
    label: 'Bulan Ini',
    value: 'month'
  }
]

const impactData = {
  week: {
    plastic: 18,
    co2: 24,
    trees: 3
  },

  month: {
    plastic: 64,
    co2: 86,
    trees: 9
  }
}

const currentImpact = computed(() => {
  return impactData[selectedPeriod.value]
})

const trendData = computed(() => {
  if (selectedPeriod.value === 'month') {
    return [
      {
        label: 'M1',
        value: 35
      },
      {
        label: 'M2',
        value: 48
      },
      {
        label: 'M3',
        value: 62
      },
      {
        label: 'M4',
        value: 78
      }
    ]
  }

  return [
    {
      label: 'Sen',
      value: 35
    },
    {
      label: 'Sel',
      value: 48
    },
    {
      label: 'Rab',
      value: 42
    },
    {
      label: 'Kam',
      value: 65
    },
    {
      label: 'Jum',
      value: 55
    },
    {
      label: 'Sab',
      value: 82
    },
    {
      label: 'Min',
      value: 68
    }
  ]
})

const categories = [
  {
    name: 'Transportasi',
    value: 30,
    icon: Bike,
    color: 'text-[#3B82F6]',
    bg: 'bg-[#EAF4FF]'
  },
  {
    name: 'Plastik',
    value: 25,
    icon: Recycle,
    color: 'text-[#22C55E]',
    bg: 'bg-[#E8F8ED]'
  },
  {
    name: 'Energi',
    value: 20,
    icon: Zap,
    color: 'text-[#CA8A04]',
    bg: 'bg-[#FFF8D8]'
  },
  {
    name: 'Air',
    value: 15,
    icon: Droplets,
    color: 'text-[#0284C7]',
    bg: 'bg-[#E8F6FF]'
  },
  {
    name: 'Lainnya',
    value: 10,
    icon: Globe2,
    color: 'text-[#059669]',
    bg: 'bg-[#ECFDF5]'
  }
]

const totalImpact = computed(() => {
  return 47
})
</script>