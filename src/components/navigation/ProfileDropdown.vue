<template>
  <div class="relative">
    <!-- Profile Button -->
    <slot name="trigger" :toggle="() => $emit('toggle')" :user="currentUser">
      <button
        type="button"
        @click="$emit('toggle')"
        class="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D] transition hover:bg-[#BBF7D0]"
      >
        {{ currentUser.avatar }}
      </button>
    </slot>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-95 opacity-0 -translate-y-1"
      enter-to-class="scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="scale-100 opacity-100 translate-y-0"
      leave-to-class="scale-95 opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-10 z-[100] w-[250px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-[#E8EDE9] bg-white shadow-[0_12px_35px_rgba(23,33,27,0.12)]"
      >
        <!-- Profile Info -->
        <div class="border-b border-[#E8EDE9] p-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-bold text-[#15803D]"
            >
              {{ currentUser.avatar }}
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-bold text-[#17211B]">
                {{ currentUser.name }}
              </p>

              <p class="truncate text-xs text-[#7A867E]">
                @{{ currentUser.username }}
              </p>
            </div>
          </div>

          <div
            class="mt-3 flex items-center justify-between rounded-xl bg-[#F5FAF6] px-3 py-2"
          >
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-medium text-[#66736A]">
                Level
              </span>

              <span class="text-xs font-bold text-[#15803D]">
                {{ currentUser.level }}
              </span>
            </div>

            <span class="text-xs font-bold text-[#15803D]">
              {{ currentUser.xp }} XP
            </span>
          </div>
        </div>

        <!-- Menu -->
        <div class="p-2">
          <RouterLink
            to="/profile"
            @click="$emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <UserCircle class="h-[18px] w-[18px]" />
            <span>Profile</span>
          </RouterLink>

          <RouterLink
            to="/profile/achievements"
            @click="$emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <Trophy class="h-[18px] w-[18px]" />
            <span>Achievements</span>
          </RouterLink>

          <RouterLink
            to="/profile/settings"
            @click="$emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <Settings class="h-[18px] w-[18px]" />
            <span>Settings</span>
          </RouterLink>

          <RouterLink
            to="/profile/help-support"
            @click="$emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <CircleHelp class="h-[18px] w-[18px]" />
            <span>Help & Support</span>
          </RouterLink>
        </div>

        <!-- Logout -->
        <div class="border-t border-[#E8EDE9] p-2">
          <button
            type="button"
            @click="logout"
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
          >
            <LogOut class="h-[18px] w-[18px]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import {
  CircleHelp,
  LogOut,
  Settings,
  Trophy,
  UserCircle
} from 'lucide-vue-next'

import { user } from '../../data/mockData.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'close'])

const router = useRouter()

const currentUser = computed(() => ({
  ...user,
  avatar: user?.avatar || 'DA'
}))

const logout = () => {
  emit('close')
  router.push('/login')
}
</script>