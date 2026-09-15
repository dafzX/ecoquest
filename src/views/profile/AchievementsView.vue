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
            Achievements
          </span>
        </header>

        <!-- Achievement Summary -->
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
                  Pencapaian EcoQuest
                </p>

                <h1 class="mt-1 text-xl font-bold">
                  {{ unlockedAchievements }}/{{ achievements.length }}
                </h1>

                <p class="mt-0.5 text-[9px] text-white/70">
                  Achievement telah dibuka
                </p>
              </div>

              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15"
              >
                <Trophy class="h-6 w-6 text-white" />
              </div>
            </div>

            <div class="mt-4">
              <div class="mb-1.5 flex items-center justify-between">
                <span class="text-[8px] text-white/70">
                  Progress keseluruhan
                </span>

                <span class="text-[8px] font-bold">
                  {{ achievementProgress }}%
                </span>
              </div>

              <div class="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div
                  class="h-full rounded-full bg-white transition-all"
                  :style="{ width: `${achievementProgress}%` }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats -->
        <section class="mt-4 grid grid-cols-3 gap-2">

          <div
            class="rounded-xl border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]"
            >
              <Trophy class="h-4 w-4" />
            </div>

            <p class="mt-2 text-[15px] font-bold text-[#17211B]">
              {{ unlockedAchievements }}
            </p>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              Terbuka
            </p>
          </div>

          <div
            class="rounded-xl border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]"
            >
              <Target class="h-4 w-4" />
            </div>

            <p class="mt-2 text-[15px] font-bold text-[#17211B]">
              {{ inProgressAchievements }}
            </p>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              Progress
            </p>
          </div>

          <div
            class="rounded-xl border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#3B82F6]"
            >
              <Zap class="h-4 w-4" />
            </div>

            <p class="mt-2 text-[15px] font-bold text-[#17211B]">
              {{ totalXp }}
            </p>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              XP Earned
            </p>
          </div>

        </section>

        <!-- Section Title -->
        <section class="mt-6">
          <div class="flex items-end justify-between">
            <div>
              <h2 class="text-[12px] font-bold text-[#17211B]">
                Semua Achievement
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Terus lakukan aksi kecil untuk membukanya.
              </p>
            </div>

            <span class="text-[8px] font-semibold text-[#15803D]">
              {{ unlockedAchievements }} unlocked
            </span>
          </div>
        </section>

        <!-- Achievement List -->
        <section class="mt-3 space-y-2">

          <article
            v-for="achievement in achievements"
            :key="achievement.id"
            class="rounded-xl border bg-white p-3 transition"
            :class="
              achievement.unlocked
                ? 'border-[#DCEBE0]'
                : 'border-[#E8EDE9] opacity-80'
            "
          >
            <div class="flex items-center gap-3">

              <!-- Icon -->
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                :class="
                  achievement.unlocked
                    ? achievement.iconBg
                    : 'bg-[#F1F5F2] text-[#A3ADA7]'
                "
              >
                <component
                  :is="achievement.icon"
                  class="h-5 w-5"
                />
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">

                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3
                      class="text-[10px] font-bold"
                      :class="
                        achievement.unlocked
                          ? 'text-[#17211B]'
                          : 'text-[#718078]'
                      "
                    >
                      {{ achievement.title }}
                    </h3>

                    <p class="mt-0.5 text-[8px] leading-3.5 text-[#718078]">
                      {{ achievement.description }}
                    </p>
                  </div>

                  <CheckCircle2
                    v-if="achievement.unlocked"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]"
                  />

                  <Lock
                    v-else
                    class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A3ADA7]"
                  />
                </div>

                <!-- Progress -->
                <div v-if="!achievement.unlocked" class="mt-2">

                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-medium text-[#9AA59E]">
                      Progress
                    </span>

                    <span class="text-[7px] font-semibold text-[#718078]">
                      {{ achievement.current }}/{{ achievement.target }}
                    </span>
                  </div>

                  <div
                    class="mt-1 h-1 overflow-hidden rounded-full bg-[#EEF3EF]"
                  >
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{
                        width: `${Math.min(
                          (achievement.current / achievement.target) * 100,
                          100
                        )}%`
                      }"
                    ></div>
                  </div>

                </div>

              </div>

              <!-- XP -->
              <div class="shrink-0 text-right">
                <p
                  class="text-[9px] font-bold"
                  :class="
                    achievement.unlocked
                      ? 'text-[#15803D]'
                      : 'text-[#9AA59E]'
                  "
                >
                  +{{ achievement.xp }}
                </p>

                <p class="text-[7px] text-[#A3ADA7]">
                  XP
                </p>
              </div>

            </div>
          </article>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-[1000px] px-6 pb-10">

          <!-- Header -->
          <header class="mb-6 flex items-center gap-3">

            <RouterLink
              to="/profile"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
            >
              <ArrowLeft class="h-5 w-5" />
            </RouterLink>

            <div>
              <h1 class="text-[24px] font-bold text-[#17211B]">
                Achievement
              </h1>

              <p class="mt-1 text-sm text-[#718078]">
                Kumpulan pencapaian yang sudah dan sedang kamu raih.
              </p>
            </div>

          </header>

          <!-- Hero -->
          <section
            class="relative overflow-hidden rounded-2xl bg-[#15803D] p-6 text-white"
          >

            <div
              class="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10"
            ></div>

            <div
              class="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-white/5"
            ></div>

            <div class="relative flex items-center justify-between">

              <div>
                <p class="text-xs font-medium text-white/70">
                  Progress Achievement
                </p>

                <h2 class="mt-2 text-3xl font-bold">
                  {{ unlockedAchievements }}
                  <span class="text-white/50">
                    / {{ achievements.length }}
                  </span>
                </h2>

                <p class="mt-1 text-xs text-white/70">
                  Achievement telah berhasil kamu buka.
                </p>

                <div class="mt-5 w-[380px]">
                  <div class="mb-2 flex items-center justify-between">
                    <span class="text-[10px] text-white/70">
                      Progress keseluruhan
                    </span>

                    <span class="text-[10px] font-bold">
                      {{ achievementProgress }}%
                    </span>
                  </div>

                  <div class="h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      class="h-full rounded-full bg-white transition-all"
                      :style="{ width: `${achievementProgress}%` }"
                    ></div>
                  </div>
                </div>
              </div>

              <div
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10"
              >
                <Trophy class="h-10 w-10 text-white" />
              </div>

            </div>

          </section>

          <!-- Stats -->
          <section class="mt-5 grid grid-cols-3 gap-4">

            <div
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE] text-[#15803D]"
              >
                <Trophy class="h-5 w-5" />
              </div>

              <div>
                <p class="text-[11px] text-[#718078]">
                  Achievement Terbuka
                </p>

                <p class="mt-1 text-xl font-bold text-[#17211B]">
                  {{ unlockedAchievements }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7D6] text-[#B88900]"
              >
                <Target class="h-5 w-5" />
              </div>

              <div>
                <p class="text-[11px] text-[#718078]">
                  Sedang Dikejar
                </p>

                <p class="mt-1 text-xl font-bold text-[#17211B]">
                  {{ inProgressAchievements }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#3B82F6]"
              >
                <Zap class="h-5 w-5" />
              </div>

              <div>
                <p class="text-[11px] text-[#718078]">
                  Total XP
                </p>

                <p class="mt-1 text-xl font-bold text-[#17211B]">
                  {{ totalXp }} XP
                </p>
              </div>
            </div>

          </section>

          <!-- Achievement Header -->
          <section class="mt-7">

            <div class="flex items-end justify-between">

              <div>
                <h2 class="text-base font-bold text-[#17211B]">
                  Semua Achievement
                </h2>

                <p class="mt-1 text-xs text-[#718078]">
                  Selesaikan berbagai aksi untuk membuka pencapaian baru.
                </p>
              </div>

              <span
                class="rounded-full bg-[#EAF8EE] px-3 py-1 text-[10px] font-semibold text-[#15803D]"
              >
                {{ unlockedAchievements }} Unlocked
              </span>

            </div>

          </section>

          <!-- Achievement Grid -->
          <section class="mt-4 grid grid-cols-2 gap-4">

            <article
              v-for="achievement in achievements"
              :key="achievement.id"
              class="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
              :class="
                achievement.unlocked
                  ? 'border-[#E8EDE9]'
                  : 'border-[#E8EDE9]'
              "
            >

              <div class="flex items-start justify-between">

                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl"
                  :class="
                    achievement.unlocked
                      ? achievement.iconBg
                      : 'bg-[#F1F5F2] text-[#A3ADA7]'
                  "
                >
                  <component
                    :is="achievement.icon"
                    class="h-6 w-6"
                  />
                </div>

                <div>
                  <CheckCircle2
                    v-if="achievement.unlocked"
                    class="h-5 w-5 text-[#22C55E]"
                  />

                  <Lock
                    v-else
                    class="h-4 w-4 text-[#A3ADA7]"
                  />
                </div>

              </div>

              <div class="mt-4">

                <h3
                  class="text-sm font-bold"
                  :class="
                    achievement.unlocked
                      ? 'text-[#17211B]'
                      : 'text-[#718078]'
                  "
                >
                  {{ achievement.title }}
                </h3>

                <p class="mt-1 text-xs leading-5 text-[#718078]">
                  {{ achievement.description }}
                </p>

              </div>

              <div v-if="!achievement.unlocked" class="mt-4">

                <div class="flex items-center justify-between">
                  <span class="text-[9px] font-medium text-[#9AA59E]">
                    Progress
                  </span>

                  <span class="text-[9px] font-semibold text-[#718078]">
                    {{ achievement.current }}/{{ achievement.target }}
                  </span>
                </div>

                <div
                  class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF3EF]"
                >
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    :style="{
                      width: `${Math.min(
                        (achievement.current / achievement.target) * 100,
                        100
                      )}%`
                    }"
                  ></div>
                </div>

              </div>

              <div
                class="mt-4 flex items-center justify-between border-t border-[#EEF3EF] pt-3"
              >

                <span
                  class="text-[10px] font-semibold"
                  :class="
                    achievement.unlocked
                      ? 'text-[#15803D]'
                      : 'text-[#9AA59E]'
                  "
                >
                  {{ achievement.unlocked ? 'Unlocked' : 'In Progress' }}
                </span>

                <span
                  class="text-[10px] font-bold"
                  :class="
                    achievement.unlocked
                      ? 'text-[#15803D]'
                      : 'text-[#9AA59E]'
                  "
                >
                  +{{ achievement.xp }} XP
                </span>

              </div>

            </article>

          </section>

        </div>

      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Flame,
  Leaf,
  Lock,
  Recycle,
  Target,
  Trophy,
  TreePine,
  Zap,
  MoreHorizontal
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const achievements = [
  {
    id: 1,
    title: 'First Step',
    description: 'Selesaikan mission pertamamu di EcoQuest.',
    icon: Leaf,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]',
    current: 1,
    target: 1,
    xp: 50,
    unlocked: true
  },
  {
    id: 2,
    title: 'Eco Starter',
    description: 'Selesaikan 5 eco action di kehidupan nyata.',
    icon: Recycle,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]',
    current: 5,
    target: 5,
    xp: 100,
    unlocked: true
  },
  {
    id: 3,
    title: 'Green Rider',
    description: 'Gunakan sepeda untuk perjalanan sebanyak 10 kali.',
    icon: Bike,
    iconBg: 'bg-[#EAF2FF] text-[#3B82F6]',
    current: 7,
    target: 10,
    xp: 150,
    unlocked: false
  },
  {
    id: 4,
    title: '7 Day Streak',
    description: 'Pertahankan streak selama 7 hari berturut-turut.',
    icon: Flame,
    iconBg: 'bg-[#FFF1E8] text-[#F97316]',
    current: 7,
    target: 7,
    xp: 200,
    unlocked: true
  },
  {
    id: 5,
    title: 'Earth Hero',
    description: 'Kumpulkan total 1.000 XP dari berbagai aktivitas.',
    icon: TreePine,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]',
    current: 760,
    target: 1000,
    xp: 300,
    unlocked: false
  },
  {
    id: 6,
    title: 'Eco Legend',
    description: 'Selesaikan 25 mission dan jadilah Eco Legend.',
    icon: Trophy,
    iconBg: 'bg-[#FFF7D6] text-[#B88900]',
    current: 14,
    target: 25,
    xp: 500,
    unlocked: false
  },
  {
    id: 7,
    title: 'Energy Saver',
    description: 'Lakukan aksi hemat energi sebanyak 15 kali.',
    icon: Zap,
    iconBg: 'bg-[#FFF7D6] text-[#B88900]',
    current: 9,
    target: 15,
    xp: 200,
    unlocked: false
  },
  {
    id: 8,
    title: 'Green Champion',
    description: 'Selesaikan 10 challenge lingkungan.',
    icon: Leaf,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]',
    current: 3,
    target: 10,
    xp: 350,
    unlocked: false
  }
]

const unlockedAchievements = computed(() => {
  return achievements.filter(achievement => achievement.unlocked).length
})

const inProgressAchievements = computed(() => {
  return achievements.filter(achievement => !achievement.unlocked).length
})

const achievementProgress = computed(() => {
  return Math.round(
    (unlockedAchievements.value / achievements.length) * 100
  )
})

const totalXp = computed(() => {
  return achievements
    .filter(achievement => achievement.unlocked)
    .reduce((total, achievement) => total + achievement.xp, 0)
})
</script>