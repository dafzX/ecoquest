<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
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
        <section
          class="relative overflow-hidden rounded-2xl bg-[#15803D] p-5 text-white"
        >
          <div
            class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"
          ></div>

          <div
            class="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-white/5"
          ></div>

          <div class="relative">

            <div class="flex items-center justify-between">
              <div>
                <p class="text-[9px] font-medium text-white/70">
                  Total Impact
                </p>

                <div class="mt-1 flex items-end gap-2">
                  <span class="text-[28px] font-bold leading-none">
                    {{ totalImpact.toLocaleString() }}
                  </span>

                  <span class="mb-0.5 text-[9px] text-white/70">
                    points
                  </span>
                </div>

                <p class="mt-1 text-[8px] text-white/70">
                  Total kontribusi positifmu untuk lingkungan.
                </p>
              </div>

              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15"
              >
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

              <div
                class="h-1.5 overflow-hidden rounded-full bg-white/15"
              >
                <div
                  class="h-full rounded-full bg-white transition-all"
                  :style="{ width: `${monthlyProgress}%` }"
                ></div>
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
              class="rounded-xl border border-[#DCEBE0] bg-white p-3"
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

        <!-- Monthly Goal -->
        <section
          class="mt-5 rounded-xl border border-[#DCEBE0] bg-white p-4"
        >
          <div class="flex items-center justify-between">

            <div>
              <p
                class="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8A958E]"
              >
                Monthly Goal
              </p>

              <h2 class="mt-1 text-[13px] font-bold text-[#17211B]">
                Green September
              </h2>
            </div>

            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF8EE]"
            >
              <Target class="h-4 w-4 text-[#15803D]" />
            </div>

          </div>

          <div class="mt-4">

            <div class="mb-1.5 flex items-center justify-between">
              <span class="text-[8px] text-[#66736A]">
                {{ monthlyCurrent }} / {{ monthlyTarget }} points
              </span>

              <span class="text-[8px] font-bold text-[#15803D]">
                {{ monthlyProgress }}%
              </span>
            </div>

            <div
              class="h-1.5 overflow-hidden rounded-full bg-[#EAF0EC]"
            >
              <div
                class="h-full rounded-full bg-[#22C55E]"
                :style="{ width: `${monthlyProgress}%` }"
              ></div>
            </div>

            <p class="mt-2 text-[8px] leading-3.5 text-[#8A958E]">
              Tinggal {{ monthlyTarget - monthlyCurrent }} points lagi
              untuk mencapai target bulan ini.
            </p>

          </div>
        </section>

        <!-- Impact Breakdown -->
        <section class="mt-5">

          <div class="mb-3">
            <h2 class="text-[12px] font-bold text-[#17211B]">
              Impact Breakdown
            </h2>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              Distribusi kontribusi dari berbagai eco action.
            </p>
          </div>

          <div class="space-y-2">

            <article
              v-for="item in breakdown"
              :key="item.label"
              class="rounded-xl border border-[#DCEBE0] bg-white p-3"
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
                    <p
                      class="truncate text-[9px] font-semibold text-[#17211B]"
                    >
                      {{ item.label }}
                    </p>

                    <span
                      class="shrink-0 text-[9px] font-bold text-[#17211B]"
                    >
                      {{ item.value }}
                    </span>
                  </div>

                  <div
                    class="mt-1.5 h-1 overflow-hidden rounded-full bg-[#EEF3EF]"
                  >
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

        <!-- Recent Actions -->
        <section class="mt-5">

          <div class="mb-3 flex items-end justify-between">

            <div>
              <h2 class="text-[12px] font-bold text-[#17211B]">
                Eco Actions Terbaru
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Aktivitas yang memberikan impact.
              </p>
            </div>

            <button
              type="button"
              class="text-[8px] font-semibold text-[#15803D]"
              @click="showAllActions = !showAllActions"
            >
              {{ showAllActions ? 'Tutup' : 'Lihat semua' }}
            </button>

          </div>

          <div class="space-y-2">

            <article
              v-for="action in visibleActions"
              :key="action.id"
              class="flex items-center gap-3 rounded-xl border border-[#DCEBE0] bg-white p-3"
            >

              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                :class="action.bg"
              >
                <component
                  :is="action.icon"
                  class="h-4 w-4"
                  :class="action.iconColor"
                />
              </div>

              <div class="min-w-0 flex-1">

                <p
                  class="truncate text-[9px] font-semibold text-[#17211B]"
                >
                  {{ action.title }}
                </p>

                <p class="mt-0.5 text-[7px] text-[#8A958E]">
                  {{ action.date }}
                </p>

              </div>

              <div class="shrink-0 text-right">
                <p class="text-[9px] font-bold text-[#15803D]">
                  +{{ action.points }}
                </p>

                <p class="text-[7px] text-[#A3ADA7]">
                  Impact
                </p>
              </div>

            </article>

          </div>
        </section>

        <!-- Motivation -->
        <section
          class="mt-5 rounded-xl border border-[#DDEFE2] bg-[#EAF8EE] p-4"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-white"
          >
            <Sprout class="h-4 w-4 text-[#15803D]" />
          </div>

          <h3 class="mt-3 text-[11px] font-bold text-[#17211B]">
            Small actions matter 🌱
          </h3>

          <p class="mt-1 text-[8px] leading-3.5 text-[#66736A]">
            Konsistensi kecil setiap hari bisa menciptakan perubahan
            besar untuk lingkungan.
          </p>
        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-[1100px] px-6 pb-10">

          <!-- Header -->
          <header class="mb-6 flex items-center gap-3 pt-2">

            <RouterLink
              to="/dashboard"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
            >
              <ArrowLeft class="h-5 w-5" />
            </RouterLink>

            <div>
              <h1 class="text-[24px] font-bold text-[#17211B]">
                My Impact
              </h1>

              <p class="mt-1 text-sm text-[#718078]">
                Lihat bagaimana aksi kecilmu memberikan dampak untuk bumi.
              </p>
            </div>

          </header>

          <!-- Main Grid -->
          <div class="grid grid-cols-[1.35fr_0.65fr] gap-5">

            <!-- Main Column -->
            <div class="space-y-5">

              <!-- Hero -->
              <section
                class="relative overflow-hidden rounded-2xl bg-[#15803D] p-6 text-white"
              >
                <div
                  class="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/10"
                ></div>

                <div
                  class="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5"
                ></div>

                <div class="relative">

                  <div class="flex items-start justify-between">

                    <div>
                      <p class="text-xs font-medium text-white/70">
                        Total Impact Points
                      </p>

                      <div class="mt-2 flex items-end gap-3">
                        <span class="text-[48px] font-bold leading-none">
                          {{ totalImpact.toLocaleString() }}
                        </span>

                        <span class="mb-1.5 text-xs text-white/70">
                          points
                        </span>
                      </div>

                      <p class="mt-3 max-w-md text-xs leading-5 text-white/70">
                        Setiap eco action yang kamu lakukan memberikan
                        kontribusi positif untuk lingkungan.
                      </p>
                    </div>

                    <div
                      class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10"
                    >
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

                    <div
                      class="h-2 overflow-hidden rounded-full bg-white/15"
                    >
                      <div
                        class="h-full rounded-full bg-white"
                        :style="{ width: `${monthlyProgress}%` }"
                      ></div>
                    </div>

                    <p class="mt-2 text-[10px] text-white/60">
                      {{ monthlyCurrent }} /
                      {{ monthlyTarget }} impact points
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
                    class="rounded-2xl border border-[#E8EDE9] bg-white p-4"
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
              <section
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >

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

                      <div
                        class="h-1.5 overflow-hidden rounded-full bg-[#EEF3EF]"
                      >
                        <div
                          class="h-full rounded-full bg-[#22C55E]"
                          :style="{ width: `${item.progress}%` }"
                        ></div>
                      </div>

                    </div>

                  </div>

                </div>

              </section>

            </div>

            <!-- Side Column -->
            <div class="space-y-5">

              <!-- Monthly Goal -->
              <section
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >

                <div class="flex items-start justify-between">

                  <div>
                    <p
                      class="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8A958E]"
                    >
                      Monthly Goal
                    </p>

                    <h2 class="mt-1 text-base font-bold text-[#17211B]">
                      Green September
                    </h2>
                  </div>

                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
                  >
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

                  <div
                    class="h-2 overflow-hidden rounded-full bg-[#EAF0EC]"
                  >
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{ width: `${monthlyProgress}%` }"
                    ></div>
                  </div>

                  <p class="mt-3 text-[10px] leading-4 text-[#8A958E]">
                    {{ monthlyTarget - monthlyCurrent }} points lagi
                    untuk mencapai target.
                  </p>

                </div>

              </section>

              <!-- Recent Actions -->
              <section
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >

                <div class="mb-4 flex items-center justify-between">

                  <div>
                    <h2 class="text-base font-bold text-[#17211B]">
                      Eco Actions
                    </h2>

                    <p class="mt-1 text-[10px] text-[#8A958E]">
                      Aktivitas terbarumu
                    </p>
                  </div>

                  <Activity class="h-5 w-5 text-[#15803D]" />

                </div>

                <div class="space-y-4">

                  <div
                    v-for="action in actions.slice(0, 4)"
                    :key="action.id"
                    class="flex items-center gap-3"
                  >

                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      :class="action.bg"
                    >
                      <component
                        :is="action.icon"
                        class="h-4 w-4"
                        :class="action.iconColor"
                      />
                    </div>

                    <div class="min-w-0 flex-1">

                      <p
                        class="truncate text-[10px] font-semibold text-[#17211B]"
                      >
                        {{ action.title }}
                      </p>

                      <p class="mt-0.5 text-[9px] text-[#9AA49E]">
                        {{ action.date }}
                      </p>

                    </div>

                    <span class="text-[10px] font-bold text-[#15803D]">
                      +{{ action.points }}
                    </span>

                  </div>

                </div>

              </section>

              <!-- Motivation -->
              <section
                class="rounded-2xl border border-[#DDEFE2] bg-[#EAF8EE] p-5"
              >

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-white"
                >
                  <Sprout class="h-5 w-5 text-[#15803D]" />
                </div>

                <h3 class="mt-4 text-sm font-bold text-[#17211B]">
                  Small actions matter 🌱
                </h3>

                <p class="mt-2 text-[10px] leading-4 text-[#66736A]">
                  Konsistensi kecil setiap hari bisa menciptakan perubahan
                  besar untuk lingkungan.
                </p>

              </section>

            </div>

          </div>

        </div>

      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  Activity,
  ArrowLeft,
  Bike,
  Droplets,
  Leaf,
  MoreHorizontal,
  Recycle,
  Sprout,
  Target,
  TreePine,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const totalImpact = 1248

const monthlyCurrent = 340
const monthlyTarget = 500

const monthlyProgress = computed(() => {
  return Math.min(
    100,
    Math.round((monthlyCurrent / monthlyTarget) * 100)
  )
})

const impactStats = [
  {
    label: 'CO₂ Reduced',
    value: '42.8 kg',
    icon: Leaf,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },
  {
    label: 'Waste Reduced',
    value: '8.4 kg',
    icon: Recycle,
    bg: 'bg-[#EEF8F0]',
    iconColor: 'text-[#16A34A]'
  },
  {
    label: 'Water Saved',
    value: '120 L',
    icon: Droplets,
    bg: 'bg-[#EAF3FF]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    label: 'Green Distance',
    value: '32 km',
    icon: Bike,
    bg: 'bg-[#FFF5E8]',
    iconColor: 'text-[#F59E0B]'
  }
]

const breakdown = [
  {
    label: 'Hemat energi',
    value: '32%',
    progress: 32,
    icon: Zap,
    bg: 'bg-[#FFF7D6]',
    iconColor: 'text-[#CA8A04]'
  },
  {
    label: 'Recycle',
    value: '26%',
    progress: 26,
    icon: Recycle,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },
  {
    label: 'Transportasi hijau',
    value: '22%',
    progress: 22,
    icon: Bike,
    bg: 'bg-[#EAF3FF]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    label: 'Menanam',
    value: '20%',
    progress: 20,
    icon: TreePine,
    bg: 'bg-[#EEF8F0]',
    iconColor: 'text-[#16A34A]'
  }
]

const actions = [
  {
    id: 1,
    title: 'Recycle plastik',
    date: 'Hari ini',
    points: 50,
    icon: Recycle,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },
  {
    id: 2,
    title: 'Bike to campus',
    date: 'Kemarin',
    points: 35,
    icon: Bike,
    bg: 'bg-[#EAF3FF]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    id: 3,
    title: 'Hemat penggunaan listrik',
    date: '10 Sep 2026',
    points: 40,
    icon: Zap,
    bg: 'bg-[#FFF7D6]',
    iconColor: 'text-[#CA8A04]'
  },
  {
    id: 4,
    title: 'Menanam pohon',
    date: '9 Sep 2026',
    points: 100,
    icon: TreePine,
    bg: 'bg-[#EEF8F0]',
    iconColor: 'text-[#16A34A]'
  },
  {
    id: 5,
    title: 'Gunakan transportasi umum',
    date: '8 Sep 2026',
    points: 45,
    icon: Leaf,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },
  {
    id: 6,
    title: 'Kurangi penggunaan plastik',
    date: '7 Sep 2026',
    points: 30,
    icon: Sprout,
    bg: 'bg-[#F0FDF4]',
    iconColor: 'text-[#16A34A]'
  }
]

const showAllActions = ref(false)

const visibleActions = computed(() => {
  return showAllActions.value
    ? actions
    : actions.slice(0, 4)
})
</script>