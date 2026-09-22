<template>
  <main class="hidden md:block">

    <div class="mx-auto w-full max-w-[1180px] px-6 pb-12 pt-8 xl:px-8">

      <!-- Header -->
      <section class="mb-7 flex items-end justify-between gap-6">

        <div class="min-w-0">
          <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
            Hadiah
          </h1>

          <p class="mt-1 text-sm text-[#66736A]">
            Tukar XP yang kamu kumpulkan dengan hadiah menarik.
          </p>
        </div>

        <div
          class="flex shrink-0 items-center gap-3 rounded-2xl border border-[#E8EDE9] bg-white px-5 py-3 shadow-sm"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8EE]"
          >
            <Gift class="h-5 w-5 text-[#22C55E]" />
          </div>

          <div>
            <p class="text-[11px] font-medium text-[#98A39C]">
              XP Saat Ini
            </p>

            <p class="text-base font-bold text-[#22C55E]">
              {{ user.xp.toLocaleString() }} XP
            </p>
          </div>
        </div>

      </section>

      <!-- XP Overview -->
      <section class="mb-7 grid grid-cols-3 gap-4">

        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
            >
              <Gift class="h-5 w-5 text-[#22C55E]" />
            </div>

            <div>
              <p class="text-xs text-[#98A39C]">
                Hadiah tersedia
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ filteredRewards.length }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8FF]"
            >
              <Award class="h-5 w-5 text-[#9333EA]" />
            </div>

            <div>
              <p class="text-xs text-[#98A39C]">
                Sudah ditukar
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ redeemedCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3]"
            >
              <Zap class="h-5 w-5 text-[#CA8A04]" />
            </div>

            <div>
              <p class="text-xs text-[#98A39C]">
                XP yang digunakan
              </p>

              <p class="mt-0.5 text-xl font-bold text-[#17211B]">
                {{ xpSpent.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

      </section>

      <!-- Categories -->
      <section
        class="mb-7 border-b border-[#E8EDE9]"
      >
        <div class="flex items-center gap-7">

          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="relative pb-3 text-sm font-semibold transition"
            :class="
              selectedCategory === category
                ? 'text-[#15803D]'
                : 'text-[#98A39C] hover:text-[#17211B]'
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

            <span
              v-if="selectedCategory === category"
              class="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#22C55E]"
            />
          </button>

        </div>
      </section>

      <!-- Store Header -->
      <section class="mb-5 flex items-end justify-between gap-6">

        <div>
          <h2 class="text-lg font-bold text-[#17211B]">
            Katalog Hadiah
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Pilih hadiah yang ingin kamu tukarkan dengan XP.
          </p>
        </div>

        <span class="shrink-0 text-xs text-[#98A39C]">
          {{ filteredRewards.length }} hadiah
        </span>

      </section>

      <!-- Reward Grid -->
      <section
        class="grid grid-cols-3 gap-5 xl:grid-cols-4"
      >

        <article
          v-for="reward in filteredRewards"
          :key="reward.id"
          class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E8EDE9] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#CDE8D4] hover:shadow-md"
        >

          <!-- Image / Icon -->
          <div
            class="flex h-36 w-full items-center justify-center bg-[#EAF8EE]"
          >
            <Gift
              v-if="reward.category === 'Digital'"
              class="h-14 w-14 text-[#22C55E]"
            />

            <Award
              v-else-if="reward.category === 'Impact'"
              class="h-14 w-14 text-[#059669]"
            />

            <Leaf
              v-else
              class="h-14 w-14 text-[#15803D]"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-5">

            <span
              class="mb-3 w-fit rounded-full bg-[#F1F5F2] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#66736A]"
            >
              {{
                reward.category === 'Impact'
                  ? 'Donasi'
                  : reward.category === 'Digital'
                  ? 'Voucher'
                  : reward.category === 'Merchandise'
                  ? 'Merchandise'
                  : reward.category
              }}
            </span>

            <h3
              class="line-clamp-2 text-sm font-bold leading-5 text-[#17211B]"
            >
              {{ reward.title }}
            </h3>

            <div
              class="mt-auto flex items-center justify-between gap-3 pt-6"
            >
              <div class="min-w-0">
                <p class="text-[10px] text-[#98A39C]">
                  Harga
                </p>

                <p class="mt-0.5 truncate text-sm font-bold text-[#22C55E]">
                  {{ reward.cost.toLocaleString() }} XP
                </p>
              </div>

              <button
                type="button"
                :disabled="reward.owned || !reward.available"
                class="shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition"
                :class="
                  reward.owned
                    ? 'cursor-default bg-[#EAF8EE] text-[#15803D]'
                    : !reward.available
                      ? 'cursor-not-allowed bg-[#F1F5F2] text-[#98A39C]'
                      : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
                "
                @click="$emit('claim', reward)"
              >
                {{
                  reward.owned
                    ? 'Sudah Ditukar'
                    : !reward.available
                      ? 'Tidak Tersedia'
                      : 'Tukar'
                }}
              </button>
            </div>

          </div>

        </article>

      </section>

      <!-- Empty -->
      <div
        v-if="filteredRewards.length === 0"
        class="mt-2 rounded-2xl border border-dashed border-[#DCE5DE] bg-white px-6 py-16 text-center"
      >
        <Gift class="mx-auto h-12 w-12 text-[#98A39C]" />

        <p class="mt-4 text-base font-semibold text-[#17211B]">
          Hadiah tidak ditemukan
        </p>

        <p class="mt-1 text-sm text-[#98A39C]">
          Coba pilih kategori hadiah lainnya.
        </p>
      </div>

    </div>

  </main>
</template>

<script setup>
import { computed } from 'vue'

import {
  Award,
  Gift,
  Leaf,
  Zap
} from 'lucide-vue-next'

const props = defineProps({
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

  redeemedCount: {
    type: Number,
    default: 0
  },

  xpSpent: {
    type: Number,
    default: 0
  }
})

defineEmits([
  'update:selected-category',
  'claim'
])
</script>