<template>
  <AppLayout>
    <div class="min-h-screen overflow-x-hidden bg-[#F4FBF7]">
      <ProfileMobile
        :current-user="currentUser"
        :eco-actions="ecoActions"
        :low-carbon-distance="lowCarbonDistance"
        :level-progress="levelProgress"
        :avatar="avatar"
      />

      <ProfileDesktop
        :current-user="currentUser"
        :eco-actions="ecoActions"
        :low-carbon-distance="lowCarbonDistance"
        :level-progress="levelProgress"
        :avatar="avatar"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import ProfileMobile from '@/components/profile/ProfileMobile.vue'
import ProfileDesktop from '@/components/profile/ProfileDesktop.vue'

import { getCurrentUser } from '@/services/auth'

const currentUser = computed(() => {
  return getCurrentUser() || {
    id: null,
    name: 'Pengguna',
    email: '',
    xp: 0,
    level: 1,
    levelName: 'Eco Explorer',
    nextLevelXp: 500,
    streak: 0,
    completedMissionIds: [],
    lowCarbonDistance: 0
  }
})

const ecoActions = computed(() => {
  return Array.isArray(currentUser.value.completedMissionIds)
    ? currentUser.value.completedMissionIds.length
    : Number(currentUser.value.ecoActions || 0)
})

const lowCarbonDistance = computed(() => {
  return Number(currentUser.value.lowCarbonDistance || 0)
})

const levelProgress = computed(() => {
  const xp = Number(currentUser.value.xp || 0)
  const nextLevelXp = Number(currentUser.value.nextLevelXp || 500)

  if (nextLevelXp <= 0) return 0

  return Math.min(
    Math.round((xp / nextLevelXp) * 100),
    100
  )
})

const avatar = computed(() => {
  const name = currentUser.value.name

  if (!name) {
    return 'EQ'
  }

  const words = name.trim().split(/\s+/)

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  return words[0].slice(0, 2).toUpperCase()
})
</script>