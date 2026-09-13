<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main
        class="mx-auto max-w-[430px] px-4 pb-24 md:hidden"
      >

        <!-- Header -->
        <MobileHeader />

        <!-- Greeting -->
        <section class="mb-3">
          <h1 class="text-[17px] font-bold text-[#17211B]">
            Selamat pagi, {{ currentUser.name }}! 👋
          </h1>

          <p class="mt-0.5 text-[10px] text-[#718078]">
            Saatnya lanjutkan langkah baik hari ini.
          </p>
        </section>

        <!-- Level Card -->
        <section
          class="mb-3 rounded-[14px] border border-[#DCEBE0] bg-white p-3"
        >
          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
            >
              <Leaf class="h-5 w-5 text-[#22C55E]" />
            </div>

            <div class="min-w-0 flex-1">

              <div class="flex items-center justify-between">

                <div>
                  <p class="text-[12px] font-bold text-[#17211B]">
                    Level {{ currentUser.level }}
                  </p>

                  <p class="text-[9px] text-[#718078]">
                    {{ currentUser.levelName || 'Eco Explorer' }}
                  </p>
                </div>

                <span class="text-[9px] font-medium text-[#718078]">
                  {{ currentUser.xp ?? 1240 }} /
                  {{ currentUser.nextLevelXp ?? 1600 }} XP
                </span>

              </div>

              <div
                class="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{ width: `${levelProgress}%` }"
                ></div>
              </div>

            </div>

          </div>
        </section>

        <!-- Quick Stats -->
        <section
          class="mb-4 grid grid-cols-3 overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white"
        >

          <!-- Streak -->
          <div class="px-2 py-3 text-center">

            <Flame class="mx-auto h-4 w-4 text-[#F97316]" />

            <p class="mt-1 text-[12px] font-bold text-[#17211B]">
              {{ currentUser.streak ?? 7 }}
            </p>

            <p class="text-[8px] text-[#718078]">
              Streak
            </p>

          </div>

          <!-- Eco Actions -->
          <div
            class="border-x border-[#E8EFEA] px-2 py-3 text-center"
          >

            <Leaf class="mx-auto h-4 w-4 text-[#22C55E]" />

            <p class="mt-1 text-[12px] font-bold text-[#17211B]">
              {{ ecoActions }}
            </p>

            <p class="text-[8px] text-[#718078]">
              Eco Actions
            </p>

          </div>

          <!-- Low Carbon -->
          <div class="px-2 py-3 text-center">

            <Bike class="mx-auto h-4 w-4 text-[#22C55E]" />

            <p class="mt-1 text-[12px] font-bold text-[#17211B]">
              {{ lowCarbonDistance }}
            </p>

            <p class="text-[8px] text-[#718078]">
              Low Carbon
            </p>

          </div>

        </section>

        <!-- Next Quest Header -->
        <div class="mb-2 flex items-center justify-between">

          <h2 class="text-[12px] font-bold text-[#17211B]">
            Quest Berikutnya
          </h2>

          <RouterLink
            to="/missions"
            class="text-[9px] font-medium text-[#22C55E]"
          >
            Lihat Semua
          </RouterLink>

        </div>

        <!-- Next Quest -->
        <section
          v-if="nextQuest"
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3"
        >

          <div class="flex gap-3">

            <!-- Mission Icon -->
            <div
              class="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
            >
              <Recycle class="h-6 w-6 text-[#22C55E]" />
            </div>

            <!-- Mission Content -->
            <div class="min-w-0 flex-1">

              <div
                class="flex items-start justify-between gap-2"
              >

                <div class="min-w-0">

                  <h3
                    class="truncate text-[11px] font-bold text-[#17211B]"
                  >
                    {{ nextQuest.title || 'Kurangi Plastik' }}
                  </h3>

                  <p
                    class="mt-0.5 text-[8px] leading-3 text-[#718078]"
                  >
                    {{
                      nextQuest.description ||
                      'Gunakan botol minum reusable selama 3 hari.'
                    }}
                  </p>

                </div>

                <span
                  class="shrink-0 text-[9px] font-semibold text-[#22C55E]"
                >
                  +{{ nextQuest.xp ?? 75 }} XP
                </span>

              </div>

              <div
                class="mt-2 flex items-center justify-between"
              >

                <span class="text-[8px] text-[#718078]">
                  {{ nextQuest.step || 'Hari ke-2 dari 3' }}
                </span>

                <span
                  class="text-[8px] font-semibold text-[#22C55E]"
                >
                  {{ questProgress }}%
                </span>

              </div>

              <div
                class="mt-1 h-[4px] overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{ width: `${questProgress}%` }"
                ></div>
              </div>

            </div>

          </div>

          <RouterLink
            :to="nextQuest.link || '/missions'"
            class="mt-3 flex h-8 items-center justify-center rounded-lg bg-[#22C55E] text-[9px] font-semibold text-white transition active:scale-[0.98]"
          >
            Lanjutkan
          </RouterLink>

        </section>

        <!-- Habit -->
        <section
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3"
        >

          <div class="flex items-center justify-between">

            <div>

              <h2 class="text-[12px] font-bold text-[#17211B]">
                Progress Kebiasaan
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Konsistensi eco-mu minggu ini
              </p>

            </div>

            <span
              class="text-[11px] font-bold text-[#22C55E]"
            >
              {{ questProgress }}%
            </span>

          </div>

          <div
            class="mt-3 flex items-end justify-between"
          >

            <div>

              <p class="text-[10px] font-semibold text-[#17211B]">
                Kurangi Plastik
              </p>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Terus pertahankan kebiasaan baikmu.
              </p>

            </div>

            <TrendingUp
              class="h-4 w-4 text-[#22C55E]"
            />

          </div>

          <div
            class="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]"
          >
            <div
              class="h-full rounded-full bg-[#22C55E]"
              :style="{ width: `${questProgress}%` }"
            ></div>
          </div>

        </section>

        <!-- Impact Header -->
        <div class="mb-2 flex items-center justify-between">

          <h2 class="text-[12px] font-bold text-[#17211B]">
            Dampakmu
          </h2>

          <RouterLink
            to="/impact"
            class="text-[9px] font-medium text-[#22C55E]"
          >
            Lihat Semua
          </RouterLink>

        </div>

        <!-- Impact -->
        <section class="grid grid-cols-3 gap-2">

          <!-- CO2 -->
          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >

            <Cloud class="h-4 w-4 text-[#22C55E]" />

            <p
              class="mt-2 text-[13px] font-bold text-[#17211B]"
            >
              {{ impact.co2Saved ?? 18 }}
            </p>

            <p class="text-[8px] text-[#718078]">
              CO₂ Dihemat
            </p>

          </div>

          <!-- Recycled -->
          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >

            <Recycle class="h-4 w-4 text-[#22C55E]" />

            <p
              class="mt-2 text-[13px] font-bold text-[#17211B]"
            >
              {{ impact.wasteRecycled ?? 24 }}
            </p>

            <p class="text-[8px] text-[#718078]">
              Item Didaur Ulang
            </p>

          </div>

          <!-- Trees -->
          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
          >

            <TreePine class="h-4 w-4 text-[#22C55E]" />

            <p
              class="mt-2 text-[13px] font-bold text-[#17211B]"
            >
              {{ impact.treesEquivalent ?? 3 }}
            </p>

            <p class="text-[8px] text-[#718078]">
              Setara Pohon
            </p>

          </div>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-[1400px] px-6 pb-8">

          <!-- Desktop Header -->
          <section
            class="mb-7 flex items-end justify-between"
          >

            <div>

              <p
                class="mb-1 text-sm font-medium text-[#22C55E]"
              >
                {{ formattedDate }}
              </p>

              <h1
                class="text-[28px] font-bold text-[#17211B]"
              >
                Selamat pagi, {{ currentUser.name }}! 👋
              </h1>

              <p class="mt-1 text-sm text-[#66736A]">
                Siap membuat dampak positif hari ini?
              </p>

            </div>

            <RouterLink
              to="/eco-action"
              class="flex h-10 items-center gap-2 rounded-xl bg-[#22C55E] px-4 text-sm font-semibold text-white transition hover:bg-[#15803D]"
            >
              <Plus class="h-4 w-4" />
              Catat Aksi Eco
            </RouterLink>

          </section>

          <!-- Desktop Stats -->
          <div class="grid grid-cols-3 gap-5">

            <!-- Level -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >

              <Sparkles class="h-5 w-5 text-[#9333EA]" />

              <p class="mt-4 text-xs text-[#66736A]">
                Level Saat Ini
              </p>

              <p
                class="mt-1 text-2xl font-bold text-[#17211B]"
              >
                {{ currentUser.level }}
              </p>

            </div>

            <!-- XP -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >

              <Zap class="h-5 w-5 text-[#CA8A04]" />

              <p class="mt-4 text-xs text-[#66736A]">
                Total XP
              </p>

              <p
                class="mt-1 text-2xl font-bold text-[#17211B]"
              >
                {{ currentUser.xp ?? 1240 }}
              </p>

            </div>

            <!-- Streak -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >

              <Flame class="h-5 w-5 text-[#EA580C]" />

              <p class="mt-4 text-xs text-[#66736A]">
                Streak Saat Ini
              </p>

              <p
                class="mt-1 text-2xl font-bold text-[#17211B]"
              >
                {{ currentUser.streak ?? 7 }} hari
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Bike,
  Cloud,
  Flame,
  Leaf,
  Plus,
  Recycle,
  Sparkles,
  TrendingUp,
  TreePine,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  user,
  missions,
  impact
} from '../data/mockData'

const currentUser = ref({
  ...user
})

const missionList = ref(
  missions.map((mission) => ({
    ...mission
  }))
)

const nextQuest = computed(() => {
  return (
    missionList.value.find(
      (mission) => !mission.completed
    ) ||
    missionList.value[0] ||
    null
  )
})

const questProgress = computed(() => {
  if (!nextQuest.value) {
    return 0
  }

  if (
    typeof nextQuest.value.progress === 'number'
  ) {
    return Math.min(
      Math.max(nextQuest.value.progress, 0),
      100
    )
  }

  return 67
})

const levelProgress = computed(() => {
  const xp = Number(currentUser.value.xp ?? 1240)
  const nextLevelXp = Number(
    currentUser.value.nextLevelXp ?? 1600
  )

  if (nextLevelXp <= 0) {
    return 0
  }

  return Math.min(
    Math.round((xp / nextLevelXp) * 100),
    100
  )
})

const ecoActions = computed(() => {
  return currentUser.value.ecoActions ?? 12
})

const lowCarbonDistance = computed(() => {
  return currentUser.value.lowCarbonDistance ?? 24
})

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())
})
</script>