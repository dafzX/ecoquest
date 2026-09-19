<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <ChallengeDetailMobile
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />

      <ChallengeDetailDesktop
        :challenge="challenge"
        :get-category-icon="getCategoryIcon"
        :go-back="goBack"
        @join="joinChallenge"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Globe2,
  Recycle,
  Bike,
  Droplets,
  TreePine
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import ChallengeDetailMobile from '@/components/challenges/ChallengeDetailMobile.vue'
import ChallengeDetailDesktop from '@/components/challenges/ChallengeDetailDesktop.vue'

const router = useRouter()
const route = useRoute()

const challenges = [
  {
    id: 1,
    title: 'Plastic Reduction Week',
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
    title: 'Green Transport Challenge',
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
    title: 'Clean Energy Challenge',
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
    title: 'Plant for Tomorrow',
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

const updateTrigger = ref(0)

const challenge = computed(() => {
  updateTrigger.value // depend on trigger for reactivity

  const id = Number(route.params.id)

  const found = challenges.find(
    item => item.id === id
  )

  if (!found) {
    return challenges[0]
  }

  const saved = localStorage.getItem(
    `ecoquest_challenge_progress_${found.id}`
  )

  let completedSteps = 0
  let joined = found.joined || false

  if (saved) {
    try {
      const data = JSON.parse(saved)
      completedSteps = data.completedSteps || 0
      if (data.joined !== undefined) {
        joined = data.joined
      }
    } catch {
      completedSteps = 0
    }
  }

  const totalSteps = found.steps?.length || 0

  const actionProgress = totalSteps
    ? Math.round((completedSteps / totalSteps) * 100)
    : 0

  return {
    ...found,
    joined,
    completedSteps,
    totalSteps,
    actionProgress
  }
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
  router.push('/challenges')
}

function joinChallenge() {
  const current = challenge.value

  if (!current.joined) {
    localStorage.setItem(
      `ecoquest_challenge_progress_${current.id}`,
      JSON.stringify({
        joined: true,
        completedSteps: current.completedSteps
      })
    )
    updateTrigger.value++ // trigger re-render to update button state
    return
  }

  router.push({
    name: 'ChallengeAction',
    params: {
      id: current.id
    }
  })
}
</script>