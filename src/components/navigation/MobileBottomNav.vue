<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E8EDE9] bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-8px_30px_rgba(23,33,27,0.06)] backdrop-blur-md md:hidden"
  >
    <div
      class="mx-auto flex h-[62px] max-w-md items-center justify-around"
    >
      <RouterLink
        v-for="item in menu"
        :key="item.name"
        :to="item.to"
        class="flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition"
        :class="
          isActive(item.to)
            ? 'text-[#15803D]'
            : 'text-[#66736A]'
        "
      >
        <!-- Icon -->
        <div
          class="flex h-7 w-10 items-center justify-center rounded-full transition"
          :class="
            isActive(item.to)
              ? 'bg-[#EAF8EE] text-[#15803D]'
              : 'bg-transparent text-[#98A39C]'
          "
        >
          <component
            :is="item.icon"
            class="h-[20px] w-[20px]"
            :stroke-width="isActive(item.to) ? 2.5 : 2"
          />
        </div>

        <!-- Label -->
        <span
          class="text-[10px] font-medium"
          :class="
            isActive(item.to)
              ? 'text-[#15803D]'
              : 'text-[#66736A]'
          "
        >
          {{ item.name }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

import {
  Home,
  ListChecks,
  Users,
  Gift,
  UserCircle
} from 'lucide-vue-next'

const route = useRoute()

const menu = [
  {
    name: 'Home',
    to: '/dashboard',
    icon: Home
  },
  {
    name: 'Quest',
    to: '/missions',
    icon: ListChecks
  },
  {
    name: 'Community',
    to: '/community',
    icon: Users
  },
  {
    name: 'Rewards',
    to: '/rewards',
    icon: Gift
  },
  {
    name: 'Profile',
    to: '/profile',
    icon: UserCircle
  }
]

function isActive(path) {
  return route.path === path
}
</script>