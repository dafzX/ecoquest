<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">
      <LeaderboardMobile
        :leaderboard="leaderboard"
        :top-three="topThree"
        :current-user="currentUser"
      />
      <LeaderboardDesktop
        :leaderboard="leaderboard"
        :top-three="topThree"
        :current-user="currentUser"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import LeaderboardMobile from '@/components/leaderboard/LeaderboardMobile.vue'
import LeaderboardDesktop from '@/components/leaderboard/LeaderboardDesktop.vue'
import { leaderboard } from '@/data/mockData.js'

const topThree = computed(() => {
  return leaderboard.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.find((user) => user.isCurrentUser)
})
</script>