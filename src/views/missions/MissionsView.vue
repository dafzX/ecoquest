<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <MissionsMobile
        :tabs="tabs"
        :active-tab="activeTab"
        :filtered-missions="filteredMissions"
        :section-title="sectionTitle"
        :get-mission-link="getMissionLink"
        :get-category-icon="getCategoryIcon"
        :get-category-style="getCategoryStyle"
        @update:activeTab="activeTab = $event"
      />

      <MissionsDesktop
        :tabs="tabs"
        :active-tab="activeTab"
        :filtered-missions="filteredMissions"
        :get-mission-link="getMissionLink"
        :get-category-icon="getCategoryIcon"
        :get-category-style="getCategoryStyle"
        @update:activeTab="activeTab = $event"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  Leaf,
  Recycle,
  Bike,
  Droplets,
  TreePine,
  Lightbulb
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

import MissionsMobile from '@/components/missions/MissionsMobile.vue'
import MissionsDesktop from '@/components/missions/MissionsDesktop.vue'
import { getCurrentUser } from '@/services/auth'
import { missions } from '@/data/mockData.js'

const missionList = ref([])
const activeTab = ref('all')
const searchQuery = ref('')

const getProgressKey = (missionId) => {
  const userId = getCurrentUser()?.id || 'guest'

  return `ecoquest_mission_progress_${userId}_${missionId}`
}

const loadMissionsProgress = () => {
  const currentUser = getCurrentUser()
  const completedMissionIds =
    currentUser?.completedMissionIds || []

  missionList.value = missions.map((mission) => {
    const saved = localStorage.getItem(
      getProgressKey(mission.id)
    )

    let currentCompletedSteps = 0

    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        currentCompletedSteps = Number(
          parsed.completedSteps || 0
        )
      } catch {
        currentCompletedSteps = 0
      }
    }

    const totalSteps =
      mission.steps?.length || mission.totalSteps || 0

    const completedFromBackend =
      completedMissionIds.includes(mission.id)

    if (completedFromBackend) {
      currentCompletedSteps = totalSteps
    }

    const calculatedProgress =
      totalSteps > 0
        ? Math.round(
            (currentCompletedSteps / totalSteps) * 100
          )
        : 0

    return {
      ...mission,
      completedSteps: currentCompletedSteps,
      progress: completedFromBackend
        ? 100
        : calculatedProgress,
      completed: completedFromBackend
    }
  })
}

onMounted(() => {
  loadMissionsProgress()
})

const tabs = computed(() => [
  {
    label: 'All',
    value: 'all',
    count: missionList.value.length
  },
  {
    label: 'Recommended',
    value: 'recommended',
    count: missionList.value.filter(
      (mission) =>
        mission.recommended === true &&
        !mission.completed
    ).length
  },
  {
    label: 'Active',
    value: 'active',
    count: missionList.value.filter(
      (mission) =>
        !mission.completed &&
        mission.progress > 0
    ).length
  },
  {
    label: 'Completed',
    value: 'completed',
    count: missionList.value.filter(
      (mission) => mission.completed
    ).length
  }
])

const filteredMissions = computed(() => {
  let result = [...missionList.value]

  if (activeTab.value === 'recommended') {
    result = result.filter(
      (mission) =>
        mission.recommended === true &&
        !mission.completed
    )
  }

  if (activeTab.value === 'active') {
    result = result.filter(
      (mission) =>
        !mission.completed &&
        mission.progress > 0
    )
  }

  if (activeTab.value === 'completed') {
    result = result.filter(
      (mission) => mission.completed
    )
  }

  if (searchQuery.value.trim()) {
    const keyword = searchQuery.value
      .toLowerCase()
      .trim()

    result = result.filter((mission) => {
      const title =
        mission.title?.toLowerCase() || ''

      const description =
        mission.description?.toLowerCase() || ''

      const category =
        mission.category?.toLowerCase() || ''

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      )
    })
  }

  return result
})

const sectionTitle = computed(() => {
  if (activeTab.value === 'recommended') {
    return 'Quest Rekomendasi'
  }

  if (activeTab.value === 'active') {
    return 'Quest Aktif'
  }

  if (activeTab.value === 'completed') {
    return 'Quest Selesai'
  }

  return 'Semua Quest'
})

const getMissionLink = (mission) => {
  if (mission.link) {
    return mission.link
  }

  if (mission.id) {
    return `/missions/${mission.id}`
  }

  return '/missions'
}

const getCategoryIcon = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return Recycle
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return Bike
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return Droplets
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return TreePine
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return Lightbulb
  }

  return Leaf
}

const getCategoryStyle = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return 'bg-[#E8F8ED] text-[#22C55E]'
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return 'bg-[#EAF4FF] text-[#3B82F6]'
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return 'bg-[#E8F6FF] text-[#0284C7]'
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return 'bg-[#ECFDF5] text-[#059669]'
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return 'bg-[#FFF8D8] text-[#CA8A04]'
  }

  return 'bg-[#E8F8ED] text-[#22C55E]'
}
</script>
