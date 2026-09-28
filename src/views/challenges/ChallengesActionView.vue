<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <ChallengeActionMobile
        v-if="challenge"
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :progress="progress"
        @complete="completeAction"
      />

      <ChallengeActionDesktop
        v-if="challenge"
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :progress="progress"
        @complete="completeAction"
      />

      <div v-if="!challenge" class="py-16 text-center text-sm text-[#66736A]">
        Memuat tantangan...
      </div>

    </div>
  </AppLayout>
</template>

<script setup>
import { showAlert } from '@/services/notifications'
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Globe2,
  Recycle,
  Bike,
  Droplets,
  TreePine
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengeActionMobile from '@/components/challenges/ChallengeActionMobile.vue'
import ChallengeActionDesktop from '@/components/challenges/ChallengeActionDesktop.vue'
import {
  completeChallengeStep,
  getChallenges
} from '@/services/challenges'

const router = useRouter()
const route = useRoute()

const challenge = ref(null)

onMounted(async () => {
  const result = await getChallenges()

  if (!result.success) {
    await showAlert(result.message)
    return
  }

  challenge.value = result.challenges.find(
    (item) => String(item.id) === String(route.params.id)
  ) || null
})

const totalSteps = computed(() => {
  return challenge.value?.steps?.length || 0
})

const completedSteps = computed(() => {
  return Math.min(
    Number(challenge.value?.completedSteps || 0),
    totalSteps.value
  )
})

const progress = computed(() => {
  if (!totalSteps.value) {
    return 0
  }

  return Math.round(
    (completedSteps.value / totalSteps.value) * 100
  )
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
  router.replace({
    name: 'ChallengeDetail',
    params: {
      id: route.params.id
    }
  })
}

async function completeAction() {
  if (completedSteps.value >= totalSteps.value) {
    return
  }

  const result = await completeChallengeStep(challenge.value.id)

  if (!result.success) {
    await showAlert(result.message)
    return
  }

  const nextStep = Math.min(
    Number(result.challenge?.completedSteps ?? completedSteps.value + 1),
    totalSteps.value
  )
  challenge.value = { ...challenge.value, ...result.challenge }

  if (nextStep >= totalSteps.value) {
    router.replace({
      name: 'ChallengeDetail',
      params: {
        id: challenge.value.id
      }
    })
  }
}
</script>