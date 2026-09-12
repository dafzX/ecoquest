<template>
  <div class="min-h-screen bg-[#F8FAF8] lg:flex lg:items-center lg:justify-center lg:p-8">
    <div
      class="w-full bg-white overflow-hidden lg:max-w-[1080px] lg:min-h-[640px] lg:grid lg:grid-cols-2 lg:rounded-2xl lg:shadow-[0_16px_50px_rgba(23,33,27,0.08)]"
    >
      <!-- Mobile Header -->
      <div class="relative overflow-hidden bg-[#15803D] px-6 py-6 lg:hidden">
        <div
          class="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#22C55E]/20"
        ></div>

        <div
          class="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5"
        ></div>

        <div class="relative flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white"
          >
            <Leaf class="h-5 w-5 text-[#15803D]" />
          </div>

          <div>
            <h1 class="text-lg font-bold text-white">
              EcoQuest
            </h1>

            <p class="text-xs text-white/60">
              Make an impact
            </p>
          </div>
        </div>
      </div>

      <!-- Desktop Banner -->
      <div
        class="relative hidden overflow-hidden bg-[#15803D] p-12 lg:flex lg:flex-col lg:justify-between"
      >
        <div
          class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#22C55E]/20"
        ></div>

        <div
          class="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5"
        ></div>

        <div class="relative">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-white"
            >
              <Leaf class="h-6 w-6 text-[#15803D]" />
            </div>

            <div>
              <h1 class="text-xl font-bold text-white">
                EcoQuest
              </h1>

              <p class="text-xs text-white/60">
                Make an impact
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-white/10"
          >
            <div
              class="flex h-28 w-28 items-center justify-center rounded-full bg-white/10"
            >
              <Leaf class="h-14 w-14 text-white" />
            </div>
          </div>

          <h2
            class="text-center text-[36px] font-bold leading-[1.15] text-white"
          >
            Small actions,
            <br />
            big impact.
          </h2>

          <p
            class="mx-auto mt-5 max-w-sm text-center text-sm leading-6 text-white/70"
          >
            Complete eco missions, earn XP, build your streak,
            and make your everyday actions count.
          </p>
        </div>

        <div class="relative flex items-center justify-center gap-7">
          <div class="flex items-center gap-2 text-sm text-white/65">
            <Zap class="h-4 w-4" />
            <span>Earn XP</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-white/65">
            <Flame class="h-4 w-4" />
            <span>Build Streak</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-white/65">
            <Trophy class="h-4 w-4" />
            <span>Get Rewards</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="flex items-center px-6 py-8 sm:px-8 sm:py-10 lg:p-12">
        <div class="mx-auto w-full max-w-[390px]">
          <div class="mb-8">
            <p class="mb-2 text-sm font-medium text-[#22C55E]">
              Welcome back
            </p>

            <h2 class="text-[26px] font-bold text-[#17211B] sm:text-[28px]">
              Sign in to EcoQuest
            </h2>

            <p class="mt-2 text-sm leading-5 text-[#66736A]">
              Continue your environmental journey.
            </p>
          </div>

          <form
            @submit.prevent="handleLogin"
            class="space-y-5"
          >
            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-[#17211B]"
              >
                Email
              </label>

              <div class="relative">
                <Mail
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  class="h-12 w-full rounded-xl border border-[#E2E8E4] pl-11 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label
                  for="password"
                  class="text-sm font-medium text-[#17211B]"
                >
                  Password
                </label>

                <button
                  type="button"
                  class="text-sm text-[#22C55E] transition hover:text-[#15803D]"
                >
                  Forgot password?
                </button>
              </div>

              <div class="relative">
                <Lock
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  class="h-12 w-full rounded-xl border border-[#E2E8E4] pl-11 pr-12 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A39C] transition hover:text-[#66736A]"
                >
                  <Eye
                    v-if="!showPassword"
                    class="h-[18px] w-[18px]"
                  />

                  <EyeOff
                    v-else
                    class="h-[18px] w-[18px]"
                  />
                </button>
              </div>
            </div>

            <label class="flex cursor-pointer items-center gap-3">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 accent-[#22C55E]"
              />

              <span class="text-sm text-[#66736A]">
                Remember me
              </span>
            </label>

            <button
              type="submit"
              class="h-12 w-full rounded-xl bg-[#22C55E] text-sm font-semibold text-white transition hover:bg-[#16A34A] active:bg-[#15803D]"
            >
              Sign In
            </button>
          </form>

          <p class="mt-7 text-center text-sm text-[#66736A]">
            Don't have an account?

            <RouterLink
              to="/register"
              class="ml-1 font-semibold text-[#22C55E] transition hover:text-[#15803D]"
            >
              Create account
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Flame,
  Trophy
} from 'lucide-vue-next'

const showPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

function handleLogin() {
  console.log(form.value)
}
</script>
