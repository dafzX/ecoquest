<template>
  <main class="md:hidden mx-auto max-w-[430px] px-4 pb-28 pt-1">
    <!-- Mobile Header -->
    <MobileHeader />

    <!-- Page Header -->
    <div class="mb-5">
      <h1 class="text-[22px] font-bold tracking-tight text-[#17211B]">
        Community
      </h1>
      <p class="mt-1 text-xs leading-5 text-[#66736A]">
        Berbagi aksi, inspirasi, dan dampak bersama komunitas.
      </p>
    </div>

    <!-- Community Hero -->
    <section class="relative mb-5 overflow-hidden rounded-2xl bg-[#15803D]">
      <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-white/5"></div>
      <div class="relative flex flex-col gap-5 px-5 py-5 sm:px-6">
        <div class="max-w-xl">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Users class="h-5 w-5 text-white" />
          </div>
          <h2 class="text-xl font-bold leading-tight text-white">
            Setiap aksi bisa menginspirasi.
          </h2>
          <p class="mt-2 max-w-lg text-xs leading-5 text-white/75">
            Bagikan aksi ramah lingkunganmu dan beri inspirasi kepada EcoQuest Explorer lainnya.
          </p>
        </div>
        <button
          type="button"
          class="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FFF5] active:scale-[0.98]"
        >
          <Plus class="h-4 w-4" />
          Bagikan Aksi
        </button>
      </div>
    </section>

    <!-- Community Stats -->
    <section class="mb-6 grid grid-cols-3 gap-2.5">
      <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE]">
          <Users class="h-4 w-4 text-[#22C55E]" />
        </div>
        <p class="mt-3 text-[10px] leading-4 text-[#66736A]">Anggota</p>
        <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ communityStats.members.toLocaleString() }}</p>
      </div>
      <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5FF]">
          <Leaf class="h-4 w-4 text-[#3B82F6]" />
        </div>
        <p class="mt-3 text-[10px] leading-4 text-[#66736A]">Aksi Hari Ini</p>
        <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ communityStats.actionsToday }}</p>
      </div>
      <div class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3]">
          <Wind class="h-4 w-4 text-[#CA8A04]" />
        </div>
        <p class="mt-3 text-[10px] leading-4 text-[#66736A]">CO₂ Tersimpan</p>
        <p class="mt-0.5 text-base font-bold text-[#17211B]">{{ communityStats.co2Saved }} kg</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="grid gap-6">
      <div class="min-w-0">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-[#17211B]">Community Feed</h2>
            <p class="mt-0.5 text-[10px] text-[#98A39C]">Lihat aksi dari EcoQuest Explorer lainnya</p>
          </div>
          <button type="button" class="flex items-center gap-1.5 rounded-xl border border-[#E8EDE9] bg-white px-3 py-2 text-[10px] font-medium text-[#66736A] shadow-sm transition hover:bg-[#F8FAF8]">
            Terbaru
            <ChevronDown class="h-3.5 w-3.5" />
          </button>
        </div>
        <div class="space-y-3.5">
          <CommunityPost v-for="post in communityPosts" :key="post.id" :post="post" />
        </div>
        <button type="button" class="mt-5 w-full rounded-xl border border-[#DCE5DE] bg-white py-3 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FAF4]">
          Lihat postingan lainnya
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Users, Plus, Leaf, Wind, ChevronDown } from 'lucide-vue-next'
import MobileHeader from '@/components/navigation/MobileHeader.vue'
import CommunityPost from '@/components/cards/CommunityPost.vue'

defineProps({
  communityStats: Object,
  communityPosts: Array
})
</script>
