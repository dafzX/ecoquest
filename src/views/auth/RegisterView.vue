<template>
  <div class="min-h-screen bg-[#F8FAF8] lg:flex lg:items-center lg:justify-center lg:p-8">
    <div
      class="relative w-full overflow-hidden bg-white lg:grid lg:min-h-[680px] lg:max-w-[1080px] lg:grid-cols-2 lg:rounded-2xl lg:shadow-[0_16px_50px_rgba(23,33,27,0.08)]"
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
          <div class="mt-8 text-center">
            <h2 class="text-[21px] font-bold text-[#17211B]">
              Buat Akun
            </h2>

            <p class="mx-auto mt-1.5 max-w-[270px] text-[11px] leading-4 text-[#718078]">
              Bergabung dengan ribuan pengguna lainnya.
            </p>
          </div>

          <!-- Form -->
          <form
            @submit.prevent="handleRegister"
            class="mx-auto mt-6 w-full max-w-[330px] space-y-3"
          >
            <!-- Name -->
            <div>
              <div class="relative">
                <User
                  class="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  class="h-[40px] w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-3 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <div class="relative">
                <Mail
                  class="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  required
                  class="h-[40px] w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-3 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="relative">
                <Lock
                  class="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  required
                  class="h-[40px] w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-10 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D8B83]"
                >
                  <Eye
                    v-if="!showPassword"
                    class="h-[15px] w-[15px]"
                  />

                  <EyeOff
                    v-else
                    class="h-[15px] w-[15px]"
                  />
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <div class="relative">
                <Lock
                  class="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7D8B83]"
                />

                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Konfirmasi Password"
                  required
                  class="h-[40px] w-full rounded-lg border border-[#DDE6E0] bg-white pl-10 pr-10 text-[11px] text-[#17211B] outline-none transition placeholder:text-[#9AA69F] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                />

                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D8B83]"
                >
                  <Eye
                    v-if="!showConfirmPassword"
                    class="h-[15px] w-[15px]"
                  />

                  <EyeOff
                    v-else
                    class="h-[15px] w-[15px]"
                  />
                </button>
              </div>
            </div>

            <!-- Terms -->
            <label class="flex cursor-pointer items-start gap-2.5 pt-1">
              <input
                v-model="form.terms"
                type="checkbox"
                required
                class="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#22C55E]"
              />

              <span class="text-[9px] leading-4 text-[#718078]">
                Saya setuju dengan
                <button
                  type="button"
                  class="font-medium text-[#22C55E]"
                >
                  Terms of Service
                </button>
                dan
                <button
                  type="button"
                  class="font-medium text-[#22C55E]"
                >
                  Privacy Policy
                </button>
              </span>
            </label>

            <!-- Register button -->
            <button
              type="submit"
              class="mt-1 h-[40px] w-full rounded-lg bg-[#22C55E] text-[11px] font-semibold text-white transition hover:bg-[#16A34A] active:bg-[#15803D]"
            >
              Daftar
            </button>
          </form>

          <!-- Login -->
          <p class="mt-6 text-center text-[9px] text-[#718078]">
            Sudah punya akun?

            <RouterLink
              to="/login"
              class="ml-1 font-semibold text-[#22C55E]"
            >
              Login di sini
            </RouterLink>
          </p>
        </div>

        <!-- Bottom decoration -->
        <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-28">
          <div
            class="absolute -bottom-12 -left-8 h-32 w-24 rotate-[-28deg] rounded-[100%] bg-[#DCFCE7]/80"
          ></div>

          <div
            class="absolute -bottom-8 left-10 h-24 w-10 rotate-[25deg] rounded-full bg-[#E8F8ED]"
          ></div>

          <div
            class="absolute -bottom-10 right-3 h-32 w-20 rotate-[25deg] rounded-[100%] bg-[#E8F8ED]/80"
          ></div>

          <div
            class="absolute bottom-3 right-16 h-20 w-8 rotate-[45deg] rounded-full bg-[#DCFCE7]/70"
          ></div>

          <Leaf
            class="absolute bottom-3 left-4 h-14 w-14 rotate-[-18deg] text-[#BFE8CC]/50"
          />

          <Leaf
            class="absolute bottom-1 right-8 h-12 w-12 rotate-[22deg] text-[#BFE8CC]/40"
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
        <div class="mx-auto w-full max-w-[390px]">
          <div class="mb-7">
            <p class="mb-2 text-sm font-medium text-[#22C55E]">
              Get started
            </p>

            <h2 class="text-[26px] font-bold text-[#17211B] sm:text-[28px]">
              Create your account
            </h2>

            <p class="mt-2 text-sm leading-5 text-[#66736A]">
              Start your environmental journey with EcoQuest.
            </p>
          </div>

          <form
            @submit.prevent="handleRegister"
            class="space-y-4"
          >
            <!-- Name -->
            <div>
              <label
                for="desktop-name"
                class="mb-2 block text-sm font-medium text-[#17211B]"
              >
                Full name
              </label>

              <div class="relative">
                <User
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="desktop-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your full name"
                  required
                  class="h-12 w-full rounded-xl border border-[#E2E8E4] pl-11 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                />
              </div>
            </div>

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
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
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
              <label
                for="desktop-password"
                class="mb-2 block text-sm font-medium text-[#17211B]"
              >
                Password
              </label>

              <div class="relative">
                <Lock
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="desktop-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a password"
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

            <!-- Confirm Password -->
            <div>
              <label
                for="desktop-confirm-password"
                class="mb-2 block text-sm font-medium text-[#17211B]"
              >
                Confirm password
              </label>

              <div class="relative">
                <Lock
                  class="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
                />

                <input
                  id="desktop-confirm-password"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  required
                  class="h-12 w-full rounded-xl border border-[#E2E8E4] pl-11 pr-12 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                />

                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A39C] transition hover:text-[#66736A]"
                >
                  <Eye
                    v-if="!showConfirmPassword"
                    class="h-[18px] w-[18px]"
                  />

                  <EyeOff
                    v-else
                    class="h-[18px] w-[18px]"
                  />
                </button>
              </div>
            </div>

            <!-- Terms -->
            <label class="flex cursor-pointer items-start gap-3 pt-1">
              <input
                v-model="form.terms"
                type="checkbox"
                required
                class="mt-0.5 h-4 w-4 shrink-0 accent-[#22C55E]"
              />

              <span class="text-sm leading-5 text-[#66736A]">
                I agree to the
                <button
                  type="button"
                  class="font-medium text-[#22C55E] hover:text-[#15803D]"
                >
                  Terms of Service
                </button>
                and
                <button
                  type="button"
                  class="font-medium text-[#22C55E] hover:text-[#15803D]"
                >
                  Privacy Policy
                </button>
              </span>
            </label>

            <!-- Button -->
            <button
              type="submit"
              class="mt-2 h-12 w-full rounded-xl bg-[#22C55E] text-sm font-semibold text-white transition hover:bg-[#16A34A] active:bg-[#15803D]"
            >
              Create Account
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-[#66736A]">
            Already have an account?

            <RouterLink
              to="/login"
              class="ml-1 font-semibold text-[#22C55E] transition hover:text-[#15803D]"
            >
              Sign in
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/auth'
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Zap,
  Flame,
  Trophy
} from 'lucide-vue-next'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

function handleRegister() {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Password tidak sama.')
    return
  }

  if (form.value.password.length < 6) {
    alert('Password minimal 6 karakter.')
    return
  }

  const result = register({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  })

  if (!result.success) {
    alert(result.message)
    return
  }

  alert('Akun berhasil dibuat. Selamat datang di EcoQuest!')
  router.push('/dashboard')
}
</script>