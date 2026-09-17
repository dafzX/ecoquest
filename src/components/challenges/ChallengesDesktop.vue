<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1080px] px-6 pb-10">

      <!-- Header -->
      <DesktopPageHeader
        title="Challenges"
        description="Bersama kita bisa lebih berdampak!"
      />

      <!-- Tabs -->
      <div class="mb-6 flex gap-4 border-b border-[#E8EDE9]">
        <button
          class="border-b-2 pb-3 text-sm font-semibold transition"
          :class="activeTab === 'community' ? 'border-[#22C55E] text-[#17211B]' : 'border-transparent text-[#98A39C] hover:text-[#17211B]'"
          @click="$emit('update:activeTab', 'community')"
        >
          Community Quest
        </button>
        <button
          class="border-b-2 pb-3 text-sm font-semibold transition"
          :class="activeTab === 'mine' ? 'border-[#22C55E] text-[#17211B]' : 'border-transparent text-[#98A39C] hover:text-[#17211B]'"
          @click="$emit('update:activeTab', 'mine')"
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
                <span class="ml-1 text-xs text-[#15803D]/70">selesai</span>
              </div>
              <div>
                <div class="flex items-center gap-1.5 text-[#15803D]">
                  <Users class="h-4 w-4" />
                  <span class="text-sm font-bold">{{ featuredChallenge.participants }}</span>
                </div>
                <span class="text-xs text-[#15803D]/70">peserta</span>
              </div>
            </div>
          </div>
          
          <div class="absolute right-12 bottom-0 h-40 w-48 opacity-90 hidden lg:block">
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
                <span class="text-[#66736A]">{{ challenge.participants }} peserta</span>
              </div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-[#E5EFE8]">
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  :style="{ width: `${challenge.progress}%` }"
                ></div>
              </div>
            </div>

            <button
              @click="toggleJoin(challenge)"
              class="rounded-lg px-6 py-2 text-sm font-semibold transition"
              :class="
                challenge.joined
                  ? 'bg-[#E8F8ED] text-[#15803D] hover:bg-[#DCFCE7]'
                  : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
              "
            >
              {{ challenge.joined ? 'Mulai' : 'Ikuti' }}
            </button>
          </div>
        </article>

      </div>

    </div>
  </main>
</template>

<script setup>
import {
  Users,
  Globe2,
  ChevronDown
} from 'lucide-vue-next'
import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'

defineProps({
  activeTab: String,
  featuredChallenge: Object,
  visibleChallenges: Array,
  toggleJoin: Function
})

defineEmits(['update:activeTab'])
</script>
