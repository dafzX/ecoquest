<template>
  <main class="hidden md:block">

    <div class="mx-auto max-w-270 px-6 pb-10">

      <!-- Header -->
      <DesktopPageHeader
        title="Misi"
        description="Tantangan kecil, perubahan besar."
      />

      <!-- Desktop Filters -->
      <section class="mb-6 flex items-center justify-between">

        <div class="flex gap-2">

          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="rounded-full px-4 py-1.5 text-sm font-semibold transition"
            :class="
              activeTab === tab.value
                ? 'bg-[#22C55E] text-white'
                : 'text-[#66736A] hover:bg-[#E8EDE9]'
            "
            @click="$emit('update:activeTab', tab.value)"
          >
            {{ tab.label }}
          </button>

        </div>

        <span class="text-xs text-[#98A39C]">
          {{ filteredMissions.length }} misi
        </span>

      </section>

      <!-- Desktop List -->
      <section>

        <!-- Quest Header -->
        <div class="mb-3 flex items-center justify-between">

          <h2 class="text-sm font-bold text-[#17211B]">
            {{
              activeTab === 'all'
                ? 'Semua Misi'
                : activeTab === 'active'
                  ? 'Misi Aktif'
                  : activeTab === 'completed'
                    ? 'Misi Selesai'
                    : 'Misi Rekomendasi'
            }}
          </h2>

        </div>

        <!-- Quest List -->
        <div
          v-if="filteredMissions.length"
          class="space-y-4"
        >

          <article
            v-for="mission in filteredMissions"
            :key="mission.id"
            class="flex items-center justify-between rounded-lg border border-[#E8EDE9] bg-linear-to-b from-white to-[#F8FAF8] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BBF7D0] hover:shadow-md"
          >

            <!-- Content -->
            <div class="flex min-w-0 flex-1 items-start gap-6">

              <!-- Icon -->
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg"
                :class="getCategoryStyle(mission.category)"
              >

                <component
                  :is="getCategoryIcon(mission.category)"
                  class="h-7 w-7"
                />

              </div>

              <!-- Info -->
              <div class="min-w-0 flex-1">

                <!-- Title -->
                <div class="flex items-center gap-3">

                  <h3 class="truncate text-base font-bold text-[#17211B]">
                    {{ mission.title || 'Judul Misi' }}
                  </h3>

                  <!-- Completed -->
                  <span
                    v-if="mission.completed"
                    class="shrink-0 rounded-full bg-[#F1F5F2] px-2.5 py-0.5 text-[10px] font-semibold text-[#66736A]"
                  >
                    Selesai
                  </span>

                  <!-- Active -->
                  <span
                    v-else-if="mission.progress"
                    class="shrink-0 rounded-full bg-[#EAF8EE] px-2.5 py-0.5 text-[10px] font-semibold text-[#15803D]"
                  >
                    Aktif
                  </span>

                  <!-- Recommended -->
                  <span
                    v-else
                    class="shrink-0 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] px-2.5 py-0.5 text-[10px] font-semibold text-[#16A34A]"
                  >
                    Rekomendasi
                  </span>

                </div>

                <!-- Description -->
                <p class="mt-1 text-sm text-[#66736A]">
                  {{ mission.description || 'Selesaikan misi untuk mendapatkan XP.' }}
                </p>

                <!-- Progress -->
                <div
                  v-if="
                    mission.progress !== undefined &&
                    !mission.completed
                  "
                  class="mt-4 flex w-3/4 items-center gap-4"
                >

                  <span class="w-20 shrink-0 text-xs text-[#66736A]">
                    {{ mission.step || 'Langkah 2 dari 3' }}
                  </span>

                  <div
                    class="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5EFE8]"
                  >
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{ width: `${mission.progress}%` }"
                    ></div>
                  </div>

                  <span
                    class="w-10 shrink-0 text-right text-xs font-bold text-[#22C55E]"
                  >
                    {{ mission.progress }}%
                  </span>

                </div>

                <!-- Completed -->
                <div
                  v-if="mission.completed"
                  class="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#22C55E]"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
                  Misi selesai
                </div>

              </div>
            </div>

            <!-- Action -->
            <div
              class="ml-6 flex w-37.5 shrink-0 flex-col items-end justify-center gap-4 border-l border-[#E8EDE9] pl-6"
            >

              <!-- XP -->
              <span class="text-sm font-bold text-[#22C55E]">
                +{{ mission.xp || 50 }} XP
              </span>

              <!-- Action Button -->
              <RouterLink
                :to="{
                  name: 'MissionDetail',
                  params: {
                    id: mission.id
                  }
                }"
                class="flex h-10 w-28 items-center justify-center rounded-xl text-sm font-semibold transition"
                :class="
                  mission.completed
                    ? 'bg-[#F1F5F2] text-[#66736A] hover:bg-[#E8EDE9]'
                    : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
                "
              >
                {{
                  mission.completed
                    ? 'Lihat Detail'
                    : mission.progress
                      ? 'Lanjutkan'
                      : 'Mulai Misi'
                }}
              </RouterLink>

            </div>

          </article>

        </div>

        <!-- Empty State -->
        <div
          v-else
          class="rounded-lg border border-dashed border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] px-6 py-16 text-center shadow-sm"
        >

          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#E8F8ED]"
          >
            <Search class="h-6 w-6 text-[#22C55E]" />
          </div>

          <p class="mt-4 text-sm font-semibold text-[#17211B]">
            Tidak ada misi
          </p>

          <p class="mt-1 text-xs text-[#718078]">
            Belum ada misi pada kategori ini.
          </p>

        </div>

      </section>

    </div>
  </main>
</template>

<script setup>
import { Search } from 'lucide-vue-next'
import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'

defineProps({
  tabs: Array,
  activeTab: String,
  filteredMissions: Array,
  getCategoryIcon: Function,
  getCategoryStyle: Function
})

defineEmits(['update:activeTab'])
</script>