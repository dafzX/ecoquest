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
import { onMounted, ref } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import CommunityMobile from '@/components/community/CommunityMobile.vue'
import CommunityDesktop from '@/components/community/CommunityDesktop.vue'

import { getCurrentUser } from '@/services/auth'
import { getCommunity } from '@/services/community'

const communityPosts = ref([])
const communityStats = ref({
  members: 0,
  actionsToday: 0,
  co2Saved: 0
})
const currentUser = ref(getCurrentUser() || {
  name: 'Eco Explorer',
  avatar: 'EQ'
})

onMounted(async () => {
  const result = await getCommunity()

  if (result.success) {
    communityPosts.value = result.posts
    communityStats.value = result.stats
  }
})
</script>
