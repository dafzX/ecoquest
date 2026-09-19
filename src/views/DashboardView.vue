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
import { computed, ref, onMounted } from 'vue'
import { getCurrentUser } from '@/services/auth'
import {
  missions,
  impact as mockImpact
} from '@/data/mockData'

import {
  Bike,
  Cloud,
  Flame,
  Leaf,
  Plus,
  Recycle,
  Sparkles,
  TrendingUp,
  TreePine,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import DashboardMobile from '@/components/dashboard/DashboardMobile.vue'
import DashboardDesktop from '@/components/dashboard/DashboardDesktop.vue'


const currentUser = ref({
  name: 'Eco Explorer',
  xp: 0,
  level: 1,
  streak: 0,
  nextLevelXp: 500,
  completedMissionIds: []
})

const impact = ref({
  ...mockImpact
})
onMounted(() => {
  const loggedInUser = getCurrentUser()

  if (loggedInUser) {
    currentUser.value = {
      ...currentUser.value,
      ...loggedInUser
    }
  }
})
const missionList = computed(() => {
  return missions.map((mission) => ({
    ...mission,
    completed: currentUser.value.completedMissionIds.includes(
      mission.id
    )
  }))
})

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
    return Math.min(
      Math.max(nextQuest.value.progress, 0),
      100
    )
  }

  return 67
})

const levelProgress = computed(() => {
  const xp = Number(currentUser.value.xp)
  const nextLevelXp = Number(
    currentUser.value.nextLevelXp || 500
  )

  return Math.min(
    Math.round((xp / nextLevelXp) * 100),
    100
  )
})

const ecoActions = computed(() => {
  return currentUser.value.completedMissionIds.length
})

const lowCarbonDistance = computed(() => {
  return currentUser.value.lowCarbonDistance || 0
})
</script>