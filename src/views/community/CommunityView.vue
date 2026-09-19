<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main
        class="mx-auto max-w-[1400px] px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8"
      >
        <CommunityMobile
          :community-stats="communityStats"
          :community-posts="communityPosts"
        />
        <CommunityDesktop
          :user="currentUser"
          :community-posts="communityPosts"
        />
      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import CommunityMobile from '@/components/community/CommunityMobile.vue'
import CommunityDesktop from '@/components/community/CommunityDesktop.vue'

import {
  communityPosts,
  communityStats,
  leaderboard
} from '@/data/mockData.js'

const mobileTab = ref('community')

const topThree = computed(() => {
  return leaderboard.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.find((user) => user.isCurrentUser)
})
</script>