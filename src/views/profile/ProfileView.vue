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
        <div class="mx-auto max-w-[1080px] px-6 pb-10 pt-8">

          <!-- Header -->
          <section class="mb-8 flex items-end justify-between">
            <div>
              <h1 class="text-[28px] font-bold text-[#17211B]">
                Profile
              </h1>
              <p class="mt-1 text-sm text-[#66736A]">
                Kelola profil dan pencapaianmu.
              </p>
            </div>
          </section>

          <div class="grid grid-cols-[300px_1fr] gap-8">
            <!-- Sidebar: Profile Card -->
            <aside>
              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6 text-center shadow-sm">
                <div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#EAF8EE] text-3xl font-bold text-[#15803D]">
                  A
                </div>
                <h2 class="text-xl font-bold text-[#17211B]">Andi Setiawan</h2>
                <p class="text-sm text-[#98A39C]">@andi_save</p>
                <div class="mt-3 inline-block rounded-full bg-[#EAF8EE] px-3 py-1 text-xs font-semibold text-[#15803D]">
                  Level 8 Eco Warrior
                </div>
                <p class="mt-4 text-xs text-[#66736A]">Joined October 2023</p>
                
                <div class="my-6 border-t border-[#E8EDE9]"></div>
                
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p class="text-lg font-bold text-[#17211B]">14.5k</p>
                    <p class="text-[10px] text-[#98A39C]">Total XP</p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-[#17211B]">45</p>
                    <p class="text-[10px] text-[#98A39C]">Actions</p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-[#17211B]">12</p>
                    <p class="text-[10px] text-[#98A39C]">Badges</p>
                  </div>
                </div>
                
                <button class="mt-6 w-full rounded-xl bg-[#22C55E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#15803D]">
                  Edit Profile
                </button>
              </div>
            </aside>

            <!-- Main Content Area: Tabs -->
            <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-sm">
              
              <!-- Tabs Header -->
              <div class="mb-6 flex gap-6 border-b border-[#E8EDE9]">
                <button class="border-b-2 border-[#22C55E] pb-3 text-sm font-semibold text-[#17211B]">
                  Recent Activity
                </button>
                <button class="border-b-2 border-transparent pb-3 text-sm font-semibold text-[#98A39C] transition hover:text-[#17211B]">
                  Badges
                </button>
                <button class="border-b-2 border-transparent pb-3 text-sm font-semibold text-[#98A39C] transition hover:text-[#17211B]">
                  Settings
                </button>
              </div>

              <!-- Tab Content: Recent Activity -->
              <div class="space-y-4">
                <div class="flex items-start gap-4 rounded-xl border border-[#E8EDE9] p-4 transition hover:bg-[#F8FAF8]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]">
                    <Leaf class="h-5 w-5 text-[#22C55E]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <h4 class="text-sm font-bold text-[#17211B]">Planted a Tree</h4>
                      <span class="text-xs text-[#66736A]">Today, 14:00</span>
                    </div>
                    <p class="mt-1 text-xs text-[#66736A]">You planted a Mangrove tree in the coastal area.</p>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="text-xs font-bold text-[#22C55E]">+100 XP</span>
                      <span class="rounded-full bg-[#E8F8ED] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">Nature</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4 rounded-xl border border-[#E8EDE9] p-4 transition hover:bg-[#F8FAF8]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF]">
                    <Bike class="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <h4 class="text-sm font-bold text-[#17211B]">Biked to Work</h4>
                      <span class="text-xs text-[#66736A]">Yesterday, 08:30</span>
                    </div>
                    <p class="mt-1 text-xs text-[#66736A]">You biked 5km and saved carbon emissions.</p>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="text-xs font-bold text-[#22C55E]">+50 XP</span>
                      <span class="rounded-full bg-[#EAF4FF] px-2 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">Transport</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4 rounded-xl border border-[#E8EDE9] p-4 transition hover:bg-[#F8FAF8]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7D6]">
                    <Flame class="h-5 w-5 text-[#F59E0B]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <h4 class="text-sm font-bold text-[#17211B]">7 Days Streak!</h4>
                      <span class="text-xs text-[#66736A]">Oct 15, 09:00</span>
                    </div>
                    <p class="mt-1 text-xs text-[#66736A]">You completed eco actions for 7 days in a row.</p>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="text-xs font-bold text-[#22C55E]">+200 XP</span>
                      <span class="rounded-full bg-[#FFF7D6] px-2 py-0.5 text-[10px] font-semibold text-[#B45309]">Milestone</span>
                    </div>
                  </div>
                </div>
                
                <button class="mt-4 w-full rounded-xl border border-[#E8EDE9] py-3 text-sm font-semibold text-[#15803D] transition hover:bg-[#F8FAF8]">
                  View All Activity
                </button>
              </div>

            </div>
          </div>

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