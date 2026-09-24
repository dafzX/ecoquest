<template>
  <main class="mx-auto max-w-107.5 px-4 pb-24 md:hidden">

    <!-- Mobile Header -->
    <MobileHeader />

    <!-- Page Intro -->
    <section class="mb-4">
      <h2 class="text-[17px] font-bold text-[#17211B]">
        Misi & Tantangan
      </h2>

      <p class="mt-0.5 text-[9px] text-[#718078]">
        Selesaikan misi dan dapatkan XP.
      </p>
    </section>

    <!-- Tabs -->
    <div class="mb-4 w-full overflow-x-auto scrollbar-hide">
      <div class="flex w-full min-w-max gap-1 rounded-xl border border-[#DCEBE0] bg-white p-1">

        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-center text-[10px] font-semibold transition hover:bg-[#F8FAF8]"
          :class="
            activeTab === tab.value
              ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]'
              : 'text-[#718078]'
          "
          @click="$emit('update:activeTab', tab.value)"
        >
          {{ tab.label }}
        </button>

      </div>
    </div>

    <!-- Quest List -->
    <section>
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-[11px] font-bold text-[#17211B]">
          {{ sectionTitle }}
        </h2>

        <span class="text-[8px] text-[#98A39C]">
          {{ filteredMissions.length }} misi
        </span>
      </div>

      <div v-if="filteredMissions.length" class="space-y-2.5">

        <article
          v-for="mission in filteredMissions"
          :key="mission.id"
          class="rounded-lg border border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] p-3 shadow-sm transition-all duration-300 active:scale-[0.98]"
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
                  <h3 class="truncate text-[10px] font-bold text-[#17211B]">
                    {{ mission.title || 'Kurangi Penggunaan Plastik' }}
                  </h3>

                  <p class="mt-0.5 text-[8px] text-[#718078]">
                    {{ mission.step || 'Langkah 2 dari 3' }}
                  </p>
                </div>

                <span class="shrink-0 text-[9px] font-semibold text-[#22C55E]">
                  +{{ mission.xp || 75 }} XP
                </span>

              </div>

              <p class="mt-1 text-[8px] leading-3 text-[#718078]">
                {{ mission.description || 'Selesaikan misi untuk mendapatkan XP.' }}
              </p>

              <!-- Progress -->
              <div
                v-if="mission.progress !== undefined && !mission.completed"
                class="mt-2"
              >

                <div class="flex items-center justify-between">
                  <span class="text-[7px] text-[#98A39C]">
                    Kemajuan
                  </span>

                  <span class="text-[7px] font-semibold text-[#22C55E]">
                    {{ mission.progress }}%
                  </span>
                </div>

                <div class="mt-1 h-1 overflow-hidden rounded-full bg-[#E5EFE8]">
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    :style="{ width: `${mission.progress}%` }"
                  ></div>
                </div>

              </div>

              <!-- Completed -->
              <div
                v-if="mission.completed"
                class="mt-2 flex items-center gap-1 text-[7px] font-medium text-[#22C55E]"
              >
                <CheckCircle2 class="h-3 w-3" />
                Misi selesai
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
                  : 'Mulai Misi'
            }}

            <ArrowRight class="ml-1 h-3 w-3" />
          </RouterLink>

        </article>

      </div>

      <!-- Empty -->
      <div
        v-else
        class="rounded-lg border border-dashed border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] px-5 py-10 text-center shadow-sm"
      >

        <Search class="mx-auto h-6 w-6 text-[#22C55E]" />

        <p class="mt-3 text-[10px] font-semibold text-[#17211B]">
          Tidak ada misi
        </p>

        <p class="mt-1 text-[8px] text-[#718078]">
          Belum ada misi pada kategori ini.
        </p>

      </div>
    </section>

    <!-- Community Challenges -->
    <section class="mt-6">

      <div class="mb-2 flex items-end justify-between">

        <div>
          <h2 class="text-[11px] font-bold text-[#17211B]">
            Tantangan Komunitas
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
        class="overflow-hidden rounded-lg border border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] shadow-sm transition-all duration-300 active:scale-[0.98]"
      >

        <!-- Challenge Header -->
        <div class="bg-[#15803D] p-3.5">

          <div class="flex items-start justify-between gap-3">

            <div class="flex min-w-0 items-center gap-3">

              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Trophy class="h-5 w-5 text-white" />
              </div>

              <div class="min-w-0">

                <p class="text-[7px] font-semibold text-white/70">
                  TANTANGAN KOMUNITAS
                </p>

                <h3 class="mt-0.5 truncate text-[11px] font-bold text-white">
                  Minggu Bebas Plastik
                </h3>

              </div>

            </div>

            <span class="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[7px] font-semibold text-white">
              7 hari
            </span>

          </div>
        </div>

        <!-- Challenge Content -->
        <div class="p-3.5">

          <p class="text-[8px] leading-4 text-[#718078]">
            Kurangi penggunaan plastik sekali pakai dan ajak komunitasmu melakukan aksi nyata.
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
                Kemajuan
              </p>

              <p class="mt-0.5 text-[10px] font-bold text-[#22C55E]">
                68%
              </p>

            </div>

          </div>

          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5EFE8]">
            <div class="h-full w-[68%] rounded-full bg-[#22C55E]"></div>
          </div>

          <RouterLink
            to="/challenges"
            class="mt-3 flex h-7 items-center justify-center gap-1 rounded-lg bg-[#22C55E] text-[8px] font-semibold text-white transition active:scale-[0.98]"
          >
            Lihat Tantangan
            <ArrowRight class="h-3 w-3" />
          </RouterLink>

        </div>
      </article>

    </section>

  </main>
</template>

<script setup>
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Trophy
} from 'lucide-vue-next'

import MobileHeader from '@/components/navigation/MobileHeader.vue'

defineProps({
  tabs: Array,
  activeTab: String,
  filteredMissions: Array,
  sectionTitle: String,
  getMissionLink: Function,
  getCategoryIcon: Function,
  getCategoryStyle: Function
})

defineEmits(['update:activeTab'])
</script>