<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <MobileHeader/>

        <h2 class="text-[17px] font-bold text-[#17211B]">
          Profile
        </h2>

        <!-- Profile -->
        <section
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-4"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]"
            >
              <UserRound class="h-8 w-8 text-[#22C55E]" />
            </div>

            <div class="min-w-0 flex-1">
              <h2 class="text-[14px] font-bold text-[#17211B]">
                Dafa Ardi
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Level 5 · Eco Explorer
              </p>

              <div class="mt-2">

                <div class="mb-1 flex items-center justify-between">
                  <span class="text-[7px] text-[#98A39C]">
                    Progress Level
                  </span>

                  <span class="text-[7px] font-semibold text-[#15803D]">
                    1,240 / 1,600 XP
                  </span>
                </div>

                <div class="h-[5px] rounded-full bg-[#E5EFE8]">
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    style="width: 77.5%"
                  ></div>
                </div>

              </div>
            </div>

          </div>

        </section>

        <!-- Stats -->
        <section class="mb-4 grid grid-cols-3 gap-2">

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7D6]"
            >
              <Flame class="h-3.5 w-3.5 text-[#F59E0B]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              7
            </p>

            <p class="text-[7px] text-[#718078]">
              Streak
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              12
            </p>

            <p class="text-[7px] text-[#718078]">
              Eco Actions
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]"
            >
              <Bike class="h-3.5 w-3.5 text-[#3B82F6]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              24
            </p>

            <p class="text-[7px] text-[#718078]">
              Low Carbon
            </p>
          </div>

        </section>

        <!-- Profile Menu -->
        <section
          class="overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white"
        >

          <RouterLink
            to="/profile/edit"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <Pencil class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Edit Profile
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Ubah informasi profil kamu
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <RouterLink
            to="/achievements"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7D6]"
            >
              <Award class="h-3.5 w-3.5 text-[#D99A00]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                My Achievements
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Lihat pencapaian yang sudah kamu dapatkan
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <RouterLink
            to="/settings"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF4FF]"
            >
              <Settings class="h-3.5 w-3.5 text-[#3B82F6]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Settings
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Kelola preferensi aplikasi
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <button
            type="button"
            class="flex w-full items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 text-left"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2F5F3]"
            >
              <HelpCircle class="h-3.5 w-3.5 text-[#718078]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Help & Support
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Bantuan dan informasi EcoQuest
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </button>

          <button
            type="button"
            class="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            @click="handleLogout"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF1F1]"
            >
              <LogOut class="h-3.5 w-3.5 text-[#EF4444]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#EF4444]">
                Logout
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Keluar dari akun EcoQuest
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </button>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1400px] px-6 pb-10">

          <!-- Header -->
          <section class="mb-7">
            <p class="mb-1 text-sm font-medium text-[#22C55E]">
              Akun Saya
            </p>

            <h1 class="text-[28px] font-bold text-[#17211B]">
              Profile
            </h1>

            <p class="mt-1 text-sm text-[#66736A]">
              Kelola profil dan perjalanan EcoQuest kamu.
            </p>
          </section>

          <!-- Profile Overview -->
          <section
            class="mb-5 rounded-2xl border border-[#E8EDE9] bg-white p-6"
          >

            <div class="flex items-center gap-5">

              <div
                class="flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]"
              >
                <UserRound class="h-10 w-10 text-[#22C55E]" />
              </div>

              <div class="flex-1">

                <div class="flex items-center justify-between">

                  <div>
                    <h2 class="text-lg font-bold text-[#17211B]">
                      Dafa Ardi
                    </h2>

                    <p class="mt-1 text-xs text-[#718078]">
                      Level 5 · Eco Explorer
                    </p>
                  </div>

                  <RouterLink
                    to="/profile/edit"
                    class="flex items-center gap-2 rounded-xl border border-[#DCEBE0] px-4 py-2 text-xs font-semibold text-[#15803D]"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                    Edit Profile
                  </RouterLink>

                </div>

                <div class="mt-5 max-w-xl">

                  <div class="mb-2 flex items-center justify-between">
                    <span class="text-[10px] text-[#98A39C]">
                      Progress ke Level 6
                    </span>

                    <span class="text-[10px] font-semibold text-[#15803D]">
                      1,240 / 1,600 XP
                    </span>
                  </div>

                  <div class="h-2 rounded-full bg-[#E5EFE8]">
                    <div
                      class="h-full rounded-full bg-[#22C55E]"
                      style="width: 77.5%"
                    ></div>
                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- Stats -->
          <section class="mb-5 grid grid-cols-3 gap-5">

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7D6]"
                >
                  <Flame class="h-5 w-5 text-[#F59E0B]" />
                </div>

                <TrendingUp class="h-4 w-4 text-[#22C55E]" />

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                Streak Saat Ini
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                7 hari
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                Terus pertahankan kebiasaan baikmu
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8ED]"
                >
                  <Leaf class="h-5 w-5 text-[#22C55E]" />
                </div>

                <span class="text-[10px] font-semibold text-[#22C55E]">
                  +4 bulan ini
                </span>

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                Total Eco Actions
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                12
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                Aksi ramah lingkungan
              </p>
            </div>

            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <div class="flex items-center justify-between">

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]"
                >
                  <Bike class="h-5 w-5 text-[#3B82F6]" />
                </div>

                <span class="text-[10px] font-semibold text-[#22C55E]">
                  Low Carbon
                </span>

              </div>

              <p class="mt-5 text-xs text-[#718078]">
                Perjalanan Rendah Karbon
              </p>

              <p class="mt-1 text-2xl font-bold text-[#17211B]">
                24 km
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                Bersepeda & transportasi umum
              </p>
            </div>

          </section>

          <!-- Menu -->
          <section class="grid grid-cols-2 gap-5">

            <RouterLink
              to="/achievements"
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0]"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7D6]"
              >
                <Award class="h-5 w-5 text-[#D99A00]" />
              </div>

              <div class="flex-1">
                <h3 class="text-sm font-bold text-[#17211B]">
                  My Achievements
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Lihat pencapaian dan badge yang sudah kamu dapatkan.
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#AAB4AE]" />
            </RouterLink>

            <RouterLink
              to="/settings"
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0]"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF]"
              >
                <Settings class="h-5 w-5 text-[#3B82F6]" />
              </div>

              <div class="flex-1">
                <h3 class="text-sm font-bold text-[#17211B]">
                  Settings
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Kelola notifikasi, bahasa, dan preferensi aplikasi.
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#AAB4AE]" />
            </RouterLink>

            <button
              type="button"
              class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 text-left transition hover:border-[#BBF7D0]"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F5F3]"
              >
                <HelpCircle class="h-5 w-5 text-[#718078]" />
              </div>

              <div class="flex-1">
                <h3 class="text-sm font-bold text-[#17211B]">
                  Help & Support
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Temukan bantuan dan informasi mengenai EcoQuest.
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#AAB4AE]" />
            </button>

            <button
              type="button"
              class="flex items-center gap-4 rounded-2xl border border-[#FECACA] bg-white p-5 text-left"
              @click="handleLogout"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1F1]"
              >
                <LogOut class="h-5 w-5 text-[#EF4444]" />
              </div>

              <div class="flex-1">
                <h3 class="text-sm font-bold text-[#EF4444]">
                  Logout
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Keluar dari akun EcoQuest.
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#AAB4AE]" />
            </button>

          </section>

        </div>
      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import {
  Leaf,
  Bell,
  UserRound,
  Flame,
  Bike,
  Pencil,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  TrendingUp
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue';

const handleLogout = () => {
  console.log('Logout')
}
</script>