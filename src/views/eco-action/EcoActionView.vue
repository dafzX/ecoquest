<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">
      <main class="mx-auto max-w-[1080px] px-6 py-8">
        
        <!-- Header -->
        <div class="mb-8 flex items-end justify-between">
          <div>
            <h1 class="text-[24px] font-bold text-[#17211B]">Eco Action</h1>
            <p class="mt-1 text-sm text-[#66736A]">
              Catat aksi nyata kamu untuk mendapatkan XP dan memperbarui progress.
            </p>
          </div>
          <button
            class="flex h-10 items-center gap-2 rounded-xl bg-[#22C55E] px-4 text-sm font-semibold text-white transition hover:bg-[#15803D]"
          >
            <Plus class="h-4 w-4" />
            Record Eco Action
          </button>
        </div>

        <!-- Tabs -->
        <div class="mb-6 flex gap-8 border-b border-[#E8EDE9]">
          <button class="border-b-2 border-transparent pb-4 text-sm font-semibold text-[#98A39C] transition hover:text-[#17211B]">
            Recent
          </button>
          <button class="border-b-2 border-[#22C55E] pb-4 text-sm font-semibold text-[#17211B]">
            History
          </button>
        </div>

        <!-- List -->
        <div class="space-y-4">
          <div
            v-for="action in ecoActions"
            :key="action.id"
            class="flex items-center justify-between rounded-2xl border border-[#E8EDE9] bg-white p-5"
          >
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]">
                <Leaf class="h-6 w-6 text-[#22C55E]" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-[#17211B]">{{ action.title }}</h3>
                <p class="text-xs text-[#66736A]">{{ action.value }} • {{ action.impact }}</p>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <span class="text-sm font-bold text-[#22C55E]">+25 XP</span>
              <span class="text-xs text-[#66736A]">{{ action.date }}</span>
              <span class="inline-block rounded-full bg-[#EAF8EE] px-3 py-1 text-[10px] font-bold text-[#15803D]">
                {{ action.category }}
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
import { Plus, Leaf } from 'lucide-vue-next'
import { ecoActions } from '@/data/mockData'
</script>
