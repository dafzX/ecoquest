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
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Recycle, Bike, Droplets, TreePine, Globe2 } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengesMobile from '@/components/challenges/ChallengesMobile.vue'
import ChallengesDesktop from '@/components/challenges/ChallengesDesktop.vue'
import {
  getChallenges,
  joinChallenge
} from '@/services/challenges'

const router = useRouter()

const activeTab = ref('community')

const challenges = ref([])

const syncedChallenges = computed(() => {
  return challenges.value.map(challenge => {
    const totalSteps = challenge.steps?.length || 3
    const completedSteps = Number(challenge.completedSteps || 0)
    const isCompleted = totalSteps > 0 && completedSteps >= totalSteps

    return {
      ...challenge,
      joined: Boolean(challenge.joined),
      completedSteps,
      isCompleted
    }
  })
})

const featuredChallenge = computed(() => {
  return syncedChallenges.value[0]
})

const visibleChallenges = computed(() => {
  if (activeTab.value === 'mine') {
    return syncedChallenges.value.filter(c => c.joined)
  }

  return syncedChallenges.value.slice(1)
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

onMounted(async () => {
  const result = await getChallenges()

  if (result.success) {
    challenges.value = result.challenges
  } else {
    alert(result.message)
  }
})

const toggleJoin = async (challenge) => {
  if (challenge.joined) {
    router.push(`/challenges/${challenge.id}`)
  } else {
    const result = await joinChallenge(challenge.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    router.push(`/challenges/${challenge.id}`)
  }
}

const goBack = () => {
  router.back()
}
</script>
