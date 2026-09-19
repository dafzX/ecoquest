<template>
  <main class="mx-auto w-full max-w-[430px] px-4 pb-6 md:hidden">

    <!-- Header -->
    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Challenge Action
      </span>
    </header>

    <!-- Intro -->
    <section class="mb-3 mt-2">
      <h1 class="text-[17px] font-bold text-[#17211B]">
        Achievements
      </h1>
      <p class="mt-0.5 text-[10px] text-[#718078]">
        Koleksi pencapaianmu selama di EcoQuest.
      </p>
    </section>

    <!-- Summary -->
    <section class="mb-4 grid grid-cols-3 gap-2">
      <div class="rounded-xl border border-[#DCEBE0] bg-white p-3">
        <p class="text-[9px] font-medium text-[#98A39C]">Total</p>
        <p class="mt-1 text-[15px] font-bold text-[#17211B]">{{ totalCount }}</p>
      </div>

      <div class="rounded-xl border border-[#DCEBE0] bg-white p-3">
        <p class="text-[9px] font-medium text-[#98A39C]">Completed</p>
        <p class="mt-1 text-[15px] font-bold text-[#22C55E]">{{ completedCount }}</p>
      </div>

      <div class="rounded-xl border border-[#DCEBE0] bg-white p-3">
        <p class="text-[9px] font-medium text-[#98A39C]">Progress</p>
        <p class="mt-1 text-[15px] font-bold text-[#66736A]">{{ progressCount }}</p>
      </div>
    </section>

    <!-- Tabs -->
    <section class="mb-4">
      <div class="flex w-full rounded-xl border border-[#DCEBE0] bg-white p-1">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="flex h-8 flex-1 items-center justify-center rounded-lg text-[9px] font-semibold transition"
          :class="activeTab === tab.value ? 'bg-[#22C55E] text-white' : 'text-[#718078] hover:bg-[#F4FBF7]'"
          @click="$emit('update:activeTab', tab.value)"
        >
          {{ tab.label }}
          <span
            class="ml-1"
            :class="activeTab === tab.value ? 'text-white/70' : 'text-[#98A39C]'"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>
    </section>

    <!-- Section Header -->
    <section class="mb-2.5 flex items-center justify-between">
      <div>
        <h2 class="text-[11px] font-bold text-[#17211B]">
          {{ sectionTitle }}
        </h2>
      </div>
      <span class="rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]">
        {{ filteredAchievements.length }} pencapaian
      </span>
    </section>

    <!-- Achievement List -->
    <section v-if="filteredAchievements.length">
      <div class="space-y-2.5">
        <article
          v-for="achievement in filteredAchievements"
          :key="achievement.id"
          class="rounded-[12px] border border-[#DCEBE0] bg-white p-3.5"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              :class="achievement.unlocked ? 'bg-[#EAF8EE]' : 'bg-[#F1F5F2]'"
            >
              <Award
                class="h-5 w-5"
                :class="achievement.unlocked ? 'text-[#22C55E]' : 'text-[#98A39C]'"
              />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="text-[10px] font-bold leading-4 text-[#17211B]">
                    {{ achievement.title }}
                  </h3>
                </div>

                <span
                  class="shrink-0 rounded-full px-2 py-1 text-[7px] font-semibold"
                  :class="achievement.unlocked ? 'bg-[#EAF8EE] text-[#15803D]' : 'bg-[#F1F5F2] text-[#66736A]'"
                >
                  {{ achievement.unlocked ? 'Done' : 'Progress' }}
                </span>
              </div>
              <p class="mt-0.5 text-[8px] leading-[13px] text-[#718078]">
                {{ achievement.description }}
              </p>

              <div class="mt-2.5">
                <div
                  v-if="achievement.unlocked"
                  class="flex items-center gap-1 text-[8px] font-semibold text-[#22C55E]"
                >
                  <CheckCircle2 class="h-3 w-3" />
                  Achievement completed
                </div>
                <div
                  v-else
                  class="flex items-center gap-1 text-[8px] font-medium text-[#98A39C]"
                >
                  <Clock3 class="h-3 w-3" />
                  Still in progress
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Empty State -->
    <section
      v-else
      class="rounded-[12px] border border-dashed border-[#DCEBE0] bg-white px-5 py-10 text-center"
    >
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF8EE]">
        <Award class="h-5 w-5 text-[#22C55E]" />
      </div>
      <p class="mt-3 text-[11px] font-bold text-[#17211B]">
        {{ emptyTitle }}
      </p>
      <p class="mx-auto mt-1 max-w-[230px] text-[10px] leading-4 text-[#718078]">
        {{ emptyDescription }}
      </p>
    </section>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Award,
  CheckCircle2,
  Clock3,
  ArrowLeft
} from 'lucide-vue-next'

const props = defineProps({
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
  sectionTitle: {
    type: String,
    default: 'All Achievements'
  },
  emptyTitle: {
    type: String,
    default: 'Belum ada achievement'
  },
  emptyDescription: {
    type: String,
    default: 'Belum ada achievement yang tersedia saat ini.'
  }
})

defineEmits(['update:activeTab'])

const router = useRouter()
const goBack = () => {
  if (router) {
    router.back()
  } else {
    window.history.back()
  }
}

const totalCount = computed(() => {
  const tab = props.tabs.find(tab => tab.value === 'all')
  return tab?.count || 0
})

const completedCount = computed(() => {
  const tab = props.tabs.find(tab => tab.value === 'completed')
  return tab?.count || 0
})

const progressCount = computed(() => {
  const tab = props.tabs.find(tab => tab.value === 'progress')
  return tab?.count || 0
})
</script>