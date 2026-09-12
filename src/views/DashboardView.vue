<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px] px-4 md:px-0">

      <!-- Mobile -->
      <section class="relative mb-6 overflow-hidden rounded-3xl bg-[#EAF8EE] p-5 md:hidden">
        <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4F3DD]"></div>
        <div class="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[#D4F3DD]"></div>

        <div class="relative">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-medium text-[#15803D]">
                Saturday, September 12, 2026
              </p>

              <h1 class="mt-2 text-[25px] font-bold leading-tight tracking-tight text-[#17211B]">
                Good morning,<br />
                {{ currentUser.name }}! 👋
              </h1>

              <p class="mt-2 max-w-[250px] text-sm leading-5 text-[#66736A]">
                Ready to make a positive impact today?
              </p>
            </div>

            <button
              type="button"
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-[#15803D] shadow-sm"
            >
              {{ currentUser.avatar }}
            </button>
          </div>
        </div>
      </section>

      <!-- Desktop -->
      <section class="mb-7 hidden items-end justify-between md:flex">
        <div>
          <p class="mb-1 text-sm font-medium text-[#22C55E]">
            Saturday, September 12, 2026
          </p>

          <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
            Good morning, {{ currentUser.name }}! 👋
          </h1>

          <p class="mt-1.5 text-sm text-[#66736A]">
            Ready to make a positive impact today?
          </p>
        </div>

        <RouterLink
          to="/missions"
          class="flex h-10 items-center gap-2 rounded-xl bg-[#22C55E] px-4 text-sm font-semibold text-white transition hover:bg-[#16A34A]"
        >
          <Plus class="h-4 w-4" />
          New Eco Action
        </RouterLink>
      </section>

      <!-- Mobile -->
      <section
        class="mb-6 flex items-center justify-between rounded-2xl bg-[#15803D] p-4 md:hidden"
      >
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Leaf class="h-6 w-6 text-white" />
          </div>

          <div class="min-w-0">
            <h2 class="text-sm font-bold text-white">
              Small actions, big impact.
            </h2>

            <p class="mt-0.5 text-xs leading-4 text-white/75">
              Make your everyday actions count.
            </p>
          </div>
        </div>

        <RouterLink
          to="/missions"
          class="ml-3 flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#15803D]"
        >
          Missions
          <ArrowRight class="h-3.5 w-3.5" />
        </RouterLink>
      </section>

      <!-- Stats -->
      <section class="mb-6 grid grid-cols-3 gap-2 md:mb-7 md:grid-cols-3 md:gap-5">

        <div class="min-w-0">
          <StatCard
            title="Current Level"
            :value="currentUser.level"
            :suffix="currentUser.levelName"
            label="72% to next"
            :icon="Sparkles"
            icon-background="bg-[#F3E8FF]"
            icon-color="text-[#9333EA]"
            :progress="levelProgress"
          />
        </div>

        <div class="min-w-0">
          <StatCard
            title="Total XP"
            :value="currentUser.xp.toLocaleString()"
            suffix="XP"
            label="+125 this week"
            :icon="Zap"
            icon-background="bg-[#FEF9C3]"
            icon-color="text-[#CA8A04]"
          />
        </div>

        <div class="min-w-0">
          <StatCard
            title="Current Streak"
            :value="currentUser.streak"
            suffix="days"
            label="Best: 14 days"
            :icon="Flame"
            icon-background="bg-[#FFF7ED]"
            icon-color="text-[#EA580C]"
          />
        </div>

      </section>

      <!-- Main -->
      <section class="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)] md:gap-5">

        <!-- Missions -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-6">
          <div class="mb-5 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#17211B]">
                Today's Missions
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                Complete your daily eco goals
              </p>
            </div>

            <RouterLink
              to="/missions"
              class="text-sm font-medium text-[#22C55E] transition hover:text-[#15803D]"
            >
              View all
            </RouterLink>
          </div>

          <div class="space-y-3">
            <MissionCard
              v-for="mission in todayMissions"
              :key="mission.id"
              :mission="mission"
              @complete="completeMission"
            />
          </div>
        </div>

        <!-- Progress -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#17211B]">
                Your Progress
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                Keep going, you're doing great!
              </p>
            </div>

            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF8EE]">
              <Leaf class="h-5 w-5 text-[#22C55E]" />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between gap-4 md:mt-7">
            <div>
              <p class="text-xs text-[#98A39C]">
                Current level
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                Level {{ currentUser.level }}
              </p>

              <p class="mt-1 text-sm font-medium text-[#15803D]">
                {{ currentUser.levelName }}
              </p>
            </div>

            <div class="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-[7px] border-[#DCFCE7] md:h-20 md:w-20">
              <div class="text-center">
                <p class="text-lg font-bold text-[#15803D]">
                  {{ levelProgress }}%
                </p>
              </div>
            </div>
          </div>

          <div class="mt-7">
            <div class="mb-2 flex items-center justify-between text-xs">
              <span class="text-[#66736A]">
                {{ currentUser.xp.toLocaleString() }} XP
              </span>

              <span class="text-[#98A39C]">
                {{ currentUser.nextLevelXp.toLocaleString() }} XP
              </span>
            </div>

            <div class="h-2 overflow-hidden rounded-full bg-[#EAF0EB]">
              <div
                class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                :style="{ width: `${levelProgress}%` }"
              ></div>
            </div>

            <p class="mt-3 text-xs text-[#98A39C]">
              {{ xpRemaining }} XP needed to reach Level {{ currentUser.level + 1 }}
            </p>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-[#F8FAF8] p-3">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-[#22C55E]" />

                <span class="text-xs text-[#66736A]">
                  Missions
                </span>
              </div>

              <p class="mt-2 text-lg font-bold text-[#17211B]">
                {{ completedMissions }}/{{ todayMissions.length }}
              </p>
            </div>

            <div class="rounded-xl bg-[#F8FAF8] p-3">
              <div class="flex items-center gap-2">
                <Flame class="h-4 w-4 text-[#EA580C]" />

                <span class="text-xs text-[#66736A]">
                  Streak
                </span>
              </div>

              <p class="mt-2 text-lg font-bold text-[#17211B]">
                {{ currentUser.streak }} days
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Impact -->
      <section class="mt-4 rounded-2xl border border-[#E8EDE9] bg-white p-4 md:mt-5 md:p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Your Environmental Impact
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              See how your actions are making a difference
            </p>
          </div>

          <RouterLink
            to="/impact"
            class="text-sm font-medium text-[#22C55E] transition hover:text-[#15803D]"
          >
            View impact
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

          <div class="rounded-xl bg-[#F8FAF8] p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <Cloud class="h-5 w-5 text-[#22C55E]" />
            </div>

            <p class="mt-4 text-xs text-[#66736A]">
              CO₂ Saved
            </p>

            <p class="mt-1 text-xl font-bold text-[#17211B]">
              {{ impact.co2Saved }} kg
            </p>
          </div>

          <div class="rounded-xl bg-[#F8FAF8] p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <Recycle class="h-5 w-5 text-[#3B82F6]" />
            </div>

            <p class="mt-4 text-xs text-[#66736A]">
              Waste Recycled
            </p>

            <p class="mt-1 text-xl font-bold text-[#17211B]">
              {{ impact.wasteRecycled }}
            </p>

            <p class="mt-0.5 text-xs text-[#98A39C]">
              items
            </p>
          </div>

          <div class="rounded-xl bg-[#F8FAF8] p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <Droplets class="h-5 w-5 text-[#3B82F6]" />
            </div>

            <p class="mt-4 text-xs text-[#66736A]">
              Water Saved
            </p>

            <p class="mt-1 text-xl font-bold text-[#17211B]">
              {{ impact.waterSaved }} L
            </p>
          </div>

          <div class="rounded-xl bg-[#F8FAF8] p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <TreePine class="h-5 w-5 text-[#15803D]" />
            </div>

            <p class="mt-4 text-xs text-[#66736A]">
              Tree Equivalent
            </p>

            <p class="mt-1 text-xl font-bold text-[#17211B]">
              {{ impact.treesEquivalent }}
            </p>

            <p class="mt-0.5 text-xs text-[#98A39C]">
              trees
            </p>
          </div>

        </div>
      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  Leaf,
  CheckCircle2,
  Cloud,
  Recycle,
  Droplets,
  TreePine
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import StatCard from '../components/cards/StatCard.vue'
import MissionCard from '../components/cards/MissionCard.vue'

import {
  user,
  missions,
  impact
} from '../data/mockData'

const currentUser = ref({
  ...user
})

const todayMissions = ref(
  missions.map((mission) => ({
    ...mission
  }))
)

const levelProgress = computed(() => {
  return Math.min(
    Math.round(
      (currentUser.value.xp / currentUser.value.nextLevelXp) * 100
    ),
    100
  )
})

const xpRemaining = computed(() => {
  return Math.max(
    currentUser.value.nextLevelXp - currentUser.value.xp,
    0
  )
})

const completedMissions = computed(() => {
  return todayMissions.value.filter(
    (mission) => mission.completed
  ).length
})

function completeMission(id) {
  const mission = todayMissions.value.find(
    (item) => item.id === id
  )

  if (!mission || mission.completed) {
    return
  }

  mission.completed = true
  currentUser.value.xp += mission.xp

  if (currentUser.value.xp >= currentUser.value.nextLevelXp) {
    currentUser.value.level += 1
    currentUser.value.levelName = 'Green Guardian'
    currentUser.value.xp = 0
    currentUser.value.nextLevelXp = 500
  }
}
</script>