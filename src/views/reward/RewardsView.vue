<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <!-- Mobile -->
      <main
        class="md:hidden mx-auto max-w-[430px] px-4 pb-28 pt-1"
      >
        <!-- Mobile Header -->
        <MobileHeader/>

        <!-- Page Header -->
        <div class="mb-5">
          <h1 class="text-[22px] font-bold tracking-tight text-[#17211B]">
            Rewards
          </h1>
          <p class="mt-1 text-xs leading-5 text-[#66736A]">
            Gunakan XP-mu untuk mendapatkan reward menarik.
          </p>
        </div>

        <!-- XP Balance -->
        <section class="relative mb-5 overflow-hidden rounded-2xl bg-[#15803D]">
          <div class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10"></div>
          <div class="absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-white/5"></div>
          <div class="relative flex flex-col gap-5 px-5 py-5">
            <div class="flex items-center gap-3.5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Gift class="h-6 w-6 text-white" />
              </div>
              <div>
                <p class="text-xs text-white/75">XP yang kamu miliki</p>
                <div class="mt-0.5 flex items-end gap-1.5">
                  <span class="text-2xl font-bold text-white">{{ user.xp.toLocaleString() }}</span>
                  <span class="mb-0.5 text-xs font-medium text-white/70">XP</span>
                </div>
              </div>
            </div>
            <div class="rounded-xl bg-white/10 px-4 py-3">
              <p class="text-[10px] text-white/70">Reward berikutnya</p>
              <p class="mt-1 text-xs font-semibold text-white">{{ nextReward?.title || 'Terus kumpulkan XP' }}</p>
              <p v-if="nextReward" class="mt-0.5 text-[10px] text-white/70">{{ nextReward.cost.toLocaleString() }} XP lagi</p>
            </div>
          </div>
        </section>

        <!-- Summary -->
        <section class="mb-6 grid grid-cols-3 gap-2.5">
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE]">
              <Gift class="h-4 w-4 text-[#22C55E]" />
            </div>
            <p class="mt-3 text-[10px] leading-4 text-[#66736A]">Reward Tersedia</p>
            <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ availableRewards }}</p>
          </div>
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8FF]">
              <Award class="h-4 w-4 text-[#9333EA]" />
            </div>
            <p class="mt-3 text-[10px] leading-4 text-[#66736A]">Sudah Ditukar</p>
            <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ redeemedRewards.length }}</p>
          </div>
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3]">
              <Zap class="h-4 w-4 text-[#CA8A04]" />
            </div>
            <p class="mt-3 text-[10px] leading-4 text-[#66736A]">XP Digunakan</p>
            <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ xpSpent.toLocaleString() }}</p>
          </div>
        </section>

        <!-- Categories -->
        <section class="mb-6">
          <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              @click="selectedCategory = category"
              class="shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold transition"
              :class="selectedCategory === category ? 'bg-[#15803D] text-white' : 'border border-[#E8EDE9] bg-white text-[#66736A] hover:border-[#CDE8D4]'"
            >
              {{ category }}
            </button>
          </div>
        </section>

        <!-- Rewards Store -->
        <section>
          <div class="mb-4 flex items-end justify-between">
            <div>
              <h2 class="text-base font-bold text-[#17211B]">Rewards Store</h2>
              <p class="mt-0.5 text-[10px] text-[#98A39C]">Tukarkan XP dengan reward pilihanmu.</p>
            </div>
            <span class="text-[10px] text-[#98A39C]">{{ filteredRewards.length }} reward</span>
          </div>

          <div class="grid gap-3.5 sm:grid-cols-2">
            <RewardCard
              v-for="reward in filteredRewards"
              :key="reward.id"
              :reward="reward"
              @claim="handleClaim"
            />
          </div>

          <div v-if="filteredRewards.length === 0" class="rounded-2xl border border-dashed border-[#DCE5DE] bg-white px-6 py-10 text-center">
            <Gift class="mx-auto h-8 w-8 text-[#98A39C]" />
            <p class="mt-3 text-sm font-semibold text-[#17211B]">Reward tidak ditemukan</p>
            <p class="mt-1 text-xs text-[#98A39C]">Coba pilih kategori reward lainnya.</p>
          </div>
        </section>

        <!-- Redeemed Rewards -->
        <section class="mt-8">
          <div class="mb-4">
            <h2 class="text-base font-bold text-[#17211B]">Reward yang Ditukar</h2>
            <p class="mt-0.5 text-[10px] text-[#98A39C]">Reward yang sudah berhasil kamu klaim.</p>
          </div>

          <div class="space-y-2.5">
            <div v-for="reward in redeemedRewards" :key="reward.id" class="flex items-center gap-3 rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF]">
                <Award class="h-4 w-4 text-[#9333EA]" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-semibold text-[#17211B]">{{ reward.title }}</p>
                <p class="mt-0.5 text-[10px] text-[#98A39C]">Ditukar pada {{ reward.date }}</p>
              </div>
              <div class="shrink-0 text-right">
                <p class="text-xs font-bold text-[#66736A]">{{ reward.cost.toLocaleString() }} XP</p>
                <span class="text-[9px] text-[#98A39C]">Ditukar</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1080px] px-6 pb-10 pt-8">

          <!-- Header -->
          <section class="mb-8 flex items-end justify-between">
            <div>
              <h1 class="text-[28px] font-bold text-[#17211B]">
                Rewards
              </h1>
              <p class="mt-1 text-sm text-[#66736A]">
                Tukar XP dengan reward menarik.
              </p>
            </div>
            
            <div class="flex items-center gap-2 rounded-xl border border-[#E8EDE9] bg-white px-4 py-2 shadow-sm">
              <Gift class="h-5 w-5 text-[#22C55E]" />
              <span class="text-sm font-semibold text-[#66736A]">Current XP:</span>
              <span class="text-base font-bold text-[#22C55E]">{{ user.xp.toLocaleString() }} XP</span>
            </div>
          </section>

          <!-- Tabs -->
          <div class="mb-6 flex gap-4 border-b border-[#E8EDE9]">
            <button
              v-for="category in categories"
              :key="category"
              class="border-b-2 pb-3 text-sm font-semibold transition"
              :class="
                selectedCategory === category
                  ? 'border-[#22C55E] text-[#17211B]'
                  : 'border-transparent text-[#98A39C] hover:text-[#17211B]'
              "
              @click="selectedCategory = category"
            >
              {{ category === 'Impact' ? 'Donation' : (category === 'Digital' ? 'Voucher' : category) }}
            </button>
          </div>

          <!-- Desktop Grid -->
          <div class="grid grid-cols-4 gap-6">
            <article
              v-for="reward in filteredRewards"
              :key="reward.id"
              class="flex flex-col overflow-hidden rounded-2xl border border-[#E8EDE9] bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div class="h-32 w-full bg-[#EAF8EE] flex items-center justify-center p-6">
                <!-- Placeholder for image based on category -->
                <Gift v-if="reward.category === 'Digital'" class="h-16 w-16 text-[#22C55E]" />
                <Award v-else-if="reward.category === 'Impact'" class="h-16 w-16 text-[#059669]" />
                <Leaf v-else class="h-16 w-16 text-[#15803D]" />
              </div>
              
              <div class="flex flex-1 flex-col p-5">
                <span class="mb-2 inline-block rounded-full bg-[#F1F5F2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#66736A] w-fit">
                  {{ reward.category === 'Impact' ? 'Donation' : (reward.category === 'Digital' ? 'Voucher' : reward.category) }}
                </span>
                
                <h3 class="mb-2 text-base font-bold leading-tight text-[#17211B] line-clamp-2">
                  {{ reward.title }}
                </h3>
                
                <div class="mt-auto pt-4 flex items-center justify-between">
                  <span class="text-sm font-bold text-[#22C55E]">{{ reward.cost.toLocaleString() }} XP</span>
                    <button
                      type="button"
                      @click="handleClaim(reward)"
                      :disabled="reward.owned || !reward.available"
                      class="rounded-lg px-4 py-1.5 text-xs font-semibold transition"
                      :class="
                        reward.owned
                          ? 'cursor-default bg-[#EAF8EE] text-[#15803D]'
                          : 'bg-[#22C55E] text-white hover:bg-[#15803D]'
                      "
                    >
                      {{ reward.owned ? 'Redeemed' : 'Redeem' }}
                    </button>
                  </div>
              </div>
            </article>

            <div v-if="filteredRewards.length === 0" class="col-span-4 rounded-2xl border border-dashed border-[#DCE5DE] bg-white py-16 text-center">
              <Gift class="mx-auto h-12 w-12 text-[#98A39C]" />
              <p class="mt-4 text-base font-semibold text-[#17211B]">Reward tidak ditemukan</p>
              <p class="mt-1 text-sm text-[#98A39C]">Coba pilih kategori reward lainnya.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import {
  Award,
  Gift,
  Leaf,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import RewardCard from '@/components/cards/RewardCard.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import { getCurrentUser } from '@/services/auth'
import {
  claimReward,
  getRewards
} from '@/services/rewards'

import {
  rewards as mockRewards
} from '@/data/mockData.js'

const user = ref(
  getCurrentUser() || {
    xp: 0,
    redeemedRewardIds: []
  }
)

const rewards = ref([])
const selectedCategory = ref('All')

const categories = [
  'All',
  'Digital',
  'Impact',
  'Merchandise'
]

onMounted(async () => {
  const result = await getRewards()

  if (!result.success) {
    alert(result.message)
    return
  }

  const redeemedIds = user.value.redeemedRewardIds || []

  rewards.value = rewards.value.map((item) => ({
    ...item,
    owned: redeemedIds.includes(item.id)
  }))

  rewards.value = result.rewards.map((reward) => {
    const uiData = mockRewards.find(
      (item) => item.id === reward.id
    )

    return {
      ...uiData,
      ...reward,
      owned: redeemedIds.includes(reward.id)
    }
  })
})

const filteredRewards = computed(() => {
  if (selectedCategory.value === 'All') {
    return rewards.value
  }

  return rewards.value.filter(
    (reward) => reward.category === selectedCategory.value
  )
})

const redeemedRewards = computed(() => {
  return rewards.value
    .filter((reward) => reward.owned)
    .map((reward) => ({
      ...reward,
      date: 'Baru saja'
    }))
})

const availableRewards = computed(() => {
  return rewards.value.filter(
    (reward) => reward.available && !reward.owned
  ).length
})

const xpSpent = computed(() => {
  return redeemedRewards.value.reduce(
    (total, reward) => total + reward.cost,
    0
  )
})

const nextReward = computed(() => {
  return rewards.value
    .filter(
      (reward) =>
        reward.available &&
        !reward.owned &&
        reward.cost > user.value.xp
    )
    .sort((a, b) => a.cost - b.cost)[0]
})

async function handleClaim(reward) {
  const confirmed = window.confirm(
    `Tukar ${reward.cost} XP untuk ${reward.title}?`
  )

  if (!confirmed) return

  const result = await claimReward(reward.id)

  if (!result.success) {
    alert(result.message)
    return
  }

  user.value = result.user

  rewards.value = rewards.value.map((item) => ({
    ...item,
    owned: user.value.redeemedRewardIds.includes(item.id)
  }))

  alert(result.message)
}
</script>