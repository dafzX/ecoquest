<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Community
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          Share your eco journey and inspire others
        </p>
      </div>

      <!-- Community Hero -->
      <section class="mb-8 overflow-hidden rounded-2xl bg-[#15803D]">

        <div class="flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8">

          <div class="max-w-xl">

            <div class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <Users class="h-5 w-5 text-white" />
            </div>

            <h2 class="text-2xl font-bold text-white">
              Every action inspires change.
            </h2>

            <p class="mt-2 text-sm leading-6 text-white/75">
              Share your environmental actions, celebrate your progress,
              and inspire other EcoQuest explorers.
            </p>

          </div>

          <button
            type="button"
            class="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#15803D] transition hover:bg-[#F3FFF5]"
          >
            <Plus class="h-4 w-4" />
            Share an Action
          </button>

        </div>

      </section>

      <!-- Community Stats -->
      <section class="mb-8 grid grid-cols-3 gap-3 md:gap-5">

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
            <Users class="h-5 w-5 text-[#22C55E]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Community Members
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ communityStats.members.toLocaleString() }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FF]">
            <Leaf class="h-5 w-5 text-[#3B82F6]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Actions Today
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ communityStats.actionsToday }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3]">
            <Wind class="h-5 w-5 text-[#CA8A04]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            CO₂ Saved Today
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ communityStats.co2Saved }} kg
          </p>
        </div>

      </section>

      <!-- Content -->
      <section class="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">

        <!-- Feed -->
        <div>

          <div class="mb-5 flex items-center justify-between">

            <div>
              <h2 class="text-lg font-bold text-[#17211B]">
                Community Feed
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                See what other EcoQuest explorers are doing
              </p>
            </div>

            <button
              type="button"
              class="flex items-center gap-2 rounded-xl border border-[#E8EDE9] bg-white px-3.5 py-2 text-xs font-medium text-[#66736A]"
            >
              Latest
              <ChevronDown class="h-4 w-4" />
            </button>

          </div>

          <div class="space-y-4">

            <CommunityPost
              v-for="post in communityPosts"
              :key="post.id"
              :post="post"
            />

          </div>

        </div>

        <!-- Sidebar -->
        <aside class="space-y-5">

          <!-- Weekly Goal -->
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">

            <div class="flex items-center gap-3">

              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
                <Target class="h-5 w-5 text-[#22C55E]" />
              </div>

              <div>
                <h3 class="text-sm font-bold text-[#17211B]">
                  Community Goal
                </h3>

                <p class="mt-0.5 text-xs text-[#98A39C]">
                  This week's progress
                </p>
              </div>

            </div>

            <div class="mt-5">

              <div class="flex items-end justify-between">
                <span class="text-sm font-semibold text-[#17211B]">
                  2,840
                </span>

                <span class="text-xs text-[#98A39C]">
                  / 4,000 actions
                </span>
              </div>

              <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF0EB]">
                <div
                  class="h-full w-[71%] rounded-full bg-[#22C55E]"
                ></div>
              </div>

              <p class="mt-2 text-xs text-[#66736A]">
                1,160 more actions to reach the goal
              </p>

            </div>

          </div>

          <!-- Trending -->
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">

            <div class="flex items-center gap-3">

              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8FF]">
                <Hash class="h-5 w-5 text-[#9333EA]" />
              </div>

              <div>
                <h3 class="text-sm font-bold text-[#17211B]">
                  Trending Topics
                </h3>

                <p class="mt-0.5 text-xs text-[#98A39C]">
                  Popular in the community
                </p>
              </div>

            </div>

            <div class="mt-5 space-y-3">

              <button
                type="button"
                class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left hover:bg-[#F1F7F2]"
              >
                <span class="text-xs font-semibold text-[#15803D]">
                  #PlasticFree
                </span>

                <span class="text-[10px] text-[#98A39C]">
                  248 posts
                </span>
              </button>

              <button
                type="button"
                class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left hover:bg-[#F1F7F2]"
              >
                <span class="text-xs font-semibold text-[#15803D]">
                  #BikeToWork
                </span>

                <span class="text-[10px] text-[#98A39C]">
                  182 posts
                </span>
              </button>

              <button
                type="button"
                class="flex w-full items-center justify-between rounded-xl bg-[#F8FAF8] px-3 py-2.5 text-left hover:bg-[#F1F7F2]"
              >
                <span class="text-xs font-semibold text-[#15803D]">
                  #SaveEnergy
                </span>

                <span class="text-[10px] text-[#98A39C]">
                  146 posts
                </span>
              </button>

            </div>

          </div>

          <!-- Community Tip -->
          <div class="rounded-2xl border border-[#DCEBDD] bg-[#F1FBF3] p-5">

            <div class="flex gap-3">

              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                <Sparkles class="h-4 w-4 text-[#22C55E]" />
              </div>

              <div>
                <p class="text-sm font-semibold text-[#17211B]">
                  Community Tip
                </p>

                <p class="mt-1 text-xs leading-5 text-[#66736A]">
                  Sharing your small wins can motivate someone else
                  to start their own eco journey.
                </p>
              </div>

            </div>

          </div>

        </aside>

      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import {
  ChevronDown,
  Hash,
  Leaf,
  Plus,
  Sparkles,
  Target,
  Users,
  Wind
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import CommunityPost from '../components/cards/CommunityPost.vue'

import {
  communityPosts,
  communityStats
} from '../data/mockData.js'
</script>