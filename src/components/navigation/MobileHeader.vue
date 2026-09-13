<template>
  <header class="flex items-center justify-between py-3 md:hidden">
    <div class="flex items-center gap-2">
      <div
        class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22C55E]"
      >
        <Leaf class="h-4 w-4 text-white" />
      </div>

      <span class="text-sm font-bold text-[#17211B]">
        EcoQuest
      </span>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="relative flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white"
      >
        <Bell class="h-[17px] w-[17px]" />

        <span
          class="absolute right-[6px] top-[5px] h-1.5 w-1.5 rounded-full bg-[#22C55E]"
        ></span>
      </button>

      <div
        class="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]"
      >
        {{ currentUser.avatar }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, Leaf } from 'lucide-vue-next'
import { user } from '../../data/mockData.js'

const currentUser = {
  ...user,
  avatar: user?.avatar || 'DA'
}
</script>