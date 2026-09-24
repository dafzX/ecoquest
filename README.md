# EcoQuest

EcoQuest adalah web app gamifikasi aksi ramah lingkungan. Pengguna dapat
menyelesaikan misi, mengikuti challenge, mengumpulkan XP, melihat dampak,
menukar reward, dan berbagi aksi bersama komunitas.

## Menjalankan Project

Install dependency:

```sh
pnpm install
```

Jalankan frontend:

```sh
pnpm dev
```

Jalankan backend pada terminal lain:

```sh
node server/index.js
```

Build production:

```sh
pnpm build
```

Frontend menggunakan Vue 3, Vite, Vue Router, Tailwind CSS, dan lucide-vue-next.
Backend prototype menggunakan Express dengan data lokal pada `server/data`.
