<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <DashboardMobile
        :current-user="currentUser"
        :eco-actions="ecoActions"
        :low-carbon-distance="lowCarbonDistance"
        :next-quest="nextQuest"
        :quest-progress="questProgress"
        :level-progress="levelProgress"
        :impact="impact"
      />
      <DashboardDesktop
        :current-user="currentUser"
        :eco-actions="ecoActions"
        :low-carbon-distance="lowCarbonDistance"
        :next-quest="nextQuest"
        :quest-progress="questProgress"
        :level-progress="levelProgress"
        :impact="impact"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import DashboardMobile from '@/components/dashboard/DashboardMobile.vue'
import DashboardDesktop from '@/components/dashboard/DashboardDesktop.vue'

import {
  user,
  missions,
  impact as mockImpact
} from '../data/mockData'

const currentUser = ref({ ...user })
const impact = ref({ ...mockImpact })

const missionList = ref(
  missions.map((mission) => ({ ...mission }))
)

const nextQuest = computed(() => {
  return (
    missionList.value.find((mission) => !mission.completed) ||
    missionList.value[0] ||
    null
  )
})

const questProgress = computed(() => {
  if (!nextQuest.value) return 0
  if (typeof nextQuest.value.progress === 'number') {
    return Math.min(Math.max(nextQuest.value.progress, 0), 100)
  }
  return 67
})

const levelProgress = computed(() => {
  const xp = Number(currentUser.value.xp ?? 1240)
  const nextLevelXp = Number(currentUser.value.nextLevelXp ?? 1600)
  if (nextLevelXp <= 0) return 0
  return Math.min(Math.round((xp / nextLevelXp) * 100), 100)
})

const ecoActions = computed(() => currentUser.value.ecoActions ?? 12)
const lowCarbonDistance = computed(() => currentUser.value.lowCarbonDistance ?? 24)
</script>