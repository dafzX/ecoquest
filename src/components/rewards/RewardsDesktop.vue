<template>
  <main class="hidden md:block">
    <div class="mx-auto w-full max-w-295 px-6 pb-12 pt-8 xl:px-8">

      <!-- Header -->
      <section class="mb-7 flex items-end justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#22C55E]">
            EcoQuest Hadiah
          </p>

          <h1 class="mt-2 text-3xl font-bold tracking-tight text-[#17211B]">
            Hadiah
          </h1>

          <p class="mt-2 max-w-2xl text-sm leading-6 text-[#66736A]">
            Tukarkan XP yang kamu kumpulkan dengan berbagai hadiah dan apresiasi.
          </p>
        </div>

        <div class="shrink-0 text-right">
          <p class="text-xs text-[#98A39C]">
            Saldo XP
          </p>

          <p class="mt-1 text-base font-bold text-[#22C55E]">
            {{ Number(user?.xp ?? 0).toLocaleString() }} XP
          </p>
        </div>
      </section>

      <!-- XP Overview -->
      <section class="mb-7 grid grid-cols-3 gap-4">

        <!-- Hadiah Tersedia -->
        <div
          class="rounded-2xl border border-[#DCEBE0] bg-white p-5"
        >
          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
            >
              <Gift class="h-5 w-5 text-[#15803D]" />
            </div>

            <div>
              <p class="text-xs text-[#98A39C]">
                Hadiah tersedia
              </p>

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ filteredRewards.filter(reward => reward.available && !reward.owned).length }}
              </p>
            </div>

          </div>
        </div>

        <!-- Sudah Ditukar -->
        <div
          class="rounded-2xl border border-[#DCEBE0] bg-white p-5"
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

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ redeemedCount }}
              </p>
            </div>

          </div>
        </div>

        <!-- XP Digunakan -->
        <div
          class="rounded-2xl border border-[#DCEBE0] bg-white p-5"
        >
          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7E6]"
            >
              <Zap class="h-5 w-5 text-[#CA8A04]" />
            </div>

            <div>
              <p class="text-xs text-[#98A39C]">
                XP yang digunakan
              </p>

              <p class="mt-1 text-xl font-bold text-[#17211B]">
                {{ Number(xpSpent ?? 0).toLocaleString() }}
              </p>
            </div>

          </div>
        </div>

      </section>

      <!-- Categories -->
      <section class="mb-6">
        <div class="flex items-center gap-2 overflow-x-auto pb-1">

          <button
            v-for="category in categories"
            :key="category"
            type="button"
            @click="$emit('update:selected-category', category)"
            class="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition"
            :class="
              selectedCategory === category
                ? 'bg-[#22C55E] text-white hover:bg-[#22C55E]'
                : 'border border-[#DCEBE0] bg-white text-[#66736A] hover:bg-[#F4FBF7]'
            "
          >
            {{ getCategoryLabel(category) }}
          </button>

        </div>
      </section>

      <!-- Store Header -->
      <section class="mb-4 flex items-center justify-between">

        <div>
          <h2 class="text-lg font-bold text-[#17211B]">
            Pilih Hadiah
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Gunakan XP kamu untuk menukarkan hadiah.
          </p>
        </div>

        <p class="text-xs font-medium text-[#66736A]">
          {{ filteredRewards.length }} hadiah
        </p>

      </section>

      <!-- Reward Grid -->
      <section
        v-if="filteredRewards.length"
        class="grid grid-cols-3 gap-5 xl:grid-cols-4"
      >

        <article
          v-for="reward in filteredRewards"
          :key="reward.id"
          class="overflow-hidden rounded-lg border border-[#E8EDE9] bg-white transition hover:-translate-y-0.5 hover:border-[#CDE8D4] hover:shadow-sm"
        >

          <!-- Reward Image -->
          <div
            class="flex h-42.5 items-center justify-center"
            :class="getRewardBackground(reward)"
          >

            <div
              class="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-sm"
            >

              <component
                :is="getRewardIcon(reward)"
                class="h-10 w-10"
                :class="getRewardColor(reward)"
              />

            </div>

          </div>

          <!-- Content -->
          <div class="p-5">

            <!-- Category + Status -->
            <div class="flex items-start justify-between gap-3">

              <div class="min-w-0">

                <span
                  class="rounded-full bg-[#F3F7F4] px-2.5 py-1 text-[10px] font-semibold text-[#66736A]"
                >
                  {{ getCategoryLabel(reward.category) }}
                </span>

                <h3 class="mt-3 text-base font-bold text-[#17211B]">
                  {{ reward.title }}
                </h3>

              </div>

              <!-- Owned -->
              <div
                v-if="reward.owned"
                class="shrink-0 rounded-full bg-[#DCFCE7] px-2 py-1 text-[10px] font-semibold text-[#15803D]"
              >
                Sudah Ditukar
              </div>

            </div>

            <!-- Description -->
            <p class="mt-2 min-h-10 text-xs leading-5 text-[#66736A]">
              {{ reward.description }}
            </p>

            <!-- Footer -->
            <div class="mt-5 flex items-center justify-between gap-3">

              <!-- XP -->
              <div class="flex items-center gap-1.5">

                <Zap class="h-4 w-4 text-[#CA8A04]" />

                <span class="text-sm font-bold text-[#17211B]">
                  {{ Number(reward?.cost ?? 0).toLocaleString() }}
                </span>

                <span class="text-xs text-[#98A39C]">
                  XP
                </span>

              </div>

              <!-- Claim -->
              <button
                type="button"
                @click="$emit('claim', reward)"
                :disabled="!reward.available || reward.owned"
                class="rounded-xl px-4 py-2.5 text-xs font-semibold transition"
                :class="
                  reward.owned
                    ? 'cursor-default bg-[#EAF8EE] text-[#15803D]'
                    : reward.available
                      ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                      : 'cursor-not-allowed bg-[#F1F3F1] text-[#98A39C]'
                "
              >
                {{
                  reward.owned
                    ? 'Sudah Ditukar'
                    : reward.available
                      ? 'Tukar'
                      : 'Terkunci'
                }}
              </button>

            </div>

          </div>

        </article>

      </section>

      <!-- Empty State -->
      <section
        v-else
        class="rounded-2xl border border-dashed border-[#DCEBE0] bg-white px-6 py-14 text-center"
      >

        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF8EE]"
        >
          <Gift class="h-6 w-6 text-[#15803D]" />
        </div>

        <h3 class="mt-4 text-base font-bold text-[#17211B]">
          Belum ada hadiah
        </h3>

        <p class="mx-auto mt-2 max-w-md text-xs leading-5 text-[#66736A]">
          Belum ada hadiah yang tersedia pada kategori ini.
        </p>

      </section>

    </div>
  </main>
</template>

<script setup>
import {
  Award,
  BriefcaseBusiness,
  Gift,
  Leaf,
  Recycle,
  TreePine,
  Trophy,
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

const getCategoryLabel = category => {
  if (category === 'All') {
    return 'Semua'
  }

  if (category === 'Digital') {
    return 'Digital'
  }

  if (category === 'Impact') {
    return 'Dampak'
  }

  if (category === 'Merchandise') {
    return 'Merchandise'
  }

  return category
}

const getRewardIcon = reward => {
  if (reward?.icon === 'tree') {
    return TreePine
  }

  if (reward?.icon === 'bottle') {
    return Recycle
  }

  if (reward?.icon === 'bag') {
    return BriefcaseBusiness
  }

  if (reward?.icon === 'leaf') {
    return Leaf
  }

  if (reward?.icon === 'trophy') {
    return Trophy
  }

  return Award
}

const getRewardBackground = reward => {
  if (reward?.category === 'Impact') {
    return 'bg-[#EAF8EE]'
  }

  if (reward?.category === 'Merchandise') {
    return 'bg-[#EEF5FF]'
  }

  return 'bg-[#F3E8FF]'
}

const getRewardColor = reward => {
  if (reward?.category === 'Impact') {
    return 'text-[#15803D]'
  }

  if (reward?.category === 'Merchandise') {
    return 'text-[#3B82F6]'
  }

  return 'text-[#9333EA]'
}
</script>