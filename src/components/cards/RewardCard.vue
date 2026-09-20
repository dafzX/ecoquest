<template>
  <div
    class="overflow-hidden rounded-2xl border border-[#E8EDE9] bg-white transition hover:-translate-y-0.5 hover:border-[#CDE8D4] hover:shadow-sm"
  >
    <!-- Reward Image -->
    <div
      class="flex h-[170px] items-center justify-center"
      :class="rewardBackground"
    >
      <div
        class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm"
      >
        <component
          :is="rewardIcon"
          class="h-10 w-10"
          :class="rewardColor"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">

      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <span
            class="rounded-full bg-[#F3F7F4] px-2.5 py-1 text-[10px] font-semibold text-[#66736A]"
          >
            {{ reward.category }}
          </span>

          <h3 class="mt-3 text-base font-bold text-[#17211B]">
            {{ reward.title }}
          </h3>
        </div>

        <div
          v-if="reward.owned"
          class="shrink-0 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-semibold text-[#15803D]"
        >
          Owned
        </div>
      </div>

      <p class="mt-2 min-h-[40px] text-xs leading-5 text-[#66736A]">
        {{ reward.description }}
      </p>

      <!-- Footer -->
      <div class="mt-5 flex items-center justify-between gap-3">

        <div class="flex items-center gap-1.5">
          <Zap class="h-4 w-4 text-[#CA8A04]" />

          <span class="text-sm font-bold text-[#17211B]">
            {{ reward.cost.toLocaleString() }}
          </span>

          <span class="text-xs text-[#98A39C]">
            XP
          </span>
        </div>

        <button
          type="button"
          @click="$emit('claim', reward)"
          :disabled="!reward.available || reward.owned"
          class="rounded-xl px-4 py-2.5 text-xs font-semibold transition"
          :class="
            reward.owned
              ? 'cursor-default bg-[#EAF8EE] text-[#15803D]'
              : reward.available
                ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
                : 'cursor-not-allowed bg-[#F1F3F1] text-[#98A39C]'
          "
        >
          {{
            reward.owned
              ? 'Redeemed'
              : reward.available
                ? 'Redeem'
                : 'Locked'
          }}
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import {
  Award,
  BriefcaseBusiness,
  Leaf,
  Medal,
  Recycle,
  Trophy,
  TreePine,
  Zap
} from 'lucide-vue-next'

const props = defineProps({
  reward: {
    type: Object,
    required: true
  }
})
defineEmits(['claim'])

const rewardIcon = computed(() => {
  if (props.reward.icon === 'tree') {
    return TreePine
  }

  if (props.reward.icon === 'bottle') {
    return Recycle
  }

  if (props.reward.icon === 'bag') {
    return BriefcaseBusiness
  }

  if (props.reward.icon === 'leaf') {
    return Leaf
  }

  if (props.reward.icon === 'trophy') {
    return Trophy
  }

  return Award
})

const rewardBackground = computed(() => {
  if (props.reward.category === 'Impact') {
    return 'bg-[#EAF8EE]'
  }

  if (props.reward.category === 'Merchandise') {
    return 'bg-[#EEF5FF]'
  }

  return 'bg-[#F3E8FF]'
})

const rewardColor = computed(() => {
  if (props.reward.category === 'Impact') {
    return 'text-[#15803D]'
  }

  if (props.reward.category === 'Merchandise') {
    return 'text-[#3B82F6]'
  }

  return 'text-[#9333EA]'
})
</script>