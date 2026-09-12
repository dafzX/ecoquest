<template>
  <header class="hidden h-[76px] items-center justify-between border-b border-[#E8EDE9] bg-white px-8 md:flex">
    <div>

    </div>

    <div class="flex items-center gap-5">
      <div class="relative w-[240px]">
        <Search
          class="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
        />

        <input
          type="text"
          placeholder="Search..."
          class="h-10 w-full rounded-xl border border-[#E2E8E4] bg-[#F8FAF8] pl-10 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:bg-white focus:ring-4 focus:ring-[#22C55E]/10"
        />
      </div>

      <button
        type="button"
        class="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#66736A] transition hover:bg-[#F5F8F5]"
      >
        <Bell class="h-[19px] w-[19px]" />

        <span class="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#22C55E]"></span>
      </button>

      <div class="h-7 w-px bg-[#E8EDE9]"></div>

      <button
        type="button"
        class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F8FAF8]"
      >
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#15803D]">
          D
        </div>

        <div class="text-left">
          <p class="text-sm font-semibold text-[#17211B]">
            Dafa
          </p>

          <p class="text-xs text-[#98A39C]">
            Level 5
          </p>
        </div>

        <ChevronDown class="h-4 w-4 text-[#98A39C]" />
      </button>
    </div>
  </header>
</template>

<script setup>
import {
  Search,
  Bell,
  ChevronDown
} from 'lucide-vue-next'
</script>