<template>
  <header class="landing-nav" :class="{ 'landing-nav--scrolled': scrolled }">
    <nav class="landing-nav__inner" aria-label="Navigasi utama">
      <a class="landing-brand" href="#top" aria-label="EcoQuest, kembali ke beranda" @click="closeMenu">
        <span class="landing-brand__icon"><Leaf :size="19" aria-hidden="true" /></span>
        <span class="landing-brand__name">EcoQuest</span>
      </a>

      <div id="landing-nav-links" class="landing-nav__links" :class="{ 'landing-nav__links--open': menuOpen }">
        <a v-for="item in links" :key="item.href" :href="item.href" @click="closeMenu">{{ item.label }}</a>
        <RouterLink class="landing-mobile-login" to="/login" @click="closeMenu">Masuk</RouterLink>
        <RouterLink class="landing-mobile-cta" to="/register" @click="closeMenu">Mulai Sekarang</RouterLink>
      </div>

      <div class="landing-nav__actions">
        <RouterLink class="landing-nav__login" to="/login">Masuk</RouterLink>
        <RouterLink class="landing-button landing-button--small" to="/register">
          Mulai Sekarang <ArrowUpRight :size="15" aria-hidden="true" />
        </RouterLink>
      </div>

      <button
        class="landing-menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="landing-nav-links"
        :aria-label="menuOpen ? 'Tutup menu' : 'Buka menu'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="21" aria-hidden="true" />
        <Menu v-else :size="21" aria-hidden="true" />
      </button>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Leaf, Menu, X } from 'lucide-vue-next'

const links = [
  { label: 'Beranda', href: '#top' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Misi', href: '#misi' },
  { label: 'Dampak', href: '#dampak' },
  { label: 'Komunitas', href: '#komunitas' }
]

const menuOpen = ref(false)
const scrolled = ref(false)

function updateScrollState() {
  scrolled.value = window.scrollY > 12
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>
