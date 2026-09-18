<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <!-- Mobile -->
      <div class="mx-auto max-w-[430px] px-4 pb-28 md:hidden">
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
            Mission Detail
          </span>
        </header>

        <!-- Mission Image -->
        <div
          class="relative mt-2 h-[180px] overflow-hidden rounded-2xl bg-[#DCFCE7]"
        >
          <div
            class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#BBF7D0]"
          ></div>

          <div
            class="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-[#ECFDF5]"
          ></div>

          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full bg-white/70"
            >
              <Recycle class="h-12 w-12 text-[#22C55E]" />
            </div>
          </div>

          <div
            class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#15803D]"
          >
            Plastic
          </div>
        </div>

        <!-- Main Info -->
        <div class="mt-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[11px] font-medium text-[#22C55E]">
                Step {{ mission.currentStep }} of {{ mission.totalSteps }}
              </p>

              <h1
                class="mt-1 text-[23px] font-bold leading-tight text-[#17211B]"
              >
                {{ mission.title }}
              </h1>
            </div>

            <div
              class="flex shrink-0 items-center gap-1.5 rounded-full bg-[#EAF8EE] px-3 py-1.5"
            >
              <Zap class="h-3.5 w-3.5 text-[#22C55E]" />
              <span class="text-[11px] font-bold text-[#15803D]">
                +{{ mission.xp }} XP
              </span>
            </div>
          </div>

          <p class="mt-3 text-[12px] leading-5 text-[#66736A]">
            {{ mission.description }}
          </p>
        </div>

        <!-- Progress -->
        <section
          class="mt-5 rounded-2xl border border-[#E5EEE8] bg-white p-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[11px] font-semibold text-[#17211B]">
                Progress
              </p>

              <p class="mt-1 text-[10px] text-[#98A39C]">
                Selesaikan langkah ini untuk mendapatkan XP.
              </p>
            </div>

            <span class="text-[11px] font-bold text-[#22C55E]">
              {{ mission.progress }}%
            </span>
          </div>

          <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF1EC]">
            <div
              class="h-full rounded-full bg-[#22C55E] transition-all"
              :style="{ width: `${mission.progress}%` }"
            ></div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-[10px] text-[#98A39C]">
              {{ mission.completedDays }} dari {{ mission.totalDays }} hari
            </span>

            <span class="text-[10px] font-medium text-[#66736A]">
              {{ mission.progress }}% selesai
            </span>
          </div>
        </section>

        <!-- What to do -->
        <section class="mt-5">
          <h2 class="text-[14px] font-bold text-[#17211B]">
            Apa yang harus dilakukan?
          </h2>

          <div class="mt-3 space-y-2.5">
            <div
              v-for="(step, index) in mission.steps"
              :key="step"
              class="flex items-start gap-3 rounded-xl border border-[#E5EEE8] bg-white p-3"
            >
              <div
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                :class="
                  index < mission.completedSteps
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-[#EAF8EE] text-[#15803D]'
                "
              >
                <Check
                  v-if="index < mission.completedSteps"
                  class="h-3.5 w-3.5"
                />

                <span
                  v-else
                  class="text-[10px] font-bold"
                >
                  {{ index + 1 }}
                </span>
              </div>

              <div>
                <p class="text-[11px] font-semibold text-[#17211B]">
                  {{ step }}
                </p>

                <p
                  v-if="index === 0"
                  class="mt-1 text-[10px] leading-4 text-[#98A39C]"
                >
                  Gunakan kembali barang yang masih bisa digunakan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Reward -->
        <section
          class="mt-5 rounded-2xl bg-[#17211B] p-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/15"
            >
              <Trophy class="h-5 w-5 text-[#4ADE80]" />
            </div>

            <div>
              <p class="text-[10px] text-white/50">
                Mission Reward
              </p>

              <p class="mt-0.5 text-[13px] font-semibold text-white">
                +{{ mission.xp }} XP
              </p>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2">
            <div class="rounded-xl bg-white/5 px-3 py-2.5">
              <p class="text-[9px] text-white/40">
                Streak
              </p>

              <div class="mt-1 flex items-center gap-1">
                <Flame class="h-3.5 w-3.5 text-[#4ADE80]" />
                <span class="text-[11px] font-semibold text-white">
                  +1 Day
                </span>
              </div>
            </div>

            <div class="rounded-xl bg-white/5 px-3 py-2.5">
              <p class="text-[9px] text-white/40">
                Impact
              </p>

              <div class="mt-1 flex items-center gap-1">
                <Leaf class="h-3.5 w-3.5 text-[#4ADE80]" />
                <span class="text-[11px] font-semibold text-white">
                  Eco Action
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Continue -->
        <button
          type="button"
          @click="continueMission"
          class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(34,197,94,0.18)] transition hover:bg-[#16A34A] active:scale-[0.98]"
        >
          Continue Quest
          <ArrowRight class="h-4 w-4" />
        </button>
      </div>

      <!-- Desktop -->
      <div class="hidden md:block">
        <div class="mx-auto max-w-6xl px-6 py-8">
          <!-- Desktop Header -->
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
                  Missions
                </p>

                <h1 class="text-xl font-bold text-[#17211B]">
                  Mission Detail
                </h1>
              </div>
            </div>

            <div
              class="flex items-center gap-1.5 rounded-full bg-[#EAF8EE] px-4 py-2"
            >
              <Zap class="h-4 w-4 text-[#22C55E]" />

              <span class="text-sm font-bold text-[#15803D]">
                +{{ mission.xp }} XP
              </span>
            </div>
          </div>

          <!-- Desktop Content -->
          <div class="grid grid-cols-[1.05fr_0.95fr] gap-7">
            <!-- Left -->
            <div>
              <div
                class="relative h-[360px] overflow-hidden rounded-3xl bg-[#DCFCE7]"
              >
                <div
                  class="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#BBF7D0]"
                ></div>

                <div
                  class="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#ECFDF5]"
                ></div>

                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="flex h-48 w-48 items-center justify-center rounded-full bg-white/60"
                  >
                    <div
                      class="flex h-32 w-32 items-center justify-center rounded-full bg-white/80"
                    >
                      <Recycle class="h-20 w-20 text-[#22C55E]" />
                    </div>
                  </div>
                </div>

                <div
                  class="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#15803D]"
                >
                  Plastic
                </div>
              </div>

              <div class="mt-6">
                <p class="text-sm font-medium text-[#22C55E]">
                  Step {{ mission.currentStep }} of {{ mission.totalSteps }}
                </p>

                <div class="mt-1 flex items-center justify-between gap-5">
                  <h2 class="text-3xl font-bold text-[#17211B]">
                    {{ mission.title }}
                  </h2>

                  <span class="text-sm font-semibold text-[#66736A]">
                    {{ mission.progress }}%
                  </span>
                </div>

                <p class="mt-3 max-w-2xl text-sm leading-6 text-[#66736A]">
                  {{ mission.description }}
                </p>
              </div>
            </div>

            <!-- Right -->
            <div class="space-y-5">
              <!-- Progress -->
              <section
                class="rounded-2xl border border-[#E5EEE8] bg-white p-6"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-bold text-[#17211B]">
                      Your Progress
                    </h3>

                    <p class="mt-1 text-xs text-[#98A39C]">
                      Keep going to complete this mission.
                    </p>
                  </div>

                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8EE]"
                  >
                    <span class="text-xs font-bold text-[#15803D]">
                      {{ mission.progress }}%
                    </span>
                  </div>
                </div>

                <div class="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EAF1EC]">
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    :style="{ width: `${mission.progress}%` }"
                  ></div>
                </div>

                <div class="mt-3 flex justify-between text-xs">
                  <span class="text-[#98A39C]">
                    {{ mission.completedDays }} / {{ mission.totalDays }} hari
                  </span>

                  <span class="font-medium text-[#15803D]">
                    {{ mission.daysLeft }} hari tersisa
                  </span>
                </div>
              </section>

              <!-- Steps -->
              <section
                class="rounded-2xl border border-[#E5EEE8] bg-white p-6"
              >
                <h3 class="text-sm font-bold text-[#17211B]">
                  Apa yang harus dilakukan?
                </h3>

                <div class="mt-4 space-y-3">
                  <div
                    v-for="(step, index) in mission.steps"
                    :key="step"
                    class="flex items-center gap-3 rounded-xl bg-[#F8FBF9] p-3"
                  >
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      :class="
                        index < mission.completedSteps
                          ? 'bg-[#22C55E] text-white'
                          : 'bg-[#EAF8EE] text-[#15803D]'
                      "
                    >
                      <Check
                        v-if="index < mission.completedSteps"
                        class="h-4 w-4"
                      />

                      <span
                        v-else
                        class="text-xs font-bold"
                      >
                        {{ index + 1 }}
                      </span>
                    </div>

                    <div>
                      <p class="text-xs font-semibold text-[#17211B]">
                        {{ step }}
                      </p>

                      <p class="mt-0.5 text-[11px] text-[#98A39C]">
                        Langkah {{ index + 1 }}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Reward -->
              <section
                class="rounded-2xl bg-[#17211B] p-5"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-white/50">
                      Mission Reward
                    </p>

                    <div class="mt-1 flex items-center gap-2">
                      <Zap class="h-4 w-4 text-[#4ADE80]" />

                      <span class="text-base font-bold text-white">
                        +{{ mission.xp }} XP
                      </span>
                    </div>
                  </div>

                  <Trophy class="h-7 w-7 text-[#4ADE80]" />
                </div>
              </section>

              <button
                type="button"
                @click="continueMission"
                class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-sm font-semibold text-white transition hover:bg-[#16A34A] active:scale-[0.99]"
              >
                Continue Quest
                <ArrowRight class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const isSubmitting = ref(false)
const isCompleted = ref(false)

import { completeMission } from '@/services/missions'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  Leaf,
  MoreHorizontal,
  Recycle,
  Trophy,
  Zap
} from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'

const router = useRouter()

const mission = {
  id: 1,
  title: 'Reduce Plastic',
  description:
    'Gunakan botol minum reusable selama 3 hari berturut-turut untuk mengurangi penggunaan plastik sekali pakai.',
  category: 'Plastic',
  currentStep: 2,
  totalSteps: 3,
  progress: 67,
  completedDays: 2,
  totalDays: 3,
  daysLeft: 1,
  completedSteps: 1,
  xp: 75,
  steps: [
    'Gunakan botol minum reusable',
    'Hindari botol plastik sekali pakai',
    'Selesaikan aksi selama 3 hari'
  ]
}

function goBack() {
  router.back()
}

async function continueMission() {
  if (isSubmitting.value || isCompleted.value) return

  isSubmitting.value = true

  try {
    const result = await completeMission(mission.id)

    if (!result.success) {
      alert(result.message)
      return
    }

    isCompleted.value = true
    alert(result.message)

    router.push('/dashboard')
  } catch (error) {
    alert('Gagal menyimpan mission. Pastikan backend sedang berjalan.')
  } finally {
    isSubmitting.value = false
  }
}
</script>