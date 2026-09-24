<template>
  <div class="relative">
    <!-- Notification Button -->
    <slot name="trigger" :toggle="() => $emit('toggle')" :unread-count="unreadCount">
      <button
        type="button"
        @click="$emit('toggle')"
        class="relative flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white"
      >
        <Bell class="h-4.25 w-4.25" />

        <!-- Badge -->
        <span
          v-if="unreadCount > 0"
          class="absolute right-0 top-0 flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-[#F4FBF7]"
        >
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </button>
    </slot>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-2 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-2 scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-11 z-100 w-70 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-[#E3ECE6] bg-white shadow-xl shadow-[#17211B]/10"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-[#EEF3EF] px-4 py-3"
        >
          <div>
            <h3 class="text-[12px] font-bold text-[#17211B]">
              Notifikasi
            </h3>

            <p class="mt-0.5 text-[9px] text-[#718078]">
              {{ unreadCount }} belum dibaca
            </p>
          </div>

          <div class="flex items-center gap-1">
            <button
              v-if="unreadCount > 0"
              type="button"
              @click="markAllAsRead"
              class="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[9px] font-semibold text-[#22C55E] transition hover:bg-[#E8F8ED]"
            >
              <CheckCheck class="h-3.5 w-3.5" />
              Tandai semua
            </button>

            <button
              type="button"
              @click="$emit('close')"
              class="flex h-7 w-7 items-center justify-center rounded-lg text-[#9AA59E] transition hover:bg-[#F4F7F5]"
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div class="max-h-82.5 overflow-y-auto overscroll-contain">
          <button
            v-for="notification in notifications"
            :key="notification.id"
            type="button"
            @click="markAsRead(notification)"
            class="flex w-full gap-2.5 border-b border-[#F0F4F1] px-4 py-3 text-left transition hover:bg-[#F8FBF9]"
            :class="{
              'bg-[#F3FBF6]': !notification.read
            }"
          >
            <!-- Icon -->
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              :class="{
                'bg-[#E8F8ED] text-[#22C55E]':
                  notification.type === 'mission',

                'bg-[#F3E8FF] text-[#9333EA]':
                  notification.type === 'challenge',

                'bg-[#FFF1E8] text-[#F97316]':
                  notification.type === 'streak',

                'bg-[#FEF9C3] text-[#CA8A04]':
                  notification.type === 'reward',

                'bg-[#DCFCE7] text-[#15803D]':
                  notification.type === 'eco'
              }"
            >
              <component
                :is="getIcon(notification.type)"
                class="h-4 w-4"
              />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <p
                  class="truncate text-[10px]"
                  :class="
                    notification.read
                      ? 'font-medium text-[#405047]'
                      : 'font-bold text-[#17211B]'
                  "
                >
                  {{ notification.title }}
                </p>

                <span
                  v-if="!notification.read"
                  class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]"
                ></span>
              </div>

              <p
                class="mt-0.5 line-clamp-2 text-[8px] leading-3.5 text-[#718078]"
              >
                {{ notification.message }}
              </p>

              <p class="mt-1 text-[7px] text-[#9AA59E]">
                {{ notification.time }}
              </p>
            </div>
          </button>

          <!-- Empty State -->
          <div
            v-if="notifications.length === 0"
            class="flex flex-col items-center justify-center px-4 py-10 text-center"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F2]"
            >
              <Bell class="h-4 w-4 text-[#9AA59E]" />
            </div>

            <p class="mt-2 text-[10px] font-semibold text-[#405047]">
              Tidak ada notifikasi
            </p>

            <p class="mt-1 text-[8px] text-[#9AA59E]">
              Aktivitas terbaru akan muncul di sini.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-[#EEF3EF] px-4 py-2.5">
          <button
            type="button"
            class="w-full rounded-lg py-1.5 text-[9px] font-semibold text-[#22C55E] transition hover:bg-[#E8F8ED]"
          >
            Lihat semua notifikasi
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Bell,
  CheckCheck,
  Trophy,
  Target,
  Flame,
  Gift,
  Leaf,
  X
} from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'close'])

const notifications = ref([
  {
    id: 1,
    type: 'mission',
    title: 'Mission selesai!',
    message: 'Kamu mendapatkan +75 XP dari mission hari ini.',
    time: '5 menit lalu',
    read: false
  },
  {
    id: 2,
    type: 'challenge',
    title: 'Challenge update',
    message: 'Progress challenge kamu sudah mencapai 68%.',
    time: '1 jam lalu',
    read: false
  },
  {
    id: 3,
    type: 'streak',
    title: 'Streak maintained!',
    message: 'Streak kamu sekarang sudah mencapai 7 hari.',
    time: '3 jam lalu',
    read: false
  },
  {
    id: 4,
    type: 'reward',
    title: 'Reward tersedia',
    message: 'Kamu sudah memiliki cukup XP untuk menukarkan reward.',
    time: 'Kemarin',
    read: true
  }
])

const unreadCount = computed(() => {
  return notifications.value.filter(
    notification => !notification.read
  ).length
})

const markAsRead = notification => {
  notification.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const getIcon = type => {
  const icons = {
    mission: Target,
    challenge: Trophy,
    streak: Flame,
    reward: Gift,
    eco: Leaf
  }

  return icons[type] || Bell
}
</script>