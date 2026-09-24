<template>
  <main class="mx-auto w-full max-w-107.5 px-4 pb-28 pt-1 md:hidden">

    <MobileHeader />

    <!-- Header -->
    <section class="mb-5">
      <h1 class="text-[22px] font-bold tracking-tight text-[#17211B]">
        Hadiah
      </h1>

      <p class="mt-1 max-w-87.5 text-xs leading-5 text-[#66736A]">
        Gunakan XP-mu untuk mendapatkan hadiah menarik.
      </p>
    </section>

    <!-- XP Balance -->
    <section class="relative mb-5 overflow-hidden rounded-lg bg-[#15803D]">
      <div
        class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10"
      />

      <div
        class="absolute -bottom-16 right-12 h-32 w-32 rounded-full bg-white/5"
      />

      <div class="relative p-5">

        <div class="flex min-w-0 items-center gap-3.5">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/15"
          >
            <Gift class="h-6 w-6 text-white" />
          </div>

          <div class="min-w-0">
            <p class="text-xs text-white/75">
              XP yang kamu miliki
            </p>

            <div class="mt-0.5 flex items-end gap-1.5">
              <span class="truncate text-2xl font-bold text-white">
                {{ user.xp.toLocaleString() }}
              </span>

              <span class="mb-0.5 shrink-0 text-xs font-medium text-white/70">
                XP
              </span>
            </div>
          </div>
        </div>

        <div class="mt-5 rounded-lg bg-white/10 px-4 py-3">
          <p class="text-[10px] text-white/70">
            Hadiah berikutnya
          </p>

          <p class="mt-1 truncate text-xs font-semibold text-white">
            {{ nextReward?.title || 'Terus kumpulkan XP' }}
          </p>

          <p
            v-if="nextReward"
            class="mt-0.5 text-[10px] text-white/70"
          >
            {{ nextReward.cost.toLocaleString() }} XP lagi
          </p>

          <p
            v-else
            class="mt-0.5 text-[10px] text-white/70"
          >
            Semua hadiah sudah dapat ditukar
          </p>
        </div>

      </div>
    </section>

    <!-- Summary -->
    <section class="mb-6 grid grid-cols-3 gap-2.5">

      <div
        class="min-w-0 rounded-lg border border-[#E8EDE9] bg-white p-3"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF8EE]"
        >
          <Gift class="h-4 w-4 text-[#22C55E]" />
        </div>

        <p class="mt-3 truncate text-[10px] leading-4 text-[#66736A]">
          Tersedia
        </p>

        <p class="mt-0.5 text-base font-bold text-[#17211B]">
          {{ availableRewards }}
        </p>
      </div>

      <div
        class="min-w-0 rounded-lg border border-[#E8EDE9] bg-white p-3"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3E8FF]"
        >
          <Award class="h-4 w-4 text-[#9333EA]" />
        </div>

        <p class="mt-3 truncate text-[10px] leading-4 text-[#66736A]">
          Ditukar
        </p>

        <p class="mt-0.5 text-base font-bold text-[#17211B]">
          {{ redeemedRewards.length }}
        </p>
      </div>

      <div
        class="min-w-0 rounded-lg border border-[#E8EDE9] bg-white p-3"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FEF9C3]"
        >
          <Zap class="h-4 w-4 text-[#CA8A04]" />
        </div>

        <p class="mt-3 truncate text-[10px] leading-4 text-[#66736A]">
          XP Digunakan
        </p>

        <p class="mt-0.5 truncate text-base font-bold text-[#17211B]">
          {{ xpSpent.toLocaleString() }}
        </p>
      </div>

    </section>

    <!-- Categories -->
    <section class="mb-6 w-full overflow-x-auto scrollbar-hide">
      <div
        class="flex w-full min-w-max gap-1 rounded-xl border border-[#DCEBE0] bg-white p-1"
      >
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-center text-[10px] font-semibold transition hover:bg-[#F8FAF8]"
          :class="
            selectedCategory === category
              ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]'
              : 'text-[#718078]'
          "
          @click="$emit('update:selected-category', category)"
        >
          {{
            category === 'All'
              ? 'Semua'
              : category === 'Impact'
              ? 'Donasi'
              : category === 'Digital'
              ? 'Voucher'
              : 'Merchandise'
          }}
        </button>
      </div>
    </section>

    <!-- Store -->
    <section>

      <div class="mb-4">
        <div class="flex items-end justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-base font-bold text-[#17211B]">
              Katalog Hadiah
            </h2>

            <p class="mt-0.5 text-[10px] leading-4 text-[#98A39C]">
              Tukarkan XP dengan hadiah pilihanmu.
            </p>
          </div>

          <span class="shrink-0 text-[10px] text-[#98A39C]">
            {{ filteredRewards.length }} hadiah
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3.5">
        <RewardCard
          v-for="reward in filteredRewards"
          :key="reward.id"
          :reward="reward"
          @claim="$emit('claim', $event)"
        />
      </div>

      <!-- Empty -->
      <div
        v-if="filteredRewards.length === 0"
        class="rounded-lg border border-dashed border-[#DCE5DE] bg-white px-6 py-10 text-center"
      >
        <Gift class="mx-auto h-8 w-8 text-[#98A39C]" />

        <p class="mt-3 text-sm font-semibold text-[#17211B]">
          Hadiah tidak ditemukan
        </p>

        <p class="mt-1 text-xs text-[#98A39C]">
          Coba pilih kategori hadiah lainnya.
        </p>
      </div>

    </section>

    <!-- Redeemed -->
    <section class="mt-8">

      <div class="mb-4">
        <h2 class="text-base font-bold text-[#17211B]">
          Hadiah yang Ditukar
        </h2>

        <p class="mt-0.5 text-[10px] text-[#98A39C]">
          Hadiah yang sudah berhasil kamu klaim.
        </p>
      </div>

      <div
        v-if="redeemedRewards.length"
        class="space-y-2.5"
      >
        <div
          v-for="reward in redeemedRewards"
          :key="reward.id"
          class="flex min-w-0 items-center gap-3 rounded-lg border border-[#E8EDE9] bg-white p-3.5"
        >
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF]"
          >
            <Award class="h-4 w-4 text-[#9333EA]" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-xs font-semibold text-[#17211B]">
              {{ reward.title }}
            </p>

            <p class="mt-0.5 truncate text-[10px] text-[#98A39C]">
              Ditukar pada {{ reward.date }}
            </p>
          </div>

          <div class="shrink-0 text-right">
            <p class="text-xs font-bold text-[#66736A]">
              {{ reward.cost.toLocaleString() }} XP
            </p>

            <span class="text-[9px] text-[#98A39C]">
              Ditukar
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="rounded-lg border border-dashed border-[#DCE5DE] bg-white px-5 py-8 text-center"
      >
        <Award class="mx-auto h-7 w-7 text-[#98A39C]" />

        <p class="mt-2 text-xs font-semibold text-[#17211B]">
          Belum ada hadiah yang ditukar
        </p>

        <p class="mt-1 text-[10px] text-[#98A39C]">
          Tukarkan XP-mu dengan hadiah yang tersedia.
        </p>
      </div>

    </section>

  </main>
</template>

<script setup>
import {
  Award,
  Gift,
  Zap
} from 'lucide-vue-next'

import MobileHeader from '@/components/navigation/MobileHeader.vue'
import RewardCard from '@/components/cards/RewardCard.vue'

defineProps({
  user: {
    type: Object,
    required: true
  },

  categories: {
    type: Array,
    default: () => []
  },

  selectedCategory: {
    type: String,
    default: 'All'
  },

  filteredRewards: {
    type: Array,
    default: () => []
  },

  redeemedRewards: {
    type: Array,
    default: () => []
  },

  availableRewards: {
    type: Number,
    default: 0
  },

  xpSpent: {
    type: Number,
    default: 0
  },

  nextReward: {
    type: Object,
    default: null
  }
})

defineEmits([
  'update:selected-category',
  'claim'
])
</script>