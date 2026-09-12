<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Profile
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          Manage your EcoQuest profile and track your journey
        </p>
      </div>

      <!-- Profile Hero -->
      <section class="mb-8 overflow-hidden rounded-2xl border border-[#DCEBDD] bg-white">

        <div class="bg-[#15803D] px-6 py-7 md:px-8">

          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div class="flex items-center gap-4">

              <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white text-2xl font-bold text-[#15803D]">
                {{ user.avatar }}
              </div>

              <div>
                <h2 class="text-2xl font-bold text-white">
                  {{ user.name }}
                </h2>

                <div class="mt-1 flex items-center gap-2">
                  <span class="text-sm text-white/75">
                    Level {{ user.level }}
                  </span>

                  <span class="h-1 w-1 rounded-full bg-white/50"></span>

                  <span class="text-sm text-white/75">
                    {{ user.levelName }}
                  </span>
                </div>

                <p class="mt-2 text-xs text-white/65">
                  Eco explorer since {{ profileStats.joinedDate }}
                </p>
              </div>

            </div>

            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FFF5]"
            >
              <Pencil class="h-4 w-4" />
              Edit Profile
            </button>

          </div>

        </div>

        <!-- XP Progress -->
        <div class="px-6 py-5 md:px-8">

          <div class="flex items-end justify-between gap-4">

            <div>
              <p class="text-xs text-[#98A39C]">
                Level Progress
              </p>

              <p class="mt-1 text-sm font-semibold text-[#17211B]">
                {{ user.xp.toLocaleString() }} / {{ user.nextLevelXp.toLocaleString() }} XP
              </p>
            </div>

            <span class="text-sm font-bold text-[#15803D]">
              {{ levelProgress }}%
            </span>

          </div>

          <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF0EB]">
            <div
              class="h-full rounded-full bg-[#22C55E] transition-all"
              :style="{ width: `${levelProgress}%` }"
            ></div>
          </div>

          <div class="mt-2 flex justify-between">
            <span class="text-[10px] text-[#98A39C]">
              Level {{ user.level }}
            </span>

            <span class="text-[10px] text-[#98A39C]">
              {{ xpRemaining.toLocaleString() }} XP to next level
            </span>
          </div>

        </div>

      </section>

      <!-- Stats -->
      <section class="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
            <ListChecks class="h-5 w-5 text-[#22C55E]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Missions Completed
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ profileStats.missionsCompleted }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E1]">
            <Trophy class="h-5 w-5 text-[#CA8A04]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Challenges Completed
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ profileStats.challengesCompleted }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7ED]">
            <Flame class="h-5 w-5 text-[#EA580C]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Current Streak
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ user.streak }} days
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF]">
            <Leaf class="h-5 w-5 text-[#3B82F6]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Total Eco Actions
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ profileStats.totalEcoActions }}
          </p>
        </div>

      </section>

      <!-- Main -->
      <section class="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">

        <!-- Achievements -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6">

          <div class="flex items-end justify-between">

            <div>
              <h2 class="text-lg font-bold text-[#17211B]">
                Achievements
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                Milestones you've unlocked
              </p>
            </div>

            <span class="text-xs font-medium text-[#66736A]">
              {{ unlockedAchievements }} / {{ achievements.length }} unlocked
            </span>

          </div>

          <div class="mt-6 grid gap-3 md:grid-cols-2">

            <div
              v-for="achievement in achievements"
              :key="achievement.id"
              class="flex items-center gap-3 rounded-xl border p-4"
              :class="
                achievement.unlocked
                  ? 'border-[#DCEBDD] bg-[#F8FCF9]'
                  : 'border-[#E8EDE9] bg-[#FAFAFA]'
              "
            >

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                :class="
                  achievement.unlocked
                    ? 'bg-[#EAF8EE]'
                    : 'bg-[#F1F3F1]'
                "
              >
                <Award
                  class="h-5 w-5"
                  :class="
                    achievement.unlocked
                      ? 'text-[#22C55E]'
                      : 'text-[#98A39C]'
                  "
                />
              </div>

              <div class="min-w-0 flex-1">

                <div class="flex items-center gap-2">
                  <p
                    class="truncate text-sm font-semibold"
                    :class="
                      achievement.unlocked
                        ? 'text-[#17211B]'
                        : 'text-[#98A39C]'
                    "
                  >
                    {{ achievement.title }}
                  </p>

                  <Check
                    v-if="achievement.unlocked"
                    class="h-4 w-4 shrink-0 text-[#22C55E]"
                  />
                  <Lock
                    v-else
                    class="h-3.5 w-3.5 shrink-0 text-[#98A39C]"
                  />
                </div>

                <p class="mt-1 text-[11px] leading-4 text-[#98A39C]">
                  {{ achievement.description }}
                </p>

              </div>

            </div>

          </div>

        </div>

        <!-- Account -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6">

          <h2 class="text-lg font-bold text-[#17211B]">
            Account
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Manage your account preferences
          </p>

          <div class="mt-6 space-y-2">

            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F8FAF8]"
            >
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F7F4]">
                <UserCircle class="h-4 w-4 text-[#66736A]" />
              </div>

              <div class="flex-1">
                <p class="text-sm font-medium text-[#17211B]">
                  Personal Information
                </p>

                <p class="mt-0.5 text-[10px] text-[#98A39C]">
                  Update your profile details
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#98A39C]" />
            </button>

            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F8FAF8]"
            >
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F7F4]">
                <Bell class="h-4 w-4 text-[#66736A]" />
              </div>

              <div class="flex-1">
                <p class="text-sm font-medium text-[#17211B]">
                  Notifications
                </p>

                <p class="mt-0.5 text-[10px] text-[#98A39C]">
                  Manage notification preferences
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#98A39C]" />
            </button>

            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F8FAF8]"
            >
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F7F4]">
                <Settings class="h-4 w-4 text-[#66736A]" />
              </div>

              <div class="flex-1">
                <p class="text-sm font-medium text-[#17211B]">
                  Settings
                </p>

                <p class="mt-0.5 text-[10px] text-[#98A39C]">
                  App and privacy settings
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#98A39C]" />
            </button>

          </div>

          <div class="mt-5 border-t border-[#E8EDE9] pt-5">

            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#FEF2F2]"
            >
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF2F2]">
                <LogOut class="h-4 w-4 text-[#DC2626]" />
              </div>

              <div>
                <p class="text-sm font-medium text-[#DC2626]">
                  Sign Out
                </p>

                <p class="mt-0.5 text-[10px] text-[#98A39C]">
                  Sign out of your EcoQuest account
                </p>
              </div>
            </button>

          </div>

        </div>

      </section>

      <!-- Activity -->
      <section class="mt-6 rounded-2xl border border-[#E8EDE9] bg-white p-6">

        <div class="flex items-end justify-between">

          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Recent Activity
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Your latest EcoQuest activity
            </p>
          </div>

          <button
            type="button"
            class="text-xs font-semibold text-[#15803D] hover:text-[#166534]"
          >
            View All
          </button>

        </div>

        <div class="mt-5 divide-y divide-[#E8EDE9]">

          <div
            v-for="activity in profileActivity"
            :key="activity.id"
            class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              :class="activityBackground(activity.type)"
            >
              <component
                :is="activityIcon(activity.type)"
                class="h-4 w-4"
                :class="activityColor(activity.type)"
              />
            </div>

            <div class="min-w-0 flex-1">

              <p class="truncate text-sm font-medium text-[#17211B]">
                {{ activity.title }}
              </p>

              <p class="mt-1 text-xs text-[#98A39C]">
                {{ activity.type }} · {{ activity.date }}
              </p>

            </div>

            <span
              class="shrink-0 text-sm font-bold"
              :class="
                activity.xp > 0
                  ? 'text-[#15803D]'
                  : 'text-[#DC2626]'
              "
            >
              {{ activity.xp > 0 ? '+' : '' }}{{ activity.xp }} XP
            </span>

          </div>

        </div>

      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'

import {
  Award,
  Bell,
  Check,
  ChevronRight,
  Flame,
  Leaf,
  ListChecks,
  Lock,
  LogOut,
  Pencil,
  Recycle,
  Settings,
  Trophy,
  UserCircle,
  Wind,
  Zap
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'

import {
  user,
  achievements,
  profileStats,
  profileActivity
} from '../data/mockData.js'

const levelProgress = computed(() => {
  return Math.min(
    Math.round((user.xp / user.nextLevelXp) * 100),
    100
  )
})

const xpRemaining = computed(() => {
  return Math.max(user.nextLevelXp - user.xp, 0)
})

const unlockedAchievements = computed(() => {
  return achievements.filter((achievement) => achievement.unlocked).length
})

function activityIcon(type) {
  if (type === 'Mission') {
    return ListChecks
  }

  if (type === 'Challenge') {
    return Trophy
  }

  if (type === 'Eco Action') {
    return Leaf
  }

  if (type === 'Reward') {
    return Award
  }

  return Zap
}

function activityBackground(type) {
  if (type === 'Mission') {
    return 'bg-[#EAF8EE]'
  }

  if (type === 'Challenge') {
    return 'bg-[#FFF8E1]'
  }

  if (type === 'Eco Action') {
    return 'bg-[#EEF5FF]'
  }

  if (type === 'Reward') {
    return 'bg-[#F3E8FF]'
  }

  return 'bg-[#F5F8F5]'
}

function activityColor(type) {
  if (type === 'Mission') {
    return 'text-[#22C55E]'
  }

  if (type === 'Challenge') {
    return 'text-[#CA8A04]'
  }

  if (type === 'Eco Action') {
    return 'text-[#3B82F6]'
  }

  if (type === 'Reward') {
    return 'text-[#9333EA]'
  }

  return 'text-[#66736A]'
}
</script>