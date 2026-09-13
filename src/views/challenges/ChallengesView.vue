<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto w-full max-w-[430px] px-4 pb-6 md:hidden">

        <!-- Header -->
        <header class="flex h-[56px] items-center">
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white active:scale-95"
            @click="goBack"
          >
            <ArrowLeft class="h-[18px] w-[18px]" />
          </button>

          <h1 class="ml-3 text-[15px] font-bold text-[#17211B]">
            Challenges
          </h1>
        </header>

        <!-- Tabs -->
        <div
          class="mb-4 flex w-full rounded-xl border border-[#DCEBE0] bg-white p-1"
        >
          <button
            type="button"
            class="h-8 flex-1 rounded-lg text-[9px] font-semibold transition"
            :class="
              activeTab === 'community'
                ? 'bg-[#22C55E] text-white'
                : 'text-[#718078] hover:bg-[#F4FBF7]'
            "
            @click="activeTab = 'community'"
          >
            Community Quest
          </button>

          <button
            type="button"
            class="h-8 flex-1 rounded-lg text-[9px] font-semibold transition"
            :class="
              activeTab === 'mine'
                ? 'bg-[#22C55E] text-white'
                : 'text-[#718078] hover:bg-[#F4FBF7]'
            "
            @click="activeTab = 'mine'"
          >
            My Challenge
          </button>
        </div>

        <!-- Featured Challenge -->
        <section
          v-if="featuredChallenge"
          class="mb-5 overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white"
        >

          <!-- Banner -->
          <div
            class="relative h-[108px] overflow-hidden bg-[#DCFCE7]"
          >
            <div
              class="absolute -right-8 -top-9 h-28 w-28 rounded-full bg-[#BBF7D0]"
            ></div>

            <div
              class="absolute -bottom-8 left-10 h-20 w-20 rounded-full bg-[#86EFAC]/50"
            ></div>

            <div
              class="absolute right-14 top-12 h-10 w-10 rounded-full bg-white/20"
            ></div>

            <div class="absolute left-4 top-3">
              <span
                class="inline-flex rounded-full bg-white/85 px-2 py-1 text-[7px] font-bold tracking-[0.02em] text-[#15803D]"
              >
                COMMUNITY QUEST
              </span>
            </div>

            <div class="absolute bottom-3.5 left-4">
              <div class="flex items-center gap-1.5">
                <Globe2 class="h-3.5 w-3.5 text-[#15803D]" />

                <span class="text-[8px] font-medium text-[#15803D]">
                  Tantangan Komunitas
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-3.5">

            <div class="flex items-start gap-3">

              <div class="min-w-0 flex-1">
                <h2
                  class="text-[12px] font-bold leading-4 text-[#17211B]"
                >
                  {{ featuredChallenge.title }}
                </h2>

                <p
                  class="mt-1 text-[8px] leading-[13px] text-[#718078]"
                >
                  {{ featuredChallenge.description }}
                </p>
              </div>

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]"
              >
                <Users class="h-4 w-4 text-[#22C55E]" />
              </div>

            </div>

            <!-- Progress -->
            <div class="mt-4">

              <div class="mb-1.5 flex items-center justify-between">
                <span class="text-[8px] text-[#718078]">
                  {{ featuredChallenge.participants }} peserta
                </span>

                <span class="text-[8px] font-bold text-[#22C55E]">
                  {{ featuredChallenge.progress }}%
                </span>
              </div>

              <div
                class="h-[5px] w-full overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full rounded-full bg-[#22C55E] transition-all"
                  :style="{
                    width: `${featuredChallenge.progress}%`
                  }"
                ></div>
              </div>

            </div>

            <!-- Footer -->
            <div class="mt-3.5 flex items-center justify-between">

              <div class="flex items-center gap-1.5">
                <Clock class="h-3 w-3 text-[#98A39C]" />

                <span class="text-[8px] text-[#718078]">
                  {{ featuredChallenge.daysLeft }} hari lagi
                </span>
              </div>

              <RouterLink
                :to="`/challenges/${featuredChallenge.id}`"
                class="flex h-7 items-center gap-1 rounded-lg bg-[#22C55E] px-3 text-[8px] font-semibold text-white transition hover:bg-[#15803D] active:scale-[0.98]"
              >
                Lihat Challenge
                <ArrowRight class="h-3 w-3" />
              </RouterLink>

            </div>

          </div>
        </section>

        <!-- Other Challenges -->
        <section>

          <!-- Section Header -->
          <div class="mb-2.5 flex items-center justify-between">
            <div>
              <h2 class="text-[11px] font-bold text-[#17211B]">
                {{
                  activeTab === 'community'
                    ? 'Community Challenges'
                    : 'Challenge Saya'
                }}
              </h2>
            </div>

            <span
              class="rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]"
            >
              {{ visibleChallenges.length }} challenge
            </span>
          </div>

          <!-- Challenge List -->
          <div class="space-y-2.5">

            <article
              v-for="challenge in visibleChallenges"
              :key="challenge.id"
              class="rounded-[12px] border border-[#DCEBE0] bg-white p-3.5"
            >

              <div class="flex items-start gap-3">

                <!-- Icon -->
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  :class="getChallengeStyle(challenge.category)"
                >
                  <component
                    :is="getChallengeIcon(challenge.category)"
                    class="h-5 w-5"
                  />
                </div>

                <!-- Content -->
                <div class="min-w-0 flex-1">

                  <div class="flex items-start justify-between gap-2">

                    <div class="min-w-0">
                      <h3
                        class="text-[10px] font-bold leading-4 text-[#17211B]"
                      >
                        {{ challenge.title }}
                      </h3>

                      <p class="mt-0.5 text-[8px] text-[#718078]">
                        {{ challenge.participants }} peserta
                      </p>
                    </div>

                    <span
                      class="shrink-0 rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]"
                    >
                      {{ challenge.daysLeft }} hari
                    </span>

                  </div>

                  <p
                    class="mt-1.5 text-[8px] leading-[13px] text-[#718078]"
                  >
                    {{ challenge.description }}
                  </p>

                  <!-- Progress -->
                  <div class="mt-2.5">

                    <div
                      class="mb-1 flex items-center justify-between"
                    >
                      <span class="text-[7px] text-[#98A39C]">
                        Progress
                      </span>

                      <span
                        class="text-[7px] font-semibold text-[#22C55E]"
                      >
                        {{ challenge.progress }}%
                      </span>
                    </div>

                    <div
                      class="h-[4px] w-full overflow-hidden rounded-full bg-[#E5EFE8]"
                    >
                      <div
                        class="h-full rounded-full bg-[#22C55E]"
                        :style="{
                          width: `${challenge.progress}%`
                        }"
                      ></div>
                    </div>

                  </div>

                </div>
              </div>

              <!-- Detail -->
              <RouterLink
                :to="`/challenges/${challenge.id}`"
                class="mt-3 flex h-7 w-full items-center justify-center rounded-lg bg-[#F1F5F2] text-[8px] font-semibold text-[#15803D] transition hover:bg-[#E8F8ED] active:scale-[0.99]"
              >
                Lihat Detail
                <ArrowRight class="ml-1 h-3 w-3" />
              </RouterLink>

            </article>

          </div>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1080px] px-6 pb-10">

          <!-- Header -->
          <section class="mb-7 flex items-end justify-between">
            <div>
              <h1 class="text-[24px] font-bold text-[#17211B]">
                Challenges
              </h1>
              <p class="mt-1 text-sm text-[#66736A]">
                Bersama kita bisa lebih berdampak!
              </p>
            </div>
            
            <button class="flex items-center gap-2 rounded-lg border border-[#E8EDE9] px-4 py-1.5 text-sm font-medium text-[#66736A] transition hover:bg-[#F8FAF8]">
              All
              <ChevronDown class="h-4 w-4" />
            </button>
          </section>

          <!-- Tabs -->
          <div class="mb-6 flex gap-4 border-b border-[#E8EDE9]">
            <button
              class="border-b-2 pb-3 text-sm font-semibold transition"
              :class="
                activeTab === 'community'
                  ? 'border-[#22C55E] text-[#17211B]'
                  : 'border-transparent text-[#98A39C] hover:text-[#17211B]'
              "
              @click="activeTab = 'community'"
            >
              Community Quest
            </button>
            <button
              class="border-b-2 pb-3 text-sm font-semibold transition"
              :class="
                activeTab === 'mine'
                  ? 'border-[#22C55E] text-[#17211B]'
                  : 'border-transparent text-[#98A39C] hover:text-[#17211B]'
              "
              @click="activeTab = 'mine'"
            >
              My Challenge
            </button>
          </div>

          <!-- Desktop Grid -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <!-- Featured Challenge -->
            <article
              v-if="featuredChallenge"
              class="col-span-1 lg:col-span-2 overflow-hidden rounded-2xl bg-[#E8F8ED] p-8 flex flex-col justify-between relative"
            >
              <div class="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-[#DCFCE7] mix-blend-multiply opacity-50"></div>
              <div class="relative z-10 w-full lg:w-2/3">
                <h2 class="text-xl font-bold text-[#15803D]">
                  {{ featuredChallenge.title }}
                </h2>
                <p class="mt-2 text-sm text-[#15803D]/80">
                  {{ featuredChallenge.description }}
                </p>

                <div class="mt-6 flex items-center gap-6">
                  <div>
                    <span class="text-2xl font-bold text-[#15803D]">{{ featuredChallenge.progress }}%</span>
                    <span class="ml-1 text-xs text-[#15803D]/70">completed</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5 text-[#15803D]">
                      <Users class="h-4 w-4" />
                      <span class="text-sm font-bold">{{ featuredChallenge.participants }}</span>
                    </div>
                    <span class="text-xs text-[#15803D]/70">participants</span>
                  </div>
                </div>
              </div>
              
              <!-- Decorative illustration placement -->
              <div class="absolute right-12 bottom-0 h-40 w-48 opacity-90 hidden lg:block">
                <!-- A placeholder for the globe illustration -->
                <div class="flex h-full w-full items-center justify-center text-[#22C55E]">
                  <Globe2 class="h-32 w-32" />
                </div>
              </div>
            </article>

            <!-- Other Challenges -->
            <article
              v-for="challenge in visibleChallenges"
              :key="challenge.id"
              class="flex flex-col justify-between rounded-2xl border border-[#E8EDE9] bg-white p-6 transition hover:border-[#DCEBE0]"
            >
              <div>
                <h3 class="text-base font-bold text-[#17211B]">
                  {{ challenge.title }}
                </h3>
                <p class="mt-1 text-sm text-[#66736A]">
                  {{ challenge.description }}
                </p>
              </div>

              <div class="mt-6 flex items-end justify-between">
                <div class="w-1/2">
                  <div class="mb-2 flex items-center justify-between text-xs">
                    <span class="font-bold text-[#17211B]">{{ challenge.progress }}%</span>
                    <span class="text-[#66736A]">{{ challenge.participants }} participants</span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-[#E5EFE8]">
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{ width: `${challenge.progress}%` }"
                    ></div>
                  </div>
                </div>

                <button
                  class="rounded-lg px-6 py-2 text-sm font-semibold transition"
                  :class="
                    challenge.joined
                      ? 'bg-[#E8F8ED] text-[#15803D] hover:bg-[#DCFCE7]'
                      : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
                  "
                >
                  {{ challenge.joined ? 'Start' : 'Join' }}
                </button>
              </div>
            </article>

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
  Users,
  Clock,
  ArrowLeft,
  ArrowRight,
  Globe2,
  Recycle,
  Bike,
  Droplets,
  TreePine,
  ChevronDown
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

const router = useRouter()

const activeTab = ref('community')

const challenges = ref([
  {
    id: 1,
    title: 'Plastic Reduction Week',
    description:
      'Kurangi penggunaan plastik sekali pakai dan ajak komunitasmu melakukan aksi nyata.',
    category: 'Plastic',
    participants: 320,
    progress: 68,
    daysLeft: 7,
    joined: true
  },
  {
    id: 2,
    title: 'Green Transport Challenge',
    description:
      'Gunakan transportasi ramah lingkungan untuk perjalanan sehari-hari.',
    category: 'Transport',
    participants: 154,
    progress: 45,
    daysLeft: 12,
    joined: true
  },
  {
    id: 3,
    title: 'Clean Energy Challenge',
    description:
      'Kurangi konsumsi energi dan gunakan energi secara lebih bijak.',
    category: 'Energy',
    participants: 89,
    progress: 32,
    daysLeft: 10,
    joined: false
  },
  {
    id: 4,
    title: 'Plant for Tomorrow',
    description:
      'Ajak lebih banyak orang menanam dan merawat pohon di lingkungan sekitar.',
    category: 'Tree',
    participants: 210,
    progress: 54,
    daysLeft: 9,
    joined: false
  }
])

const featuredChallenge = computed(() => {
  return challenges.value[0]
})

const visibleChallenges = computed(() => {
  if (activeTab.value === 'mine') {
    return challenges.value.filter(
      challenge => challenge.joined
    )
  }

  return challenges.value.slice(1)
})

const totalParticipants = computed(() => {
  return challenges.value.reduce(
    (total, challenge) => total + challenge.participants,
    0
  )
})

const getChallengeIcon = (category) => {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastic')) {
    return Recycle
  }

  if (value.includes('transport')) {
    return Bike
  }

  if (value.includes('energy')) {
    return Droplets
  }

  if (value.includes('tree')) {
    return TreePine
  }

  return Globe2
}

const getChallengeStyle = (category) => {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastic')) {
    return 'bg-[#E8F8ED] text-[#22C55E]'
  }

  if (value.includes('transport')) {
    return 'bg-[#EAF4FF] text-[#3B82F6]'
  }

  if (value.includes('energy')) {
    return 'bg-[#FFF8D8] text-[#CA8A04]'
  }

  if (value.includes('tree')) {
    return 'bg-[#ECFDF5] text-[#059669]'
  }

  return 'bg-[#E8F8ED] text-[#22C55E]'
}

const goBack = () => {
  router.back()
}
</script>