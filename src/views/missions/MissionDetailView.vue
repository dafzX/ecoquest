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
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { completeMission } from '@/services/missions'
import { Leaf, Recycle, Zap, Bike } from 'lucide-vue-next'

const isSubmitting = ref(false)
const isCompleted = ref(false)
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

async function continueMission() {
  if (isSubmitting.value || isCompleted.value) return

  isSubmitting.value = true

  try {
    const result = await completeMission(mission.value.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    isCompleted.value = true
    alert(result.message)

    router.push('/dashboard')
  } catch (error) {
    alert('Gagal menyimpan mission. Pastikan backend sedang berjalan.')
  } finally {
    isSubmitting.value = false
  }
}
</script>