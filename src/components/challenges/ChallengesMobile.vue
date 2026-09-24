<template>
  <main class="mx-auto w-full max-w-107.5 px-4 pb-6 md:hidden">

    <!-- Header -->
    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Tantangan
      </span>
    </header>

    <!-- Tabs -->
    <div class="mb-4 flex w-full rounded-xl border border-[#DCEBE0] bg-white p-1">
      <button
        type="button"
        class="h-8 flex-1 rounded-lg text-[9px] font-semibold transition"
        :class="activeTab === 'community'
          ? 'bg-[#22C55E] text-white'
          : 'text-[#718078] hover:bg-[#F4FBF7]'"
        @click="$emit('update:activeTab', 'community')"
      >
        Tantangan Komunitas
      </button>

      <button
        type="button"
        class="h-8 flex-1 rounded-lg text-[9px] font-semibold transition"
        :class="activeTab === 'mine'
          ? 'bg-[#22C55E] text-white'
          : 'text-[#718078] hover:bg-[#F4FBF7]'"
        @click="$emit('update:activeTab', 'mine')"
      >
        Tantangan Saya
      </button>
    </div>

    <!-- Featured Challenge -->
    <section
      v-if="featuredChallenge"
      class="mb-5 overflow-hidden rounded-lg border border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] shadow-sm transition-all duration-300 active:scale-[0.98]"
    >
      <!-- Banner -->
      <div class="relative h-27 overflow-hidden bg-[#DCFCE7]">
        <div class="absolute -right-8 -top-9 h-28 w-28 rounded-full bg-[#BBF7D0]"></div>
        <div class="absolute -bottom-8 left-10 h-20 w-20 rounded-full bg-[#86EFAC]/50"></div>
        <div class="absolute right-14 top-12 h-10 w-10 rounded-full bg-white/20"></div>

        <div class="absolute left-4 top-3">
          <span class="inline-flex rounded-full bg-white/85 px-2 py-1 text-[7px] font-bold tracking-wide text-[#15803D]">
            TANTANGAN KOMUNITAS
          </span>
        </div>

        <div class="absolute bottom-3.5 left-4">
          <div class="flex items-center gap-1.5">
            <Globe2 class="h-3.5 w-3.5 text-[#15803D]" />
            <span class="text-[8px] font-medium text-[#15803D]">
              Tantangan Komunitas
            </span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-3.5">
        <div class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <h2 class="text-[12px] font-bold leading-4 text-[#17211B]">
              {{ featuredChallenge.title }}
            </h2>

            <p class="mt-1 text-[8px] leading-3.25 text-[#718078]">
              {{ featuredChallenge.description }}
            </p>
          </div>

          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]">
            <Users class="h-4 w-4 text-[#22C55E]" />
          </div>
        </div>

        <!-- Progress -->
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[8px] text-[#718078]">
              {{ featuredChallenge.participants }} peserta
            </span>

            <span class="text-[8px] font-bold text-[#22C55E]">
              {{ featuredChallenge.progress }}%
            </span>
          </div>

          <div class="h-1.25 w-full overflow-hidden rounded-full bg-[#E5EFE8]">
            <div
              class="h-full rounded-full bg-[#22C55E] transition-all"
              :style="{ width: `${featuredChallenge.progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-3.5 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <Clock class="h-3 w-3 text-[#98A39C]" />

            <span class="text-[8px] text-[#718078]">
              {{ featuredChallenge.daysLeft }} hari lagi
            </span>
          </div>

          <RouterLink
            :to="`/challenges/${featuredChallenge.id}`"
            class="flex h-7 items-center gap-1 rounded-lg bg-[#22C55E] px-3 text-[8px] font-semibold text-white transition hover:bg-[#15803D] active:scale-[0.98]"
          >
            Lihat Tantangan
            <ArrowRight class="h-3 w-3" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Other Challenges -->
    <section>
      <!-- Section Header -->
      <div class="mb-2.5 flex items-center justify-between">
        <div>
          <h2 class="text-[11px] font-bold text-[#17211B]">
            {{ activeTab === 'community' ? 'Tantangan Komunitas' : 'Tantangan Saya' }}
          </h2>
        </div>

        <span class="rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]">
          {{ visibleChallenges.length }} tantangan
        </span>
      </div>

      <!-- Challenge List -->
      <div class="space-y-2.5">
        <article
          v-for="challenge in visibleChallenges"
          :key="challenge.id"
          class="rounded-lg border border-[#DCEBE0] bg-linear-to-b from-white to-[#F8FAF8] p-3.5 shadow-sm transition-all duration-300 active:scale-[0.98]"
        >
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              :class="getChallengeStyle(challenge.category)"
            >
              <component
                :is="getChallengeIcon(challenge.category)"
                class="h-5 w-5"
              />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="text-[10px] font-bold leading-4 text-[#17211B]">
                    {{ challenge.title }}
                  </h3>

                  <p class="mt-0.5 text-[8px] text-[#718078]">
                    {{ challenge.participants }} peserta
                  </p>
                </div>

                <span class="shrink-0 rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]">
                  {{ challenge.daysLeft }} hari
                </span>
              </div>

              <p class="mt-1.5 text-[8px] leading-3.25 text-[#718078]">
                {{ challenge.description }}
              </p>

              <!-- Progress -->
              <div class="mt-2.5">
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-[7px] text-[#98A39C]">
                    Kemajuan
                  </span>

                  <span class="text-[7px] font-semibold text-[#22C55E]">
                    {{ challenge.progress }}%
                  </span>
                </div>

                <div class="h-1 w-full overflow-hidden rounded-full bg-[#E5EFE8]">
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    :style="{ width: `${challenge.progress}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detail -->
          <RouterLink
            :to="`/challenges/${challenge.id}`"
            class="mt-3 flex h-7 w-full items-center justify-center rounded-lg bg-[#F1F5F2] text-[8px] font-semibold text-[#15803D] transition hover:bg-[#E8F8ED] active:scale-[0.99]"
          >
            Lihat Detail
            <ArrowRight class="ml-1 h-3 w-3" />
          </RouterLink>
        </article>
      </div>
    </section>

  </main>
</template>

<script setup>
import {
  Users,
  Clock,
  ArrowLeft,
  ArrowRight,
  Globe2
} from 'lucide-vue-next'

defineProps({
  activeTab: String,
  featuredChallenge: Object,
  visibleChallenges: Array,
  getChallengeIcon: Function,
  getChallengeStyle: Function,
  goBack: Function
})

defineEmits(['update:activeTab'])
</script>