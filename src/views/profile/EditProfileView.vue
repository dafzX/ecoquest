<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

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
            Edit Profile
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

          <!-- Username -->
          <div class="mb-4">
            <label
              for="username"
              class="mb-1.5 block text-[10px] font-semibold text-[#405047]"
            >
              Username
            </label>

            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9AA59E]"
              >
                @
              </span>

              <input
                id="username"
                v-model="form.username"
                type="text"
                class="h-9 w-full rounded-lg border border-[#DCEBE0] bg-[#FAFCFA] pl-7 pr-3 text-[10px] text-[#17211B] outline-none transition placeholder:text-[#A3ADA7] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                placeholder="username"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="mb-4">
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

          <!-- Bio -->
          <div>
            <label
              for="bio"
              class="mb-1.5 block text-[10px] font-semibold text-[#405047]"
            >
              Bio
            </label>

            <textarea
              id="bio"
              v-model="form.bio"
              rows="3"
              maxlength="120"
              class="w-full resize-none rounded-lg border border-[#DCEBE0] bg-[#FAFCFA] px-3 py-2.5 text-[10px] leading-4 text-[#17211B] outline-none transition placeholder:text-[#A3ADA7] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
              placeholder="Ceritakan sedikit tentang dirimu..."
            ></textarea>

            <p class="mt-1 text-right text-[8px] text-[#9AA59E]">
              {{ form.bio.length }}/120
            </p>
          </div>

        </section>

        <!-- Eco Preferences -->
        <section class="mt-4">

          <div class="mb-2">
            <h2 class="text-[11px] font-bold text-[#17211B]">
              Preferensi Eco
            </h2>

            <p class="mt-0.5 text-[8px] text-[#718078]">
              Pilih aksi lingkungan yang kamu sukai.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2">

            <button
              v-for="preference in preferences"
              :key="preference.id"
              type="button"
              @click="togglePreference(preference.id)"
              class="flex flex-col items-center justify-center rounded-xl border p-3 transition active:scale-[0.98]"
              :class="
                form.preferences.includes(preference.id)
                  ? 'border-[#22C55E] bg-[#EAF8EE] text-[#15803D]'
                  : 'border-[#DCEBE0] bg-white text-[#718078]'
              "
            >
              <component
                :is="preference.icon"
                class="h-5 w-5"
              />

              <span class="mt-1 text-[8px] font-semibold">
                {{ preference.name }}
              </span>
            </button>

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

        <div class="mx-auto max-w-[1000px] px-6 pb-10">

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
                Perbarui informasi profil dan preferensi eco-mu.
              </p>
            </div>

          </header>

          <div class="grid grid-cols-[280px_1fr] gap-5">

            <!-- Profile Preview -->
            <section
              class="h-fit rounded-2xl border border-[#E8EDE9] bg-white p-6"
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

                <p class="mt-1 text-xs text-[#718078]">
                  @{{ form.username }}
                </p>

                <div
                  class="mt-4 rounded-xl bg-[#F4FBF7] px-4 py-3"
                >
                  <p class="text-[10px] text-[#718078]">
                    Level Saat Ini
                  </p>

                  <p class="mt-1 text-lg font-bold text-[#15803D]">
                    Level {{ user.level }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-[#9AA59E]">
                    {{ user.xp ?? 1240 }} XP
                  </p>
                </div>

              </div>

            </section>

            <!-- Form -->
            <section
              class="rounded-2xl border border-[#E8EDE9] bg-white p-6"
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
                  />
                </div>

                <!-- Username -->
                <div>
                  <label
                    for="desktop-username"
                    class="mb-2 block text-xs font-semibold text-[#405047]"
                  >
                    Username
                  </label>

                  <input
                    id="desktop-username"
                    v-model="form.username"
                    type="text"
                    class="h-11 w-full rounded-xl border border-[#DCEBE0] bg-[#FAFCFA] px-4 text-sm text-[#17211B] outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                  />
                </div>

                <!-- Email -->
                <div class="col-span-2">
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
                  />
                </div>

                <!-- Bio -->
                <div class="col-span-2">
                  <label
                    for="desktop-bio"
                    class="mb-2 block text-xs font-semibold text-[#405047]"
                  >
                    Bio
                  </label>

                  <textarea
                    id="desktop-bio"
                    v-model="form.bio"
                    rows="4"
                    maxlength="120"
                    class="w-full resize-none rounded-xl border border-[#DCEBE0] bg-[#FAFCFA] px-4 py-3 text-sm leading-5 text-[#17211B] outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10"
                  ></textarea>

                  <p class="mt-1 text-right text-[10px] text-[#9AA59E]">
                    {{ form.bio.length }}/120
                  </p>
                </div>

              </div>

              <!-- Preferences -->
              <div class="mt-6 border-t border-[#EEF3EF] pt-6">

                <h3 class="text-sm font-bold text-[#17211B]">
                  Preferensi Eco
                </h3>

                <p class="mt-1 text-xs text-[#718078]">
                  Pilih jenis aksi lingkungan yang paling kamu sukai.
                </p>

                <div class="mt-4 grid grid-cols-3 gap-3">

                  <button
                    v-for="preference in preferences"
                    :key="preference.id"
                    type="button"
                    @click="togglePreference(preference.id)"
                    class="flex items-center gap-3 rounded-xl border p-3 text-left transition"
                    :class="
                      form.preferences.includes(preference.id)
                        ? 'border-[#22C55E] bg-[#EAF8EE]'
                        : 'border-[#DCEBE0] bg-white hover:bg-[#F8FBF9]'
                    "
                  >

                    <div
                      class="flex h-9 w-9 items-center justify-center rounded-lg"
                      :class="
                        form.preferences.includes(preference.id)
                          ? 'bg-[#22C55E] text-white'
                          : 'bg-[#F1F5F2] text-[#718078]'
                      "
                    >
                      <component
                        :is="preference.icon"
                        class="h-4 w-4"
                      />
                    </div>

                    <span
                      class="text-xs font-semibold"
                      :class="
                        form.preferences.includes(preference.id)
                          ? 'text-[#15803D]'
                          : 'text-[#405047]'
                      "
                    >
                      {{ preference.name }}
                    </span>

                  </button>

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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import {
  ArrowLeft,
  Bike,
  Leaf,
  MoreHorizontal,
  Recycle,
  Save,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'

import { user } from '@/data/mockData.js'

const router = useRouter()

const goBack = () => {
  router.back()
}

const form = reactive({
  avatar: user?.avatar || 'DA',
  name: user?.name || 'Dafa Ardi',
  username: user?.username || 'dafaardi',
  email: user?.email || 'dafa@ecoquest.com',
  bio: user?.bio || 'Suka melakukan aksi kecil untuk bumi.',
  preferences: ['recycle', 'bike']
})

const preferences = [
  {
    id: 'recycle',
    name: 'Recycle',
    icon: Recycle
  },
  {
    id: 'bike',
    name: 'Bersepeda',
    icon: Bike
  },
  {
    id: 'energy',
    name: 'Hemat Energi',
    icon: Zap
  },
  {
    id: 'plastic',
    name: 'Kurangi Plastik',
    icon: Leaf
  },
  {
    id: 'transport',
    name: 'Transportasi',
    icon: Bike
  },
  {
    id: 'plant',
    name: 'Menanam',
    icon: Leaf
  }
]

const togglePreference = (id) => {
  if (form.preferences.includes(id)) {
    form.preferences = form.preferences.filter(
      preference => preference !== id
    )
  } else {
    form.preferences.push(id)
  }
}

const saveProfile = () => {
  console.log('Profile:', {
    ...form
  })

  router.push('/profile')
}
</script>