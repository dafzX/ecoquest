<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">
      <AchievementsMobile
        :tabs="tabs"
        :active-tab="activeTab"
        :filtered-achievements="filteredAchievements"
        :section-title="sectionTitle"
        :empty-title="emptyTitle"
        :empty-description="emptyDescription"
        @update:activeTab="activeTab = $event"
      />

      <AchievementsDesktop
        :tabs="tabs"
        :active-tab="activeTab"
        :filtered-achievements="filteredAchievements"
        :completed-count="completedCount"
        :in-progress-count="inProgressCount"
        :section-title="sectionTitle"
        :empty-title="emptyTitle"
        :empty-description="emptyDescription"
        @update:activeTab="activeTab = $event"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import AchievementsDesktop from '@/components/achievements/AchievementsDesktop.vue'
import AchievementsMobile from '@/components/achievements/AchievementsMobile.vue'

import { getAchievements } from '@/services/achievements'

const activeTab = ref('all')
const achievements = ref([])

onMounted(async () => {
  const result = await getAchievements()

  if (result.success) {
    achievements.value = result.achievements
  }
})

const completedCount = computed(() => {
  return achievements.value.filter(
    achievement => achievement.unlocked
  ).length
})

const inProgressCount = computed(() => {
  return achievements.value.filter(
    achievement => !achievement.unlocked
  ).length
})

const tabs = computed(() => [
  {
    label: 'All',
    value: 'all',
    count: achievements.value.length
  },
  {
    label: 'In Progress',
    value: 'progress',
    count: inProgressCount.value
  },
  {
    label: 'Completed',
    value: 'completed',
    count: completedCount.value
  }
])

const filteredAchievements = computed(() => {
  if (activeTab.value === 'progress') {
    return achievements.value.filter(
      achievement => !achievement.unlocked
    )
  }

  if (activeTab.value === 'completed') {
    return achievements.value.filter(
      achievement => achievement.unlocked
    )
  }

  return achievements.value
})

const sectionTitle = computed(() => {
  if (activeTab.value === 'progress') {
    return 'Achievements In Progress'
  }

  if (activeTab.value === 'completed') {
    return 'Completed Achievements'
  }

  return 'All Achievements'
})

const emptyTitle = computed(() => {
  if (activeTab.value === 'progress') {
    return 'Tidak ada achievement yang sedang berjalan'
  }

  if (activeTab.value === 'completed') {
    return 'Belum ada achievement yang selesai'
  }

  return 'Belum ada achievement'
})

const emptyDescription = computed(() => {
  if (activeTab.value === 'progress') {
    return 'Semua achievement yang tersedia sudah kamu selesaikan.'
  }

  if (activeTab.value === 'completed') {
    return 'Selesaikan quest dan eco action untuk membuka achievement pertamamu.'
  }

  return 'Belum ada achievement yang tersedia saat ini.'
})
</script>
