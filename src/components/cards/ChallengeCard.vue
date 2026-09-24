<template>
  <div
    class="rounded-lg border border-[#E8EDE9] bg-white p-5 transition hover:border-[#CDE8D4] hover:shadow-sm"
  >
    <div class="flex items-start justify-between gap-4">

      <!-- Icon -->
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        :class="iconBackground"
      >
        <component
          :is="challengeIcon"
          class="h-6 w-6"
          :class="iconColor"
        />
      </div>

      <!-- Reward -->
      <div class="rounded-full bg-[#FFF8E1] px-3 py-1.5">
        <div class="flex items-center gap-1.5">
          <Zap class="h-3.5 w-3.5 text-[#CA8A04]" />
          <span class="text-xs font-bold text-[#A16207]">
            +{{ challenge.xp }} XP
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-5">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-bold text-[#17211B]">
          {{ challenge.title }}
        </h3>

        <span
          class="rounded-full bg-[#F3F7F4] px-2.5 py-1 text-[10px] font-medium text-[#66736A]"
        >
          {{ challenge.category }}
        </span>
      </div>

      <p class="mt-2 min-h-10.5 text-sm leading-6 text-[#66736A]">
        {{ challenge.description }}
      </p>
    </div>

    <!-- Progress -->
    <div class="mt-5">
      <div class="mb-2 flex items-center justify-between">
        <span class="text-xs font-medium text-[#66736A]">
          Progress
        </span>

        <span class="text-xs font-semibold text-[#17211B]">
          {{ challenge.progress }}/{{ challenge.target }}
        </span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-[#EAF0EB]">
        <div
          class="h-full rounded-full bg-[#22C55E] transition-all"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-5 flex items-center justify-between">
      <div class="flex items-center gap-1.5 text-xs text-[#98A39C]">
        <Clock class="h-3.5 w-3.5" />

        <span>
          {{ challenge.daysLeft }} days left
        </span>
      </div>

      <button
        type="button"
        @click="viewChallenge"
        class="rounded-xl border border-[#DDE5DF] px-4 py-2 text-xs font-semibold text-[#15803D] transition hover:border-[#22C55E] hover:bg-[#EAF8EE]"
      >
        View Challenge
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import {
  Bike,
  Clock,
  Leaf,
  Lightbulb,
  Recycle,
  Zap
} from 'lucide-vue-next'

const props = defineProps({
  challenge: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const challengeIcon = computed(() => {
  if (props.challenge.icon === 'bike') {
    return Bike
  }

  if (props.challenge.icon === 'recycle') {
    return Recycle
  }

  if (props.challenge.icon === 'energy') {
    return Lightbulb
  }

  return Leaf
})

const iconBackground = computed(() => {
  if (props.challenge.category === 'Transport') {
    return 'bg-[#EEF5FF]'
  }

  if (props.challenge.category === 'Energy') {
    return 'bg-[#FEF9C3]'
  }

  if (props.challenge.category === 'Waste') {
    return 'bg-[#FFF7ED]'
  }

  return 'bg-[#EAF8EE]'
})

const iconColor = computed(() => {
  if (props.challenge.category === 'Transport') {
    return 'text-[#3B82F6]'
  }

  if (props.challenge.category === 'Energy') {
    return 'text-[#CA8A04]'
  }

  if (props.challenge.category === 'Waste') {
    return 'text-[#EA580C]'
  }

  return 'text-[#22C55E]'
})

const progressPercentage = computed(() => {
  if (!props.challenge.target) return 0

  return Math.min(
    100,
    Math.round(
      (props.challenge.progress / props.challenge.target) * 100
    )
  )
})

function viewChallenge() {
  router.push(`/challenges/${props.challenge.id}`)
}
</script>