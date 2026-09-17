<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">
    <MobileHeader />

    <div class="mb-4 mt-4">
      <h2 class="text-[17px] font-bold text-[#17211B]">
        Profile
      </h2>

      <p class="mt-1 text-[9px] text-[#718078]">
        Kelola profil dan perjalanan EcoQuest kamu.
      </p>
    </div>

    <!-- Profile -->
    <section class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]">
          <UserRound class="h-8 w-8 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <div class="min-w-0">
              <h2 class="truncate text-[14px] font-bold text-[#17211B]">
                Dafa Ardi
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Level 5 · Eco Explorer
              </p>
            </div>

            <span class="shrink-0 rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]">
              Level 5
            </span>
          </div>

          <div class="mt-3">
            <div class="mb-1 flex items-center justify-between">
              <span class="text-[7px] text-[#98A39C]">
                Progress Level
              </span>

              <span class="text-[7px] font-semibold text-[#15803D]">
                1,240 / 1,600 XP
              </span>
            </div>

            <div class="h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]">
              <div class="h-full rounded-full bg-[#22C55E]" style="width: 77.5%"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="mb-4 grid grid-cols-3 gap-2">
      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center">
        <div class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7D6]">
          <Flame class="h-3.5 w-3.5 text-[#F59E0B]" />
        </div>

        <p class="mt-2 text-[13px] font-bold text-[#17211B]">
          7
        </p>

        <p class="text-[7px] text-[#718078]">
          Streak
        </p>
      </div>

      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center">
        <div class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]">
          <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <p class="mt-2 text-[13px] font-bold text-[#17211B]">
          12
        </p>

        <p class="text-[7px] text-[#718078]">
          Eco Actions
        </p>
      </div>

      <div class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center">
        <div class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]">
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
    <section class="overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white">
      <!-- Edit Profile -->
      <RouterLink to="/profile/edit" class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]">
          <Pencil class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Edit Profile
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Ubah informasi profil kamu
          </p>
        </div>

        <ChevronRight class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]" />
      </RouterLink>

      <!-- Achievements -->
      <RouterLink to="/profile/achievements" class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF7D6]">
          <Award class="h-3.5 w-3.5 text-[#D99A00]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            My Achievements
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Lihat pencapaian yang sudah kamu dapatkan
          </p>
        </div>

        <ChevronRight class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]" />
      </RouterLink>

      <!-- My Impact -->
      <RouterLink to="/impact" class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]">
          <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            My Impact
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Lihat dampak positif yang sudah kamu berikan
          </p>
        </div>

        <ChevronRight class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]" />
      </RouterLink>

      <!-- Settings -->
      <RouterLink to="/profile/settings" class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FF]">
          <Settings class="h-3.5 w-3.5 text-[#3B82F6]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Settings
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Kelola preferensi aplikasi
          </p>
        </div>

        <ChevronRight class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]" />
      </RouterLink>

      <!-- Help & Support -->
      <RouterLink to="/profile/help-support" class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F3]">
          <HelpCircle class="h-3.5 w-3.5 text-[#718078]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Help & Support
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Bantuan dan informasi EcoQuest
          </p>
        </div>

        <ChevronRight class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]" />
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import {
  UserRound,
  Flame,
  Leaf,
  Bike,
  Pencil,
  Award,
  Settings,
  HelpCircle,
  ChevronRight
} from 'lucide-vue-next'
import MobileHeader from '@/components/navigation/MobileHeader.vue'
</script>
