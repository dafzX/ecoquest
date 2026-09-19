<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <ImpactMobile
        :total-impact="totalImpact"
        :monthly-current="monthlyCurrent"
        :monthly-target="monthlyTarget"
        :monthly-progress="monthlyProgress"
        :impact-stats="impactStats"
        :breakdown="breakdown"
        :visible-actions="visibleActions"
        :show-all-actions="showAllActions"
        :go-back="goBack"
        @toggle:showAllActions="showAllActions = !showAllActions"
      />
      <ImpactDesktop
        :total-impact="totalImpact"
        :monthly-current="monthlyCurrent"
        :monthly-target="monthlyTarget"
        :monthly-progress="monthlyProgress"
        :impact-stats="impactStats"
        :breakdown="breakdown"
        :actions="actions"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Leaf, Recycle, Droplets, Bike, Zap, TreePine, Sprout } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ImpactMobile from '@/components/impact/ImpactMobile.vue'
import ImpactDesktop from '@/components/impact/ImpactDesktop.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const totalImpact = 1248
const monthlyCurrent = 340
const monthlyTarget = 500

const monthlyProgress = computed(() => {
  return Math.min(100, Math.round((monthlyCurrent / monthlyTarget) * 100))
})

const impactStats = [
  { label: 'CO₂ Reduced', value: '42.8 kg', icon: Leaf, bg: 'bg-[#EAF8EE]', iconColor: 'text-[#15803D]' },
  { label: 'Waste Reduced', value: '8.4 kg', icon: Recycle, bg: 'bg-[#EEF8F0]', iconColor: 'text-[#16A34A]' },
  { label: 'Water Saved', value: '120 L', icon: Droplets, bg: 'bg-[#EAF3FF]', iconColor: 'text-[#3B82F6]' },
  { label: 'Green Distance', value: '32 km', icon: Bike, bg: 'bg-[#FFF5E8]', iconColor: 'text-[#F59E0B]' }
]

const breakdown = [
  { label: 'Hemat energi', value: '32%', progress: 32, icon: Zap, bg: 'bg-[#FFF7D6]', iconColor: 'text-[#CA8A04]' },
  { label: 'Recycle', value: '26%', progress: 26, icon: Recycle, bg: 'bg-[#EAF8EE]', iconColor: 'text-[#15803D]' },
  { label: 'Transportasi hijau', value: '22%', progress: 22, icon: Bike, bg: 'bg-[#EAF3FF]', iconColor: 'text-[#3B82F6]' },
  { label: 'Menanam', value: '20%', progress: 20, icon: TreePine, bg: 'bg-[#EEF8F0]', iconColor: 'text-[#16A34A]' }
]

const actions = [
  { id: 1, title: 'Recycle plastik', date: 'Hari ini', points: 50, icon: Recycle, bg: 'bg-[#EAF8EE]', iconColor: 'text-[#15803D]' },
  { id: 2, title: 'Bike to campus', date: 'Kemarin', points: 35, icon: Bike, bg: 'bg-[#EAF3FF]', iconColor: 'text-[#3B82F6]' },
  { id: 3, title: 'Hemat penggunaan listrik', date: '10 Sep 2026', points: 40, icon: Zap, bg: 'bg-[#FFF7D6]', iconColor: 'text-[#CA8A04]' },
  { id: 4, title: 'Menanam pohon', date: '9 Sep 2026', points: 100, icon: TreePine, bg: 'bg-[#EEF8F0]', iconColor: 'text-[#16A34A]' },
  { id: 5, title: 'Gunakan transportasi umum', date: '8 Sep 2026', points: 45, icon: Leaf, bg: 'bg-[#EAF8EE]', iconColor: 'text-[#15803D]' },
  { id: 6, title: 'Kurangi penggunaan plastik', date: '7 Sep 2026', points: 30, icon: Sprout, bg: 'bg-[#F0FDF4]', iconColor: 'text-[#16A34A]' }
]

const showAllActions = ref(false)

const visibleActions = computed(() => {
  return showAllActions.value ? actions : actions.slice(0, 4)
})
</script>