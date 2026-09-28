<template>
  <header class="hidden h-19 items-center justify-between border-b border-[#E5EAE7] bg-white px-8 shadow-[0_1px_3px_rgba(23,33,27,0.04)] md:flex">
    <div class="ml-auto flex items-center gap-5">
      <NotificationDropdown
        :is-open="activeDropdown === 'notification'"
        @toggle="toggleDropdown('notification')"
        @close="closeDropdown"
      >
        <template #trigger="{ toggle, unreadCount }">
          <button
            type="button"
            @click="toggle"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#66736A] transition hover:bg-[#F3F8F4] hover:text-[#15803D] active:bg-[#EAF3EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
          >
            <Bell class="h-4.75 w-4.75" />

            <span
              v-if="unreadCount > 0"
              class="absolute right-1 top-1 flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-white"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>
        </template>
      </NotificationDropdown>

      <div class="h-7 w-px bg-[#E5EAE7]"></div>

      <ProfileDropdown
        :is-open="activeDropdown === 'profile'"
        @toggle="toggleDropdown('profile')"
        @close="closeDropdown"
      >
        <template #trigger="{ toggle, user }">
          <button
            type="button"
            @click="toggle"
            class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F3F8F4] active:bg-[#EAF3EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
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
import { Bell, ChevronDown } from 'lucide-vue-next'
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