<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-270 px-6 py-8">

      <!-- Header -->
      <section class="mb-7">
        <h1 class="text-[24px] font-bold tracking-tight text-[#17211B]">
          Pencapaian
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          Koleksi pencapaianmu selama di EcoQuest.
        </p>
      </section>

      <!-- Summary -->
      <section class="mb-7 grid grid-cols-3 gap-4">

        <!-- Total -->
        <div
          class="rounded-lg border border-[#E8EDE9] bg-white px-5 py-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-[#98A39C]">
                Total Pencapaian
              </p>

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ filteredAchievements.length }}
              </p>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
            >
              <Award class="h-5 w-5 text-[#22C55E]" />
            </div>
          </div>
        </div>

        <!-- Completed -->
        <div
          class="rounded-lg border border-[#E8EDE9] bg-white px-5 py-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-[#98A39C]">
                Selesai
              </p>

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ completedCount }}
              </p>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
            >
              <CheckCircle2 class="h-5 w-5 text-[#22C55E]" />
            </div>
          </div>
        </div>

        <!-- In Progress -->
        <div
          class="rounded-lg border border-[#E8EDE9] bg-white px-5 py-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-[#98A39C]">
                Sedang Berjalan
              </p>

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ inProgressCount }}
              </p>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F2]"
            >
              <Target class="h-5 w-5 text-[#66736A]" />
            </div>
          </div>
        </div>

      </section>

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
            {{
              tab.value === 'all'
                ? 'Semua'
                : tab.value === 'progress'
                ? 'Sedang Berjalan'
                : 'Selesai'
            }}
          </button>
        </div>
      </section>

      <!-- Section Header -->
      <section class="mb-4 flex items-end justify-between">
        <div>
          <h2 class="text-sm font-bold text-[#17211B]">
            {{ sectionTitle }}
          </h2>

          <p class="mt-0.5 text-xs text-[#98A39C]">
            {{ filteredAchievements.length }} pencapaian
          </p>
        </div>
      </section>

      <!-- Achievement Grid -->
      <section v-if="filteredAchievements.length">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <article
            v-for="achievement in filteredAchievements"
            :key="achievement.id"
            class="group flex min-h-58.75 flex-col rounded-lg border border-[#E8EDE9] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#BBF7D0] hover:shadow-sm"
          >

            <!-- Top -->
            <div class="flex items-start justify-between">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-lg"
                :class="
                  achievement.unlocked
                    ? 'bg-[#EAF8EE]'
                    : 'bg-[#F1F5F2]'
                "
              >
                <Award
                  class="h-7 w-7"
                  :class="
                    achievement.unlocked
                      ? 'text-[#22C55E]'
                      : 'text-[#98A39C]'
                  "
                />
              </div>

              <span
                class="rounded-full px-2.5 py-1 text-[9px] font-semibold"
                :class="
                  achievement.unlocked
                    ? 'bg-[#EAF8EE] text-[#15803D]'
                    : 'bg-[#F1F5F2] text-[#66736A]'
                "
              >
                {{ achievement.unlocked ? 'Terbuka' : 'Terkunci' }}
              </span>
            </div>

            <!-- Content -->
            <div class="mt-5">
              <h3 class="text-sm font-bold leading-5 text-[#17211B]">
                {{ achievement.title }}
              </h3>

              <p class="mt-1.5 text-xs leading-5 text-[#66736A]">
                {{ achievement.description }}
              </p>
            </div>

            <!-- Status -->
            <div class="mt-auto pt-5">
              <div
                v-if="achievement.unlocked"
                class="flex items-center gap-1.5 text-[10px] font-semibold text-[#15803D]"
              >
                <CheckCircle2 class="h-3.5 w-3.5" />
                Pencapaian selesai
              </div>

              <div
                v-else
                class="flex items-center gap-1.5 text-[10px] font-medium text-[#98A39C]"
              >
                <Clock3 class="h-3.5 w-3.5" />
                Masih berjalan
              </div>
            </div>

          </article>
        </div>
      </section>

      <!-- Empty -->
      <section
        v-else
        class="rounded-lg border border-dashed border-[#DCEBE0] bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF8EE]"
        >
          <Award class="h-7 w-7 text-[#22C55E]" />
        </div>

        <h3 class="mt-4 text-sm font-bold text-[#17211B]">
          {{ emptyTitle }}
        </h3>

        <p class="mx-auto mt-1 max-w-md text-xs leading-5 text-[#66736A]">
          {{ emptyDescription }}
        </p>
      </section>

    </div>
  </main>
</template>

<script setup>
import {
  Award,
  CheckCircle2,
  Target,
  Clock3
} from 'lucide-vue-next'

defineProps({
  tabs: {
    type: Array,
    default: () => []
  },

  activeTab: {
    type: String,
    default: 'all'
  },

  filteredAchievements: {
    type: Array,
    default: () => []
  },

  completedCount: {
    type: Number,
    default: 0
  },

  inProgressCount: {
    type: Number,
    default: 0
  },

  sectionTitle: {
    type: String,
    default: 'Semua Pencapaian'
  },

  emptyTitle: {
    type: String,
    default: 'Belum ada pencapaian'
  },

  emptyDescription: {
    type: String,
    default: 'Belum ada pencapaian yang tersedia saat ini.'
  }
})

defineEmits(['update:activeTab'])
</script>