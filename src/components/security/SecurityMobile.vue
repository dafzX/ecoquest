<template>
  <main class="mx-auto max-w-107.5 px-4 pb-28 md:hidden">
    <!-- Header -->
    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="$emit('back')"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Security
      </span>
    </header>

    <!-- Intro -->
    <section class="mt-2">
      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
        <ShieldCheck class="h-5 w-5 text-[#15803D]" />
      </div>

      <h1 class="mt-4 text-[22px] font-bold tracking-tight text-[#17211B]">
        Keamanan Akun
      </h1>

      <p class="mt-1.5 text-[11px] leading-5 text-[#718078]">
        Lindungi akun EcoQuest dan pastikan hanya kamu yang memiliki akses.
      </p>
    </section>

    <!-- Password -->
    <section class="mt-6">
      <div class="mb-3">
        <h2 class="text-[12px] font-bold text-[#17211B]">
          Password
        </h2>

        <p class="mt-0.5 text-[8px] text-[#8A958E]">
          Gunakan password yang kuat dan unik.
        </p>
      </div>

      <div class="overflow-hidden rounded-lg border border-[#DCEBE0] bg-white">
        <button
          type="button"
          @click="$emit('change-password')"
          class="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FBF9]"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]">
            <Lock class="h-4 w-4 text-[#15803D]" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-[#17211B]">
              Ubah Password
            </p>

            <p class="mt-0.5 text-[8px] text-[#8A958E]">
              Terakhir diperbarui beberapa waktu lalu.
            </p>
          </div>

          <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
        </button>
      </div>
    </section>

    <!-- Email -->
    <section class="mt-6">
      <div class="mb-3">
        <h2 class="text-[12px] font-bold text-[#17211B]">
          Email
        </h2>

        <p class="mt-0.5 text-[8px] text-[#8A958E]">
          Email digunakan untuk keamanan akun.
        </p>
      </div>

      <div class="rounded-lg border border-[#DCEBE0] bg-white p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF]">
            <Mail class="h-4 w-4 text-[#3B82F6]" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-[#17211B]">
              Email Terverifikasi
            </p>

            <p class="mt-0.5 truncate text-[8px] text-[#8A958E]">
              user@ecoquest.app
            </p>
          </div>

          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF8EE]">
            <Check class="h-3.5 w-3.5 text-[#22C55E]" />
          </div>
        </div>
      </div>
    </section>

    <!-- Active Sessions -->
    <section class="mt-6">
      <div class="mb-3">
        <h2 class="text-[12px] font-bold text-[#17211B]">
          Perangkat Aktif
        </h2>

        <p class="mt-0.5 text-[8px] text-[#8A958E]">
          Perangkat yang sedang digunakan untuk login.
        </p>
      </div>

      <div class="overflow-hidden rounded-lg border border-[#DCEBE0] bg-white">
        <!-- Current Device -->
        <div class="flex items-center gap-3 px-4 py-3.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]">
            <Monitor class="h-4 w-4 text-[#15803D]" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="text-[11px] font-semibold text-[#17211B]">
                Windows PC
              </p>

              <span class="rounded-full bg-[#EAF8EE] px-2 py-0.5 text-[7px] font-semibold text-[#15803D]">
                Perangkat ini
              </span>
            </div>

            <p class="mt-0.5 text-[8px] text-[#8A958E]">
              Aktif sekarang
            </p>
          </div>

          <div class="h-2 w-2 rounded-full bg-[#22C55E]"></div>
        </div>

        <div class="ml-16 border-t border-[#EEF3EF]"></div>

        <!-- Mobile -->
        <div class="flex items-center gap-3 px-4 py-3.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9]">
            <Smartphone class="h-4 w-4 text-[#64748B]" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-[#17211B]">
              Mobile Device
            </p>

            <p class="mt-0.5 text-[8px] text-[#8A958E]">
              Terakhir aktif 2 jam lalu
            </p>
          </div>

          <button
            type="button"
            @click="$emit('logout-device')"
            class="text-[8px] font-semibold text-[#DC2626]"
          >
            Keluar
          </button>
        </div>
      </div>
    </section>

    <!-- Logout All -->
    <button
      type="button"
      @click="$emit('logout-all')"
      class="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#F3D5D5] bg-white text-[10px] font-semibold text-[#DC2626] transition hover:bg-[#FFF7F7]"
    >
      <LogOut class="h-4 w-4" />
      Keluar dari semua perangkat
    </button>

    <!-- Security Info -->
    <section class="mt-6 rounded-lg border border-[#DDEFE2] bg-[#EAF8EE] p-4">
      <div class="flex items-start gap-3">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
          <ShieldCheck class="h-4 w-4 text-[#15803D]" />
        </div>

        <div>
          <h3 class="text-[11px] font-bold text-[#17211B]">
            Jaga keamanan akunmu 🌱
          </h3>

          <p class="mt-1 text-[8px] leading-4 text-[#66736A]">
            Jangan bagikan password kepada siapa pun dan gunakan
            password yang berbeda untuk setiap akun.
          </p>
        </div>
      </div>
    </section>

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
  ShieldCheck,
  Smartphone
} from 'lucide-vue-next'

defineEmits(['back', 'change-password', 'logout-device', 'logout-all'])
</script>