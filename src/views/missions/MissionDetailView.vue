<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <MissionDetailMobile
        v-if="mission"
        :mission="mission"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
      />
      <MissionDetailDesktop
        v-if="mission"
        :mission="mission"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
      />

      <div v-if="!mission" class="py-16 text-center text-sm text-[#66736A]">
        Misi tidak ditemukan.
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Leaf, Recycle, Zap, Bike } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MissionDetailMobile from '@/components/missions/MissionDetailMobile.vue'
import MissionDetailDesktop from '@/components/missions/MissionDetailDesktop.vue'
import { getMissions } from '@/services/missions'

const router = useRouter()
const route = useRoute()

const mission = ref(null)

onMounted(async () => {
  const result = await getMissions()

  if (!result.success) {
    alert(result.message)
    return
  }

  mission.value = result.missions.find(
    (item) => String(item.id) === String(route.params.id)
  ) || null
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
</script>
