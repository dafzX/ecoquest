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

Untuk local development tanpa Supabase, backend JSON lokal bisa dijalankan pada terminal lain:

```sh
node server/index.js
```

Build production:

```sh
pnpm build
```

Frontend menggunakan Vue 3, Vite, Vue Router, Tailwind CSS, dan lucide-vue-next.

## Supabase dan Vercel

1. Buat project Supabase, lalu jalankan isi `supabase/schema.sql` di SQL Editor.
2. Salin `.env.example` menjadi `.env`, lalu isi URL, anon key, dan service role key dari Project Settings > API.
3. Pastikan email confirmation dinonaktifkan di Supabase Auth agar registrasi prototype langsung bisa dipakai.
4. Jalankan migrasi sekali dari root project:

```sh
pnpm migrate:supabase
```

Migrasi memindahkan akun dari `server/data/users.json` ke Supabase Auth dan
menyimpan profile, community, missions, rewards, serta challenges ke tabel
`app_data`. Password akun lama tidak disimpan di tabel tersebut.

Untuk memperbarui katalog tanpa menimpa progress pengguna, jalankan:

```sh
pnpm sync:catalogs
```

Untuk menjalankan backend lokal dengan Supabase setelah `.env` terisi, gunakan
`pnpm dev:api` sebagai pengganti `node server/index.js`.

5. Import repository ke Vercel dan tambahkan `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
   serta `SUPABASE_SERVICE_ROLE_KEY` pada Environment Variables project Vercel.
6. Deploy. API berada di `/api/*`; frontend menggunakan path relatif, jadi tidak
   perlu URL localhost di production.

Jangan pernah menambahkan `SUPABASE_SERVICE_ROLE_KEY` dengan prefix `VITE_` atau
menaruhnya di kode frontend. Untuk deadline/prototype, dokumen disimpan sebagai
JSONB supaya kontrak API lama tetap kompatibel. Untuk pemakaian production,
gunakan tabel relasional dan validasi JWT/Row Level Security per pengguna.
