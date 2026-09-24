<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main
        class="mx-auto max-w-350 px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8"
      >
        <CommunityMobile
          :community-stats="communityStats"
          :community-posts="communityPosts"
          @create-post="createPost"
          @like="toggleLike"
        />
        <CommunityDesktop
          :user="currentUser"
          :community-posts="communityPosts"
          @create-post="createPost"
          @like="toggleLike"
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
import {
  createCommunityPost,
  getCommunity,
  toggleCommunityLike
} from '@/services/community'

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

async function createPost(content) {
  const value = String(content || '').trim()

  if (!value) {
    return
  }

  const result = await createCommunityPost(value)

  if (!result.success) {
    alert(result.message)
    return
  }

  communityPosts.value = [result.post, ...communityPosts.value]
}

async function toggleLike(post) {
  const result = await toggleCommunityLike(post.id)

  if (!result.success) {
    alert(result.message)
    return
  }

  const index = communityPosts.value.findIndex(
    (item) => item.id === post.id
  )

  if (index !== -1) {
    communityPosts.value[index] = {
      ...communityPosts.value[index],
      ...result.post
    }
  }
}
</script>
