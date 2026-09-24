<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-107.5 px-4 pb-24 md:hidden">

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
            Edit Profil
          </span>
        </header>

        <!-- Profile Photo -->
        <section class="flex flex-col items-center py-5">

          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7] text-xl font-bold text-[#15803D] ring-4 ring-white shadow-sm"
          >
            {{ form.avatar }}
          </div>

          <button
            type="button"
            class="mt-2 text-[10px] font-semibold text-[#22C55E] transition hover:text-[#15803D]"
          >
            Ubah Foto
          </button>

        </section>

        <!-- Form -->
        <section
          class="rounded-[14px] border border-[#DCEBE0] bg-white p-4"
        >

          <!-- Nama -->
          <div class="mb-4">
            <label
              for="name"
              class="mb-1.5 block text-[10px] font-semibold text-[#405047]"
            >
              Nama Lengkap
            </label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              class="h-9 w-full rounded-lg border border-[#DCEBE0] bg-[#FAFCFA] px-3 text-[10px] text-[#17211B] outline-none transition placeholder:text-[#A3ADA7] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-1.5 block text-[10px] font-semibold text-[#405047]"
            >
              Email
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              class="h-9 w-full rounded-lg border border-[#DCEBE0] bg-[#FAFCFA] px-3 text-[10px] text-[#17211B] outline-none transition placeholder:text-[#A3ADA7] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
              placeholder="Masukkan email"
            />
          </div>

        </section>

        <!-- Save -->
        <button
          type="button"
          @click="saveProfile"
          class="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[10px] font-bold text-white shadow-sm transition hover:bg-[#15803D] active:scale-[0.98]"
        >
          <Save class="h-4 w-4" />
          Simpan Perubahan
        </button>

        <!-- Cancel -->
        <RouterLink
          to="/profile"
          class="mt-2 flex h-9 w-full items-center justify-center rounded-xl text-[10px] font-semibold text-[#718078] transition hover:bg-white"
        >
          Batal
        </RouterLink>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-250 px-6 pb-10">

          <!-- Header -->
          <header class="mb-6 flex items-center gap-3">

            <RouterLink
              to="/profile"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
            >
              <ArrowLeft class="h-5 w-5" />
            </RouterLink>

            <div>
              <h1 class="text-[24px] font-bold text-[#17211B]">
                Edit Profil
              </h1>

              <p class="mt-1 text-sm text-[#718078]">
                Perbarui informasi profil akunmu.
              </p>
            </div>

          </header>

          <div class="grid grid-cols-[280px_1fr] gap-5">

            <!-- Profile Preview -->
            <section
              class="h-fit rounded-lg border border-[#E8EDE9] bg-white p-6"
            >

              <div class="flex flex-col items-center text-center">

                <div
                  class="flex h-24 w-24 items-center justify-center rounded-full bg-[#DCFCE7] text-2xl font-bold text-[#15803D] ring-4 ring-[#EAF8EE]"
                >
                  {{ form.avatar }}
                </div>

                <button
                  type="button"
                  class="mt-3 text-xs font-semibold text-[#22C55E] hover:text-[#15803D]"
                >
                  Ubah Foto
                </button>

                <h2 class="mt-5 text-base font-bold text-[#17211B]">
                  {{ form.name }}
                </h2>

                <p class="mt-1 max-w-full truncate text-xs text-[#718078]">
                  {{ form.email }}
                </p>

                <div
                  class="mt-4 w-full rounded-xl bg-[#F4FBF7] px-4 py-3"
                >
                  <p class="text-[10px] text-[#718078]">
                    Email Akun
                  </p>

                  <p
                    class="mt-1 truncate text-xs font-semibold text-[#15803D]"
                  >
                    {{ form.email }}
                  </p>
                </div>

              </div>

            </section>

            <!-- Form -->
            <section
              class="rounded-lg border border-[#E8EDE9] bg-white p-6"
            >

              <div class="grid grid-cols-2 gap-5">

                <!-- Name -->
                <div>
                  <label
                    for="desktop-name"
                    class="mb-2 block text-xs font-semibold text-[#405047]"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="desktop-name"
                    v-model="form.name"
                    type="text"
                    class="h-11 w-full rounded-xl border border-[#DCEBE0] bg-[#FAFCFA] px-4 text-sm text-[#17211B] outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="desktop-email"
                    class="mb-2 block text-xs font-semibold text-[#405047]"
                  >
                    Email
                  </label>

                  <input
                    id="desktop-email"
                    v-model="form.email"
                    type="email"
                    class="h-11 w-full rounded-xl border border-[#DCEBE0] bg-[#FAFCFA] px-4 text-sm text-[#17211B] outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                    placeholder="Masukkan email"
                  />
                </div>

              </div>

              <!-- Account Info -->
              <div class="mt-6 border-t border-[#EEF3EF] pt-6">

                <h3 class="text-sm font-bold text-[#17211B]">
                  Informasi Akun
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Informasi akun yang sedang digunakan.
                </p>

                <div class="mt-4 rounded-xl bg-[#F4FBF7] px-4 py-3">
                  <div class="flex items-center justify-between gap-4">

                    <div>
                      <p class="text-[10px] text-[#718078]">
                        ID Pengguna
                      </p>

                      <p class="mt-1 text-xs font-semibold text-[#405047]">
                        #{{ currentUser?.id }}
                      </p>
                    </div>

                    <div class="text-right">
                      <p class="text-[10px] text-[#718078]">
                        Email
                      </p>

                      <p class="mt-1 max-w-55 truncate text-xs font-semibold text-[#405047]">
                        {{ form.email }}
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <!-- Actions -->
              <div class="mt-7 flex justify-end gap-3">

                <RouterLink
                  to="/profile"
                  class="flex h-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white px-5 text-xs font-semibold text-[#718078] transition hover:bg-[#F8FBF9]"
                >
                  Batal
                </RouterLink>

                <button
                  type="button"
                  @click="saveProfile"
                  class="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-5 text-xs font-bold text-white transition hover:bg-[#15803D]"
                >
                  <Save class="h-4 w-4" />
                  Simpan Perubahan
                </button>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
  Save
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import { getCurrentUser } from '@/services/auth'
import { updateProfile } from '@/services/users'

const router = useRouter()
const currentUser = getCurrentUser()
const isSaving = ref(false)

function getAvatar(name) {
  if (!name) return 'EQ'

  const words = name.trim().split(/\s+/)

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  return words[0].slice(0, 2).toUpperCase()
}

const form = reactive({
  avatar: getAvatar(currentUser?.name),
  name: currentUser?.name || '',
  email: currentUser?.email || ''
})

function goBack() {
  router.back()
}

async function saveProfile() {
  const name = form.name.trim()
  const email = form.email.trim().toLowerCase()

  if (!name || !email) {
    alert('Nama dan email wajib diisi.')
    return
  }

  isSaving.value = true

  const result = await updateProfile({
    name,
    email
  })

  isSaving.value = false

  if (!result.success) {
    alert(result.message)
    return
  }

  form.avatar = getAvatar(result.user.name)

  alert(result.message)
  router.push('/profile')
}
</script>