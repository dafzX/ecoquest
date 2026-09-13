<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">
      <main class="mx-auto max-w-[1080px] px-6 py-8">
        
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-[24px] font-bold text-[#17211B]">Achievements</h1>
          <p class="mt-1 text-sm text-[#66736A]">
            Koleksi pencapaianmu selama di EcoQuest.
          </p>
        </div>

        <!-- Tabs -->
        <div class="mb-6 flex gap-4">
          <button class="rounded-full bg-[#EAF8EE] px-4 py-1.5 text-sm font-semibold text-[#15803D]">
            All
          </button>
          <button class="rounded-full px-4 py-1.5 text-sm font-medium text-[#66736A] transition hover:bg-[#E8EDE9]">
            In Progress
          </button>
          <button class="rounded-full px-4 py-1.5 text-sm font-medium text-[#66736A] transition hover:bg-[#E8EDE9]">
            Completed
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="flex flex-col rounded-2xl border border-[#E8EDE9] bg-white p-5 text-center"
          >
            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
              :class="achievement.unlocked ? 'bg-[#EAF8EE]' : 'bg-[#F1F5F2] opacity-60'"
            >
              <Award
                class="h-8 w-8"
                :class="achievement.unlocked ? 'text-[#22C55E]' : 'text-[#98A39C]'"
              />
            </div>
            
            <h3 class="mt-4 text-sm font-bold text-[#17211B]">{{ achievement.title }}</h3>
            <p class="mt-1 text-xs text-[#66736A]">{{ achievement.description }}</p>
            
            <div class="mt-auto pt-4">
              <span
                v-if="achievement.unlocked"
                class="inline-block rounded-full bg-[#EAF8EE] px-3 py-1 text-[10px] font-bold text-[#15803D]"
              >
                Completed
              </span>
              <span
                v-else
                class="inline-block rounded-full bg-[#F1F5F2] px-3 py-1 text-[10px] font-medium text-[#66736A]"
              >
                In Progress
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Award } from 'lucide-vue-next'
import { achievements } from '@/data/mockData'
</script>
