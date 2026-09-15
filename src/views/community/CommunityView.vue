<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main
        class="mx-auto max-w-[1400px] px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8"
      >
        <MobileHeader />

        <!-- Mobile -->
        <div class="md:hidden">
          <div class="mb-5">
            <h1 class="text-[22px] font-bold tracking-tight text-[#17211B]">
              {{ mobileTab === 'community' ? 'Community' : 'Leaderboard' }}
            </h1>

            <p class="mt-1 text-xs leading-5 text-[#66736A]">
              {{
                mobileTab === 'community'
                  ? 'Berbagi aksi, inspirasi, dan dampak bersama komunitas.'
                  : 'Lihat peringkat EcoQuest Explorer berdasarkan XP.'
              }}
            </p>
          </div>

          <div
            class="mb-5 flex w-full rounded-xl border border-[#E8EDE9] bg-white p-1 shadow-sm"
          >
            <button
              type="button"
              @click="mobileTab = 'community'"
              :class="
                mobileTab === 'community'
                  ? 'bg-[#EAF8EE] text-[#15803D]'
                  : 'text-[#66736A] hover:bg-[#F8FAF8]'
              "
              class="flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-xs font-semibold transition"
            >
              Community
            </button>

            <button
              type="button"
              @click="mobileTab = 'leaderboard'"
              :class="
                mobileTab === 'leaderboard'
                  ? 'bg-[#EAF8EE] text-[#15803D]'
                  : 'text-[#66736A] hover:bg-[#F8FAF8]'
              "
              class="flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-xs font-semibold transition"
            >
              Leaderboard
            </button>
          </div>

          <template v-if="mobileTab === 'community'">
            <!-- Community -->

            <section
              class="relative mb-5 overflow-hidden rounded-2xl bg-[#15803D]"
            >
              <div
                class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"
              ></div>

              <div
                class="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-white/5"
              ></div>

              <div class="relative flex flex-col gap-5 px-5 py-5">
                <div>
                  <div
                    class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
                  >
                    <Users class="h-5 w-5 text-white" />
                  </div>

                  <h2
                    class="text-xl font-bold leading-tight text-white"
                  >
                    Setiap aksi bisa menginspirasi.
                  </h2>

                  <p
                    class="mt-2 text-xs leading-5 text-white/75"
                  >
                    Bagikan aksi ramah lingkunganmu dan beri inspirasi kepada
                    EcoQuest Explorer lainnya.
                  </p>
                </div>

                <button
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#15803D] transition active:scale-[0.98]"
                >
                  <Plus class="h-4 w-4" />
                  Bagikan Aksi
                </button>
              </div>
            </section>

            <section class="mb-6 grid grid-cols-3 gap-2.5">
              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE]"
                >
                  <Users class="h-4 w-4 text-[#22C55E]" />
                </div>

                <p class="mt-3 text-[10px] leading-4 text-[#66736A]">
                  Anggota
                </p>

                <p class="mt-0.5 text-base font-bold text-[#17211B]">
                  {{ communityStats.members.toLocaleString() }}
                </p>
              </div>

              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5FF]"
                >
                  <Leaf class="h-4 w-4 text-[#3B82F6]" />
                </div>

                <p class="mt-3 text-[10px] leading-4 text-[#66736A]">
                  Aksi Hari Ini
                </p>

                <p class="mt-0.5 text-base font-bold text-[#17211B]">
                  {{ communityStats.actionsToday }}
                </p>
              </div>

              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3]"
                >
                  <Wind class="h-4 w-4 text-[#CA8A04]" />
                </div>

                <p class="mt-3 text-[10px] leading-4 text-[#66736A]">
                  CO₂ Tersimpan
                </p>

                <p class="mt-0.5 text-base font-bold text-[#17211B]">
                  {{ communityStats.co2Saved }} kg
                </p>
              </div>
            </section>

            <section>
              <div class="mb-4 flex items-center justify-between">
                <div>
                  <h2 class="text-base font-bold text-[#17211B]">
                    Community Feed
                  </h2>

                  <p class="mt-0.5 text-[10px] text-[#98A39C]">
                    Lihat aksi dari EcoQuest Explorer lainnya
                  </p>
                </div>

                <button
                  type="button"
                  class="flex items-center gap-1.5 rounded-xl border border-[#E8EDE9] bg-white px-3 py-2 text-[10px] font-medium text-[#66736A]"
                >
                  Terbaru
                  <ChevronDown class="h-3.5 w-3.5" />
                </button>
              </div>

              <div class="space-y-3.5">
                <CommunityPost
                  v-for="post in communityPosts"
                  :key="post.id"
                  :post="post"
                />
              </div>

              <button
                type="button"
                class="mt-5 w-full rounded-xl border border-[#DCE5DE] bg-white py-3 text-xs font-semibold text-[#15803D]"
              >
                Lihat postingan lainnya
              </button>
            </section>
          </template>

          <template v-else>
            <!-- Leaderboard -->

            <section
              class="mb-6 overflow-hidden rounded-2xl border border-[#DCEBDD] bg-white"
            >
              <div
                class="flex items-center justify-between border-b border-[#E8EDE9] px-4 py-4"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E1]"
                  >
                    <Trophy class="h-4 w-4 text-[#CA8A04]" />
                  </div>

                  <div>
                    <h2 class="text-sm font-bold text-[#17211B]">
                      Weekly Leaderboard
                    </h2>

                    <p class="text-[10px] text-[#98A39C]">
                      Top eco explorers minggu ini
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class="flex items-center gap-1.5 rounded-xl border border-[#E8EDE9] bg-white px-2.5 py-2 text-[10px] font-medium text-[#66736A]"
                >
                  Week
                  <ChevronDown class="h-3.5 w-3.5" />
                </button>
              </div>

              <div
                class="grid grid-cols-3 items-end gap-2 px-3 pb-7 pt-8"
              >
                <div class="flex min-w-0 flex-col items-center">
                  <div class="relative">
                    <div
                      class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#D7DDE0] bg-[#F3F5F6] text-sm font-bold text-[#66736A]"
                    >
                      {{ topThree[1]?.avatar }}
                    </div>

                    <div
                      class="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#D7DDE0] text-[10px] font-bold text-[#4B5563]"
                    >
                      2
                    </div>
                  </div>

                  <p
                    class="mt-3 w-full truncate text-center text-[11px] font-bold text-[#17211B]"
                  >
                    {{ topThree[1]?.name }}
                  </p>

                  <p class="mt-1 text-[9px] text-[#98A39C]">
                    {{ topThree[1]?.xp.toLocaleString() }} XP
                  </p>
                </div>

                <div class="flex min-w-0 flex-col items-center">
                  <div class="relative">
                    <div
                      class="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-[#F4C94F] bg-[#FFF8E1] text-lg font-bold text-[#A16207]"
                    >
                      {{ topThree[0]?.avatar }}
                    </div>

                    <div
                      class="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#F4C94F] text-[10px] font-bold text-[#7C5A00]"
                    >
                      1
                    </div>

                    <div class="absolute -right-2 -top-3">
                      <Crown class="h-5 w-5 text-[#EAB308]" />
                    </div>
                  </div>

                  <p
                    class="mt-3 w-full truncate text-center text-xs font-bold text-[#17211B]"
                  >
                    {{ topThree[0]?.name }}
                  </p>

                  <p class="mt-1 text-[9px] font-semibold text-[#15803D]">
                    {{ topThree[0]?.xp.toLocaleString() }} XP
                  </p>
                </div>

                <div class="flex min-w-0 flex-col items-center">
                  <div class="relative">
                    <div
                      class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#E8C0A5] bg-[#FFF4EC] text-sm font-bold text-[#9A5A2E]"
                    >
                      {{ topThree[2]?.avatar }}
                    </div>

                    <div
                      class="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#E8C0A5] text-[10px] font-bold text-[#7C4422]"
                    >
                      3
                    </div>
                  </div>

                  <p
                    class="mt-3 w-full truncate text-center text-[11px] font-bold text-[#17211B]"
                  >
                    {{ topThree[2]?.name }}
                  </p>

                  <p class="mt-1 text-[9px] text-[#98A39C]">
                    {{ topThree[2]?.xp.toLocaleString() }} XP
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-6">
              <div class="mb-3">
                <h2 class="text-base font-bold text-[#17211B]">
                  Your Ranking
                </h2>

                <p class="mt-1 text-[10px] text-[#98A39C]">
                  Posisi kamu saat ini di leaderboard
                </p>
              </div>

              <div
                v-if="currentUser"
                class="flex items-center gap-3 rounded-2xl border border-[#BFE8C9] bg-[#F1FBF3] px-3.5 py-3.5"
              >
                <span
                  class="w-7 text-center text-xs font-bold text-[#15803D]"
                >
                  #{{ currentUser.rank }}
                </span>

                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-xs font-bold text-white"
                >
                  {{ currentUser.avatar }}
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <p
                      class="truncate text-xs font-semibold text-[#15803D]"
                    >
                      {{ currentUser.name }}
                    </p>

                    <span
                      class="shrink-0 rounded-full bg-[#DCFCE7] px-1.5 py-0.5 text-[9px] font-semibold text-[#15803D]"
                    >
                      You
                    </span>
                  </div>

                  <p class="mt-0.5 text-[10px] text-[#66736A]">
                    Level {{ currentUser.level }}
                  </p>
                </div>

                <div class="text-right">
                  <p class="text-xs font-bold text-[#17211B]">
                    {{ currentUser.xp.toLocaleString() }} XP
                  </p>

                  <p class="text-[9px] text-[#98A39C]">
                    This week
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div class="mb-3 flex items-end justify-between">
                <div>
                  <h2 class="text-base font-bold text-[#17211B]">
                    All Rankings
                  </h2>

                  <p class="mt-1 text-[10px] text-[#98A39C]">
                    Terus kumpulkan XP untuk naik peringkat
                  </p>
                </div>

                <span class="text-[10px] text-[#98A39C]">
                  {{ leaderboard.length }} explorers
                </span>
              </div>

              <div class="space-y-2.5">
                <LeaderboardRow
                  v-for="user in leaderboard"
                  :key="user.rank"
                  :user="user"
                />
              </div>
            </section>
          </template>
        </div>

        <!-- Desktop -->
        <div class="hidden md:block">
          <div class="mb-7">
            <h1
              class="text-[28px] font-bold tracking-tight text-[#17211B]"
            >
              Community
            </h1>

            <p class="mt-1 text-sm text-[#66736A]">
              Berbagi aksi, inspirasi, dan dampak bersama komunitas.
            </p>
          </div>

          <section
            class="relative mb-8 overflow-hidden rounded-2xl bg-[#15803D]"
          >
            <div
              class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"
            ></div>

            <div
              class="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-white/5"
            ></div>

            <div
              class="relative flex flex-col gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8"
            >
              <div class="max-w-xl">
                <div
                  class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"
                >
                  <Users class="h-5 w-5 text-white" />
                </div>

                <h2
                  class="text-2xl font-bold leading-tight text-white"
                >
                  Setiap aksi bisa menginspirasi.
                </h2>

                <p
                  class="mt-2 max-w-lg text-sm leading-6 text-white/75"
                >
                  Bagikan aksi ramah lingkunganmu dan beri inspirasi kepada
                  EcoQuest Explorer lainnya.
                </p>
              </div>

              <button
                type="button"
                class="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#15803D] transition hover:bg-[#F3FFF5] active:scale-[0.98] md:w-auto"
              >
                <Plus class="h-4 w-4" />
                Bagikan Aksi
              </button>
            </div>
          </section>

          <section class="mb-8 grid grid-cols-3 gap-5">
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
              >
                <Users class="h-5 w-5 text-[#22C55E]" />
              </div>

              <p class="mt-4 text-xs text-[#66736A]">
                Anggota
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ communityStats.members.toLocaleString() }}
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF]"
              >
                <Leaf class="h-5 w-5 text-[#3B82F6]" />
              </div>

              <p class="mt-4 text-xs text-[#66736A]">
                Aksi Hari Ini
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ communityStats.actionsToday }}
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3]"
              >
                <Wind class="h-5 w-5 text-[#CA8A04]" />
              </div>

              <p class="mt-4 text-xs text-[#66736A]">
                CO₂ Tersimpan
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ communityStats.co2Saved }} kg
              </p>
            </div>
          </section>

          <section
            class="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]"
          >
            <div class="min-w-0">
              <div
                class="mb-5 flex items-center justify-between"
              >
                <div>
                  <h2
                    class="text-lg font-bold text-[#17211B]"
                  >
                    Community Feed
                  </h2>

                  <p
                    class="mt-1 text-xs text-[#98A39C]"
                  >
                    Lihat aksi dari EcoQuest Explorer lainnya
                  </p>
                </div>

                <button
                  type="button"
                  class="flex items-center gap-1.5 rounded-xl border border-[#E8EDE9] bg-white px-3.5 py-2 text-xs font-medium text-[#66736A] shadow-sm transition hover:bg-[#F8FAF8]"
                >
                  Terbaru

                  <ChevronDown class="h-4 w-4" />
                </button>
              </div>

              <div class="space-y-4">
                <CommunityPost
                  v-for="post in communityPosts"
                  :key="post.id"
                  :post="post"
                />
              </div>

              <button
                type="button"
                class="mt-6 w-full rounded-xl border border-[#DCE5DE] bg-white py-3 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FAF4]"
              >
                Lihat postingan lainnya
              </button>
            </div>

            <aside class="space-y-5">
              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]"
                  >
                    <Target class="h-5 w-5 text-[#22C55E]" />
                  </div>

                  <div>
                    <h3
                      class="text-sm font-bold text-[#17211B]"
                    >
                      Target Komunitas
                    </h3>

                    <p
                      class="mt-0.5 text-xs text-[#98A39C]"
                    >
                      Progress minggu ini
                    </p>
                  </div>
                </div>

                <div class="mt-5">
                  <div class="flex items-end justify-between">
                    <span
                      class="text-base font-bold text-[#17211B]"
                    >
                      2.840
                    </span>

                    <span
                      class="text-xs text-[#98A39C]"
                    >
                      / 4.000 aksi
                    </span>
                  </div>

                  <div
                    class="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF0EB]"
                  >
                    <div
                      class="h-full w-[71%] rounded-full bg-[#22C55E]"
                    ></div>
                  </div>

                  <p
                    class="mt-2 text-xs text-[#66736A]"
                  >
                    Tinggal 1.160 aksi lagi untuk mencapai target.
                  </p>
                </div>
              </div>

              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF]"
                  >
                    <Hash class="h-5 w-5 text-[#9333EA]" />
                  </div>

                  <div>
                    <h3
                      class="text-sm font-bold text-[#17211B]"
                    >
                      Topik Trending
                    </h3>

                    <p
                      class="mt-0.5 text-xs text-[#98A39C]"
                    >
                      Populer di komunitas
                    </p>
                  </div>
                </div>

                <div class="mt-5 space-y-3">
                  <button
                    type="button"
                    class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                  >
                    <span
                      class="text-xs font-semibold text-[#15803D]"
                    >
                      #PlasticFree
                    </span>

                    <span class="text-[10px] text-[#98A39C]">
                      248 postingan
                    </span>
                  </button>

                  <button
                    type="button"
                    class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                  >
                    <span
                      class="text-xs font-semibold text-[#15803D]"
                    >
                      #BikeToWork
                    </span>

                    <span class="text-[10px] text-[#98A39C]">
                      182 postingan
                    </span>
                  </button>

                  <button
                    type="button"
                    class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                  >
                    <span
                      class="text-xs font-semibold text-[#15803D]"
                    >
                      #SaveEnergy
                    </span>

                    <span class="text-[10px] text-[#98A39C]">
                      146 postingan
                    </span>
                  </button>
                </div>
              </div>

              <div
                class="rounded-2xl border border-[#DCEBDD] bg-[#F1FBF3] p-5"
              >
                <div class="flex gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white"
                  >
                    <Sparkles
                      class="h-4 w-4 text-[#22C55E]"
                    />
                  </div>

                  <div>
                    <p
                      class="text-sm font-semibold text-[#17211B]"
                    >
                      Tips Komunitas
                    </p>

                    <p
                      class="mt-1 text-xs leading-5 text-[#66736A]"
                    >
                      Membagikan pencapaian kecilmu bisa membantu
                      orang lain memulai perjalanan ramah lingkungan
                      mereka.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  ChevronDown,
  Crown,
  Hash,
  Leaf,
  Plus,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wind
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import CommunityPost from '@/components/cards/CommunityPost.vue'
import LeaderboardRow from '@/components/cards/LeaderboardRow.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  communityPosts,
  communityStats,
  leaderboard
} from '@/data/mockData.js'

const mobileTab = ref('community')

const topThree = computed(() => {
  return leaderboard.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.find((user) => user.isCurrentUser)
})
</script>