<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <ChallengeDetailMobile
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />
      <ChallengeDetailDesktop
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Leaf, Recycle, Droplets, Bike, TreePine, Globe2 } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengeDetailMobile from '@/components/challenges/ChallengeDetailMobile.vue'
import ChallengeDetailDesktop from '@/components/challenges/ChallengeDetailDesktop.vue'

const router = useRouter()
const route = useRoute()

// Mock data (same as ChallengesView)
const challenges = [
  {
    id: 1,
    title: 'Plastic Reduction Week',
    description: 'Kurangi penggunaan plastik sekali pakai dan ajak komunitasmu melakukan aksi nyata.',
    category: 'Plastic',
    participants: 320,
    progress: 68,
    daysLeft: 7,
    joined: true
  },
  {
    id: 2,
    title: 'Green Transport Challenge',
    description: 'Gunakan transportasi ramah lingkungan untuk perjalanan sehari-hari.',
    category: 'Transport',
    participants: 154,
    progress: 45,
    daysLeft: 12,
    joined: true
  },
  {
    id: 3,
    title: 'Clean Energy Challenge',
    description: 'Kurangi konsumsi energi dan gunakan energi secara lebih bijak.',
    category: 'Energy',
    participants: 89,
    progress: 32,
    daysLeft: 10,
    joined: false
  },
  {
    id: 4,
    title: 'Plant for Tomorrow',
    description: 'Ajak lebih banyak orang menanam dan merawat pohon di lingkungan sekitar.',
    category: 'Tree',
    participants: 210,
    progress: 54,
    daysLeft: 9,
    joined: false
  }
]

const challenge = computed(() => {
  const id = Number(route.params.id)
  return challenges.find(c => c.id === id) || challenges[0]
})

function getCategoryIcon(category) {
  const value = category?.toLowerCase() || ''
  if (value.includes('plastic')) return Recycle
  if (value.includes('transport')) return Bike
  if (value.includes('energy')) return Droplets
  if (value.includes('tree')) return TreePine
  return Globe2
}

function goBack() {
  router.back()
}

function joinChallenge() {
  console.log('Join challenge:', challenge.value.id)
  // Logic to join challenge goes here
}
</script>
