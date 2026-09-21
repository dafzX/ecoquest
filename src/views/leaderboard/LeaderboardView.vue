<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">

      <LeaderboardMobile
        v-if="!isLoading"
        :leaderboard="leaderboard"
        :top-three="topThree"
        :current-user="currentUser"
        :go-back="goBack"
      />

      <LeaderboardDesktop
        v-if="!isLoading"
        :leaderboard="leaderboard"
        :top-three="topThree"
        :current-user="currentUser"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getCurrentUser } from '@/services/auth'
import { getLeaderboard } from '@/services/leaderboard'

import AppLayout from '@/layouts/AppLayout.vue'
import LeaderboardMobile from '@/components/leaderboard/LeaderboardMobile.vue'
import LeaderboardDesktop from '@/components/leaderboard/LeaderboardDesktop.vue'

const router = useRouter()

const leaderboard = ref([])
const isLoading = ref(true)

const currentUserId = computed(() => {
  return getCurrentUser()?.id || null
})

const goBack = () => {
  router.back()
}

onMounted(async () => {
  const result = await getLeaderboard()

  if (result.success) {
    leaderboard.value = result.leaderboard.map((user) => ({
      ...user,
      avatar: user.name.charAt(0).toUpperCase(),
      isCurrentUser: user.id === currentUserId.value
    }))
  } else {
    alert(result.message)
  }

  isLoading.value = false
})

const topThree = computed(() => {
  return leaderboard.value.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.value.find(
    (user) => user.isCurrentUser
  )
})
</script>