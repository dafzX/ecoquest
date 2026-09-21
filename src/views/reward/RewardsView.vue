<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <RewardsMobile
        :user="user"
        :categories="categories"
        :selected-category="selectedCategory"
        :filtered-rewards="filteredRewards"
        :redeemed-rewards="redeemedRewards"
        :available-rewards="availableRewards"
        :xp-spent="xpSpent"
        :next-reward="nextReward"
        @update:selected-category="selectedCategory = $event"
        @claim="handleClaim"
      />

      <RewardsDesktop
        :user="user"
        :categories="categories"
        :selected-category="selectedCategory"
        :filtered-rewards="filteredRewards"
        :redeemed-count="redeemedRewards.length"
        :xp-spent="xpSpent"
        @update:selected-category="selectedCategory = $event"
        @claim="handleClaim"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'

import RewardsMobile from '@/components/rewards/RewardsMobile.vue'
import RewardsDesktop from '@/components/rewards/RewardsDesktop.vue'

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