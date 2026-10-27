<template>
  <div ref="page" class="landing-page" id="top">
    <LandingNavbar />

    <main>
      <section class="landing-hero landing-container">
        <div class="landing-hero__copy">
          <div class="landing-kicker"><span></span> GREEN TECH <b>·</b> SUSTAINABLE FUTURE</div>
          <h1>Small Actions.<br /><span>Greener Future.</span></h1>
          <p class="landing-hero__lead">
            Ubah kebiasaan ramah lingkungan menjadi misi seru. Kumpulkan XP, capai target,
            dan lihat bagaimana setiap aksimu membantu menciptakan masa depan yang lebih hijau.
          </p>
          <div class="landing-hero__actions">
            <RouterLink class="landing-button" to="/register">
              Mulai Perjalananmu <ArrowRight :size="17" aria-hidden="true" />
            </RouterLink>
            <a class="landing-button landing-button--quiet" href="#cara-kerja">
              Jelajahi EcoQuest <CirclePlay :size="17" aria-hidden="true" />
            </a>
          </div>
          <div class="landing-hero__promises">
            <span><Check :size="15" aria-hidden="true" /> Misi ramah lingkungan</span>
            <span><Check :size="15" aria-hidden="true" /> Progres terukur</span>
            <span><Check :size="15" aria-hidden="true" /> Reward tiap langkah</span>
          </div>
        </div>
        <div class="landing-hero__visual">
          <EcoSystemScene />
        </div>
        <a class="landing-scroll-hint" href="#pilar" aria-label="Gulir ke bagian selanjutnya">
          <span></span> Gulir untuk menjelajah
        </a>
      </section>

      <section id="pilar" class="landing-pillars">
        <div class="landing-container">
          <div class="landing-pillars__intro">
            <span class="landing-eyebrow">LANGKAH KECIL, DAMPAK YANG BERARTI</span>
            <h2>Semua yang kamu butuhkan untuk terus bergerak.</h2>
          </div>
          <div class="landing-pillars__items">
            <div v-for="pillar in pillars" :key="pillar.label" class="landing-pillar">
              <span><component :is="pillar.icon" :size="19" aria-hidden="true" /></span>
              <strong>{{ pillar.label }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="landing-section landing-problem landing-container">
        <div class="landing-problem__copy">
          <span class="landing-eyebrow">THE IDEA BEHIND ECOQUEST</span>
          <h2>Menjaga bumi seharusnya menjadi kebiasaan, bukan sekadar niat.</h2>
          <p>
            Banyak aksi ramah lingkungan dimulai dari niat baik, tetapi sulit dipertahankan
            secara konsisten. EcoQuest menghadirkan target, progres, umpan balik, dan
            penghargaan agar kebiasaan baik terasa lebih mudah dijalankan.
          </p>
          <ul class="landing-check-list">
            <li><span><Check :size="14" aria-hidden="true" /></span><div><strong>Bangun konsistensi</strong><small>Temukan langkah sederhana yang bisa dilakukan hari ini.</small></div></li>
            <li><span><Check :size="14" aria-hidden="true" /></span><div><strong>Lihat progresmu</strong><small>Pantau misi, XP, streak, dan aktivitas yang sudah dicatat.</small></div></li>
            <li><span><Check :size="14" aria-hidden="true" /></span><div><strong>Rayakan tiap langkah</strong><small>Apresiasi perjalananmu lewat pencapaian dan reward.</small></div></li>
          </ul>
        </div>
        <div class="landing-growth" aria-label="Ilustrasi pertumbuhan dari benih menjadi tanaman">
          <div class="landing-growth__sun"></div>
          <div class="landing-growth__stage landing-growth__stage--seed"><span>01</span><Sprout :size="24" aria-hidden="true" /><small>Mulai</small></div>
          <div class="landing-growth__stage landing-growth__stage--sprout"><span>02</span><Sprout :size="38" aria-hidden="true" /><small>Rawat</small></div>
          <div class="landing-growth__stage landing-growth__stage--tree"><span>03</span><TreePine :size="54" aria-hidden="true" /><small>Tumbuh</small></div>
          <div class="landing-growth__ground"></div>
          <p>Setiap kebiasaan baik tumbuh dari satu langkah kecil.</p>
        </div>
      </section>

      <section id="cara-kerja" class="landing-section landing-how">
        <div class="landing-container">
          <div class="landing-section-heading">
            <span class="landing-eyebrow">HOW IT WORKS</span>
            <h2>Mulai dari satu aksi.<br /><span>Bangun kebiasaan yang lebih baik.</span></h2>
            <p>Perjalananmu terdiri dari langkah-langkah kecil yang mudah diikuti.</p>
          </div>
          <div class="landing-steps">
            <article v-for="(step, index) in steps" :key="step.title" class="landing-step">
              <div class="landing-step__number">0{{ index + 1 }}</div>
              <div class="landing-step__visual">
                <component :is="step.icon" :size="25" aria-hidden="true" />
                <template v-if="index === 2"><span class="landing-step__xp">+ XP</span></template>
                <template v-else-if="index === 1"><span class="landing-step__check"><Check :size="11" aria-hidden="true" /></span></template>
                <template v-else-if="index === 3"><span class="landing-step__chart"></span></template>
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <ArrowRight v-if="index < steps.length - 1" class="landing-step__arrow" :size="18" aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>

      <section id="produk" class="landing-section landing-showcase landing-container">
        <div class="landing-section-heading">
          <span class="landing-eyebrow">YOUR GREEN JOURNEY</span>
          <h2>Semua progres baikmu,<br /><span>dalam satu dashboard.</span></h2>
          <p>Pantau misi, kumpulkan pengalaman, dan lihat perkembangan aksimu dalam satu tempat.</p>
        </div>
        <DashboardPreview />
        <div class="landing-showcase__features">
          <article v-for="feature in dashboardFeatures" :key="feature.title" class="landing-feature">
            <span><component :is="feature.icon" :size="19" aria-hidden="true" /></span>
            <div><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div>
          </article>
        </div>
      </section>

      <section id="misi" class="landing-section landing-missions">
        <div class="landing-container">
          <div class="landing-section-heading landing-section-heading--split">
            <div>
              <span class="landing-eyebrow">YOUR NEXT QUEST</span>
              <h2>Jadikan aksi sehari-hari<br /><span>sebagai pencapaian.</span></h2>
            </div>
            <p>Contoh misi dari katalog EcoQuest. Pilih aktivitas sederhana, selesaikan langkahnya, dan kumpulkan XP.</p>
          </div>
          <div class="landing-mission-grid">
            <RouterLink
              v-for="(mission, index) in missions"
              :key="mission.title"
              class="landing-mission-card"
              :class="`landing-mission-card--${index + 1}`"
              to="/missions"
            >
              <span class="landing-mission-card__icon"><component :is="mission.icon" :size="20" aria-hidden="true" /></span>
              <span class="landing-mission-card__reward">+{{ mission.xp }} XP</span>
              <span class="landing-mission-card__category">{{ mission.category }}</span>
              <h3>{{ mission.title }}</h3>
              <p>{{ mission.description }}</p>
              <span class="landing-mission-card__link">Jelajahi misi <ArrowUpRight :size="15" aria-hidden="true" /></span>
            </RouterLink>
          </div>
          <p class="landing-footnote"><Info :size="14" aria-hidden="true" /> Contoh misi dan XP diambil dari katalog aplikasi. Progress belum dimulai.</p>
        </div>
      </section>

      <section id="dampak" class="landing-section landing-impact landing-container">
        <div class="landing-impact__copy">
          <span class="landing-eyebrow">MEASURE WHAT MATTERS</span>
          <h2>Setiap aksi punya cerita.<br /><span>Lihat dampaknya.</span></h2>
          <p>
            EcoQuest merangkum aktivitas yang kamu catat menjadi metrik lingkungan yang
            mudah dipahami. Nilai aktual bergantung pada aktivitas dan aturan perhitungan
            yang digunakan aplikasi.
          </p>
          <RouterLink class="landing-text-link" to="/impact">Lihat pelacakan dampak <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
        </div>
        <div class="landing-impact__visual">
          <div class="landing-impact__topline"><span><ChartNoAxesCombined :size="16" aria-hidden="true" /> Ringkasan dampak</span><span class="landing-preview-tag">PRATINJAU</span></div>
          <div class="landing-impact__number"><strong>0</strong><span>aktivitas dicatat</span></div>
          <div class="landing-impact__chart" aria-label="Grafik ilustratif tanpa data aktivitas">
            <svg viewBox="0 0 500 112" role="img" aria-label="Grafik datar, belum ada data aktivitas">
              <path d="M0 85H500M0 55H500M0 25H500" stroke="#E8F0E9" stroke-dasharray="4 5" />
              <path d="M0 92C65 92 77 92 126 92S203 92 250 92s80 0 124 0 78 0 126 0" fill="none" stroke="#93CFA3" stroke-width="3" stroke-linecap="round" />
              <circle cx="250" cy="92" r="4" fill="#16834B" />
            </svg>
            <div><span>Aktivitas yang kamu catat akan muncul di sini</span></div>
          </div>
          <div class="landing-impact__metrics">
            <div><span class="landing-impact__metric-icon"><Cloud :size="16" aria-hidden="true" /></span><small>CO₂ dihemat</small><strong>0 kg</strong></div>
            <div><span class="landing-impact__metric-icon landing-impact__metric-icon--blue"><Recycle :size="16" aria-hidden="true" /></span><small>Sampah didaur ulang</small><strong>0 kg</strong></div>
            <div><span class="landing-impact__metric-icon landing-impact__metric-icon--aqua"><Droplets :size="16" aria-hidden="true" /></span><small>Air dihemat</small><strong>—</strong></div>
            <div><span class="landing-impact__metric-icon landing-impact__metric-icon--gold"><Footprints :size="16" aria-hidden="true" /></span><small>Jarak ramah lingkungan</small><strong>—</strong></div>
          </div>
          <p class="landing-impact__note">Tampilan contoh pengguna baru. Nilai aktual dihitung dari aktivitas yang dicatat.</p>
        </div>
      </section>

      <section class="landing-section landing-rewards">
        <div class="landing-container">
          <div class="landing-section-heading">
            <span class="landing-eyebrow">MAKE GOOD HABITS REWARDING</span>
            <h2>Progres kecil.<br /><span>Pencapaian baru.</span></h2>
            <p>XP dan reward terhubung dengan misi yang kamu selesaikan di EcoQuest.</p>
          </div>
          <div class="landing-rewards__layout">
            <div class="landing-xp-card">
              <div class="landing-xp-card__header"><span><Zap :size="17" aria-hidden="true" /> PROGRES LEVEL</span><span>PREVIEW</span></div>
              <div class="landing-xp-card__level"><div class="landing-xp-card__badge"><Sprout :size="27" aria-hidden="true" /></div><div><small>LEVEL 1</small><strong>Eco Explorer</strong></div><div class="landing-xp-card__xp"><strong>0 <small>XP</small></strong><span>/ 500 XP</span></div></div>
              <div class="landing-progress landing-progress--large"><span style="width: 8%"></span></div>
              <div class="landing-xp-card__foot"><span>Level berikutnya</span><span>500 XP</span></div>
            </div>
            <div class="landing-streak-card">
              <span class="landing-streak-card__icon"><Flame :size="22" aria-hidden="true" /></span>
              <span class="landing-eyebrow">STREAK HARIAN</span>
              <strong>0 <small>hari</small></strong>
              <p>Catat satu aksi hari ini untuk memulai streak.</p>
              <div class="landing-streak-days"><span v-for="day in streakDays" :key="day">{{ day }}</span></div>
            </div>
            <div class="landing-achievement-card">
              <div class="landing-achievement-card__badge"><Trophy :size="25" aria-hidden="true" /></div>
              <div><span class="landing-eyebrow">PENCAPAIAN</span><h3>Langkah Pertama</h3><p>Selesaikan misi pertamamu untuk membuka pencapaian.</p></div>
              <div class="landing-achievement-card__progress"><span></span></div>
              <small>0 / 1 misi</small>
            </div>
            <div class="landing-rewards__note">
              <span><Gift :size="17" aria-hidden="true" /></span>
              <div><strong>Hadiah untuk setiap usaha</strong><p>Jelajahi katalog reward dan raih posisi di leaderboard komunitas.</p></div>
              <ArrowUpRight :size="16" aria-hidden="true" />
            </div>
          </div>
          <p class="landing-footnote"><Info :size="14" aria-hidden="true" /> Semua angka di bagian ini adalah nilai ilustratif untuk pengguna baru.</p>
        </div>
      </section>

      <section id="komunitas" class="landing-section landing-community landing-container">
        <div class="landing-community__copy">
          <span class="landing-eyebrow">GROW TOGETHER</span>
          <h2>Aksi baik lebih berarti<br /><span>saat dilakukan bersama.</span></h2>
          <p>
            Bagikan perjalanan ramah lingkunganmu, temukan inspirasi dari pengguna lain,
            dan bangun kebiasaan baik bersama komunitas.
          </p>
          <RouterLink class="landing-text-link" to="/community">Jelajahi komunitas <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
        </div>
        <div class="landing-community__feed">
          <div class="landing-community__feed-head"><strong><Users :size="17" aria-hidden="true" /> Aktivitas komunitas</strong><span>CONTOH</span></div>
          <article v-for="post in communityExamples" :key="post.action" class="landing-post">
            <span class="landing-post__avatar"><component :is="post.icon" :size="17" aria-hidden="true" /></span>
            <div class="landing-post__body"><div><strong>{{ post.action }}</strong><small>Contoh aktivitas</small></div><p>{{ post.caption }}</p><span class="landing-post__meta">{{ post.category }}</span></div>
            <Heart :size="16" class="landing-post__heart" aria-hidden="true" />
          </article>
          <p class="landing-community__disclaimer">Kartu ini adalah contoh UI, bukan postingan pengguna sungguhan.</p>
        </div>
      </section>

      <section class="landing-cta">
        <div class="landing-cta__orb"></div>
        <div class="landing-container landing-cta__inner">
          <div class="landing-cta__sprout"><Sprout :size="37" aria-hidden="true" /></div>
          <span class="landing-eyebrow">MULAI DARI LANGKAH KECIL</span>
          <h2>Perubahan besar dimulai<br />dari langkah kecil.</h2>
          <p>Mulai perjalanan ramah lingkunganmu bersama EcoQuest dan jadikan setiap aksi sebagai progres yang berarti.</p>
          <div class="landing-cta__actions">
            <RouterLink class="landing-button" to="/register">Mulai Sekarang <ArrowRight :size="17" aria-hidden="true" /></RouterLink>
            <a class="landing-button landing-button--light" href="#cara-kerja">Pelajari Cara Kerjanya</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="landing-footer">
      <div class="landing-container">
        <div class="landing-footer__main">
          <div class="landing-footer__brand">
            <a class="landing-brand" href="#top"><span class="landing-brand__icon"><Leaf :size="19" aria-hidden="true" /></span><span class="landing-brand__name">EcoQuest</span></a>
            <p>Ubah kebiasaan ramah lingkungan menjadi perjalanan yang bermakna.</p>
          </div>
          <div class="landing-footer__links"><strong>Jelajahi</strong><a href="#cara-kerja">Cara Kerja</a><a href="#misi">Misi</a><a href="#dampak">Dampak</a><a href="#komunitas">Komunitas</a></div>
          <div class="landing-footer__links"><strong>Mulai</strong><RouterLink to="/login">Masuk</RouterLink><RouterLink to="/register">Buat akun</RouterLink><a href="https://ecoquest-delta.vercel.app/" target="_blank" rel="noreferrer">Aplikasi EcoQuest <ArrowUpRight :size="13" aria-hidden="true" /></a></div>
          <a class="landing-github" href="https://github.com/dafzX/ecoquest.git" target="_blank" rel="noreferrer"><Github :size="17" aria-hidden="true" /> Lihat di GitHub <ArrowUpRight :size="14" aria-hidden="true" /></a>
        </div>
        <div class="landing-footer__bottom"><span>© 2026 EcoQuest</span><span>Dibangun untuk masa depan yang lebih hijau <Sprout :size="14" aria-hidden="true" /></span></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  ChartNoAxesCombined,
  CirclePlay,
  Cloud,
  Droplets,
  Flame,
  Footprints,
  Gift,
  Github,
  Heart,
  Info,
  Leaf,
  Lightbulb,
  Recycle,
  Sprout,
  TreePine,
  Trophy,
  Users,
  Zap
} from 'lucide-vue-next'
import DashboardPreview from '@/components/landing/DashboardPreview.vue'
import EcoSystemScene from '@/components/landing/EcoSystemScene.vue'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'

const page = ref(null)
let revealObserver

const pillars = [
  { label: 'Misi & Tantangan', icon: Recycle },
  { label: 'XP & Pencapaian', icon: Trophy },
  { label: 'Pelacak Dampak', icon: Sprout },
  { label: 'Komunitas', icon: Users }
]

const steps = [
  { title: 'Pilih Misi', description: 'Temukan misi yang sesuai dengan aktivitas sehari-harimu.', icon: Recycle },
  { title: 'Lakukan Aksi', description: 'Mulai dari mendaur ulang hingga memilih transportasi yang lebih ramah lingkungan.', icon: Check },
  { title: 'Kumpulkan XP', description: 'Selesaikan misi, tingkatkan level, dan pertahankan streak.', icon: Zap },
  { title: 'Lacak Dampak', description: 'Lihat ringkasan aktivitas dan metrik lingkunganmu.', icon: ChartNoAxesCombined }
]

const dashboardFeatures = [
  { title: 'Lacak progresmu', description: 'Pantau XP, level, streak, dan pencapaianmu.', icon: ChartNoAxesCombined },
  { title: 'Pahami dampakmu', description: 'Lihat metrik dari aktivitas yang kamu catat.', icon: Cloud },
  { title: 'Terus bergerak', description: 'Temukan misi berikutnya dan lanjutkan kebiasaan baikmu.', icon: Sprout }
]

const missions = [
  { title: 'Daur Ulang 5 Botol Plastik', description: 'Kumpulkan dan daur ulang setidaknya 5 botol plastik hari ini.', category: 'Daur Ulang', xp: 50, icon: Recycle },
  { title: 'Jalan Kaki atau Bersepeda Hari Ini', description: 'Pilih berjalan kaki atau bersepeda daripada menggunakan kendaraan.', category: 'Transportasi', xp: 75, icon: Bike },
  { title: 'Hemat Energi di Rumah', description: 'Matikan lampu dan perangkat elektronik yang sedang tidak digunakan.', category: 'Energi', xp: 40, icon: Lightbulb },
  { title: 'Kurangi Sampah Plastik', description: 'Gunakan tas belanja kain dan hindari produk sekali pakai.', category: 'Sampah', xp: 60, icon: Recycle }
]

const streakDays = ['S', 'S', 'R', 'K', 'J', 'S', 'M']

const communityExamples = [
  { action: 'Membawa botol minum', caption: 'Satu langkah sederhana yang bisa diulang setiap hari.', category: 'Kebiasaan hijau', icon: Droplets },
  { action: 'Memilah sampah daur ulang', caption: 'Pisahkan sampah agar lebih mudah dikelola.', category: 'Daur ulang', icon: Recycle },
  { action: 'Memilih bersepeda', caption: 'Untuk perjalanan singkat, coba tinggalkan kendaraan.', category: 'Transportasi', icon: Bike }
]

onMounted(() => {
  const sections = [...(page.value?.querySelectorAll('main > section:not(.landing-hero)') ?? [])]
  if (!sections.length) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  const viewportHeight = window.innerHeight
  sections.forEach((section) => {
    section.classList.add('landing-section-reveal')
    const bounds = section.getBoundingClientRect()
    if (bounds.top < viewportHeight && bounds.bottom > 0) section.classList.add('is-visible')
  })

  page.value.setAttribute('data-motion-pending', '')
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    })
  }, {
    rootMargin: '0px',
    threshold: 0
  })

  page.value.setAttribute('data-motion-ready', '')
  sections
    .filter((section) => !section.classList.contains('is-visible'))
    .forEach((section) => revealObserver.observe(section))
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => page.value?.removeAttribute('data-motion-pending'))
  })
})

onUnmounted(() => {
  revealObserver?.disconnect()
})
</script>
