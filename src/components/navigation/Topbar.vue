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

      <NotificationDropdown
        :is-open="activeDropdown === 'notification'"
        @toggle="toggleDropdown('notification')"
        @close="closeDropdown"
      >
        <template #trigger="{ toggle, unreadCount }">
          <button
            type="button"
            @click="toggle"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#66736A] transition hover:bg-[#F5F8F5]"
          >
            <Bell class="h-[19px] w-[19px]" />

            <span
              v-if="unreadCount > 0"
              class="absolute right-1 top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-white"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>
        </template>
      </NotificationDropdown>

      <div class="h-7 w-px bg-[#E8EDE9]"></div>

      <ProfileDropdown
        :is-open="activeDropdown === 'profile'"
        @toggle="toggleDropdown('profile')"
        @close="closeDropdown"
      >
        <template #trigger="{ toggle, user }">
          <button
            type="button"
            @click="toggle"
            class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F8FAF8]"
          >
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#15803D]">
              {{ user.avatar }}
            </div>

            <div class="text-left">
              <p class="text-sm font-semibold text-[#17211B]">
                {{ user.name }}
              </p>

              <p class="text-xs text-[#98A39C]">
                Level {{ user.level }}
              </p>
            </div>

            <ChevronDown class="h-4 w-4 text-[#98A39C]" />
          </button>
        </template>
      </ProfileDropdown>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import {
  Search,
  Bell,
  ChevronDown
} from 'lucide-vue-next'
import NotificationDropdown from './NotificationDropdown.vue'
import ProfileDropdown from './ProfileDropdown.vue'

const activeDropdown = ref(null)

const toggleDropdown = type => {
  if (activeDropdown.value === type) {
    activeDropdown.value = null
    return
  }

  activeDropdown.value = type
}

const closeDropdown = () => {
  activeDropdown.value = null
}
</script>