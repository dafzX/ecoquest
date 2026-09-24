<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <ImpactMobile
        :total-impact="impact.totalImpact"
        :monthly-current="impact.monthlyCurrent"
        :monthly-target="impact.monthlyTarget"
        :monthly-progress="monthlyProgress"
        :impact-stats="impactStats"
        :breakdown="breakdown"
        :visible-actions="visibleActions"
        :show-all-actions="showAllActions"
        :go-back="goBack"
        @toggle:showAllActions="showAllActions = !showAllActions"
      />

      <ImpactDesktop
        :total-impact="impact.totalImpact"
        :monthly-current="impact.monthlyCurrent"
        :monthly-target="impact.monthlyTarget"
        :monthly-progress="monthlyProgress"
        :impact-stats="impactStats"
        :breakdown="breakdown"
        :actions="actions"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  Leaf,
  Recycle,
  Droplets,
  Bike,
  Zap,
  TreePine,
  Sprout
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ImpactMobile from '@/components/impact/ImpactMobile.vue'
import ImpactDesktop from '@/components/impact/ImpactDesktop.vue'

import { getImpact } from '@/services/impact'

const router = useRouter()

const showAllActions = ref(false)

const impact = ref({
  totalImpact: 0,
  monthlyCurrent: 0,
  monthlyTarget: 500,
  co2Saved: 0,
  wasteReduced: 0,
  waterSaved: 0,
  greenDistance: 0,
  treesEquivalent: 0,
  actions: [],
  breakdown: {
    energy: 0,
    recycle: 0,
    transport: 0,
    plant: 0
  }
})

const goBack = () => {
  router.back()
}

async function loadImpact() {
  try {
    const result = await getImpact()

    if (result?.success && result.impact) {
      impact.value = {
        ...impact.value,
        ...result.impact
      }
    }
  } catch (error) {
    console.error('Gagal mengambil data impact:', error)
  }
}

onMounted(() => {
  loadImpact()
})

const monthlyProgress = computed(() => {
  const current = Number(
    impact.value.monthlyCurrent || 0
  )

  const target = Number(
    impact.value.monthlyTarget || 500
  )

  if (target <= 0) {
    return 0
  }

  return Math.min(
    100,
    Math.round((current / target) * 100)
  )
})

const impactStats = computed(() => [
  {
    label: 'Pengurangan CO₂',
    value: `${impact.value.co2Saved ?? 0} kg`,
    icon: Leaf,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },

  {
    label: 'Pengurangan Sampah',
    value: `${impact.value.wasteReduced ?? 0} kg`,
    icon: Recycle,
    bg: 'bg-[#EEF8F0]',
    iconColor: 'text-[#16A34A]'
  },

  {
    label: 'Penghematan Air',
    value: `${impact.value.waterSaved ?? 0} L`,
    icon: Droplets,
    bg: 'bg-[#EAF3FF]',
    iconColor: 'text-[#3B82F6]'
  },

  {
    label: 'Jarak Hijau',
    value: `${impact.value.greenDistance ?? 0} km`,
    icon: Bike,
    bg: 'bg-[#FFF5E8]',
    iconColor: 'text-[#F59E0B]'
  }
])

const breakdown = computed(() => [
  {
    label: 'Hemat energi',
    value: `${impact.value.breakdown?.energy ?? 0}%`,
    progress: impact.value.breakdown?.energy ?? 0,
    icon: Zap,
    bg: 'bg-[#FFF7D6]',
    iconColor: 'text-[#CA8A04]'
  },

  {
    label: 'Daur Ulang',
    value: `${impact.value.breakdown?.recycle ?? 0}%`,
    progress: impact.value.breakdown?.recycle ?? 0,
    icon: Recycle,
    bg: 'bg-[#EAF8EE]',
    iconColor: 'text-[#15803D]'
  },

  {
    label: 'Transportasi hijau',
    value: `${impact.value.breakdown?.transport ?? 0}%`,
    progress: impact.value.breakdown?.transport ?? 0,
    icon: Bike,
    bg: 'bg-[#EAF3FF]',
    iconColor: 'text-[#3B82F6]'
  },

  {
    label: 'Menanam',
    value: `${impact.value.breakdown?.plant ?? 0}%`,
    progress: impact.value.breakdown?.plant ?? 0,
    icon: TreePine,
    bg: 'bg-[#EEF8F0]',
    iconColor: 'text-[#16A34A]'
  }
])

const actions = computed(() => {
  return impact.value.actions || []
})

const visibleActions = computed(() => {
  return showAllActions.value
    ? actions.value
    : actions.value.slice(0, 4)
})
</script>