<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <ChallengeActionMobile
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :progress="progress"
        @complete="completeAction"
      />

      <ChallengeActionDesktop
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :progress="progress"
        @complete="completeAction"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Globe2,
  Recycle,
  Bike,
  Droplets,
  TreePine
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengeActionMobile from '@/components/challenges/ChallengeActionMobile.vue'
import ChallengeActionDesktop from '@/components/challenges/ChallengeActionDesktop.vue'
import { completeChallengeStep } from '@/services/challenges'
import { getCurrentUser } from '@/services/auth'

const router = useRouter()
const route = useRoute()

const challenges = [
  {
    id: 1,
    title: 'Pekan Pengurangan Plastik',
    description:
      'Kurangi penggunaan plastik sekali pakai dan ajak komunitasmu melakukan aksi nyata.',
    category: 'Plastic',
    participants: 320,
    progress: 68,
    daysLeft: 7,
    joined: true,
    steps: [
      {
        title: 'Gunakan botol minum sendiri',
        description: 'Hindari membeli minuman dengan botol plastik sekali pakai.'
      },
      {
        title: 'Kurangi kantong plastik',
        description: 'Gunakan tas belanja yang dapat digunakan kembali.'
      },
      {
        title: 'Ajak satu orang',
        description: 'Ajak teman atau keluarga untuk mengurangi plastik.'
      }
    ]
  },

  {
    id: 2,
    title: 'Tantangan Transportasi Hijau',
    description:
      'Gunakan transportasi ramah lingkungan untuk perjalanan sehari-hari.',
    category: 'Transport',
    participants: 154,
    progress: 45,
    daysLeft: 12,
    joined: true,
    steps: [
      {
        title: 'Gunakan transportasi umum',
        description: 'Gunakan bus atau transportasi umum untuk perjalananmu.'
      },
      {
        title: 'Berjalan atau bersepeda',
        description: 'Pilih berjalan kaki atau bersepeda untuk perjalanan dekat.'
      },
      {
        title: 'Kurangi perjalanan dengan kendaraan pribadi',
        description: 'Pilih alternatif transportasi yang lebih ramah lingkungan.'
      }
    ]
  },

  {
    id: 3,
    title: 'Tantangan Energi Bersih',
    description:
      'Kurangi konsumsi energi dan gunakan energi secara lebih bijak.',
    category: 'Energy',
    participants: 89,
    progress: 32,
    daysLeft: 10,
    joined: false,
    steps: [
      {
        title: 'Matikan lampu yang tidak digunakan',
        description: 'Pastikan lampu dimatikan ketika tidak diperlukan.'
      },
      {
        title: 'Cabut perangkat elektronik',
        description: 'Cabut charger dan perangkat yang tidak digunakan.'
      },
      {
        title: 'Gunakan energi seperlunya',
        description: 'Kurangi penggunaan perangkat listrik yang tidak diperlukan.'
      }
    ]
  },

  {
    id: 4,
    title: 'Tanam untuk Masa Depan',
    description:
      'Ajak lebih banyak orang menanam dan merawat pohon di lingkungan sekitar.',
    category: 'Tree',
    participants: 210,
    progress: 54,
    daysLeft: 9,
    joined: false,
    steps: [
      {
        title: 'Tanam satu tanaman',
        description: 'Tanam pohon atau tanaman di lingkungan sekitar.'
      },
      {
        title: 'Rawat tanaman',
        description: 'Siram dan rawat tanaman secara rutin.'
      },
      {
        title: 'Ajak orang lain menanam',
        description: 'Ajak teman atau keluarga untuk ikut menanam.'
      }
    ]
  }
]

const challenge = computed(() => {
  const id = Number(route.params.id)

  return (
    challenges.find(item => item.id === id) ||
    challenges[0]
  )
})

const localSavedProgress = ref({ completedSteps: 0 })

const getProgressKey = (challengeId) => {
  const userId = getCurrentUser()?.id || 'guest'

  return `ecoquest_challenge_progress_${userId}_${challengeId}`
}

onMounted(() => {
  const saved = localStorage.getItem(getProgressKey(challenge.value.id))

  if (saved) {
    try {
      localSavedProgress.value = JSON.parse(saved)
    } catch {
      localSavedProgress.value = { completedSteps: 0 }
    }
  }
})

const savedProgress = computed(() => {
  return localSavedProgress.value
})

const totalSteps = computed(() => {
  return challenge.value.steps?.length || 0
})

const completedSteps = computed(() => {
  return Math.min(
    savedProgress.value.completedSteps || 0,
    totalSteps.value
  )
})

const progress = computed(() => {
  if (!totalSteps.value) {
    return 0
  }

  return Math.round(
    (completedSteps.value / totalSteps.value) * 100
  )
})

function getCategoryIcon(category) {
  const value = category?.toLowerCase() || ''

  if (value.includes('plastic')) {
    return Recycle
  }

  if (value.includes('transport')) {
    return Bike
  }

  if (value.includes('energy')) {
    return Droplets
  }

  if (value.includes('tree')) {
    return TreePine
  }

  return Globe2
}

function goBack() {
  router.back()
}

async function completeAction() {
  if (completedSteps.value >= totalSteps.value) {
    return
  }

  const result = await completeChallengeStep(challenge.value.id)

  if (!result.success) {
    alert(result.message)
    return
  }

  const nextStep = Math.min(
    Number(result.challenge?.completedSteps ?? completedSteps.value + 1),
    totalSteps.value
  )

  localSavedProgress.value = {
    completedSteps: nextStep
  }

  localStorage.setItem(
    getProgressKey(challenge.value.id),
    JSON.stringify({
      joined: true,
      completedSteps: nextStep
    })
  )

  if (nextStep >= totalSteps.value) {
    router.push({
      name: 'ChallengeDetail',
      params: {
        id: challenge.value.id
      }
    })
  }
}
</script>