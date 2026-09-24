<template>
  <div class="relative">
    <!-- Profile Button -->
    <slot
      name="trigger"
      :toggle="() => emit('toggle')"
      :user="currentUser"
    >
      <button
        type="button"
        @click="emit('toggle')"
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
        class="absolute right-0 top-10 z-100 w-62.5 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-[#E8EDE9] bg-white shadow-[0_12px_35px_rgba(23,33,27,0.12)]"
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
                {{ currentUser.email }}
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
            @click="emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <UserCircle class="h-4.5 w-4.5" />
            <span>Profil</span>
          </RouterLink>

          <RouterLink
            to="/achievements"
            @click="emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <Trophy class="h-4.5 w-4.5" />
            <span>Pencapaian</span>
          </RouterLink>

          <RouterLink
            to="/profile/settings"
            @click="emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <Settings class="h-4.5 w-4.5" />
            <span>Pengaturan</span>
          </RouterLink>

          <RouterLink
            to="/profile/help-support"
            @click="emit('close')"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#455149] transition hover:bg-[#F3F8F4] hover:text-[#15803D]"
          >
            <CircleHelp class="h-4.5 w-4.5" />
            <span>Bantuan & Dukungan</span>
          </RouterLink>
        </div>

        <!-- Logout -->
        <div class="border-t border-[#E8EDE9] p-2">
          <button
            type="button"
            @click="logout"
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
          >
            <LogOut class="h-4.5 w-4.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import {
  CircleHelp,
  LogOut,
  Settings,
  Trophy,
  UserCircle
} from 'lucide-vue-next'

import {
  getCurrentUser,
  logout as logoutUser
} from '@/services/auth'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'close'])

const router = useRouter()

const userData = ref(null)

const loadCurrentUser = () => {
  userData.value = getCurrentUser()
}

const currentUser = computed(() => {
  const user = userData.value

  if (!user) {
    return {
      name: 'User',
      username: 'user',
      avatar: 'U',
      level: 1,
      xp: 0
    }
  }

  const name = user.name || 'User'

  const username =
    user.username ||
    user.email?.split('@')[0] ||
    'user'

  const avatar =
    user.avatar ||
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  return {
    ...user,
    name,
    username,
    avatar,
    level: user.level ?? 1,
    xp: user.xp ?? 0
  }
})

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      loadCurrentUser()
    }
  }
)

onMounted(() => {
  loadCurrentUser()
})

const logout = () => {
  logoutUser()

  userData.value = null

  emit('close')

  router.push('/login')
}
</script>