<template>
  <main class="mx-auto w-full max-w-[430px] px-4 pb-28 md:hidden">

    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition-all duration-200 active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Tantangan
      </span>
    </header>

    <div class="mb-5 flex w-full rounded-xl border border-[#E5EAE7] bg-white p-1 shadow-sm">

      <button
        type="button"
        class="h-9 flex-1 rounded-lg text-[9px] font-semibold transition-all duration-200"
        :class="
          activeTab === 'komunitas'
            ? 'bg-[#22C55E] text-white shadow-sm'
            : 'text-[#718078] hover:bg-[#F4FBF7]'
        "
        @click="$emit('update:active-tab', 'komunitas')"
      >
        Tantangan Komunitas
      </button>

      <button
        type="button"
        class="h-9 flex-1 rounded-lg text-[9px] font-semibold transition-all duration-200"
        :class="
          activeTab === 'saya'
            ? 'bg-[#22C55E] text-white shadow-sm'
            : 'text-[#718078] hover:bg-[#F4FBF7]'
        "
        @click="$emit('update:active-tab', 'saya')"
      >
        Tantangan Saya
      </button>

    </div>

    <section
      v-if="featuredChallenge && activeTab === 'komunitas'"
      class="mb-5 overflow-hidden rounded-2xl border border-[#E5EAE7] bg-white shadow-sm transition-all duration-300 active:scale-[0.99]"
    >

      <div class="relative h-28 overflow-hidden bg-[#ECFDF3]">

        <div
          class="absolute -right-8 -top-9 h-28 w-28 rounded-full bg-[#BBF7D0]"
        ></div>

        <div
          class="absolute -bottom-8 left-10 h-20 w-20 rounded-full bg-[#86EFAC]/50"
        ></div>

        <div
          class="absolute right-14 top-12 h-10 w-10 rounded-full bg-white/30"
        ></div>

        <div class="absolute left-4 top-3">
          <span
            class="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[7px] font-bold tracking-wide text-[#15803D]"
          >
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

      <div class="p-4">

        <div class="flex items-start gap-3">

          <div class="min-w-0 flex-1">
            <h2 class="text-[12px] font-bold leading-4 text-[#17211B]">
              {{ featuredChallenge.title }}
            </h2>

            <p class="mt-1 text-[8px] leading-3.5 text-[#718078]">
              {{ featuredChallenge.description }}
            </p>
          </div>

          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]"
          >
            <Users class="h-4 w-4 text-[#22C55E]" />
          </div>

        </div>

        <div class="mt-4">

          <div class="mb-1.5 flex items-center justify-between">

            <span class="text-[8px] text-[#718078]">
              {{ featuredChallenge.participants }} peserta
            </span>

            <span class="text-[8px] font-bold text-[#16A34A]">
              {{ featuredChallenge.progress }}%
            </span>

          </div>

          <div class="h-1.5 w-full overflow-hidden rounded-full bg-[#E5EEE8]">
            <div
              class="h-full rounded-full bg-linear-to-r from-[#16A34A] to-[#22C55E] transition-all duration-700"
              :style="{
                width: `${featuredChallenge.progress}%`
              }"
            ></div>
          </div>

        </div>

        <div class="mt-4 flex items-center justify-between">

          <div class="flex items-center gap-1.5">
            <Clock class="h-3 w-3 text-[#98A39C]" />

            <span class="text-[8px] text-[#718078]">
              {{ featuredChallenge.daysLeft }} hari lagi
            </span>
          </div>

          <RouterLink
            :to="`/challenges/${featuredChallenge.id}`"
            class="flex h-7 items-center gap-1 rounded-lg bg-[#22C55E] px-3 text-[8px] font-semibold text-white transition-all duration-200 hover:bg-[#16A34A] active:scale-[0.97]"
          >
            Lihat Tantangan

            <ArrowRight class="h-3 w-3" />
          </RouterLink>

        </div>

      </div>

    </section>

    <section>

      <div class="mb-3 flex items-center justify-between">

        <div>

          <h2 class="text-[11px] font-bold text-[#17211B]">
            {{
              activeTab === 'komunitas'
                ? 'Tantangan Komunitas'
                : 'Tantangan Saya'
            }}
          </h2>

          <p class="mt-0.5 text-[8px] text-[#8A958E]">
            {{
              activeTab === 'komunitas'
                ? 'Ikuti tantangan bersama komunitas.'
                : 'Lanjutkan tantangan yang kamu ikuti.'
            }}
          </p>

        </div>

        <span
          class="rounded-full bg-[#ECFDF3] px-2 py-1 text-[7px] font-semibold text-[#15803D]"
        >
          {{ visibleChallenges.length }} tantangan
        </span>

      </div>

      <div
        v-if="visibleChallenges.length === 0"
        class="rounded-2xl border border-[#E5EAE7] bg-white px-5 py-8 text-center shadow-sm"
      >

        <div
          class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF3]"
        >
          <Globe2 class="h-6 w-6 text-[#22C55E]" />
        </div>

        <h3 class="mt-3 text-[11px] font-bold text-[#17211B]">
          Belum ada tantangan
        </h3>

        <p class="mx-auto mt-1 max-w-[230px] text-[8px] leading-3.5 text-[#718078]">
          {{
            activeTab === 'saya'
              ? 'Kamu belum mengikuti tantangan apa pun. Yuk mulai perjalanan eco-mu.'
              : 'Belum ada tantangan komunitas yang tersedia.'
          }}
        </p>

        <button
          v-if="activeTab === 'saya'"
          type="button"
          class="mt-4 rounded-lg bg-[#22C55E] px-4 py-2 text-[8px] font-semibold text-white transition-all duration-200 active:scale-95"
          @click="$emit('update:active-tab', 'komunitas')"
        >
          Lihat Tantangan Komunitas
        </button>

      </div>

      <div
        v-else
        class="space-y-3"
      >

        <article
          v-for="challenge in visibleChallenges"
          :key="challenge.id"
          class="rounded-2xl border border-[#E5EAE7] bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.99]"
        >

          <div class="flex items-start gap-3">

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
              :class="getChallengeStyle(challenge.category)"
            >
              <component
                :is="getChallengeIcon(challenge.category)"
                class="h-5 w-5"
              />
            </div>

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

                <span
                  class="shrink-0 rounded-full bg-[#ECFDF3] px-2 py-1 text-[7px] font-semibold text-[#15803D]"
                >
                  {{ challenge.daysLeft }} hari
                </span>

              </div>

              <p class="mt-1.5 text-[8px] leading-3.5 text-[#718078]">
                {{ challenge.description }}
              </p>

              <div class="mt-3">

                <div class="mb-1 flex items-center justify-between">

                  <span class="text-[7px] text-[#98A39C]">
                    Kemajuan
                  </span>

                  <span class="text-[7px] font-semibold text-[#16A34A]">
                    {{ challenge.progress }}%
                  </span>

                </div>

                <div class="h-1 w-full overflow-hidden rounded-full bg-[#E5EEE8]">

                  <div
                    class="h-full rounded-full bg-linear-to-r from-[#16A34A] to-[#22C55E] transition-all duration-700"
                    :style="{
                      width: `${challenge.progress}%`
                    }"
                  ></div>

                </div>

              </div>

            </div>

          </div>

          <RouterLink
            :to="`/challenges/${challenge.id}`"
            class="mt-3 flex h-8 w-full items-center justify-center rounded-lg bg-[#F1F5F2] text-[8px] font-semibold text-[#15803D] transition-all duration-200 hover:bg-[#ECFDF3] active:scale-[0.99]"
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
  activeTab: {
    type: String,
    default: 'saya'
  },

  featuredChallenge: {
    type: Object,
    default: null
  },

  visibleChallenges: {
    type: Array,
    default: () => []
  },

  getChallengeIcon: {
    type: Function,
    required: true
  },

  getChallengeStyle: {
    type: Function,
    required: true
  },

  goBack: {
    type: Function,
    required: true
  }
})

defineEmits([
  'update:active-tab'
])
</script>