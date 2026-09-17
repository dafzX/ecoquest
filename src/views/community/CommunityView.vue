<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <CommunityMobile
        :community-stats="communityStats"
        :community-posts="communityPosts"
      />
      <CommunityDesktop
        :user="currentUser"
        :community-posts="communityPosts"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import CommunityMobile from '@/components/community/CommunityMobile.vue'
import CommunityDesktop from '@/components/community/CommunityDesktop.vue'

import {
  user,
  communityPosts,
  communityStats
} from '@/data/mockData.js'

const currentUser = {
  ...user,
  avatar: user?.avatar || 'DA'
}
</script>