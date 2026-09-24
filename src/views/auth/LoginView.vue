<template>
  <div class="min-h-screen bg-[#F8FAF8] lg:flex lg:items-center lg:justify-center lg:p-8">
    <div
      class="relative w-full overflow-hidden bg-white lg:grid lg:min-h-160 lg:max-w-270 lg:grid-cols-2 lg:rounded-lg lg:shadow-[0_16px_50px_rgba(23,33,27,0.08)]"
    >
      <!-- Mobile -->
      <div class="relative min-h-screen overflow-hidden lg:hidden">
        <!-- Mobile content -->
        <div class="relative z-10 px-6 pb-10 pt-8">
          <!-- Logo -->
          <div class="flex flex-col items-center">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E]"
            >
              <Leaf class="h-6 w-6 text-white" />
            </div>

            <h1 class="mt-2 text-[17px] font-bold text-[#17211B]">
              EcoQuest
            </h1>
          </div>

          <!-- Heading -->
          <div class="mt-10 text-center">
            <h2 class="text-[21px] font-bold text-[#17211B]">
              Welcome Back!
            </h2>

            <p class="mx-auto mt-1.5 max-w-65 text-[11px] leading-4 text-[#718078]">
              Masuk untuk melanjutkan perjalanan
              <br />
              ramah lingkunganmu.
            </p>
          </div>

          <!-- Form -->
          <form
            @submit.prevent="handleLogin"
            class="mx-auto mt-7 w-full max-w-82.5 space-y-3"
          >
            <!-- Email -->
            <div>
              <div class="relative">
                <Mail
                  class="absolute left-3.5 top-1/2 h-3.75 w-3.75 -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email atau Username"
                  required
                  class="h-10 w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-3 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="relative">
                <Lock
                  class="absolute left-3.5 top-1/2 h-3.75 w-3.75 -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  required
                  class="h-10 w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-10 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D8B83]"
                >
                  <Eye
                    v-if="!showPassword"
                    class="h-3.75 w-3.75"
                  />

                  <EyeOff
                    v-else
                    class="h-3.75 w-3.75"
                  />
                </button>
              </div>
            </div>

            <!-- Forgot password -->
            <div class="flex justify-end pt-0.5">
              <button
                type="button"
                class="text-[9px] font-medium text-[#22C55E] transition hover:text-[#15803D]"
              >
                Lupa password?
              </button>
            </div>

            <!-- Login button -->
            <button
              type="submit"
              class="h-10 w-full rounded-lg bg-[#22C55E] text-[11px] font-semibold text-white transition hover:bg-[#16A34A] active:bg-[#15803D]"
            >
              Login
            </button>
          </form>

          <!-- Register -->
          <p class="mt-7 text-center text-[9px] text-[#718078]">
            Belum punya akun?

            <RouterLink
              to="/register"
              class="ml-1 font-semibold text-[#22C55E]"
            >
              Daftar sekarang
            </RouterLink>
          </p>
        </div>

        <!-- Bottom decoration -->
        <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-32">
          <div
            class="absolute -bottom-12 -left-8 h-32 w-24 -rotate-28 rounded-[100%] bg-[#DCFCE7]/80"
          ></div>

          <div
            class="absolute -bottom-8 left-10 h-24 w-10 rotate-25 rounded-full bg-[#E8F8ED]"
          ></div>

          <div
            class="absolute -bottom-10 right-3 h-32 w-20 rotate-25 rounded-[100%] bg-[#E8F8ED]/80"
          ></div>

          <div
            class="absolute bottom-3 right-16 h-20 w-8 rotate-45 rounded-full bg-[#DCFCE7]/70"
          ></div>

          <Leaf
            class="absolute bottom-4 left-4 h-16 w-16 -rotate-18 text-[#BFE8CC]/50"
          />

          <Leaf
            class="absolute bottom-1 right-8 h-14 w-14 rotate-22 text-[#BFE8CC]/40"
          />
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

      <!-- Desktop Form -->
      <div class="hidden items-center px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:p-12">
        <div class="mx-auto w-full max-w-97.5">
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
            <!-- Email -->
            <div>
              <label
                for="desktop-email"
                class="mb-2 block text-sm font-medium text-[#17211B]"
              >
                Email
              </label>

              <div class="relative">
                <Mail
                  class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="desktop-email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  class="h-12 w-full rounded-xl border border-[#E2E8E4] pl-11 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label
                  for="desktop-password"
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
                  class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="desktop-password"
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
                    class="h-4.5 w-4.5"
                  />

                  <EyeOff
                    v-else
                    class="h-4.5 w-4.5"
                  />
                </button>
              </div>
            </div>

            <!-- Remember -->
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

            <!-- Button -->
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
  import { useRoute, useRouter } from 'vue-router'
  import { login } from '@/services/auth'
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

  const router = useRouter()
  const route = useRoute()
  const showPassword = ref(false)

  const form = ref({
    email: '',
    password: '',
    remember: false
  })

  async function handleLogin() {
    const result = await login(
      form.value.email,
      form.value.password
    )

    if (!result.success) {
      alert(result.message)
      return
    }

    const redirectTo = route.query.redirect || '/dashboard'
    router.push(redirectTo)
  }
</script>