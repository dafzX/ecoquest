<template>
  <div class="landing-dashboard" aria-label="Pratinjau dashboard EcoQuest">
    <aside class="landing-dashboard__sidebar">
      <div class="landing-dashboard__brand">
        <span><Leaf :size="15" aria-hidden="true" /></span>
        <strong>EcoQuest</strong>
      </div>
      <small class="landing-dashboard__nav-label">MENU</small>
      <div
        v-for="item in navigation"
        :key="item.label"
        class="landing-dashboard__nav-item"
        :class="{ 'landing-dashboard__nav-item--active': item.active }"
      >
        <component :is="item.icon" :size="14" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </div>
      <div class="landing-dashboard__sidebar-bottom">
        <span class="landing-avatar">E</span>
        <div><strong>Eco Explorer</strong><small>Level 1</small></div>
      </div>
    </aside>

    <div class="landing-dashboard__main">
      <div class="landing-dashboard__topbar">
        <span>Ringkasan perjalananmu</span>
        <div><Bell :size="15" aria-hidden="true" /><span class="landing-avatar landing-avatar--small">E</span></div>
      </div>

      <div class="landing-dashboard__welcome">
        <div>
          <span class="landing-eyebrow">SELAMAT DATANG KEMBALI</span>
          <h3>Halo, Eco Explorer <span aria-hidden="true">🌱</span></h3>
          <p>Setiap langkah kecil membawa perubahan.</p>
        </div>
        <span class="landing-dashboard__level"><Sprout :size="14" aria-hidden="true" /> Level 1</span>
      </div>

      <div class="landing-dashboard__metrics">
        <article class="landing-dashboard__metric landing-dashboard__metric--xp">
          <span class="landing-dashboard__metric-icon"><Zap :size="15" aria-hidden="true" /></span>
          <small>Total XP</small><strong>0 <em>XP</em></strong><div class="landing-progress"><span style="width: 8%"></span></div><small>0 / 500 XP menuju Level 2</small>
        </article>
        <article class="landing-dashboard__metric">
          <span class="landing-dashboard__metric-icon"><Cloud :size="15" aria-hidden="true" /></span>
          <small>CO₂ Dihemat</small><strong>0 <em>kg</em></strong><small>Mulai dari misi pertamamu</small>
        </article>
        <article class="landing-dashboard__metric">
          <span class="landing-dashboard__metric-icon"><Recycle :size="15" aria-hidden="true" /></span>
          <small>Misi Selesai</small><strong>0</strong><small>Terus bangun kebiasaan baik</small>
        </article>
      </div>

      <div class="landing-dashboard__lower">
        <article class="landing-dashboard__next">
          <div class="landing-dashboard__section-head"><strong>Misi berikutnya</strong><span>LIHAT MISI</span></div>
          <div class="landing-dashboard__mission">
            <span class="landing-dashboard__mission-icon"><Recycle :size="17" aria-hidden="true" /></span>
            <div><strong>Daur Ulang 5 Botol Plastik</strong><small>Kumpulkan dan daur ulang botol plastik.</small></div>
            <em>+50 XP</em>
          </div>
          <div class="landing-dashboard__mission-progress"><span style="width: 0%"></span></div>
          <small class="landing-dashboard__muted">0 dari 3 langkah selesai</small>
        </article>
        <article class="landing-dashboard__streak">
          <span class="landing-dashboard__metric-icon"><Flame :size="15" aria-hidden="true" /></span>
          <small>Streak saat ini</small><strong>0 <em>hari</em></strong>
          <div class="landing-week">
            <span v-for="day in week" :key="day">{{ day }}</span>
          </div>
          <small class="landing-dashboard__muted">Mulai streak pertamamu</small>
        </article>
      </div>
      <p class="landing-dashboard__disclaimer">Pratinjau ilustratif. Data pada akunmu dapat berbeda.</p>
    </div>
  </div>
</template>

<script setup>
import {
  Award,
  Bell,
  ChartNoAxesCombined,
  Cloud,
  Flame,
  Gift,
  Heart,
  Home,
  Leaf,
  ListChecks,
  Recycle,
  Sprout,
  Trophy,
  Users,
  Zap
} from 'lucide-vue-next'

const navigation = [
  { label: 'Beranda', icon: Home, active: true },
  { label: 'Misi', icon: ListChecks },
  { label: 'Tantangan', icon: Trophy },
  { label: 'Peringkat', icon: ChartNoAxesCombined },
  { label: 'Dampak', icon: Sprout },
  { label: 'Hadiah', icon: Gift },
  { label: 'Pencapaian', icon: Award },
  { label: 'Komunitas', icon: Users },
  { label: 'Profil', icon: Heart }
]

const week = ['S', 'S', 'R', 'K', 'J', 'S', 'M']
</script>
