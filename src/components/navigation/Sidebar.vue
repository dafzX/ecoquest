<template>
  <aside class="fixed left-0 top-0 z-40 flex h-screen w-60 shrink-0 flex-col shadow-md bg-white">
    <div class="flex h-19 items-center px-7">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]">
          <Leaf class="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 class="text-lg font-bold text-[#17211B]">
            EcoQuest
          </h1>

          <p class="text-[11px] text-[#98A39C]">
            Beri Dampak
          </p>
        </div>
      </div>
    </div>

    <nav class="flex-1 px-4 py-5">
      <p class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A39C]">
        Navigasi
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
            class="h-4.75 w-4.75 shrink-0"
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
        Akun
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
            class="h-4.75 w-4.75 shrink-0"
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
  UserCircle
} from 'lucide-vue-next'

const route = useRoute()

const mainMenu = [
  {
    name: 'Beranda',
    to: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Misi',
    to: '/missions',
    icon: ListChecks
  },
  {
    name: 'Tantangan',
    to: '/challenges',
    icon: Trophy
  },
  {
    name: 'Peringkat',
    to: '/leaderboard',
    icon: Medal
  },
  {
    name: 'Dampak',
    to: '/impact',
    icon: Sprout
  },
  {
    name: 'Hadiah',
    to: '/rewards',
    icon: Gift
  },
  {
    name: 'Pencapaian',
    to: '/achievements',
    icon: Medal
  },
  {
    name: 'Komunitas',
    to: '/community',
    icon: Users
  }
]

const personalMenu = [
  {
    name: 'Profil',
    to: '/profile',
    icon: UserCircle
  }
]

function isActive(path) {
  return route.path === path
}
</script>