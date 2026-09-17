<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1080px] px-6 pb-10 pt-8">
      <!-- Header -->
      <DesktopPageHeader
        tag="Akun Saya"
        title="Profile"
        description="Kelola profil dan perjalanan EcoQuest kamu."
      />

      <!-- Profile Overview -->
      <section class="mb-5 rounded-2xl border border-[#E8EDE9] bg-white p-6">
        <div class="flex items-center gap-5">
          <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]">
            <UserRound class="h-10 w-10 text-[#22C55E]" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-6">
              <div>
                <div class="flex items-center gap-3">
                  <h2 class="text-lg font-bold text-[#17211B]">
                    Dafa Ardi
                  </h2>

                  <span class="rounded-full bg-[#E8F8ED] px-2.5 py-1 text-[9px] font-semibold text-[#15803D]">
                    Level 5
                  </span>
                </div>

                <p class="mt-1 text-xs text-[#718078]">
                  Eco Explorer
                </p>
              </div>

              <RouterLink
                to="/profile/edit"
                class="flex shrink-0 items-center gap-2 rounded-xl border border-[#DCEBE0] px-4 py-2 text-xs font-semibold text-[#15803D] transition hover:border-[#BBF7D0] hover:bg-[#F7FBF8]"
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

              <div class="h-2 overflow-hidden rounded-full bg-[#E5EFE8]">
                <div class="h-full rounded-full bg-[#22C55E]" style="width: 77.5%"></div>
              </div>
            </div>
            
            <RouterLink
              to="/profile/edit"
              class="mt-6 flex w-full justify-center rounded-xl bg-[#22C55E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#15803D]"
            >
              Edit Profile
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="mb-5 grid grid-cols-3 gap-5">
        <!-- Streak -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7D6]">
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

        <!-- Eco Actions -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8ED]">
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

        <!-- Low Carbon -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]">
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
        <!-- Achievements -->
        <RouterLink
          to="/profile/achievements"
          class="flex min-h-[110px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF7D6]">
            <Award class="h-5 w-5 text-[#D99A00]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              My Achievements
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Lihat pencapaian dan badge yang sudah kamu dapatkan.
            </p>
          </div>

          <ChevronRight class="h-4 w-4 shrink-0 text-[#AAB4AE]" />
        </RouterLink>

        <!-- My Impact -->
        <RouterLink
          to="/impact"
          class="flex min-h-[110px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]">
            <Leaf class="h-5 w-5 text-[#22C55E]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              My Impact
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Lihat dampak positif yang sudah kamu berikan
            </p>
          </div>

          <ChevronRight class="h-4 w-4 shrink-0 text-[#AAB4AE]" />
        </RouterLink>

        <!-- Settings -->
        <RouterLink
          to="/profile/settings"
          class="flex min-h-[110px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF]">
            <Settings class="h-5 w-5 text-[#3B82F6]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              Settings
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Kelola notifikasi, bahasa, dan preferensi aplikasi.
            </p>
          </div>

          <ChevronRight class="h-4 w-4 shrink-0 text-[#AAB4AE]" />
        </RouterLink>

        <!-- Help & Support -->
        <RouterLink
          to="/profile/help-support"
          class="flex min-h-[110px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-5 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F3]">
            <HelpCircle class="h-5 w-5 text-[#718078]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              Help & Support
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Temukan bantuan dan informasi mengenai EcoQuest.
            </p>
          </div>

          <ChevronRight class="h-4 w-4 shrink-0 text-[#AAB4AE]" />
        </RouterLink>

        <!-- Logout -->
        <button
          type="button"
          class="flex min-h-[110px] items-center gap-4 rounded-2xl border border-[#FECACA] bg-white p-5 text-left transition hover:bg-[#FFF9F9]"
          @click="handleLogout"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F1]">
            <LogOut class="h-5 w-5 text-[#EF4444]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#EF4444]">
              Logout
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Keluar dari akun EcoQuest.
            </p>
          </div>

          <ChevronRight class="h-4 w-4 shrink-0 text-[#AAB4AE]" />
        </button>
      </section>
    </div>
  </main>
</template>

<script setup>
import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'
import {
  UserRound,
  Flame,
  Leaf,
  Bike,
  Pencil,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  TrendingUp
} from 'lucide-vue-next'

const handleLogout = () => {
  console.log('Logout')
}
</script>
