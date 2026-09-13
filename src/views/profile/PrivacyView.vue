<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-28 md:hidden">

        <!-- Header -->
        <header class="relative flex items-center justify-center py-4">
          <button
            type="button"
            @click="goBack"
            class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white active:scale-95"
          >
            <ArrowLeft class="h-[18px] w-[18px]" />
          </button>

          <span class="text-[13px] font-semibold text-[#17211B]">
            Privacy
          </span>
        </header>

        <!-- Intro -->
        <section class="mt-2">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]"
          >
            <ShieldCheck class="h-5 w-5 text-[#15803D]" />
          </div>

          <h1 class="mt-4 text-[22px] font-bold tracking-tight text-[#17211B]">
            Privasi Kamu
          </h1>

          <p class="mt-1.5 text-[11px] leading-5 text-[#718078]">
            Atur informasi apa saja yang dapat dilihat oleh pengguna lain.
          </p>
        </section>

        <!-- Profile Visibility -->
        <section class="mt-6">

          <div class="mb-3">
            <h2 class="text-[12px] font-bold text-[#17211B]">
              Visibilitas Profil
            </h2>

            <p class="mt-0.5 text-[8px] text-[#8A958E]">
              Kontrol bagaimana profilmu terlihat di EcoQuest.
            </p>
          </div>

          <div
            class="overflow-hidden rounded-2xl border border-[#DCEBE0] bg-white"
          >

            <!-- Public Profile -->
            <div class="flex items-center gap-3 px-4 py-3.5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]"
              >
                <UserRound class="h-4 w-4 text-[#15803D]" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[11px] font-semibold text-[#17211B]">
                  Profil Publik
                </p>

                <p class="mt-0.5 text-[8px] leading-4 text-[#8A958E]">
                  Pengguna lain dapat melihat profilmu.
                </p>
              </div>

              <button
                type="button"
                @click="settings.publicProfile = !settings.publicProfile"
                class="relative h-5 w-9 shrink-0 rounded-full transition"
                :class="
                  settings.publicProfile
                    ? 'bg-[#22C55E]'
                    : 'bg-[#D8E1DB]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.publicProfile
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

            <div class="ml-16 border-t border-[#EEF3EF]"></div>

            <!-- Eco Activity -->
            <div class="flex items-center gap-3 px-4 py-3.5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF8F0]"
              >
                <Leaf class="h-4 w-4 text-[#16A34A]" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[11px] font-semibold text-[#17211B]">
                  Eco Action
                </p>

                <p class="mt-0.5 text-[8px] leading-4 text-[#8A958E]">
                  Tampilkan aktivitas lingkungan di profilmu.
                </p>
              </div>

              <button
                type="button"
                @click="settings.showActivity = !settings.showActivity"
                class="relative h-5 w-9 shrink-0 rounded-full transition"
                :class="
                  settings.showActivity
                    ? 'bg-[#22C55E]'
                    : 'bg-[#D8E1DB]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.showActivity
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

            <div class="ml-16 border-t border-[#EEF3EF]"></div>

            <!-- Impact -->
            <div class="flex items-center gap-3 px-4 py-3.5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF]"
              >
                <BarChart3 class="h-4 w-4 text-[#3B82F6]" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[11px] font-semibold text-[#17211B]">
                  Tampilkan Impact
                </p>

                <p class="mt-0.5 text-[8px] leading-4 text-[#8A958E]">
                  Izinkan pengguna melihat impact yang kamu hasilkan.
                </p>
              </div>

              <button
                type="button"
                @click="settings.showImpact = !settings.showImpact"
                class="relative h-5 w-9 shrink-0 rounded-full transition"
                :class="
                  settings.showImpact
                    ? 'bg-[#22C55E]'
                    : 'bg-[#D8E1DB]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.showImpact
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

          </div>
        </section>

        <!-- Leaderboard -->
        <section class="mt-6">

          <div class="mb-3">
            <h2 class="text-[12px] font-bold text-[#17211B]">
              Leaderboard
            </h2>

            <p class="mt-0.5 text-[8px] text-[#8A958E]">
              Atur bagaimana kamu ditampilkan di leaderboard.
            </p>
          </div>

          <div
            class="rounded-2xl border border-[#DCEBE0] bg-white"
          >
            <div class="flex items-center gap-3 px-4 py-3.5">

              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF5E8]"
              >
                <Trophy class="h-4 w-4 text-[#F59E0B]" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[11px] font-semibold text-[#17211B]">
                  Tampilkan Profil di Leaderboard
                </p>

                <p class="mt-0.5 text-[8px] leading-4 text-[#8A958E]">
                  Profilmu dapat muncul bersama peringkat dan XP.
                </p>
              </div>

              <button
                type="button"
                @click="settings.showLeaderboard = !settings.showLeaderboard"
                class="relative h-5 w-9 shrink-0 rounded-full transition"
                :class="
                  settings.showLeaderboard
                    ? 'bg-[#22C55E]'
                    : 'bg-[#D8E1DB]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.showLeaderboard
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>

            </div>
          </div>
        </section>

        <!-- Information -->
        <section
          class="mt-6 rounded-2xl border border-[#DDEFE2] bg-[#EAF8EE] p-4"
        >
          <div class="flex items-start gap-3">

            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white"
            >
              <Info class="h-4 w-4 text-[#15803D]" />
            </div>

            <div>
              <h3 class="text-[11px] font-bold text-[#17211B]">
                Tentang privasi
              </h3>

              <p class="mt-1 text-[8px] leading-4 text-[#66736A]">
                Pengaturan ini menentukan informasi yang dapat dilihat
                pengguna lain. Data akun pribadi tetap hanya untuk kebutuhan
                EcoQuest.
              </p>
            </div>

          </div>
        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1000px] px-6 pb-12 pt-8">

          <!-- Header -->
          <header class="mb-7 flex items-center gap-3">

            <button
              type="button"
              @click="goBack"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
            >
              <ArrowLeft class="h-5 w-5" />
            </button>

            <div>
              <p class="text-xs font-medium text-[#8A958E]">
                Settings
              </p>

              <h1 class="mt-1 text-2xl font-bold text-[#17211B]">
                Privacy
              </h1>

              <p class="mt-1 text-sm text-[#718078]">
                Kelola visibilitas profil dan aktivitasmu.
              </p>
            </div>

          </header>

          <div class="grid grid-cols-2 gap-5">

            <!-- Profile -->
            <section
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <h2 class="text-sm font-bold text-[#17211B]">
                Visibilitas Profil
              </h2>

              <p class="mt-1 text-[10px] text-[#8A958E]">
                Tentukan informasi yang dapat dilihat pengguna lain.
              </p>

              <div class="mt-5 space-y-1">

                <PrivacyToggle
                  title="Profil Publik"
                  description="Pengguna lain dapat melihat profilmu."
                  :model-value="settings.publicProfile"
                  @update:model-value="
                    settings.publicProfile = $event
                  "
                  :icon="UserRound"
                  icon-bg="bg-[#EAF8EE]"
                  icon-color="text-[#15803D]"
                />

                <PrivacyToggle
                  title="Eco Action"
                  description="Tampilkan aktivitas lingkungan di profil."
                  :model-value="settings.showActivity"
                  @update:model-value="
                    settings.showActivity = $event
                  "
                  :icon="Leaf"
                  icon-bg="bg-[#EEF8F0]"
                  icon-color="text-[#16A34A]"
                />

                <PrivacyToggle
                  title="Tampilkan Impact"
                  description="Izinkan pengguna melihat impact kamu."
                  :model-value="settings.showImpact"
                  @update:model-value="
                    settings.showImpact = $event
                  "
                  :icon="BarChart3"
                  icon-bg="bg-[#EAF3FF]"
                  icon-color="text-[#3B82F6]"
                />

              </div>
            </section>

            <!-- Leaderboard -->
            <section
              class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
            >
              <h2 class="text-sm font-bold text-[#17211B]">
                Leaderboard
              </h2>

              <p class="mt-1 text-[10px] text-[#8A958E]">
                Kontrol visibilitas profil pada leaderboard.
              </p>

              <div class="mt-5">
                <PrivacyToggle
                  title="Tampilkan Profil"
                  description="Profilmu dapat muncul di leaderboard."
                  :model-value="settings.showLeaderboard"
                  @update:model-value="
                    settings.showLeaderboard = $event
                  "
                  :icon="Trophy"
                  icon-bg="bg-[#FFF5E8]"
                  icon-color="text-[#F59E0B]"
                />
              </div>

              <div
                class="mt-5 rounded-xl bg-[#EAF8EE] p-4"
              >
                <div class="flex items-start gap-3">
                  <Info class="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />

                  <p class="text-[10px] leading-4 text-[#66736A]">
                    Kamu dapat mengubah pengaturan privasi ini kapan saja.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import {
  ArrowLeft,
  BarChart3,
  Info,
  Leaf,
  ShieldCheck,
  Trophy,
  UserRound
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

const router = useRouter()

const settings = reactive({
  publicProfile: true,
  showActivity: true,
  showImpact: true,
  showLeaderboard: true
})

function goBack() {
  router.back()
}
</script>