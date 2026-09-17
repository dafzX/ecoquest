<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <MissionDetailMobile
        :mission="mission"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @continue="continueMission"
      />
      <MissionDetailDesktop
        :mission="mission"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @continue="continueMission"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Leaf, Recycle, Zap, Bike } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MissionDetailMobile from '@/components/missions/MissionDetailMobile.vue'
import MissionDetailDesktop from '@/components/missions/MissionDetailDesktop.vue'

import { missions } from '@/data/mockData.js'

const router = useRouter()
const route = useRoute()

const mission = computed(() => {
  const id = Number(route.params.id)
  return missions.find(m => m.id === id) || missions[0]
})

function getCategoryIcon(category) {
  const cat = category?.toLowerCase() || ''
  if (cat.includes('plastic') || cat.includes('daur ulang') || cat.includes('recycle')) return Recycle
  if (cat.includes('transport') || cat.includes('bike')) return Bike
  if (cat.includes('energy') || cat.includes('energi')) return Zap
  return Leaf
}

function goBack() {
  router.back()
}

function continueMission() {
  console.log('Continue mission:', mission.value.id)
}
</script>