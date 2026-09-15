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
      <!-- Notification -->
      <NotificationDropdown
        :is-open="activeDropdown === 'notification'"
        @toggle="toggleDropdown('notification')"
        @close="closeDropdown"
      />

      <!-- Profile -->
      <ProfileDropdown
        :is-open="activeDropdown === 'profile'"
        @toggle="toggleDropdown('profile')"
        @close="closeDropdown"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Leaf } from 'lucide-vue-next'
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