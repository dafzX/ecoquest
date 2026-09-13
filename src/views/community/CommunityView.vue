<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main
        class="mx-auto max-w-[1400px] px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8"
      >

        <!-- Mobile Header -->
        <MobileHeader />

        <!-- Page Header -->
        <div class="mb-5 md:mb-7">
          <h1
            class="text-[22px] font-bold tracking-tight text-[#17211B] md:text-[28px]"
          >
            Community
          </h1>

          <p class="mt-1 text-xs leading-5 text-[#66736A] md:text-sm">
            Berbagi aksi, inspirasi, dan dampak bersama komunitas.
          </p>
        </div>

        <!-- Community Hero -->
        <section
          class="relative mb-5 overflow-hidden rounded-2xl bg-[#15803D] md:mb-8"
        >
          <div
            class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"
          ></div>

          <div
            class="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-white/5"
          ></div>

          <div
            class="relative flex flex-col gap-5 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-7"
          >
            <div class="max-w-xl">
              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 md:h-11 md:w-11"
              >
                <Users class="h-5 w-5 text-white" />
              </div>

              <h2
                class="text-xl font-bold leading-tight text-white md:text-2xl"
              >
                Setiap aksi bisa menginspirasi.
              </h2>

              <p
                class="mt-2 max-w-lg text-xs leading-5 text-white/75 md:text-sm md:leading-6"
              >
                Bagikan aksi ramah lingkunganmu dan beri inspirasi kepada
                EcoQuest Explorer lainnya.
              </p>
            </div>

            <button
              type="button"
              class="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FFF5] active:scale-[0.98] md:w-auto md:px-5 md:text-sm"
            >
              <Plus class="h-4 w-4" />
              Bagikan Aksi
            </button>
          </div>
        </section>

        <!-- Community Stats -->
        <section
          class="mb-6 grid grid-cols-3 gap-2.5 md:mb-8 md:gap-5"
        >
          <!-- Members -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE] md:h-10 md:w-10 md:rounded-xl"
            >
              <Users
                class="h-4 w-4 text-[#22C55E] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              Anggota
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ communityStats.members.toLocaleString() }}
            </p>
          </div>

          <!-- Actions -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5FF] md:h-10 md:w-10 md:rounded-xl"
            >
              <Leaf
                class="h-4 w-4 text-[#3B82F6] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              Aksi Hari Ini
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ communityStats.actionsToday }}
            </p>
          </div>

          <!-- CO2 -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3] md:h-10 md:w-10 md:rounded-xl"
            >
              <Wind
                class="h-4 w-4 text-[#CA8A04] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              CO₂ Tersimpan
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ communityStats.co2Saved }} kg
            </p>
          </div>
        </section>

        <!-- Main Content -->
        <section
          class="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]"
        >
          <!-- Feed -->
          <div class="min-w-0">

            <!-- Feed Header -->
            <div
              class="mb-4 flex items-center justify-between md:mb-5"
            >
              <div>
                <h2
                  class="text-base font-bold text-[#17211B] md:text-lg"
                >
                  Community Feed
                </h2>

                <p
                  class="mt-0.5 text-[10px] text-[#98A39C] md:mt-1 md:text-xs"
                >
                  Lihat aksi dari EcoQuest Explorer lainnya
                </p>
              </div>

              <button
                type="button"
                class="flex items-center gap-1.5 rounded-xl border border-[#E8EDE9] bg-white px-3 py-2 text-[10px] font-medium text-[#66736A] shadow-sm transition hover:bg-[#F8FAF8] md:px-3.5 md:text-xs"
              >
                Terbaru

                <ChevronDown
                  class="h-3.5 w-3.5 md:h-4 md:w-4"
                />
              </button>
            </div>

            <!-- Posts -->
            <div class="space-y-3.5 md:space-y-4">
              <CommunityPost
                v-for="post in communityPosts"
                :key="post.id"
                :post="post"
              />
            </div>

            <!-- Load More -->
            <button
              type="button"
              class="mt-5 w-full rounded-xl border border-[#DCE5DE] bg-white py-3 text-xs font-semibold text-[#15803D] transition hover:bg-[#F3FAF4] md:mt-6"
            >
              Lihat postingan lainnya
            </button>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-4 md:space-y-5">

            <!-- Community Goal -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE] md:h-10 md:w-10"
                >
                  <Target
                    class="h-4 w-4 text-[#22C55E] md:h-5 md:w-5"
                  />
                </div>

                <div>
                  <h3
                    class="text-sm font-bold text-[#17211B]"
                  >
                    Target Komunitas
                  </h3>

                  <p
                    class="mt-0.5 text-[10px] text-[#98A39C] md:text-xs"
                  >
                    Progress minggu ini
                  </p>
                </div>
              </div>

              <div class="mt-4 md:mt-5">
                <div class="flex items-end justify-between">
                  <span
                    class="text-sm font-bold text-[#17211B] md:text-base"
                  >
                    2.840
                  </span>

                  <span
                    class="text-[10px] text-[#98A39C] md:text-xs"
                  >
                    / 4.000 aksi
                  </span>
                </div>

                <div
                  class="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF0EB]"
                >
                  <div
                    class="h-full w-[71%] rounded-full bg-[#22C55E]"
                  ></div>
                </div>

                <p
                  class="mt-2 text-[10px] leading-4 text-[#66736A] md:text-xs"
                >
                  Tinggal 1.160 aksi lagi untuk mencapai target.
                </p>
              </div>
            </div>

            <!-- Trending -->
            <div
              class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] md:h-10 md:w-10"
                >
                  <Hash
                    class="h-4 w-4 text-[#9333EA] md:h-5 md:w-5"
                  />
                </div>

                <div>
                  <h3
                    class="text-sm font-bold text-[#17211B]"
                  >
                    Topik Trending
                  </h3>

                  <p
                    class="mt-0.5 text-[10px] text-[#98A39C] md:text-xs"
                  >
                    Populer di komunitas
                  </p>
                </div>
              </div>

              <div
                class="mt-4 space-y-2.5 md:mt-5 md:space-y-3"
              >
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                >
                  <span
                    class="text-xs font-semibold text-[#15803D]"
                  >
                    #PlasticFree
                  </span>

                  <span class="text-[10px] text-[#98A39C]">
                    248 postingan
                  </span>
                </button>

                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                >
                  <span
                    class="text-xs font-semibold text-[#15803D]"
                  >
                    #BikeToWork
                  </span>

                  <span class="text-[10px] text-[#98A39C]">
                    182 postingan
                  </span>
                </button>

                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left transition hover:bg-[#F1F7F2]"
                >
                  <span
                    class="text-xs font-semibold text-[#15803D]"
                  >
                    #SaveEnergy
                  </span>

                  <span class="text-[10px] text-[#98A39C]">
                    146 postingan
                  </span>
                </button>
              </div>
            </div>

            <!-- Community Tip -->
            <div
              class="rounded-2xl border border-[#DCEBDD] bg-[#F1FBF3] p-4 md:p-5"
            >
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white"
                >
                  <Sparkles
                    class="h-4 w-4 text-[#22C55E]"
                  />
                </div>

                <div>
                  <p
                    class="text-sm font-semibold text-[#17211B]"
                  >
                    Tips Komunitas
                  </p>

                  <p
                    class="mt-1 text-[10px] leading-5 text-[#66736A] md:text-xs"
                  >
                    Membagikan pencapaian kecilmu bisa membantu
                    orang lain memulai perjalanan ramah lingkungan
                    mereka.
                  </p>
                </div>
              </div>
            </div>

          </aside>
        </section>

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
  Wind
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