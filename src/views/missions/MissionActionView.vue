<template>
  <AppLayout>

    <!-- Panggil versi Mobile -->
    <MissionActionMobile
      v-if="mission && currentStep"
      :mission="mission"
      :step="currentStep"
      :step-number="stepNumber"
      :total-steps="totalSteps"
      :complete-step="completeStep"
      :go-back="goBack"
    />

    <!-- Panggil versi Desktop -->
    <MissionActionDesktop
      v-if="mission && currentStep"
      :mission="mission"
      :step="currentStep"
      :step-number="stepNumber"
      :total-steps="totalSteps"
      :complete-step="completeStep"
      :go-back="goBack"
    />

    <!-- Jika mission atau step tidak ada, tampilkan ini (Mencegah Blank Screen) -->
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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  completeMission,
  completeMissionStep,
  getMissions
} from '@/services/missions'
import AppLayout from '@/layouts/AppLayout.vue'

import MissionActionMobile from '@/components/missions/MissionActionMobile.vue'
import MissionActionDesktop from '@/components/missions/MissionActionDesktop.vue'


const route = useRoute()
const router = useRouter()

const mission = ref(null)

onMounted(async () => {
  const result = await getMissions()

  if (!result.success) {
    alert(result.message)
    return
  }

  mission.value = result.missions.find(
    (item) => String(item.id) === String(route.params.id)
  ) || null
})

const stepNumber = computed(() => {
  return Number(route.params.step || 1)
})

const totalSteps = computed(() => {
  return mission.value?.steps?.length || 0
})

const completedSteps = computed(() => {
  return Number(mission.value?.completedSteps || 0)
})

const normalizedSteps = computed(() => {
  if (!mission.value?.steps) {
    return []
  }

  return mission.value.steps.map((step) => {
    if (typeof step === 'string') {
      return {
        title: step,
        description: 'Selesaikan aksi nyata ini untuk melanjutkan misi.'
      }
    }

    return step
  })
})

const currentStep = computed(() => {
  if (!mission.value) {
    return null
  }

  return normalizedSteps.value[stepNumber.value - 1] || null
})

const completeStep = async () => {
  if (!mission.value || !currentStep.value || mission.value.completed) {
    return
  }

  if (stepNumber.value !== completedSteps.value + 1) {
    return
  }

  const stepResult = await completeMissionStep(
    mission.value.id,
    stepNumber.value
  )

  if (!stepResult.success) {
    alert(stepResult.message)
    return
  }

  mission.value = {
    ...mission.value,
    completedSteps: stepResult.completedSteps,
    progress: Math.round((stepResult.completedSteps / totalSteps.value) * 100)
  }

  if (stepResult.completedSteps >= totalSteps.value) {
    const result = await completeMission(mission.value.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    alert(result.message)
  }

  router.push({
    name: 'MissionDetail',
    params: {
      id: mission.value.id
    }
  })
}

function goBack() {
  router.back()
}

</script>
