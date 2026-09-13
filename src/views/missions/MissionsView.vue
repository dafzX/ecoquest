<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <!-- Mobile Header -->
        <MobileHeader />

        <!-- Page Intro -->
        <section class="mb-4">
          <h2 class="text-[17px] font-bold text-[#17211B]">
            Quest & Misi
          </h2>

          <p class="mt-0.5 text-[9px] text-[#718078]">
            Selesaikan quest dan dapatkan XP.
          </p>
        </section>

        <!-- Tabs -->
        <div
          class="mb-4 flex rounded-xl border border-[#DCEBE0] bg-white p-1"
        >
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="flex-1 rounded-lg py-2 text-[9px] font-semibold transition"
            :class="
              activeTab === tab.value
                ? 'bg-[#22C55E] text-white'
                : 'text-[#718078]'
            "
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Quest List -->
        <section>

          <div class="mb-2 flex items-center justify-between">
            <h2 class="text-[11px] font-bold text-[#17211B]">
              {{ sectionTitle }}
            </h2>

            <span class="text-[8px] text-[#98A39C]">
              {{ filteredMissions.length }} quest
            </span>
          </div>

          <div
            v-if="filteredMissions.length"
            class="space-y-2.5"
          >

            <article
              v-for="mission in filteredMissions"
              :key="mission.id"
              class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
            >

              <div class="flex gap-3">

                <!-- Icon -->
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  :class="getCategoryStyle(mission.category)"
                >
                  <component
                    :is="getCategoryIcon(mission.category)"
                    class="h-5 w-5"
                  />
                </div>

                <!-- Content -->
                <div class="min-w-0 flex-1">

                  <div class="flex items-start justify-between gap-2">

                    <div class="min-w-0">
                      <h3
                        class="truncate text-[10px] font-bold text-[#17211B]"
                      >
                        {{ mission.title || 'Reduce Plastic' }}
                      </h3>

                      <p class="mt-0.5 text-[8px] text-[#718078]">
                        {{ mission.step || 'Step 2 of 3' }}
                      </p>
                    </div>

                    <span
                      class="shrink-0 text-[9px] font-semibold text-[#22C55E]"
                    >
                      +{{ mission.xp || 75 }} XP
                    </span>

                  </div>

                  <p class="mt-1 text-[8px] leading-3 text-[#718078]">
                    {{
                      mission.description ||
                      'Selesaikan quest untuk mendapatkan XP.'
                    }}
                  </p>

                  <!-- Progress -->
                  <div
                    v-if="
                      mission.progress !== undefined &&
                      !mission.completed
                    "
                    class="mt-2"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-[7px] text-[#98A39C]">
                        Progress
                      </span>

                      <span class="text-[7px] font-semibold text-[#22C55E]">
                        {{ mission.progress }}%
                      </span>
                    </div>

                    <div
                      class="mt-1 h-[4px] overflow-hidden rounded-full bg-[#E5EFE8]"
                    >
                      <div
                        class="h-full rounded-full bg-[#22C55E]"
                        :style="{
                          width: `${mission.progress}%`
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- Completed -->
                  <div
                    v-if="mission.completed"
                    class="mt-2 flex items-center gap-1 text-[7px] font-medium text-[#22C55E]"
                  >
                    <CheckCircle2 class="h-3 w-3" />
                    Quest selesai
                  </div>

                </div>
              </div>

              <!-- Action -->
              <RouterLink
                :to="getMissionLink(mission)"
                class="mt-3 flex h-7 items-center justify-center rounded-lg text-[8px] font-semibold transition"
                :class="
                  mission.completed
                    ? 'bg-[#F1F5F2] text-[#718078]'
                    : 'bg-[#22C55E] text-white'
                "
              >
                {{
                  mission.completed
                    ? 'Lihat Detail'
                    : mission.progress
                      ? 'Lanjutkan'
                      : 'Mulai Quest'
                }}

                <ArrowRight class="ml-1 h-3 w-3" />
              </RouterLink>

            </article>

          </div>

          <!-- Empty -->
          <div
            v-else
            class="rounded-[12px] border border-dashed border-[#DCEBE0] bg-white px-5 py-10 text-center"
          >
            <Search class="mx-auto h-6 w-6 text-[#22C55E]" />

            <p class="mt-3 text-[10px] font-semibold text-[#17211B]">
              Tidak ada quest
            </p>

            <p class="mt-1 text-[8px] text-[#718078]">
              Belum ada quest pada kategori ini.
            </p>
          </div>

        </section>

        <!-- Community Challenges -->
        <section class="mt-6">

          <div class="mb-2 flex items-end justify-between">

            <div>
              <h2 class="text-[11px] font-bold text-[#17211B]">
                Community Challenges
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Tantangan bersama EcoQuest Explorer lainnya.
              </p>
            </div>

            <RouterLink
              to="/challenges"
              class="flex items-center gap-1 text-[8px] font-semibold text-[#15803D]"
            >
              Lihat Semua
              <ArrowRight class="h-3 w-3" />
            </RouterLink>

          </div>

          <!-- Challenge Card -->
          <article
            class="overflow-hidden rounded-[12px] border border-[#DCEBE0] bg-white"
          >

            <!-- Challenge Header -->
            <div class="bg-[#15803D] p-3.5">

              <div class="flex items-start justify-between gap-3">

                <div class="flex min-w-0 items-center gap-3">

                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"
                  >
                    <Trophy class="h-5 w-5 text-white" />
                  </div>

                  <div class="min-w-0">

                    <p class="text-[7px] font-semibold text-white/70">
                      COMMUNITY CHALLENGE
                    </p>

                    <h3 class="mt-0.5 truncate text-[11px] font-bold text-white">
                      Plastic Reduction Week
                    </h3>

                  </div>

                </div>

                <span
                  class="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[7px] font-semibold text-white"
                >
                  7 hari
                </span>

              </div>

            </div>

            <!-- Challenge Content -->
            <div class="p-3.5">

              <p class="text-[8px] leading-4 text-[#718078]">
                Kurangi penggunaan plastik sekali pakai dan ajak
                komunitasmu melakukan aksi nyata.
              </p>

              <div class="mt-3 flex items-center justify-between">

                <div>
                  <p class="text-[7px] text-[#98A39C]">
                    Peserta
                  </p>

                  <p class="mt-0.5 text-[10px] font-bold text-[#17211B]">
                    320 Explorer
                  </p>
                </div>

                <div class="text-right">
                  <p class="text-[7px] text-[#98A39C]">
                    Progress
                  </p>

                  <p class="mt-0.5 text-[10px] font-bold text-[#22C55E]">
                    68%
                  </p>
                </div>

              </div>

              <div
                class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full w-[68%] rounded-full bg-[#22C55E]"
                ></div>
              </div>

              <RouterLink
                to="/challenges"
                class="mt-3 flex h-7 items-center justify-center gap-1 rounded-lg bg-[#22C55E] text-[8px] font-semibold text-white transition active:scale-[0.98]"
              >
                Lihat Challenge
                <ArrowRight class="h-3 w-3" />
              </RouterLink>

            </div>

          </article>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-[1400px] px-6 pb-10">

          <!-- Header -->
          <section class="mb-7 flex items-end justify-between">

            <div>

              <p class="mb-1 text-sm font-medium text-[#22C55E]">
                Perjalanan Eco-mu
              </p>

              <h1 class="text-[28px] font-bold text-[#17211B]">
                Quest & Misi
              </h1>

              <p class="mt-1 text-sm text-[#66736A]">
                Selesaikan quest dan bangun kebiasaan ramah lingkungan.
              </p>

            </div>

            <div class="flex gap-3">

              <div
                class="rounded-xl border border-[#E8EDE9] bg-white px-4 py-3"
              >
                <p class="text-[10px] text-[#98A39C]">
                  Total XP
                </p>

                <p class="mt-1 text-sm font-bold text-[#17211B]">
                  {{ currentUser.xp?.toLocaleString('id-ID') || 1240 }} XP
                </p>
              </div>

              <div
                class="rounded-xl border border-[#E8EDE9] bg-white px-4 py-3"
              >
                <p class="text-[10px] text-[#98A39C]">
                  Streak
                </p>

                <p class="mt-1 text-sm font-bold text-[#17211B]">
                  🔥 {{ currentUser.streak || 7 }} hari
                </p>
              </div>

            </div>

          </section>

          <!-- Desktop Filters -->
          <section class="mb-5 flex items-center justify-between">

            <div
              class="flex rounded-xl border border-[#E8EDE9] bg-white p-1"
            >

              <button
                v-for="tab in tabs"
                :key="tab.value"
                type="button"
                class="rounded-lg px-5 py-2 text-xs font-medium transition"
                :class="
                  activeTab === tab.value
                    ? 'bg-[#22C55E] text-white'
                    : 'text-[#66736A] hover:text-[#17211B]'
                "
                @click="activeTab = tab.value"
              >
                {{ tab.label }}

                <span
                  v-if="tab.count !== undefined"
                  class="ml-1"
                >
                  {{ tab.count }}
                </span>
              </button>

            </div>

            <div class="relative w-[250px]">

              <Search
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A39C]"
              />

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari quest..."
                class="h-10 w-full rounded-xl border border-[#E8EDE9] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#86EFAC]"
              />

            </div>

          </section>

          <!-- Desktop List -->
          <section>

            <div class="mb-4">

              <h2 class="text-base font-bold text-[#17211B]">
                {{ sectionTitle }}
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                {{ filteredMissions.length }} quest tersedia
              </p>

            </div>

            <div class="grid grid-cols-2 gap-4 xl:grid-cols-3">

              <article
                v-for="mission in filteredMissions"
                :key="mission.id"
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0] hover:shadow-sm"
              >

                <div class="flex items-start justify-between">

                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-xl"
                    :class="getCategoryStyle(mission.category)"
                  >
                    <component
                      :is="getCategoryIcon(mission.category)"
                      class="h-5 w-5"
                    />
                  </div>

                  <span
                    v-if="mission.completed"
                    class="rounded-full bg-[#DCFCE7] px-2 py-1 text-[9px] font-semibold text-[#15803D]"
                  >
                    Selesai
                  </span>

                  <span
                    v-else-if="mission.progress"
                    class="rounded-full bg-[#FEF3C7] px-2 py-1 text-[9px] font-semibold text-[#A16207]"
                  >
                    Berjalan
                  </span>

                  <span
                    v-else
                    class="rounded-full bg-[#F1F5F2] px-2 py-1 text-[9px] font-semibold text-[#66736A]"
                  >
                    Baru
                  </span>

                </div>

                <p
                  class="mt-4 text-[10px] font-semibold uppercase text-[#22C55E]"
                >
                  {{ mission.category || 'Eco Life' }}
                </p>

                <h3 class="mt-1.5 text-sm font-bold text-[#17211B]">
                  {{ mission.title || 'Eco Quest' }}
                </h3>

                <p class="mt-1 text-xs leading-5 text-[#66736A]">
                  {{
                    mission.description ||
                    'Selesaikan quest untuk mendapatkan XP.'
                  }}
                </p>

                <!-- Progress -->
                <div
                  v-if="mission.progress && !mission.completed"
                  class="mt-5"
                >

                  <div class="mb-1.5 flex justify-between">

                    <span class="text-[10px] text-[#98A39C]">
                      Progress
                    </span>

                    <span class="text-[10px] font-semibold text-[#22C55E]">
                      {{ mission.progress }}%
                    </span>

                  </div>

                  <div class="h-1.5 rounded-full bg-[#E5EFE8]">

                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{
                        width: `${mission.progress}%`
                      }"
                    ></div>

                  </div>

                </div>

                <!-- Action -->
                <div
                  class="mt-5 flex items-center justify-between border-t border-[#EEF2EF] pt-4"
                >

                  <div class="flex items-center gap-1.5">

                    <Zap class="h-4 w-4 text-[#CA8A04]" />

                    <span class="text-xs font-semibold text-[#17211B]">
                      +{{ mission.xp || 50 }} XP
                    </span>

                  </div>

                  <RouterLink
                    :to="getMissionLink(mission)"
                    class="flex h-8 items-center gap-1 rounded-lg px-3 text-[10px] font-semibold"
                    :class="
                      mission.completed
                        ? 'bg-[#F1F5F2] text-[#66736A]'
                        : 'bg-[#22C55E] text-white'
                    "
                  >
                    {{
                      mission.completed
                        ? 'Detail'
                        : mission.progress
                          ? 'Lanjutkan'
                          : 'Mulai'
                    }}

                    <ArrowRight class="h-3 w-3" />
                  </RouterLink>

                </div>

              </article>

            </div>

          </section>

          <!-- Desktop Community Challenges -->
          <section class="mt-8">

            <div class="mb-4 flex items-end justify-between">

              <div>

                <h2 class="text-base font-bold text-[#17211B]">
                  Community Challenges
                </h2>

                <p class="mt-1 text-xs text-[#98A39C]">
                  Ikuti tantangan bersama EcoQuest Explorer lainnya.
                </p>

              </div>

              <RouterLink
                to="/challenges"
                class="flex items-center gap-1.5 text-xs font-semibold text-[#15803D]"
              >
                Lihat Semua
                <ArrowRight class="h-3.5 w-3.5" />
              </RouterLink>

            </div>

            <div class="grid gap-4 lg:grid-cols-2">

              <!-- Challenge 1 -->
              <article
                class="overflow-hidden rounded-2xl border border-[#DCEBE0] bg-white"
              >

                <div
                  class="flex items-center justify-between bg-[#15803D] px-5 py-4"
                >

                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
                    >
                      <Trophy class="h-5 w-5 text-white" />
                    </div>

                    <div>

                      <p class="text-[9px] font-semibold text-white/70">
                        COMMUNITY CHALLENGE
                      </p>

                      <h3 class="mt-0.5 text-sm font-bold text-white">
                        Plastic Reduction Week
                      </h3>

                    </div>

                  </div>

                  <span
                    class="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-semibold text-white"
                  >
                    7 hari
                  </span>

                </div>

                <div class="p-5">

                  <p class="text-xs leading-5 text-[#66736A]">
                    Kurangi penggunaan plastik sekali pakai dan ajak
                    komunitasmu melakukan aksi nyata.
                  </p>

                  <div class="mt-4 flex items-center justify-between">

                    <div>

                      <p class="text-[10px] text-[#98A39C]">
                        Peserta
                      </p>

                      <p class="mt-1 text-sm font-bold text-[#17211B]">
                        320 Explorer
                      </p>

                    </div>

                    <div class="text-right">

                      <p class="text-[10px] text-[#98A39C]">
                        Progress
                      </p>

                      <p class="mt-1 text-sm font-bold text-[#22C55E]">
                        68%
                      </p>

                    </div>

                  </div>

                  <div
                    class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E5EFE8]"
                  >
                    <div
                      class="h-full w-[68%] rounded-full bg-[#22C55E]"
                    ></div>
                  </div>

                  <RouterLink
                    to="/challenges"
                    class="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#22C55E] text-[10px] font-semibold text-white transition hover:bg-[#15803D]"
                  >
                    Lihat Challenge
                    <ArrowRight class="h-3.5 w-3.5" />
                  </RouterLink>

                </div>

              </article>

              <!-- Challenge 2 -->
              <article
                class="overflow-hidden rounded-2xl border border-[#DCEBE0] bg-white"
              >

                <div
                  class="flex items-center justify-between bg-[#1D4ED8] px-5 py-4"
                >

                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
                    >
                      <Bike class="h-5 w-5 text-white" />
                    </div>

                    <div>

                      <p class="text-[9px] font-semibold text-white/70">
                        COMMUNITY CHALLENGE
                      </p>

                      <h3 class="mt-0.5 text-sm font-bold text-white">
                        Green Transport Challenge
                      </h3>

                    </div>

                  </div>

                  <span
                    class="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-semibold text-white"
                  >
                    12 hari
                  </span>

                </div>

                <div class="p-5">

                  <p class="text-xs leading-5 text-[#66736A]">
                    Gunakan sepeda atau transportasi umum untuk
                    perjalanan sehari-hari.
                  </p>

                  <div class="mt-4 flex items-center justify-between">

                    <div>

                      <p class="text-[10px] text-[#98A39C]">
                        Peserta
                      </p>

                      <p class="mt-1 text-sm font-bold text-[#17211B]">
                        154 Explorer
                      </p>

                    </div>

                    <div class="text-right">

                      <p class="text-[10px] text-[#98A39C]">
                        Progress
                      </p>

                      <p class="mt-1 text-sm font-bold text-[#3B82F6]">
                        45%
                      </p>

                    </div>

                  </div>

                  <div
                    class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E8F0FF]"
                  >
                    <div
                      class="h-full w-[45%] rounded-full bg-[#3B82F6]"
                    ></div>
                  </div>

                  <RouterLink
                    to="/challenges"
                    class="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#22C55E] text-[10px] font-semibold text-white transition hover:bg-[#15803D]"
                  >
                    Lihat Challenge
                    <ArrowRight class="h-3.5 w-3.5" />
                  </RouterLink>

                </div>

              </article>

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
  Search,
  ArrowRight,
  CheckCircle2,
  Zap,
  Recycle,
  Bike,
  Droplets,
  TreePine,
  Lightbulb,
  Trophy
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  user,
  missions
} from '@/data/mockData.js'

const currentUser = ref({
  ...user
})

const missionList = ref(
  missions.map((mission) => ({
    ...mission
  }))
)

const activeTab = ref('all')
const searchQuery = ref('')

const tabs = computed(() => [
  {
    label: 'All',
    value: 'all',
    count: missionList.value.length
  },
  {
    label: 'Active',
    value: 'active',
    count: missionList.value.filter(
      mission => !mission.completed
    ).length
  },
  {
    label: 'Completed',
    value: 'completed',
    count: missionList.value.filter(
      mission => mission.completed
    ).length
  }
])

const filteredMissions = computed(() => {
  let result = [...missionList.value]

  if (activeTab.value === 'active') {
    result = result.filter(
      mission => !mission.completed
    )
  }

  if (activeTab.value === 'completed') {
    result = result.filter(
      mission => mission.completed
    )
  }

  if (searchQuery.value.trim()) {
    const keyword = searchQuery.value
      .toLowerCase()
      .trim()

    result = result.filter(mission => {
      const title =
        mission.title?.toLowerCase() || ''

      const description =
        mission.description?.toLowerCase() || ''

      const category =
        mission.category?.toLowerCase() || ''

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      )
    })
  }

  return result
})

const sectionTitle = computed(() => {
  if (activeTab.value === 'active') {
    return 'Quest Aktif'
  }

  if (activeTab.value === 'completed') {
    return 'Quest Selesai'
  }

  return 'Semua Quest'
})

const getMissionLink = (mission) => {
  if (mission.link) {
    return mission.link
  }

  if (mission.id) {
    return `/missions/${mission.id}`
  }

  return '/missions'
}

const getCategoryIcon = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return Recycle
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return Bike
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return Droplets
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return TreePine
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return Lightbulb
  }

  return Leaf
}

const getCategoryStyle = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return 'bg-[#E8F8ED] text-[#22C55E]'
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return 'bg-[#EAF4FF] text-[#3B82F6]'
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return 'bg-[#E8F6FF] text-[#0284C7]'
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return 'bg-[#ECFDF5] text-[#059669]'
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return 'bg-[#FFF8D8] text-[#CA8A04]'
  }

  return 'bg-[#E8F8ED] text-[#22C55E]'
}
</script>