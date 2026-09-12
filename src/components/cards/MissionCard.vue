<template>
  <div
    class="rounded-2xl border border-[#E8EDE9] bg-white p-4 transition hover:border-[#CDEBD5] hover:shadow-[0_8px_25px_rgba(23,33,27,0.05)] md:flex md:items-center md:gap-4"
  >

    <!-- Mobile -->
    <div class="flex gap-3 md:hidden">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        :class="mission.completed ? 'bg-[#DCFCE7]' : 'bg-[#F3F8F4]'"
      >
        <component
          :is="missionIcon"
          class="h-[18px] w-[18px]"
          :class="mission.completed ? 'text-[#15803D]' : 'text-[#66736A]'"
        />
      </div>

      <div class="min-w-0 flex-1">
        <h3
          class="text-sm font-semibold leading-5"
          :class="mission.completed ? 'text-[#98A39C] line-through' : 'text-[#17211B]'"
        >
          {{ mission.title }}
        </h3>

        <p class="mt-1 line-clamp-2 text-[11px] leading-4 text-[#98A39C]">
          {{ mission.description }}
        </p>

        <span
          class="mt-2 inline-flex rounded-full bg-[#F3F8F4] px-2 py-0.5 text-[9px] font-medium text-[#66736A]"
        >
          {{ mission.category }}
        </span>
      </div>
    </div>

    <div
      class="mt-3 flex items-center justify-between md:hidden"
    >
      <div>
        <p class="text-sm font-bold text-[#22C55E]">
          +{{ mission.xp }} XP
        </p>

        <p
          v-if="mission.completed"
          class="mt-0.5 text-[10px] font-medium text-[#15803D]"
        >
          Completed
        </p>
      </div>

      <button
        v-if="!mission.completed"
        type="button"
        @click="$emit('complete', mission.id)"
        class="rounded-lg bg-[#22C55E] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#16A34A]"
      >
        Complete
      </button>

      <div
        v-else
        class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCFCE7]"
      >
        <Check class="h-4 w-4 text-[#15803D]" />
      </div>
    </div>

    <!-- Desktop -->
    <div
      class="hidden md:flex md:w-full md:items-center md:gap-4"
    >
      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        :class="mission.completed ? 'bg-[#DCFCE7]' : 'bg-[#F3F8F4]'"
      >
        <component
          :is="missionIcon"
          class="h-5 w-5"
          :class="mission.completed ? 'text-[#15803D]' : 'text-[#66736A]'"
        />
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3
            class="truncate text-sm font-semibold"
            :class="mission.completed ? 'text-[#98A39C] line-through' : 'text-[#17211B]'"
          >
            {{ mission.title }}
          </h3>

          <span
            class="shrink-0 rounded-full bg-[#F3F8F4] px-2 py-0.5 text-[10px] font-medium text-[#66736A]"
          >
            {{ mission.category }}
          </span>
        </div>

        <p class="mt-1 truncate text-xs text-[#98A39C]">
          {{ mission.description }}
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-4">
        <div class="text-right">
          <p class="text-sm font-bold text-[#22C55E]">
            +{{ mission.xp }} XP
          </p>

          <p
            v-if="mission.completed"
            class="mt-0.5 text-[10px] font-medium text-[#15803D]"
          >
            Completed
          </p>
        </div>

        <button
          v-if="!mission.completed"
          type="button"
          @click="$emit('complete', mission.id)"
          class="rounded-lg bg-[#22C55E] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#16A34A]"
        >
          Complete
        </button>

        <div
          v-else
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCFCE7]"
        >
          <Check class="h-4 w-4 text-[#15803D]" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {
  Recycle,
  Bike,
  Lightbulb,
  Check
} from 'lucide-vue-next'

const props = defineProps({
  mission: {
    type: Object,
    required: true
  }
})

defineEmits(['complete'])

const icons = {
  recycle: Recycle,
  bike: Bike,
  energy: Lightbulb
}

const missionIcon = icons[props.mission.icon] || Recycle
</script>