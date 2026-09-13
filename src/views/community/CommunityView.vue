<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <!-- Mobile -->
      <main
        class="md:hidden mx-auto max-w-[430px] px-4 pb-28 pt-1"
      >
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

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1080px] px-6 pb-10 pt-8">

          <!-- Header -->
          <section class="mb-8 flex items-end justify-between">
            <div>
              <h1 class="text-[28px] font-bold text-[#17211B]">
                Community
              </h1>
              <p class="mt-1 text-sm text-[#66736A]">
                Berbagi inspirasi dengan sesama Eco Explorer.
              </p>
            </div>
          </section>

          <div class="grid grid-cols-[1.5fr_1fr] gap-8">
            <!-- Feed Section -->
            <div>
              <!-- Post Input -->
              <div class="mb-8 rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-sm">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-lg font-bold text-white">
                    {{ user.avatar || 'DA' }}
                  </div>
                  <div class="flex-1">
                    <textarea 
                      class="w-full resize-none border-none bg-transparent p-2 text-sm text-[#17211B] outline-none placeholder:text-[#98A39C]"
                      placeholder="Bagikan aksi eco-mu hari ini..."
                      rows="3"
                    ></textarea>
                    
                    <div class="mt-3 flex items-center justify-between border-t border-[#E8EDE9] pt-3">
                      <button class="flex items-center gap-2 rounded-lg p-2 text-[#66736A] transition hover:bg-[#F8FAF8] hover:text-[#22C55E]">
                        <ImageIcon class="h-5 w-5" />
                        <span class="text-xs font-semibold">Photo/Video</span>
                      </button>
                      <button class="rounded-xl bg-[#22C55E] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#15803D]">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Feed List -->
              <div class="space-y-6">
                <CommunityPost
                  v-for="post in communityPosts"
                  :key="post.id"
                  :post="post"
                />
                
                <button class="w-full rounded-2xl border border-[#E8EDE9] bg-white py-4 text-sm font-semibold text-[#15803D] transition hover:bg-[#F8FAF8]">
                  Load More
                </button>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Trending Topics -->
              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-sm">
                <h3 class="mb-5 text-base font-bold text-[#17211B]">Trending Topics</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-bold text-[#15803D]">#BeachCleanup</h4>
                      <p class="text-xs text-[#98A39C]">1.2k posts</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-bold text-[#15803D]">#ZeroWaste</h4>
                      <p class="text-xs text-[#98A39C]">850 posts</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-bold text-[#15803D]">#Composting</h4>
                      <p class="text-xs text-[#98A39C]">640 posts</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Top Contributors -->
              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-sm">
                <h3 class="mb-5 text-base font-bold text-[#17211B]">Top Contributors</h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF8EE] text-sm font-bold text-[#15803D]">A</div>
                    <div>
                      <h4 class="text-sm font-bold text-[#17211B]">Andi</h4>
                      <p class="text-xs text-[#66736A]">152 posts</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E1] text-sm font-bold text-[#A16207]">R</div>
                    <div>
                      <h4 class="text-sm font-bold text-[#17211B]">Rina</h4>
                      <p class="text-xs text-[#66736A]">134 posts</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F6FF] text-sm font-bold text-[#0284C7]">B</div>
                    <div>
                      <h4 class="text-sm font-bold text-[#17211B]">Budi</h4>
                      <p class="text-xs text-[#66736A]">98 posts</p>
                    </div>
                  </div>
                </div>
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
  Bell,
  ChevronDown,
  Hash,
  Leaf,
  Plus,
  Sparkles,
  Target,
  Users,
  Wind,
  Image as ImageIcon
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import CommunityPost from '@/components/cards/CommunityPost.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  user,
  communityPosts,
  communityStats
} from '@/data/mockData.js'

const currentUser = {
  ...user,
  avatar: user?.avatar || 'DA'
}
</script>