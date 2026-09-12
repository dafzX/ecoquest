<template>
  <aside class="fixed left-0 top-0 z-40 flex h-screen w-[240px] shrink-0 flex-col border-r border-[#E8EDE9] bg-white">
    <div class="flex h-[76px] items-center px-7">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]">
          <Leaf class="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 class="text-lg font-bold text-[#17211B]">
            EcoQuest
          </h1>

          <p class="text-[11px] text-[#98A39C]">
            Make an impact
          </p>
        </div>
      </div>
    </div>

    <nav class="flex-1 px-4 py-5">
      <p class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A39C]">
        Menu
      </p>

      <div class="space-y-1">
        <RouterLink
          v-for="item in mainMenu"
          :key="item.name"
          :to="item.to"
          class="group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-[#EAF8EE] text-[#15803D]'
              : 'text-[#66736A] hover:bg-[#F5F8F5] hover:text-[#17211B]'
          "
        >
          <component
            :is="item.icon"
            class="h-[19px] w-[19px] shrink-0"
            :class="
              isActive(item.to)
                ? 'text-[#22C55E]'
                : 'text-[#98A39C] group-hover:text-[#66736A]'
            "
          />

          <span>{{ item.name }}</span>

          <span
            v-if="item.badge"
            class="ml-auto rounded-full bg-[#22C55E] px-2 py-0.5 text-[10px] font-semibold text-white"
          >
            {{ item.badge }}
          </span>
        </RouterLink>
      </div>

      <p class="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A39C]">
        Personal
      </p>

      <div class="space-y-1">
        <RouterLink
          v-for="item in personalMenu"
          :key="item.name"
          :to="item.to"
          class="group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-[#EAF8EE] text-[#15803D]'
              : 'text-[#66736A] hover:bg-[#F5F8F5] hover:text-[#17211B]'
          "
        >
          <component
            :is="item.icon"
            class="h-[19px] w-[19px] shrink-0"
            :class="
              isActive(item.to)
                ? 'text-[#22C55E]'
                : 'text-[#98A39C] group-hover:text-[#66736A]'
            "
          />

          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>

    <div class="border-t border-[#E8EDE9] p-4">
      <div class="flex items-center gap-3 rounded-xl bg-[#F8FAF8] p-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#15803D]">
          D
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-[#17211B]">
            Dafa
          </p>

          <p class="truncate text-xs text-[#98A39C]">
            Eco Explorer
          </p>
        </div>

        <button
          type="button"
          class="text-[#98A39C] transition hover:text-[#66736A]"
        >
          <MoreHorizontal class="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  Leaf,
  LayoutDashboard,
  ListChecks,
  Trophy,
  Medal,
  Sprout,
  Gift,
  Users,
  UserCircle,
  MoreHorizontal
} from 'lucide-vue-next'

const route = useRoute()

const mainMenu = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Missions',
    to: '/missions',
    icon: ListChecks
  },
  {
    name: 'Challenges',
    to: '/challenges',
    icon: Trophy
  },
  {
    name: 'Leaderboard',
    to: '/leaderboard',
    icon: Medal
  },
  {
    name: 'Impact',
    to: '/impact',
    icon: Sprout
  },
  {
    name: 'Rewards',
    to: '/rewards',
    icon: Gift
  },
  {
    name: 'Community',
    to: '/community',
    icon: Users
  }
]

const personalMenu = [
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