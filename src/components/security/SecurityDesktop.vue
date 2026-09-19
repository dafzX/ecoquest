<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1000px] px-6 pb-12 pt-8">

      <!-- Header -->
      <header class="mb-7 flex items-center gap-3">
        <button
          type="button"
          @click="$emit('back')"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
        >
          <ArrowLeft class="h-5 w-5" />
        </button>

        <div>
          <p class="text-xs font-medium text-[#8A958E]">
            Settings
          </p>

          <h1 class="mt-1 text-2xl font-bold text-[#17211B]">
            Security
          </h1>

          <p class="mt-1 text-sm text-[#718078]">
            Lindungi akun dan kelola perangkat yang memiliki akses.
          </p>
        </div>
      </header>

      <div class="grid grid-cols-2 gap-5">

        <!-- Password -->
        <section class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <h2 class="text-sm font-bold text-[#17211B]">
            Keamanan Password
          </h2>

          <p class="mt-1 text-[10px] text-[#8A958E]">
            Pastikan password akunmu selalu aman.
          </p>

          <button
            type="button"
            @click="$emit('change-password')"
            class="mt-5 flex w-full items-center gap-3 rounded-xl bg-[#F8FBF9] p-4 text-left transition hover:bg-[#EAF8EE]"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <Lock class="h-5 w-5 text-[#15803D]" />
            </div>

            <div class="flex-1">
              <p class="text-[11px] font-semibold text-[#17211B]">
                Ubah Password
              </p>

              <p class="mt-1 text-[9px] text-[#8A958E]">
                Gunakan password yang kuat dan unik.
              </p>
            </div>

            <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
          </button>
        </section>

        <!-- Email -->
        <section class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <h2 class="text-sm font-bold text-[#17211B]">
            Email
          </h2>

          <p class="mt-1 text-[10px] text-[#8A958E]">
            Status keamanan email akunmu.
          </p>

          <div class="mt-5 flex items-center gap-3 rounded-xl bg-[#F8FBF9] p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF]">
              <Mail class="h-5 w-5 text-[#3B82F6]" />
            </div>

            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-semibold text-[#17211B]">
                Email Terverifikasi
              </p>

              <p class="mt-1 text-[9px] text-[#8A958E]">
                user@ecoquest.app
              </p>
            </div>

            <div class="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF8EE]">
              <Check class="h-4 w-4 text-[#22C55E]" />
            </div>
          </div>
        </section>

        <!-- Sessions -->
        <section class="col-span-2 rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold text-[#17211B]">
                Perangkat Aktif
              </h2>

              <p class="mt-1 text-[10px] text-[#8A958E]">
                Kelola perangkat yang memiliki akses ke akunmu.
              </p>
            </div>

            <Monitor class="h-5 w-5 text-[#15803D]" />
          </div>

          <div class="mt-5 grid grid-cols-2 gap-3">
            <!-- Current Device -->
            <div class="flex items-center gap-3 rounded-xl bg-[#F8FBF9] p-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
                <Monitor class="h-5 w-5 text-[#15803D]" />
              </div>

              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <p class="text-[11px] font-semibold text-[#17211B]">
                    Windows PC
                  </p>

                  <span class="rounded-full bg-[#EAF8EE] px-2 py-0.5 text-[7px] font-semibold text-[#15803D]">
                    Perangkat ini
                  </span>
                </div>

                <p class="mt-1 text-[9px] text-[#8A958E]">
                  Aktif sekarang
                </p>
              </div>

              <div class="h-2 w-2 rounded-full bg-[#22C55E]"></div>
            </div>

            <!-- Mobile Device -->
            <div class="flex items-center gap-3 rounded-xl bg-[#F8FBF9] p-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9]">
                <Smartphone class="h-5 w-5 text-[#64748B]" />
              </div>

              <div class="flex-1">
                <p class="text-[11px] font-semibold text-[#17211B]">
                  Mobile Device
                </p>

                <p class="mt-1 text-[9px] text-[#8A958E]">
                  Terakhir aktif 2 jam lalu
                </p>
              </div>

              <button
                type="button"
                @click="$emit('logout-device')"
                class="text-[9px] font-semibold text-[#DC2626]"
              >
                Keluar
              </button>
            </div>
          </div>

          <button
            type="button"
            @click="$emit('logout-all')"
            class="mt-4 flex items-center gap-2 rounded-xl border border-[#F3D5D5] px-4 py-2.5 text-[10px] font-semibold text-[#DC2626] transition hover:bg-[#FFF7F7]"
          >
            <LogOut class="h-4 w-4" />
            Keluar dari semua perangkat
          </button>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  Monitor,
  Smartphone
} from 'lucide-vue-next'

defineEmits(['back', 'change-password', 'logout-device', 'logout-all'])
</script>