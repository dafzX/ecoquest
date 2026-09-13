<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">

      <!-- Mobile -->
      <div class="pb-24 md:hidden">

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
           Help & Support
          </span>
        </header>

        <main class="mx-auto max-w-[430px] px-4 py-5">

          <!-- Hero -->
          <section
            class="overflow-hidden rounded-[20px] bg-[#15803D] p-5 text-white shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">

              <div class="min-w-0">

                <div
                  class="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15"
                >
                  <Headphones class="h-6 w-6" />
                </div>

                <h2 class="text-[20px] font-bold">
                  Ada yang bisa kami bantu?
                </h2>

                <p class="mt-2 max-w-[300px] text-[12px] leading-5 text-white/80">
                  Temukan jawaban, panduan, atau hubungi tim EcoQuest jika kamu
                  membutuhkan bantuan.
                </p>

              </div>

              <MessageCircle
                class="mt-1 h-8 w-8 shrink-0 text-white/25"
              />

            </div>
          </section>

          <!-- Search -->
          <section class="mt-5">

            <div class="relative">

              <Search
                class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A39C]"
              />

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari bantuan..."
                class="h-12 w-full rounded-2xl border border-[#E3E9E5] bg-white pl-11 pr-4 text-[12px] text-[#17211B] outline-none transition placeholder:text-[#A3ADA6] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
              />

            </div>

          </section>

          <!-- FAQ -->
          <section class="mt-6">

            <div class="mb-3 flex items-center justify-between">

              <h3 class="text-[15px] font-bold text-[#17211B]">
                Bantuan Cepat
              </h3>

              <span class="text-[9px] text-[#98A39C]">
                {{ filteredFaqs.length }} topik
              </span>

            </div>

            <div class="space-y-2">

              <button
                v-for="faq in filteredFaqs"
                :key="faq.id"
                type="button"
                class="w-full rounded-[14px] border border-[#E8EDE9] bg-white p-3.5 text-left transition active:scale-[0.99]"
                @click="toggleFaq(faq.id)"
              >

                <div class="flex items-start gap-3">

                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    :class="faq.iconBg"
                  >
                    <component
                      :is="faq.icon"
                      class="h-4 w-4"
                    />
                  </div>

                  <div class="min-w-0 flex-1">

                    <div class="flex items-center justify-between gap-3">

                      <h4 class="text-[11px] font-semibold leading-4 text-[#17211B]">
                        {{ faq.question }}
                      </h4>

                      <ChevronDown
                        class="h-4 w-4 shrink-0 text-[#98A39C] transition-transform"
                        :class="{ 'rotate-180': openFaq === faq.id }"
                      />

                    </div>

                    <p
                      v-if="openFaq === faq.id"
                      class="mt-2 text-[9px] leading-4 text-[#66736A]"
                    >
                      {{ faq.answer }}
                    </p>

                  </div>

                </div>

              </button>

              <!-- Empty -->
              <div
                v-if="filteredFaqs.length === 0"
                class="rounded-[14px] border border-dashed border-[#DCE5DF] bg-white px-5 py-8 text-center"
              >
                <SearchX class="mx-auto h-7 w-7 text-[#A3ADA6]" />

                <p class="mt-3 text-[11px] font-semibold text-[#17211B]">
                  Bantuan tidak ditemukan
                </p>

                <p class="mt-1 text-[9px] text-[#7B877F]">
                  Coba gunakan kata kunci yang berbeda.
                </p>
              </div>

            </div>

          </section>

          <!-- Categories -->
          <section class="mt-7">

            <h3 class="mb-3 text-[15px] font-bold text-[#17211B]">
              Kategori Bantuan
            </h3>

            <div class="grid grid-cols-2 gap-2.5">

              <button
                v-for="category in categories"
                :key="category.title"
                type="button"
                class="rounded-[14px] border border-[#E8EDE9] bg-white p-3.5 text-left transition active:scale-[0.98]"
                @click="searchQuery = category.keyword"
              >

                <div
                  class="flex h-9 w-9 items-center justify-center rounded-xl"
                  :class="category.iconBg"
                >
                  <component
                    :is="category.icon"
                    class="h-4 w-4"
                  />
                </div>

                <p class="mt-3 text-[10px] font-semibold text-[#17211B]">
                  {{ category.title }}
                </p>

                <p class="mt-1 text-[8px] leading-4 text-[#8A958E]">
                  {{ category.description }}
                </p>

              </button>

            </div>

          </section>

          <!-- Contact -->
          <section class="mt-7">

            <h3 class="mb-3 text-[15px] font-bold text-[#17211B]">
              Hubungi Kami
            </h3>

            <div class="space-y-2.5">

              <!-- Chat -->
              <button
                type="button"
                class="flex w-full items-center gap-3 rounded-[14px] border border-[#E8EDE9] bg-white p-3.5 text-left transition active:bg-[#F8FBF9]"
                @click="contactSupport('chat')"
              >

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]"
                >
                  <MessageCircle class="h-4.5 w-4.5 text-[#15803D]" />
                </div>

                <div class="min-w-0 flex-1">

                  <p class="text-[10px] font-semibold text-[#17211B]">
                    Chat dengan Support
                  </p>

                  <p class="mt-1 text-[8px] text-[#8A958E]">
                    Dapatkan bantuan langsung dari tim kami
                  </p>

                </div>

                <ChevronRight class="h-4 w-4 shrink-0 text-[#A3ADA6]" />

              </button>

              <!-- Email -->
              <button
                type="button"
                class="flex w-full items-center gap-3 rounded-[14px] border border-[#E8EDE9] bg-white p-3.5 text-left transition active:bg-[#F8FBF9]"
                @click="contactSupport('email')"
              >

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF]"
                >
                  <Mail class="h-4.5 w-4.5 text-[#3B82F6]" />
                </div>

                <div class="min-w-0 flex-1">

                  <p class="text-[10px] font-semibold text-[#17211B]">
                    Email Support
                  </p>

                  <p class="mt-1 text-[8px] text-[#8A958E]">
                    support@ecoquest.app
                  </p>

                </div>

                <ChevronRight class="h-4 w-4 shrink-0 text-[#A3ADA6]" />

              </button>

            </div>

          </section>

          <!-- App Info -->
          <section
            class="mt-7 rounded-[14px] border border-[#E8EDE9] bg-white p-4 text-center"
          >

            <div
              class="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]"
            >
              <Leaf class="h-5 w-5 text-[#15803D]" />
            </div>

            <p class="mt-2 text-[11px] font-semibold text-[#17211B]">
              EcoQuest
            </p>

            <p class="mt-1 text-[8px] text-[#8A958E]">
              Versi 1.0.0
            </p>

            <p class="mt-2 text-[8px] text-[#A3ADA6]">
              Bersama menciptakan kebiasaan yang lebih hijau.
            </p>

          </section>

        </main>
      </div>

      <!-- Desktop -->
      <div class="hidden min-h-screen md:block">

        <main class="mx-auto max-w-[1400px] px-8 py-8">

          <!-- Header -->
          <section class="mb-7 flex items-center gap-4">

            <RouterLink
              to="/profile"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E3E9E5] bg-white text-[#536158] transition hover:bg-[#F1F5F2]"
            >
              <ArrowLeft class="h-5 w-5" />
            </RouterLink>

            <div>

              <p class="mb-1 text-sm font-medium text-[#22C55E]">
                Pusat Bantuan
              </p>

              <h1 class="text-[28px] font-bold text-[#17211B]">
                Help & Support
              </h1>

              <p class="mt-1 text-sm text-[#66736A]">
                Temukan bantuan dan informasi tentang EcoQuest.
              </p>

            </div>

          </section>

          <div class="grid grid-cols-[1.5fr_1fr] gap-6">

            <!-- Left -->
            <div class="space-y-6">

              <!-- Hero -->
              <section
                class="rounded-3xl bg-[#15803D] p-7 text-white shadow-sm"
              >

                <div class="flex items-center justify-between gap-8">

                  <div class="max-w-xl">

                    <div
                      class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"
                    >
                      <Headphones class="h-6 w-6" />
                    </div>

                    <h2 class="text-2xl font-bold">
                      Ada yang bisa kami bantu?
                    </h2>

                    <p class="mt-2 text-sm leading-6 text-white/80">
                      Cari jawaban dari pertanyaan umum atau hubungi tim
                      support jika kamu membutuhkan bantuan lebih lanjut.
                    </p>

                  </div>

                  <div
                    class="hidden shrink-0 rounded-full bg-white/10 p-7 lg:block"
                  >
                    <MessageCircle class="h-12 w-12 text-white/40" />
                  </div>

                </div>

              </section>

              <!-- Search -->
              <section
                class="rounded-3xl border border-[#E8EDE9] bg-white p-6"
              >

                <div class="relative">

                  <Search
                    class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#98A39C]"
                  />

                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari pertanyaan atau topik bantuan..."
                    class="h-13 w-full rounded-2xl border border-[#E3E9E5] bg-[#FAFCFA] pl-12 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#A3ADA6] focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
                  />

                </div>

              </section>

              <!-- FAQ -->
              <section
                class="rounded-3xl border border-[#E8EDE9] bg-white p-6"
              >

                <div class="mb-4 flex items-center justify-between">

                  <div>

                    <h3 class="text-lg font-bold text-[#17211B]">
                      Pertanyaan Umum
                    </h3>

                    <p class="mt-1 text-sm text-[#8A958E]">
                      Jawaban untuk pertanyaan yang paling sering ditanyakan.
                    </p>

                  </div>

                  <span
                    class="rounded-full bg-[#EAF8EE] px-3 py-1 text-xs font-semibold text-[#15803D]"
                  >
                    {{ filteredFaqs.length }} topik
                  </span>

                </div>

                <div class="divide-y divide-[#EEF2EF]">

                  <button
                    v-for="faq in filteredFaqs"
                    :key="faq.id"
                    type="button"
                    class="flex w-full items-start gap-4 py-4 text-left transition hover:bg-[#FCFEFC]"
                    @click="toggleFaq(faq.id)"
                  >

                    <div
                      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      :class="faq.iconBg"
                    >
                      <component
                        :is="faq.icon"
                        class="h-5 w-5"
                      />
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="flex items-center justify-between gap-5">

                        <p class="text-sm font-semibold text-[#17211B]">
                          {{ faq.question }}
                        </p>

                        <ChevronDown
                          class="h-5 w-5 shrink-0 text-[#98A39C] transition-transform"
                          :class="{ 'rotate-180': openFaq === faq.id }"
                        />

                      </div>

                      <p
                        v-if="openFaq === faq.id"
                        class="mt-2 max-w-2xl text-sm leading-6 text-[#66736A]"
                      >
                        {{ faq.answer }}
                      </p>

                    </div>

                  </button>

                </div>

                <div
                  v-if="filteredFaqs.length === 0"
                  class="py-10 text-center"
                >
                  <SearchX class="mx-auto h-9 w-9 text-[#A3ADA6]" />

                  <p class="mt-3 text-sm font-semibold text-[#17211B]">
                    Bantuan tidak ditemukan
                  </p>

                  <p class="mt-1 text-xs text-[#8A958E]">
                    Coba gunakan kata kunci yang berbeda.
                  </p>
                </div>

              </section>

            </div>

            <!-- Right -->
            <div class="space-y-6">

              <!-- Categories -->
              <section
                class="rounded-3xl border border-[#E8EDE9] bg-white p-6"
              >

                <h3 class="text-lg font-bold text-[#17211B]">
                  Kategori Bantuan
                </h3>

                <p class="mt-1 text-sm text-[#8A958E]">
                  Pilih kategori untuk menemukan topik yang relevan.
                </p>

                <div class="mt-5 space-y-3">

                  <button
                    v-for="category in categories"
                    :key="category.title"
                    type="button"
                    class="flex w-full items-center gap-4 rounded-2xl border border-[#EEF2EF] p-4 text-left transition hover:border-[#D9E8DD] hover:bg-[#FAFCFA]"
                    @click="searchQuery = category.keyword"
                  >

                    <div
                      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      :class="category.iconBg"
                    >
                      <component
                        :is="category.icon"
                        class="h-5 w-5"
                      />
                    </div>

                    <div class="min-w-0 flex-1">

                      <p class="text-sm font-semibold text-[#17211B]">
                        {{ category.title }}
                      </p>

                      <p class="mt-1 text-xs text-[#8A958E]">
                        {{ category.description }}
                      </p>

                    </div>

                    <ChevronRight
                      class="h-5 w-5 shrink-0 text-[#A3ADA6]"
                    />

                  </button>

                </div>

              </section>

              <!-- Contact -->
              <section
                class="rounded-3xl border border-[#E8EDE9] bg-white p-6"
              >

                <h3 class="text-lg font-bold text-[#17211B]">
                  Butuh bantuan langsung?
                </h3>

                <p class="mt-1 text-sm leading-5 text-[#8A958E]">
                  Tim EcoQuest siap membantu jika kamu tidak menemukan
                  jawaban yang kamu cari.
                </p>

                <div class="mt-5 space-y-3">

                  <button
                    type="button"
                    class="flex w-full items-center gap-4 rounded-2xl bg-[#F7FBF8] p-4 text-left transition hover:bg-[#EEF8F1]"
                    @click="contactSupport('chat')"
                  >

                    <div
                      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE]"
                    >
                      <MessageCircle class="h-5 w-5 text-[#15803D]" />
                    </div>

                    <div class="min-w-0 flex-1">

                      <p class="text-sm font-semibold text-[#17211B]">
                        Chat dengan Support
                      </p>

                      <p class="mt-1 text-xs text-[#8A958E]">
                        Bantuan langsung
                      </p>

                    </div>

                    <ChevronRight class="h-5 w-5 text-[#A3ADA6]" />

                  </button>

                  <button
                    type="button"
                    class="flex w-full items-center gap-4 rounded-2xl bg-[#F7FAFF] p-4 text-left transition hover:bg-[#F0F5FF]"
                    @click="contactSupport('email')"
                  >

                    <div
                      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF]"
                    >
                      <Mail class="h-5 w-5 text-[#3B82F6]" />
                    </div>

                    <div class="min-w-0 flex-1">

                      <p class="text-sm font-semibold text-[#17211B]">
                        Email Support
                      </p>

                      <p class="mt-1 text-xs text-[#8A958E]">
                        support@ecoquest.app
                      </p>

                    </div>

                    <ChevronRight class="h-5 w-5 text-[#A3ADA6]" />

                  </button>

                </div>

              </section>

              <!-- App Info -->
              <section
                class="rounded-3xl border border-[#E8EDE9] bg-white p-6 text-center"
              >

                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8EE]"
                >
                  <Leaf class="h-6 w-6 text-[#15803D]" />
                </div>

                <p class="mt-3 text-sm font-bold text-[#17211B]">
                  EcoQuest
                </p>

                <p class="mt-1 text-xs text-[#8A958E]">
                  Versi 1.0.0
                </p>

                <p class="mt-3 text-[11px] text-[#A3ADA6]">
                  Bersama menciptakan kebiasaan yang lebih hijau.
                </p>

              </section>

            </div>

          </div>

        </main>

      </div>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  ArrowLeft,
  Bike,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock3,
  Gift,
  Headphones,
  Leaf,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Recycle,
  Search,
  SearchX,
  ShieldCheck,
  Trophy,
  UserRound,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const openFaq = ref(null)

const router = useRouter()

const goBack = () => {
  router.back()
}

const faqs = [
  {
    id: 1,
    question: 'Bagaimana cara mendapatkan XP?',
    answer:
      'Kamu bisa mendapatkan XP dengan menyelesaikan mission, mencatat Eco Action, mengikuti challenge, dan melakukan aktivitas positif lainnya di EcoQuest.',
    icon: Trophy,
    iconBg: 'bg-[#FFF7D6] text-[#B88900]'
  },
  {
    id: 2,
    question: 'Bagaimana cara mempertahankan streak?',
    answer:
      'Lakukan minimal satu aktivitas yang dihitung sebagai progress setiap hari. Streak akan terus bertambah selama kamu tetap aktif.',
    icon: Zap,
    iconBg: 'bg-[#FFF1E8] text-[#F97316]'
  },
  {
    id: 3,
    question: 'Bagaimana cara menyelesaikan mission?',
    answer:
      'Buka halaman Mission, pilih mission yang tersedia, baca detail instruksi, lalu selesaikan aktivitas sesuai target yang diberikan.',
    icon: BookOpen,
    iconBg: 'bg-[#EAF2FF] text-[#3B82F6]'
  },
  {
    id: 4,
    question: 'Bagaimana cara mencatat Eco Action?',
    answer:
      'Pilih aksi lingkungan yang benar-benar kamu lakukan, masukkan informasi yang diperlukan, lalu simpan catatan tersebut untuk mendapatkan progress dan XP.',
    icon: Recycle,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]'
  },
  {
    id: 5,
    question: 'Kenapa XP saya belum bertambah?',
    answer:
      'Pastikan aktivitas sudah berhasil diselesaikan dan tersimpan. Jika XP tetap belum bertambah setelah beberapa saat, kamu dapat menghubungi tim support.',
    icon: Clock3,
    iconBg: 'bg-[#FFF7D6] text-[#B88900]'
  },
  {
    id: 6,
    question: 'Bagaimana cara mendapatkan reward?',
    answer:
      'Kumpulkan XP dari berbagai aktivitas EcoQuest. Jika XP kamu sudah mencukupi, buka halaman Rewards dan pilih reward yang ingin ditukarkan.',
    icon: Gift,
    iconBg: 'bg-[#F4EEFF] text-[#7C3AED]'
  },
  {
    id: 7,
    question: 'Apakah data profil saya bisa diubah?',
    answer:
      'Ya. Kamu dapat mengubah informasi profil dan preferensi EcoQuest melalui halaman Edit Profile.',
    icon: UserRound,
    iconBg: 'bg-[#EAF2FF] text-[#3B82F6]'
  },
  {
    id: 8,
    question: 'Bagaimana cara melaporkan masalah?',
    answer:
      'Jika menemukan masalah atau bug, hubungi tim support melalui chat atau email dan jelaskan masalah yang kamu alami secara singkat.',
    icon: ShieldCheck,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]'
  }
]

const categories = [
  {
    title: 'Akun',
    description: 'Profil dan pengaturan akun',
    keyword: 'profil',
    icon: UserRound,
    iconBg: 'bg-[#EAF2FF] text-[#3B82F6]'
  },
  {
    title: 'Mission',
    description: 'Mission dan progress',
    keyword: 'mission',
    icon: BookOpen,
    iconBg: 'bg-[#FFF7D6] text-[#B88900]'
  },
  {
    title: 'Eco Action',
    description: 'Catatan aksi lingkungan',
    keyword: 'Eco Action',
    icon: Leaf,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]'
  },
  {
    title: 'XP & Reward',
    description: 'XP, level dan reward',
    keyword: 'XP',
    icon: Trophy,
    iconBg: 'bg-[#F4EEFF] text-[#7C3AED]'
  },
  {
    title: 'Challenge',
    description: 'Challenge dan pencapaian',
    keyword: 'challenge',
    icon: Zap,
    iconBg: 'bg-[#FFF1E8] text-[#F97316]'
  },
  {
    title: 'Aktivitas',
    description: 'Aktivitas dan streak',
    keyword: 'streak',
    icon: Bike,
    iconBg: 'bg-[#EAF8EE] text-[#15803D]'
  }
]

const filteredFaqs = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  if (!keyword) {
    return faqs
  }

  return faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword)
    )
  })
})

const toggleFaq = (id) => {
  openFaq.value = openFaq.value === id ? null : id
}

const contactSupport = (type) => {
  if (type === 'email') {
    window.location.href = 'mailto:support@ecoquest.app'
    return
  }

  console.log('Open support chat')
}
</script>