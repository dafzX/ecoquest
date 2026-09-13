export const user = {
  name: 'Dafa',
  level: 5,
  levelName: 'Penjelajah Eco',
  xp: 1240,
  nextLevelXp: 1600,
  streak: 7,
  avatar: 'D'
}

// Missions
export const missions = [
  {
    id: 1,
    title: 'Daur Ulang 5 Botol Plastik',
    description: 'Kumpulkan dan daur ulang setidaknya 5 botol plastik hari ini.',
    category: 'Daur Ulang',
    xp: 50,
    icon: 'recycle',
    completed: false
  },

  {
    id: 2,
    title: 'Jalan Kaki atau Bersepeda Hari Ini',
    description: 'Pilih berjalan kaki atau bersepeda daripada menggunakan kendaraan.',
    category: 'Transportasi',
    xp: 75,
    icon: 'bike',
    completed: false
  },

  {
    id: 3,
    title: 'Hemat Energi di Rumah',
    description: 'Matikan lampu dan perangkat elektronik yang sedang tidak digunakan.',
    category: 'Energi',
    xp: 40,
    icon: 'energy',
    completed: true
  }
]

// Impact
export const impact = {
  co2Saved: 24.5,
  wasteRecycled: 18,
  waterSaved: 120,
  treesEquivalent: 3
}

// Achievements
export const achievements = [
  {
    id: 1,
    title: 'Langkah Pertama',
    description: 'Selesaikan misi eco pertamamu.',
    unlocked: true
  },

  {
    id: 2,
    title: 'Eco Pemula',
    description: 'Capai 1.000 XP.',
    unlocked: true
  },

  {
    id: 3,
    title: 'Streak 7 Hari',
    description: 'Pertahankan streak selama 7 hari.',
    unlocked: true
  }
]

// Challenges
export const challenges = [
  {
    id: 1,
    title: 'Minggu Hijau',
    description: 'Lakukan aksi ramah lingkungan selama 7 hari.',
    category: 'Kebiasaan Harian',
    progress: 5,
    target: 7,
    xp: 250,
    daysLeft: 3,
    icon: 'leaf',
    active: true
  },

  {
    id: 2,
    title: 'Tantangan Bebas Mobil',
    description: 'Gunakan jalan kaki, sepeda, atau transportasi umum untuk 5 perjalanan.',
    category: 'Transportasi',
    progress: 3,
    target: 5,
    xp: 300,
    daysLeft: 5,
    icon: 'bike',
    active: true
  },

  {
    id: 3,
    title: 'Nol Sampah',
    description: 'Kurangi sampah harian melalui berbagai aksi berkelanjutan.',
    category: 'Sampah',
    progress: 12,
    target: 20,
    xp: 200,
    daysLeft: 7,
    icon: 'recycle',
    active: true
  }
]

// Leaderboard
export const leaderboard = [
  {
    rank: 1,
    name: 'Sinta',
    level: 7,
    xp: 2450,
    avatar: 'S',
    change: 1
  },

  {
    rank: 2,
    name: 'Andi',
    level: 6,
    xp: 1820,
    avatar: 'A',
    change: 2
  },

  {
    rank: 3,
    name: 'Budi',
    level: 6,
    xp: 1650,
    avatar: 'B',
    change: -1
  },

  {
    rank: 4,
    name: 'Rina',
    level: 6,
    xp: 1580,
    avatar: 'R',
    change: 3
  },

  {
    rank: 5,
    name: 'Fajar',
    level: 5,
    xp: 1490,
    avatar: 'F',
    change: 1
  },

  {
    rank: 6,
    name: 'Nadia',
    level: 5,
    xp: 1420,
    avatar: 'N',
    change: -2
  },

  {
    rank: 7,
    name: 'Rizky',
    level: 5,
    xp: 1380,
    avatar: 'R',
    change: 1
  },

  {
    rank: 8,
    name: 'Alya',
    level: 5,
    xp: 1340,
    avatar: 'A',
    change: 0
  },

  {
    rank: 9,
    name: 'Dimas',
    level: 5,
    xp: 1300,
    avatar: 'D',
    change: -1
  },

  {
    rank: 10,
    name: 'Nanda',
    level: 5,
    xp: 1270,
    avatar: 'N',
    change: 2
  },

  {
    rank: 11,
    name: 'Rafi',
    level: 5,
    xp: 1260,
    avatar: 'R',
    change: 1
  },

  {
    rank: 12,
    name: 'Dafa',
    level: 5,
    xp: 1240,
    avatar: 'D',
    change: 2,
    isCurrentUser: true
  }
]

// Impact History
export const impactHistory = [
  {
    month: 'Apr',
    co2: 12.4,
    waste: 8,
    water: 45
  },

  {
    month: 'Mei',
    co2: 15.8,
    waste: 11,
    water: 68
  },

  {
    month: 'Jun',
    co2: 18.2,
    waste: 13,
    water: 82
  },

  {
    month: 'Jul',
    co2: 20.1,
    waste: 15,
    water: 96
  },

  {
    month: 'Agu',
    co2: 22.8,
    waste: 17,
    water: 108
  },

  {
    month: 'Sep',
    co2: 24.5,
    waste: 18,
    water: 120
  }
]

// Eco Actions
export const ecoActions = [
  {
    id: 1,
    title: 'Mendaur ulang botol plastik',
    category: 'Daur Ulang',
    value: '5 botol',
    impact: '1,2 kg CO₂ tersimpan',
    date: 'Hari ini'
  },

  {
    id: 2,
    title: 'Berjalan kaki daripada berkendara',
    category: 'Transportasi',
    value: '3,2 km',
    impact: '0,8 kg CO₂ tersimpan',
    date: 'Kemarin'
  },

  {
    id: 3,
    title: 'Mematikan perangkat yang tidak digunakan',
    category: 'Energi',
    value: '2 jam',
    impact: '0,5 kg CO₂ tersimpan',
    date: 'Kemarin'
  },

  {
    id: 4,
    title: 'Menggunakan botol minum reusable',
    category: 'Sampah',
    value: '1 botol',
    impact: '0,3 kg CO₂ tersimpan',
    date: '2 hari lalu'
  }
]

// Rewards
export const rewards = [
  {
    id: 1,
    title: 'Lencana Eco Pemula',
    description: 'Lencana khusus untuk pencapaian ramah lingkungan pertamamu.',
    category: 'Digital',
    cost: 300,
    icon: 'badge',
    available: true,
    owned: false
  },

  {
    id: 2,
    title: 'Tanam Satu Pohon',
    description: 'Gunakan XP-mu untuk mendukung penanaman satu pohon nyata.',
    category: 'Dampak',
    cost: 500,
    icon: 'tree',
    available: true,
    owned: false
  },

  {
    id: 3,
    title: 'Botol Minum Reusable',
    description: 'Tukarkan reward ini dengan botol minum reusable EcoQuest.',
    category: 'Merchandise',
    cost: 1000,
    icon: 'bottle',
    available: true,
    owned: false
  },

  {
    id: 4,
    title: 'Tas EcoQuest',
    description: 'Tas reusable untuk menemani aktivitas sehari-harimu.',
    category: 'Merchandise',
    cost: 1500,
    icon: 'bag',
    available: true,
    owned: false
  },

  {
    id: 5,
    title: 'Lencana Penjelajah Hijau',
    description: 'Lencana eksklusif untuk para penjelajah lingkungan yang aktif.',
    category: 'Digital',
    cost: 800,
    icon: 'leaf',
    available: true,
    owned: false
  },

  {
    id: 6,
    title: 'Eco Champion',
    description: 'Reward khusus untuk pengguna yang mencapai pencapaian tingkat lanjut.',
    category: 'Digital',
    cost: 2000,
    icon: 'trophy',
    available: false,
    owned: false
  }
]

// Redeemed Rewards
export const redeemedRewards = [
  {
    id: 101,
    title: 'Lencana Eco Pertama',
    date: '28 Agu 2026',
    cost: 250,
    icon: 'badge'
  }
]

// Community
export const communityPosts = [
  {
    id: 1,
    name: 'Sinta',
    avatar: 'S',
    time: '12 menit lalu',
    category: 'Daur Ulang',
    title: 'Hari ini aku mendaur ulang botol plastik ♻️',
    content:
      'Berhasil mengumpulkan dan mendaur ulang 8 botol plastik hari ini. Aksi kecil, tapi rasanya menyenangkan karena botol-botol tersebut tidak berakhir di tempat pembuangan sampah!',
    likes: 24,
    comments: 6,
    liked: false,
    impact: '1,8 kg CO₂ tersimpan'
  },

  {
    id: 2,
    name: 'Andi',
    avatar: 'A',
    time: '1 jam lalu',
    category: 'Transportasi',
    title: 'Bersepeda daripada berkendara 🚲',
    content:
      'Hari ini aku menggunakan sepeda untuk pergi bekerja. Cuacanya bagus dan sekalian bisa berolahraga.',
    likes: 18,
    comments: 4,
    liked: false,
    impact: '2,4 kg CO₂ tersimpan'
  },

  {
    id: 3,
    name: 'Rina',
    avatar: 'R',
    time: '3 jam lalu',
    category: 'Energi',
    title: 'Menghemat energi di rumah 💡',
    content:
      'Mematikan lampu yang tidak diperlukan dan mencabut perangkat sebelum meninggalkan rumah. Aku sedang mencoba menjadikannya kebiasaan setiap hari!',
    likes: 31,
    comments: 8,
    liked: false,
    impact: '0,9 kg CO₂ tersimpan'
  },

  {
    id: 4,
    name: 'Fajar',
    avatar: 'F',
    time: 'Kemarin',
    category: 'Sampah',
    title: 'Tidak menggunakan gelas plastik hari ini 🌱',
    content:
      'Membawa botol minum dan gelas kopi reusable ke mana pun hari ini. Tidak perlu menggunakan gelas sekali pakai!',
    likes: 15,
    comments: 3,
    liked: false,
    impact: '0,5 kg sampah berkurang'
  }
]

export const communityStats = {
  members: 1284,
  actionsToday: 342,
  co2Saved: 486.7
}

// Profile
export const profileStats = {
  missionsCompleted: 18,
  challengesCompleted: 6,
  totalEcoActions: 42,
  joinedDate: 'Agustus 2026'
}

export const profileActivity = [
  {
    id: 1,
    title: 'Menyelesaikan Daur Ulang 5 Botol Plastik',
    type: 'Misi',
    xp: 50,
    date: 'Hari ini'
  },

  {
    id: 2,
    title: 'Menyelesaikan tantangan Minggu Hijau',
    type: 'Tantangan',
    xp: 250,
    date: 'Kemarin'
  },

  {
    id: 3,
    title: 'Mencatat aksi Bersepeda ke Kantor',
    type: 'Aksi Eco',
    xp: 75,
    date: 'Kemarin'
  },

  {
    id: 4,
    title: 'Menukarkan Lencana Eco Pertama',
    type: 'Reward',
    xp: -250,
    date: '28 Agu 2026'
  }
]