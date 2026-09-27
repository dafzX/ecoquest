<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7] transition-colors duration-300">
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
import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  getCurrentUser
} from '@/services/auth'

import { getMissions } from '@/services/missions'
import { getImpact } from '@/services/impact'

import AppLayout from '@/layouts/AppLayout.vue'

import DashboardMobile from '@/components/dashboard/DashboardMobile.vue'
import DashboardDesktop from '@/components/dashboard/DashboardDesktop.vue'

const currentUser = ref({
  id: null,
  name: 'Eco Explorer',
  username: 'user',
  email: '',
  avatar: '',
  xp: 0,
  level: 1,
  levelName: 'Eco Explorer',
  streak: 0,
  nextLevelXp: 500,
  completedMissionIds: [],
  lowCarbonDistance: 0
})

const impact = ref({
  co2Saved: 0,
  wasteRecycled: 0,
  treesEquivalent: 0
})
const missionList = ref([])

const loadCurrentUser = () => {
  const loggedInUser = getCurrentUser()

  if (!loggedInUser) {
    return
  }

  currentUser.value = {
    ...currentUser.value,
    ...loggedInUser,

    xp: Number(loggedInUser.xp ?? 0),

    level: Number(
      loggedInUser.level ?? 1
    ),

    streak: Number(
      loggedInUser.streak ?? 0
    ),

    nextLevelXp: Number(
      loggedInUser.nextLevelXp ?? 500
    ),

    lowCarbonDistance: Number(
      loggedInUser.lowCarbonDistance ?? 0
    ),

    completedMissionIds:
      Array.isArray(loggedInUser.completedMissionIds)
        ? loggedInUser.completedMissionIds
        : []
  }
}

const nextQuest = computed(() => {
  return (
    missionList.value.find(
      (mission) =>
        !mission.completed
    ) || null
  )
})

const questProgress = computed(() => {
  if (!nextQuest.value) {
    return 0
  }

  return Math.min(
    Math.max(
      Number(
        nextQuest.value.progress || 0
      ),
      0
    ),
    100
  )
})

const levelProgress = computed(() => {
  const xp =
    Number(
      currentUser.value.xp || 0
    )

  const nextLevelXp =
    Number(
      currentUser.value.nextLevelXp || 500
    )

  if (nextLevelXp <= 0) {
    return 0
  }

  return Math.min(
    Math.round(
      (xp / nextLevelXp) * 100
    ),
    100
  )
})

const ecoActions = computed(() => {
  const completedFromMission =
    missionList.value.filter(
      (mission) =>
        mission.completed
    ).length

  return Math.max(
    completedFromMission,
    currentUser.value
      .completedMissionIds.length
  )
})

const lowCarbonDistance = computed(() => {
  return Number(
    currentUser.value
      .lowCarbonDistance || 0
  )
})

onMounted(async () => {
  loadCurrentUser()

  const [missionsResult, impactResult] = await Promise.all([
    getMissions(),
    getImpact()
  ])

  if (missionsResult.success) {
    missionList.value = missionsResult.missions
  }

  if (impactResult.success) {
    impact.value = {
      ...impactResult.impact,
      wasteRecycled: impactResult.impact.wasteReduced
    }
  }
})
</script>