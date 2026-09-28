<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">

      <ChallengesMobile
        :active-tab="activeTab"
        :featured-challenge="featuredChallenge"
        :visible-challenges="visibleChallenges"
        :get-challenge-icon="getChallengeIcon"
        :get-challenge-style="getChallengeStyle"
        :go-back="goBack"
        @update:active-tab="activeTab = $event"
      />

      <ChallengesDesktop
        :active-tab="activeTab"
        :featured-challenge="featuredChallenge"
        :visible-challenges="visibleChallenges"
        :toggle-join="toggleJoin"
        @update:active-tab="activeTab = $event"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  Recycle,
  Bike,
  Droplets,
  TreePine,
  Globe2
} from 'lucide-vue-next'

import { showAlert } from '@/services/notifications'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengesMobile from '@/components/challenges/ChallengesMobile.vue'
import ChallengesDesktop from '@/components/challenges/ChallengesDesktop.vue'

import {
  getChallenges,
  joinChallenge
} from '@/services/challenges'

const router = useRouter()

const activeTab = ref('saya')
const challenges = ref([])

const translateChallenge = (challenge) => {
  if (!challenge) {
    return challenge
  }

  const titleMap = {
    'Plastic Reduction Week': 'Minggu Pengurangan Plastik',
    'Plastic Reduction Week Challenge': 'Tantangan Pengurangan Plastik',
    'Plastic Free Week': 'Minggu Bebas Plastik',
    'Plastic Free Week Challenge': 'Tantangan Minggu Bebas Plastik',
    'Green Transport': 'Transportasi Ramah Lingkungan',
    'Green Transport Challenge': 'Tantangan Transportasi Ramah Lingkungan',
    'Clean Energy': 'Energi Bersih',
    'Clean Energy Challenge': 'Tantangan Energi Bersih',
    'Plant for Tomorrow': 'Tanam untuk Masa Depan',
    'Plant for Tomorrow Challenge': 'Tantangan Tanam untuk Masa Depan',
    'Minggu Bebas Plastik': 'Minggu Bebas Plastik',
    'Minggu Pengurangan Plastik': 'Minggu Pengurangan Plastik',
    'Transportasi Hijau': 'Transportasi Ramah Lingkungan',
    'Transportasi Ramah Lingkungan': 'Transportasi Ramah Lingkungan',
    'Energi Bersih': 'Energi Bersih',
    'Tanam untuk Masa Depan': 'Tanam untuk Masa Depan'
  }

  const categoryMap = {
    Plastic: 'Plastik',
    plastic: 'Plastik',
    plastik: 'Plastik',
    Transport: 'Transportasi',
    transport: 'Transportasi',
    transportasi: 'Transportasi',
    Energy: 'Energi',
    energy: 'Energi',
    energi: 'Energi',
    Tree: 'Pohon',
    tree: 'Pohon',
    pohon: 'Pohon',
    Plant: 'Menanam',
    plant: 'Menanam',
    menanam: 'Menanam',
    Environment: 'Lingkungan',
    environment: 'Lingkungan',
    lingkungan: 'Lingkungan'
  }

  const descriptionMap = {
    'Reduce your plastic use for 7 days.':
      'Kurangi penggunaan plastik selama 7 hari.',
    'Use green transportation and reduce carbon emissions.':
      'Gunakan transportasi ramah lingkungan dan kurangi emisi karbon.',
    'Save energy and use clean energy in your daily activities.':
      'Hemat energi dan gunakan energi bersih dalam aktivitas sehari-hari.',
    'Plant trees and help create a greener future.':
      'Tanam pohon dan bantu menciptakan masa depan yang lebih hijau.',
    'Reduce plastic waste and make a positive impact on the environment.':
      'Kurangi sampah plastik dan berikan dampak positif bagi lingkungan.',
    'Choose environmentally friendly transportation for your daily activities.':
      'Gunakan transportasi ramah lingkungan dalam aktivitas sehari-hari.',
    'Save energy and reduce your daily energy consumption.':
      'Hemat energi dan kurangi penggunaan energi dalam aktivitas sehari-hari.',
    'Plant trees and help protect the environment.':
      'Tanam pohon dan bantu menjaga kelestarian lingkungan.'
  }

  return {
    ...challenge,
    title: titleMap[challenge.title] || challenge.title,
    category: categoryMap[challenge.category] || challenge.category,
    description:
      descriptionMap[challenge.description] || challenge.description
  }
}

const syncedChallenges = computed(() => {
  return challenges.value.map((challenge) => {
    const translated = translateChallenge(challenge)

    const totalSteps = translated.steps?.length || 3
    const completedSteps = Number(translated.completedSteps || 0)

    const isCompleted =
      totalSteps > 0 &&
      completedSteps >= totalSteps

    return {
      ...translated,
      joined: Boolean(translated.joined),
      completedSteps,
      isCompleted
    }
  })
})

const featuredChallenge = computed(() => {
  return syncedChallenges.value[0] || null
})

const visibleChallenges = computed(() => {
  if (activeTab.value === 'saya') {
    return syncedChallenges.value.filter(
      (challenge) => challenge.joined
    )
  }

  return syncedChallenges.value.slice(1)
})

const getChallengeIcon = (category) => {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastik')) {
    return Recycle
  }

  if (value.includes('transportasi')) {
    return Bike
  }

  if (value.includes('energi')) {
    return Droplets
  }

  if (
    value.includes('pohon') ||
    value.includes('menanam')
  ) {
    return TreePine
  }

  return Globe2
}

const getChallengeStyle = (category) => {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastik')) {
    return 'bg-[#E8F8ED] text-[#22C55E]'
  }

  if (value.includes('transportasi')) {
    return 'bg-[#EAF4FF] text-[#3B82F6]'
  }

  if (value.includes('energi')) {
    return 'bg-[#FFF8D8] text-[#CA8A04]'
  }

  if (
    value.includes('pohon') ||
    value.includes('menanam')
  ) {
    return 'bg-[#ECFDF5] text-[#059669]'
  }

  return 'bg-[#E8F8ED] text-[#22C55E]'
}

onMounted(async () => {
  const result = await getChallenges()

  if (result.success) {
    challenges.value = result.challenges
  } else {
    await showAlert(result.message)
  }
})

const toggleJoin = async (challenge) => {
  if (challenge.joined) {
    router.push(`/challenges/${challenge.id}`)
    return
  }

  const result = await joinChallenge(challenge.id)

  if (!result.success) {
    await showAlert(result.message)
    return
  }

  router.push(`/challenges/${challenge.id}`)
}

const goBack = () => {
  router.replace({
    name: 'Dashboard'
  })
}
</script>