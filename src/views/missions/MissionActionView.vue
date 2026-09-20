<template>
  <AppLayout>

    <MissionActionDesktop
      v-if="mission"
      :mission="mission"
      :step="currentStep"
      :step-number="stepNumber"
      :total-steps="totalSteps"
      :complete-step="completeStep"
      :go-back="goBack"
    />

    <div
      v-if="!mission || !currentStep"
      class="flex min-h-screen items-center justify-center bg-[#F4FBF7]"
    >
      <div class="text-center">

        <p class="text-sm font-semibold text-[#17211B]">
          Step tidak ditemukan
        </p>

        <button
          type="button"
          @click="goBack"
          class="mt-4 rounded-xl bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Kembali
        </button>

      </div>
    </div>

  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { completeMission } from '@/services/missions'
import AppLayout from '@/layouts/AppLayout.vue'
import MissionActionDesktop from '@/components/missions/MissionActionDesktop.vue'
import { missions } from '@/data/mockData'

const route = useRoute()
const router = useRouter()

const mission = computed(() => {
  return missions.find(
    (item) => String(item.id) === String(route.params.id)
  )
})

const stepNumber = computed(() => {
  return Number(route.params.step || 1)
})

const totalSteps = computed(() => {
  return mission.value?.steps?.length || 0
})

const currentStep = computed(() => {
  if (!mission.value) {
    return null
  }

  return mission.value.steps?.[stepNumber.value - 1] || null
})

const getSavedProgress = () => {
  if (!mission.value) {
    return null
  }

  const saved = localStorage.getItem(
    `mission_progress_${mission.value.id}`
  )

  if (!saved) {
    return null
  }

  try {
    return JSON.parse(saved)
  } catch {
    return null
  }
}

const getCompletedSteps = () => {
  const saved = getSavedProgress()

  if (saved) {
    return Number(saved.completedSteps || 0)
  }

  return Number(
    mission.value?.completedSteps || 0
  )
}

const completeStep = async () => {
  if (!mission.value || !currentStep.value) {
    return
  }

  const completedSteps = getCompletedSteps()

  if (stepNumber.value !== completedSteps + 1) {
    return
  }

  const nextCompletedSteps = Math.min(
    completedSteps + 1,
    totalSteps.value
  )

  // Hanya kirim XP ke backend ketika semua step selesai.
  if (nextCompletedSteps === totalSteps.value) {
    const result = await completeMission(mission.value.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    alert(result.message)
  }

  localStorage.setItem(
    `mission_progress_${mission.value.id}`,
    JSON.stringify({
      completedSteps: nextCompletedSteps
    })
  )

  router.push({
    name: 'MissionDetail',
    params: {
      id: mission.value.id
    }
  })
}

const goBack = () => {
  router.push({
    name: 'MissionDetail',
    params: {
      id: mission.value?.id || route.params.id
    }
  })
}
</script>