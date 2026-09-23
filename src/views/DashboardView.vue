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
  onUnmounted,
  ref
} from 'vue'

import {
  getCurrentUser
} from '@/services/auth'

import {
  missions,
  impact as mockImpact
} from '@/data/mockData'

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
  ...mockImpact
})

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

const getMissionProgress = (mission) => {
  const totalSteps =
    mission.steps?.length ||
    mission.totalSteps ||
    0

  const saved =
    localStorage.getItem(
      `mission_progress_${mission.id}`
    )

  let completedSteps =
    Number(mission.completedSteps || 0)

  let savedProgress = 0

  if (saved) {
    try {
      const parsed = JSON.parse(saved)

      completedSteps =
        Number(
          parsed.completedSteps ??
          completedSteps
        )

      savedProgress =
        Number(
          parsed.progress ?? 0
        )
    } catch {
      completedSteps =
        Number(
          mission.completedSteps || 0
        )
    }
  }

  if (totalSteps > 0) {
    return Math.min(
      Math.round(
        (completedSteps / totalSteps) * 100
      ),
      100
    )
  }

  if (savedProgress > 0) {
    return Math.min(
      savedProgress,
      100
    )
  }

  if (typeof mission.progress === 'number') {
    return Math.min(
      Math.max(
        mission.progress,
        0
      ),
      100
    )
  }

  return 0
}

const isMissionCompleted = (mission) => {
  const progress =
    getMissionProgress(mission)

  const completedFromUser =
    currentUser.value.completedMissionIds.some(
      (id) =>
        String(id) ===
        String(mission.id)
    )

  return (
    progress >= 100 ||
    completedFromUser ||
    mission.completed === true
  )
}

const missionList = computed(() => {
  return missions.map((mission) => {
    const progress =
      getMissionProgress(mission)

    const completed =
      isMissionCompleted(mission)

    return {
      ...mission,
      progress,
      completed
    }
  })
})

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

const refreshDashboard = () => {
  loadCurrentUser()

  currentUser.value = {
    ...currentUser.value
  }
}

const handleStorageChange = (event) => {
  if (
    event.key === 'ecoquest_session' ||
    event.key === null ||
    (
      event.key &&
      event.key.startsWith(
        'mission_progress_'
      )
    )
  ) {
    refreshDashboard()
  }
}

onMounted(() => {
  loadCurrentUser()

  window.addEventListener(
    'storage',
    handleStorageChange
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'storage',
    handleStorageChange
  )
})
</script>