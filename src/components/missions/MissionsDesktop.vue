<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1080px] px-6 pb-10">

      <!-- Header -->
      <DesktopPageHeader
        title="Quest"
        description="Tantangan kecil, perubahan besar."
      />

      <!-- Desktop Filters -->
      <section class="mb-6 flex items-center justify-between">
        <div class="flex gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.value"
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

        <button class="flex items-center gap-2 rounded-lg border border-[#E8EDE9] px-4 py-1.5 text-sm font-medium text-[#66736A] transition hover:bg-[#F8FAF8]">
          Filter
          <ChevronDown class="h-4 w-4" />
        </button>
      </section>

      <!-- Desktop List -->
      <section>
        <div class="space-y-4">
          <article
            v-for="mission in filteredMissions"
            :key="mission.id"
            class="flex items-center justify-between rounded-2xl border border-[#E8EDE9] bg-white p-6 transition hover:border-[#BBF7D0]"
          >
            <div class="flex flex-1 items-start gap-6">
              <!-- Icon -->
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                :class="getCategoryStyle(mission.category)"
              >
                <component :is="getCategoryIcon(mission.category)" class="h-7 w-7" />
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <h3 class="text-base font-bold text-[#17211B]">
                    {{ mission.title || 'Quest Title' }}
                  </h3>
                  <span
                    v-if="mission.completed"
                    class="rounded-full bg-[#F1F5F2] px-2.5 py-0.5 text-[10px] font-semibold text-[#66736A]"
                  >
                    Completed
                  </span>
                  <span
                    v-else-if="mission.progress"
                    class="rounded-full bg-[#EAF8EE] px-2.5 py-0.5 text-[10px] font-semibold text-[#15803D]"
                  >
                    Active
                  </span>
                  <span
                    v-else
                    class="rounded-full bg-[#F0FDF4] px-2.5 py-0.5 text-[10px] font-semibold text-[#16A34A] border border-[#DCFCE7]"
                  >
                    Recommended
                  </span>
                </div>

                <p class="mt-1 text-sm text-[#66736A]">
                  {{ mission.description || 'Description' }}
                </p>

                <!-- Progress -->
                <div v-if="mission.progress !== undefined && !mission.completed" class="mt-4 flex w-3/4 items-center gap-4">
                  <span class="w-20 text-xs text-[#66736A]">{{ mission.step || 'Day 2 of 3' }}</span>
                  <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5EFE8]">
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      :style="{ width: `${mission.progress}%` }"
                    ></div>
                  </div>
                  <span class="w-10 text-right text-xs font-bold text-[#22C55E]">{{ mission.progress }}%</span>
                </div>
              </div>
            </div>

            <!-- Action -->
            <div class="ml-6 flex flex-col items-end justify-center gap-4 border-l border-[#E8EDE9] pl-6">
              <span class="text-sm font-bold text-[#22C55E]">+{{ mission.xp || 50 }} XP</span>
              <RouterLink
                :to="getMissionLink(mission)"
                class="flex h-10 w-28 items-center justify-center rounded-xl text-sm font-semibold transition"
                :class="
                  mission.completed
                    ? 'bg-[#F1F5F2] text-[#66736A]'
                    : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
                "
              >
                {{ mission.completed ? 'Detail' : mission.progress ? 'Continue' : 'Start' }}
              </RouterLink>
            </div>
          </article>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'

defineProps({
  tabs: Array,
  activeTab: String,
  filteredMissions: Array,
  getMissionLink: Function,
  getCategoryIcon: Function,
  getCategoryStyle: Function
})

defineEmits(['update:activeTab'])
</script>
