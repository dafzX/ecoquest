<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <ChallengesMobile
        :active-tab="activeTab"
        :featured-challenge="featuredChallenge"
        :visible-challenges="visibleChallenges"
        :get-challenge-icon="getChallengeIcon"
        :get-challenge-style="getChallengeStyle"
        :go-back="goBack"
        @update:activeTab="activeTab = $event"
      />
      <ChallengesDesktop
        :active-tab="activeTab"
        :featured-challenge="featuredChallenge"
        :visible-challenges="visibleChallenges"
        :toggle-join="toggleJoin"
        @update:activeTab="activeTab = $event"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Recycle, Bike, Droplets, TreePine, Globe2 } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengesMobile from '@/components/challenges/ChallengesMobile.vue'
import ChallengesDesktop from '@/components/challenges/ChallengesDesktop.vue'

const router = useRouter()

const activeTab = ref('community')

const challenges = ref([
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
])

const featuredChallenge = computed(() => {
  return challenges.value[0]
})

const visibleChallenges = computed(() => {
  if (activeTab.value === 'mine') {
    return challenges.value.filter(challenge => challenge.joined)
  }
  return challenges.value.slice(1)
})

const getChallengeIcon = (category) => {
  const value = category?.toLowerCase() || ''
  if (value.includes('plastic')) return Recycle
  if (value.includes('transport')) return Bike
  if (value.includes('energy')) return Droplets
  if (value.includes('tree')) return TreePine
  return Globe2
}

const getChallengeStyle = (category) => {
  const value = category?.toLowerCase() || ''
  if (value.includes('plastic')) return 'bg-[#E8F8ED] text-[#22C55E]'
  if (value.includes('transport')) return 'bg-[#EAF4FF] text-[#3B82F6]'
  if (value.includes('energy')) return 'bg-[#FFF8D8] text-[#CA8A04]'
  if (value.includes('tree')) return 'bg-[#ECFDF5] text-[#059669]'
  return 'bg-[#E8F8ED] text-[#22C55E]'
}

const toggleJoin = (challenge) => {
  if (challenge.joined) {
    router.push(`/challenges/${challenge.id}`)
  } else {
    challenge.joined = true
  }
}

const goBack = () => {
  router.back()
}
</script>