<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Missions
        </h1>
        <p class="mt-1 text-sm text-[#66736A]">
          Complete eco missions and earn XP
        </p>
      </div>

      <!-- Summary -->
      <section class="mb-8 grid grid-cols-3 gap-5">
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Daily Missions
              </p>
              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                {{ dailyCount }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <ListChecks class="h-5 w-5 text-[#22C55E]" />
            </div>
          </div>

          <div class="mt-4 flex items-center gap-2">
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EAF0EB]">
              <div
                class="h-full rounded-full bg-[#22C55E]"
                :style="{ width: `${dailyProgress}%` }"
              ></div>
            </div>

            <span class="text-xs font-medium text-[#66736A]">
              {{ completedToday }}/{{ dailyCount }}
            </span>
          </div>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Weekly Missions
              </p>
              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                8
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <CalendarDays class="h-5 w-5 text-[#3B82F6]" />
            </div>
          </div>

          <p class="mt-4 text-xs text-[#98A39C]">
            Keep completing missions throughout the week
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Completed
              </p>
              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                12
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E8FF]">
              <CircleCheck class="h-5 w-5 text-[#9333EA]" />
            </div>
          </div>

          <p class="mt-4 text-xs text-[#98A39C]">
            Missions completed all time
          </p>
        </div>
      </section>

      <!-- Tabs -->
      <div class="mb-6 border-b border-[#E8EDE9]">
        <div class="flex items-center gap-7">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            @click="activeTab = tab.id"
            class="relative pb-3 text-sm font-medium transition"
            :class="
              activeTab === tab.id
                ? 'text-[#15803D]'
                : 'text-[#98A39C] hover:text-[#66736A]'
            "
          >
            {{ tab.label }}

            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#22C55E]"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mission Header -->
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-[#17211B]">
            {{ currentTitle }}
          </h2>
          <p class="mt-1 text-xs text-[#98A39C]">
            {{ filteredMissions.length }} missions
          </p>
        </div>

        <div class="flex items-center gap-2 rounded-full bg-[#EAF8EE] px-3 py-1.5">
          <Zap class="h-3.5 w-3.5 text-[#22C55E]" />
          <span class="text-xs font-semibold text-[#15803D]">
            Earn XP by completing missions
          </span>
        </div>
      </div>

      <!-- Mission List -->
      <div class="space-y-4">
        <MissionCard
          v-for="mission in filteredMissions"
          :key="mission.id"
          :mission="mission"
          @complete="completeMission"
        />

        <div
          v-if="filteredMissions.length === 0"
          class="rounded-2xl border border-dashed border-[#DDE5DF] bg-white px-6 py-16 text-center"
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF8EE]">
            <CircleCheck class="h-6 w-6 text-[#22C55E]" />
          </div>

          <h3 class="mt-4 text-base font-semibold text-[#17211B]">
            No missions here
          </h3>

          <p class="mt-1 text-sm text-[#98A39C]">
            Check another category to find more missions.
          </p>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  CalendarDays,
  CircleCheck,
  ListChecks,
  Zap
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import MissionCard from '../components/cards/MissionCard.vue'
import { missions } from '../data/mockData.js'

const activeTab = ref('daily')

const missionList = ref(
  missions.map((mission) => ({
    ...mission
  }))
)

const tabs = [
  {
    id: 'daily',
    label: 'Daily'
  },
  {
    id: 'weekly',
    label: 'Weekly'
  },
  {
    id: 'completed',
    label: 'Completed'
  }
]

const dailyCount = computed(() => missionList.value.length)

const completedToday = computed(() => {
  return missionList.value.filter((mission) => mission.completed).length
})

const dailyProgress = computed(() => {
  if (!dailyCount.value) return 0

  return Math.round(
    (completedToday.value / dailyCount.value) * 100
  )
})

const filteredMissions = computed(() => {
  if (activeTab.value === 'completed') {
    return missionList.value.filter((mission) => mission.completed)
  }

  if (activeTab.value === 'weekly') {
    return missionList.value
  }

  return missionList.value.filter((mission) => !mission.completed)
})

const currentTitle = computed(() => {
  if (activeTab.value === 'weekly') {
    return 'Weekly Missions'
  }

  if (activeTab.value === 'completed') {
    return 'Completed Missions'
  }

  return "Today's Missions"
})

function completeMission(id) {
  const mission = missionList.value.find(
    (item) => item.id === id
  )

  if (!mission || mission.completed) return

  mission.completed = true
}
</script>