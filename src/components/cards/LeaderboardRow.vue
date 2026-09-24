<template>
  <div
    class="flex items-center gap-4 rounded-lg border px-5 py-4 transition"
    :class="
      user.isCurrentUser
        ? 'border-[#BFE8C9] bg-[#F1FBF3]'
        : 'border-[#E8EDE9] bg-white hover:border-[#D6E6DA]'
    "
  >

    <!-- Rank -->
    <div class="flex w-8 shrink-0 justify-center">
      <span
        class="text-sm font-bold"
        :class="
          user.isCurrentUser
            ? 'text-[#15803D]'
            : 'text-[#66736A]'
        "
      >
        #{{ user.rank }}
      </span>
    </div>

    <!-- Avatar -->
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      :class="
        user.isCurrentUser
          ? 'bg-[#22C55E] text-white'
          : 'bg-[#EAF8EE] text-[#15803D]'
      "
    >
      {{ user.avatar }}
    </div>

    <!-- User -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <p
          class="truncate text-sm font-semibold"
          :class="
            user.isCurrentUser
              ? 'text-[#15803D]'
              : 'text-[#17211B]'
          "
        >
          {{ user.name }}
        </p>

        <span
          v-if="user.isCurrentUser"
          class="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]"
        >
          You
        </span>
      </div>

      <p class="mt-0.5 text-xs text-[#98A39C]">
        Level {{ user.level }}
      </p>
    </div>

    <!-- XP -->
    <div class="w-28 text-right">
      <p class="text-sm font-bold text-[#17211B]">
        {{ user.xp.toLocaleString() }}
      </p>

      <p class="text-[10px] text-[#98A39C]">
        XP
      </p>
    </div>

    <!-- Change -->
    <div class="flex w-14 items-center justify-end">
      <div
        v-if="user.change > 0"
        class="flex items-center gap-1 text-xs font-semibold text-[#16A34A]"
      >
        <ArrowUp class="h-3.5 w-3.5" />
        {{ user.change }}
      </div>

      <div
        v-else-if="user.change < 0"
        class="flex items-center gap-1 text-xs font-semibold text-[#DC2626]"
      >
        <ArrowDown class="h-3.5 w-3.5" />
        {{ Math.abs(user.change) }}
      </div>

      <span
        v-else
        class="text-xs text-[#98A39C]"
      >
        —
      </span>
    </div>

  </div>
</template>

<script setup>
import {
  ArrowDown,
  ArrowUp
} from 'lucide-vue-next'

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>