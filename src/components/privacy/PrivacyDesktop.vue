<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1000px] px-6 pb-12 pt-8">
      
      <!-- Header -->
      <header class="mb-7 flex items-center gap-3">
        <button
          type="button"
          @click="$emit('back')"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
        >
          <ArrowLeft class="h-5 w-5" />
        </button>
        <div>
          <p class="text-xs font-medium text-[#8A958E]">Settings</p>
          <h1 class="mt-1 text-2xl font-bold text-[#17211B]">Privacy</h1>
          <p class="mt-1 text-sm text-[#718078]">Kelola visibilitas profil dan aktivitasmu.</p>
        </div>
      </header>

      <div class="grid grid-cols-2 gap-5">
        <!-- Profile Visibility -->
        <section class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <h2 class="text-sm font-bold text-[#17211B]">Visibilitas Profil</h2>
          <p class="mt-1 text-[10px] text-[#8A958E]">Tentukan informasi yang dapat dilihat pengguna lain.</p>
          
          <div class="mt-5 space-y-1">
            <PrivacyToggle
              title="Profil Publik"
              description="Pengguna lain dapat melihat profilmu."
              :model-value="settings.publicProfile"
              @update:model-value="$emit('update', 'publicProfile', $event)"
              :icon="UserRound"
              icon-bg="bg-[#EAF8EE]"
              icon-color="text-[#15803D]"
            />
            <PrivacyToggle
              title="Eco Action"
              description="Tampilkan aktivitas lingkungan di profil."
              :model-value="settings.showActivity"
              @update:model-value="$emit('update', 'showActivity', $event)"
              :icon="Leaf"
              icon-bg="bg-[#EEF8F0]"
              icon-color="text-[#16A34A]"
            />
            <PrivacyToggle
              title="Tampilkan Impact"
              description="Izinkan pengguna melihat impact kamu."
              :model-value="settings.showImpact"
              @update:model-value="$emit('update', 'showImpact', $event)"
              :icon="BarChart3"
              icon-bg="bg-[#EAF3FF]"
              icon-color="text-[#3B82F6]"
            />
          </div>
        </section>

        <!-- Leaderboard -->
        <section class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <h2 class="text-sm font-bold text-[#17211B]">Leaderboard</h2>
          <p class="mt-1 text-[10px] text-[#8A958E]">Kontrol visibilitas profil pada leaderboard.</p>
          
          <div class="mt-5">
            <PrivacyToggle
              title="Tampilkan Profil"
              description="Profilmu dapat muncul di leaderboard."
              :model-value="settings.showLeaderboard"
              @update:model-value="$emit('update', 'showLeaderboard', $event)"
              :icon="Trophy"
              icon-bg="bg-[#FFF5E8]"
              icon-color="text-[#F59E0B]"
            />
          </div>

          <!-- Information -->
          <div class="mt-5 rounded-xl bg-[#EAF8EE] p-4">
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
</template>

<script setup>
import {
  ArrowLeft, BarChart3, Info, Leaf, Trophy, UserRound
} from 'lucide-vue-next'
import PrivacyToggle from '@/components/privacy/PrivacyToggle.vue'

defineProps({
  settings: {
    type: Object,
    required: true
  }
})

defineEmits(['back', 'update'])
</script>