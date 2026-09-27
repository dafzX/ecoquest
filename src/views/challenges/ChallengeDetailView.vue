<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <ChallengeDetailMobile
        v-if="challenge"
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />

      <ChallengeDetailDesktop
        v-if="challenge"
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />

      <div v-if="!challenge" class="py-16 text-center text-sm text-[#66736A]">
        Memuat tantangan...
      </div>

    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Globe2,
  Recycle,
  Bike,
  Droplets,
  TreePine
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengeDetailMobile from '@/components/challenges/ChallengeDetailMobile.vue'
import ChallengeDetailDesktop from '@/components/challenges/ChallengeDetailDesktop.vue'
import {
  getChallenges,
  joinChallenge as joinChallengeApi
} from '@/services/challenges'

const router = useRouter()
const route = useRoute()

const challenge = ref(null)

function withProgress(item) {
  const totalSteps = item.steps?.length || 0
  const completedSteps = Number(item.completedSteps || 0)

  return {
    ...item,
    totalSteps,
    completedSteps,
    actionProgress: totalSteps
      ? Math.round((completedSteps / totalSteps) * 100)
      : 0
  }
}

onMounted(async () => {
  const result = await getChallenges()

  if (!result.success) {
    alert(result.message)
    return
  }

  const item = result.challenges.find(
    (entry) => String(entry.id) === String(route.params.id)
  )
  challenge.value = item ? withProgress(item) : null
})

function getCategoryIcon(category) {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastic')) {
    return Recycle
  }

  if (value.includes('transport')) {
    return Bike
  }

  if (value.includes('energy')) {
    return Droplets
  }

  if (value.includes('tree')) {
    return TreePine
  }

  return Globe2
}

function goBack() {
  router.back()
}

async function joinChallenge() {
  if (!challenge.value) return

  if (!challenge.value.joined) {
    const result = await joinChallengeApi(challenge.value.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    challenge.value = withProgress({
      ...challenge.value,
      ...result.challenge,
      joined: true
    })
    return
  }

  router.push({
    name: 'ChallengeAction',
    params: {
      id: challenge.value.id
    }
  })
}
</script>