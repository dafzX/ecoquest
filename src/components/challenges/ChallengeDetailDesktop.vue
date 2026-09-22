<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-6xl px-6 py-8">

      <!-- Header -->
      <div class="mb-7 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="goBack"
            class="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2EAE5] bg-white text-[#405047] transition hover:bg-[#F4FBF7]"
          >
            <ArrowLeft class="h-4 w-4" />
          </button>

          <div>
            <p class="text-xs text-[#98A39C]">
              Tantangan
            </p>

            <h1 class="text-xl font-bold text-[#17211B]">
              Detail Tantangan
            </h1>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-[1.05fr_0.95fr] gap-7">

        <!-- Left -->
        <div>

          <!-- Illustration -->
          <div
            class="relative h-[360px] overflow-hidden rounded-3xl bg-[#DCFCE7]"
          >
            <div
              class="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#BBF7D0]"
            ></div>

            <div
              class="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#ECFDF5]"
            ></div>

            <div
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="flex h-48 w-48 items-center justify-center rounded-full bg-white/60"
              >
                <div
                  class="flex h-32 w-32 items-center justify-center rounded-full bg-white/80"
                >
                  <component
                    :is="getCategoryIcon(challenge.category)"
                    class="h-20 w-20 text-[#22C55E]"
                  />
                </div>
              </div>
            </div>

            <div
              class="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#15803D]"
            >
              {{ challenge.category }}
            </div>
          </div>

          <!-- Information -->
          <div class="mt-6">
            <p class="text-sm font-medium text-[#22C55E]">
              {{ challenge.participants }}
              Peserta Bergabung
            </p>

            <h2 class="mt-1 text-3xl font-bold text-[#17211B]">
              {{ challenge.title }}
            </h2>

            <p class="mt-3 max-w-2xl text-sm leading-6 text-[#66736A]">
              {{ challenge.description }}
            </p>
          </div>
        </div>

        <!-- Right -->
        <div class="space-y-5">

          <!-- Personal Progress -->
          <section
            class="rounded-2xl border border-[#E5EEE8] bg-white p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-[#17211B]">
                  Kemajuan Kamu
                </h3>

                <p class="mt-1 text-xs text-[#98A39C]">
                  Selesaikan semua aksi untuk menuntaskan tantangan.
                </p>
              </div>

              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8EE]"
              >
                <span class="text-xs font-bold text-[#15803D]">
                  {{ personalProgress }}%
                </span>
              </div>
            </div>

            <div
              class="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EAF1EC]"
            >
              <div
                class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                :style="{
                  width: `${personalProgress}%`
                }"
              ></div>
            </div>

            <div class="mt-3 flex justify-between text-xs">
              <span class="text-[#98A39C]">
                {{ challenge.completedSteps }}/{{ challenge.totalSteps }} aksi
              </span>

              <span class="font-medium text-[#15803D]">
                {{ personalProgress }}% selesai
              </span>
            </div>
          </section>

          <!-- Community Progress -->
          <section
            class="rounded-2xl border border-[#E5EEE8] bg-white p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-[#17211B]">
                  Kemajuan Komunitas
                </h3>

                <p class="mt-1 text-xs text-[#98A39C]">
                  Kemajuan seluruh peserta tantangan.
                </p>
              </div>

              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8EE]"
              >
                <span class="text-xs font-bold text-[#15803D]">
                  {{ challenge.progress }}%
                </span>
              </div>
            </div>

            <div
              class="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EAF1EC]"
            >
              <div
                class="h-full rounded-full bg-[#22C55E]"
                :style="{
                  width: `${challenge.progress}%`
                }"
              ></div>
            </div>

            <div class="mt-3 flex justify-between text-xs">
              <span class="text-[#98A39C]">
                {{ challenge.daysLeft }} hari lagi
              </span>

              <span class="font-medium text-[#15803D]">
                {{ challenge.progress }}% selesai
              </span>
            </div>
          </section>

          <!-- Reward -->
          <section
            class="rounded-2xl bg-[#17211B] p-5"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/50">
                  Hadiah Tantangan
                </p>

                <div class="mt-1">
                  <span class="text-base font-bold text-white">
                    Lencana Spesial & 500 XP
                  </span>
                </div>
              </div>

              <Trophy
                class="h-7 w-7 text-[#4ADE80]"
              />
            </div>
          </section>

          <!-- Action -->
          <button
            type="button"
            @click="!isCompleted && $emit('join')"
            :disabled="isCompleted"
            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition active:scale-[0.99]"
            :class="isCompleted
              ? 'bg-[#98A39C] cursor-not-allowed'
              : 'bg-[#22C55E] hover:bg-[#16A34A]'"
          >
            {{
              isCompleted
                ? 'Tantangan Selesai'
                : !challenge.joined
                  ? 'Ikuti Tantangan'
                  : challenge.completedSteps === 0
                    ? 'Mulai Tantangan'
                    : 'Lanjutkan Tantangan'
            }}

            <Check v-if="isCompleted" class="h-4 w-4" />
            <ArrowRight v-else class="h-4 w-4" />
          </button>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Check
} from 'lucide-vue-next'

const props = defineProps({
  challenge: {
    type: Object,
    required: true
  },

  getCategoryIcon: {
    type: Function,
    required: true
  },

  goBack: {
    type: Function,
    required: true
  }
})

defineEmits(['join'])

const personalProgress = computed(() => {
  const total = props.challenge.totalSteps || props.challenge.steps?.length || 0
  const completed = props.challenge.completedSteps || 0

  if (!total) return 0

  return Math.round((completed / total) * 100)
})

const isCompleted = computed(() => {
  const total = props.challenge.totalSteps || props.challenge.steps?.length || 0
  const completed = props.challenge.completedSteps || 0

  return total > 0 && completed >= total
})
</script>