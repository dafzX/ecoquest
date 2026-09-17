<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">
    <!-- Header -->
    <MobileHeader />

    <!-- Greeting -->
    <section class="mb-3">
      <h1 class="text-[17px] font-bold text-[#17211B]">
        Selamat pagi, {{ currentUser.name }}! 👋
      </h1>

      <p class="mt-0.5 text-[10px] text-[#718078]">
        Saatnya lanjutkan langkah baik hari ini.
      </p>
    </section>

    <!-- Level Card -->
    <section class="mb-3 rounded-[14px] border border-[#DCEBE0] bg-white p-3">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]">
          <Leaf class="h-5 w-5 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[12px] font-bold text-[#17211B]">
                Level {{ currentUser.level }}
              </p>

              <p class="text-[9px] text-[#718078]">
                {{ currentUser.levelName || 'Eco Explorer' }}
              </p>
            </div>

            <span class="text-[9px] font-medium text-[#718078]">
              {{ currentUser.xp ?? 1240 }} /
              {{ currentUser.nextLevelXp ?? 1600 }} XP
            </span>
          </div>

          <div class="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]">
            <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${levelProgress}%` }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="mb-4 grid grid-cols-3 overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white">
      <!-- Streak -->
      <div class="px-2 py-3 text-center">
        <Flame class="mx-auto h-4 w-4 text-[#F97316]" />
        <p class="mt-1 text-[12px] font-bold text-[#17211B]">{{ currentUser.streak ?? 7 }}</p>
        <p class="text-[8px] text-[#718078]">Streak</p>
      </div>

      <!-- Eco Actions -->
      <div class="border-x border-[#E8EFEA] px-2 py-3 text-center">
        <Leaf class="mx-auto h-4 w-4 text-[#22C55E]" />
        <p class="mt-1 text-[12px] font-bold text-[#17211B]">{{ ecoActions }}</p>
        <p class="text-[8px] text-[#718078]">Eco Actions</p>
      </div>

      <!-- Low Carbon -->
      <div class="px-2 py-3 text-center">
        <Bike class="mx-auto h-4 w-4 text-[#22C55E]" />
        <p class="mt-1 text-[12px] font-bold text-[#17211B]">{{ lowCarbonDistance }}</p>
        <p class="text-[8px] text-[#718078]">Low Carbon</p>
      </div>
    </section>

    <!-- Next Quest Header -->
    <div class="mb-2 flex items-center justify-between">
      <h2 class="text-[12px] font-bold text-[#17211B]">Quest Berikutnya</h2>
      <RouterLink to="/missions" class="text-[9px] font-medium text-[#22C55E]">
        Lihat Semua
      </RouterLink>
    </div>

    <!-- Next Quest -->
    <section v-if="nextQuest" class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3">
      <div class="flex gap-3">
        <!-- Mission Icon -->
        <div class="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]">
          <Recycle class="h-6 w-6 text-[#22C55E]" />
        </div>

        <!-- Mission Content -->
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h3 class="truncate text-[11px] font-bold text-[#17211B]">
                {{ nextQuest.title || 'Kurangi Plastik' }}
              </h3>
              <p class="mt-0.5 text-[8px] leading-3 text-[#718078]">
                {{ nextQuest.description || 'Gunakan botol minum reusable selama 3 hari.' }}
              </p>
            </div>
            <span class="shrink-0 text-[9px] font-semibold text-[#22C55E]">
              +{{ nextQuest.xp ?? 75 }} XP
            </span>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-[8px] text-[#718078]">
              {{ nextQuest.step || 'Hari ke-2 dari 3' }}
            </span>
            <span class="text-[8px] font-semibold text-[#22C55E]">
              {{ questProgress }}%
            </span>
          </div>

          <div class="mt-1 h-[4px] overflow-hidden rounded-full bg-[#E5EFE8]">
            <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${questProgress}%` }"></div>
          </div>
        </div>
      </div>

      <RouterLink
        :to="nextQuest.link || '/missions'"
        class="mt-3 flex h-8 items-center justify-center rounded-lg bg-[#22C55E] text-[9px] font-semibold text-white transition active:scale-[0.98]"
      >
        Lanjutkan
      </RouterLink>
    </section>

    <!-- Habit -->
    <section class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[12px] font-bold text-[#17211B]">Progress Kebiasaan</h2>
          <p class="mt-0.5 text-[8px] text-[#718078]">Konsistensi eco-mu minggu ini</p>
        </div>
        <span class="text-[11px] font-bold text-[#22C55E]">
          {{ questProgress }}%
        </span>
      </div>

      <div class="mt-3 flex items-end justify-between">
        <div>
          <p class="text-[10px] font-semibold text-[#17211B]">Kurangi Plastik</p>
          <p class="mt-0.5 text-[8px] text-[#718078]">Terus pertahankan kebiasaan baikmu.</p>
        </div>
        <TrendingUp class="h-4 w-4 text-[#22C55E]" />
      </div>

      <div class="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]">
        <div class="h-full rounded-full bg-[#22C55E]" :style="{ width: `${questProgress}%` }"></div>
      </div>
    </section>

    <!-- Impact Header -->
    <div class="mb-2 flex items-center justify-between">
      <h2 class="text-[12px] font-bold text-[#17211B]">Dampakmu</h2>
      <RouterLink to="/impact" class="text-[9px] font-medium text-[#22C55E]">
        Lihat Semua
      </RouterLink>
    </div>

    <!-- Impact -->
    <section class="grid grid-cols-3 gap-2">
      <!-- CO2 -->
      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3">
        <Cloud class="h-4 w-4 text-[#22C55E]" />
        <p class="mt-2 text-[13px] font-bold text-[#17211B]">{{ impact.co2Saved ?? 18 }}</p>
        <p class="text-[8px] text-[#718078]">CO₂ Dihemat</p>
      </div>

      <!-- Recycled -->
      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3">
        <Recycle class="h-4 w-4 text-[#22C55E]" />
        <p class="mt-2 text-[13px] font-bold text-[#17211B]">{{ impact.wasteRecycled ?? 24 }}</p>
        <p class="text-[8px] text-[#718078]">Item Didaur Ulang</p>
      </div>

      <!-- Trees -->
      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3">
        <TreePine class="h-4 w-4 text-[#22C55E]" />
        <p class="mt-2 text-[13px] font-bold text-[#17211B]">{{ impact.treesEquivalent ?? 3 }}</p>
        <p class="text-[8px] text-[#718078]">Setara Pohon</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import {
  Bike,
  Cloud,
  Flame,
  Leaf,
  Recycle,
  TreePine,
  TrendingUp
} from 'lucide-vue-next'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

defineProps({
  currentUser: {
    type: Object,
    required: true
  },
  ecoActions: {
    type: Number,
    default: 0
  },
  lowCarbonDistance: {
    type: Number,
    default: 0
  },
  nextQuest: {
    type: Object,
    default: null
  },
  questProgress: {
    type: Number,
    default: 0
  },
  levelProgress: {
    type: Number,
    default: 0
  },
  impact: {
    type: Object,
    required: true
  }
})
</script>
