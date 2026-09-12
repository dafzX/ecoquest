export const user = {
  name: 'Dafa',
  level: 5,
  levelName: 'Eco Explorer',
  xp: 1240,
  nextLevelXp: 1600,
  streak: 7,
  avatar: 'D'
}

// Missions
export const missions = [
  {
    id: 1,
    title: 'Recycle 5 Plastic Bottles',
    description: 'Collect and recycle at least 5 plastic bottles today.',
    category: 'Recycling',
    xp: 50,
    icon: 'recycle',
    completed: false
  },
  {
    id: 2,
    title: 'Walk or Bike Today',
    description: 'Choose walking or cycling instead of using a vehicle.',
    category: 'Transport',
    xp: 75,
    icon: 'bike',
    completed: false
  },
  {
    id: 3,
    title: 'Save Energy at Home',
    description: 'Turn off unused lights and electronic devices.',
    category: 'Energy',
    xp: 40,
    icon: 'energy',
    completed: true
  }
]

export const impact = {
  co2Saved: 24.5,
  wasteRecycled: 18,
  waterSaved: 120,
  treesEquivalent: 3
}

export const achievements = [
  {
    id: 1,
    title: 'First Step',
    description: 'Complete your first eco mission.',
    unlocked: true
  },
  {
    id: 2,
    title: 'Eco Starter',
    description: 'Reach 1,000 XP.',
    unlocked: true
  },
  {
    id: 3,
    title: '7 Day Streak',
    description: 'Maintain a 7 day streak.',
    unlocked: true
  }
]

// Challanges
export const challenges = [
  {
    id: 1,
    title: 'Green Week',
    description: 'Complete eco-friendly actions for 7 days.',
    category: 'Daily Habit',
    progress: 5,
    target: 7,
    xp: 250,
    daysLeft: 3,
    icon: 'leaf',
    active: true
  },
  {
    id: 2,
    title: 'Car-Free Challenge',
    description: 'Use walking, cycling, or public transport for 5 trips.',
    category: 'Transport',
    progress: 3,
    target: 5,
    xp: 300,
    daysLeft: 5,
    icon: 'bike',
    active: true
  },
  {
    id: 3,
    title: 'Zero Waste',
    description: 'Reduce your daily waste through sustainable actions.',
    category: 'Waste',
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

// Impact
export const impactHistory = [
  {
    month: 'Apr',
    co2: 12.4,
    waste: 8,
    water: 45
  },
  {
    month: 'May',
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
    month: 'Aug',
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

export const ecoActions = [
  {
    id: 1,
    title: 'Recycled plastic bottles',
    category: 'Recycling',
    value: '5 bottles',
    impact: '1.2 kg CO₂ saved',
    date: 'Today'
  },
  {
    id: 2,
    title: 'Walked instead of driving',
    category: 'Transport',
    value: '3.2 km',
    impact: '0.8 kg CO₂ saved',
    date: 'Yesterday'
  },
  {
    id: 3,
    title: 'Turned off unused devices',
    category: 'Energy',
    value: '2 hours',
    impact: '0.5 kg CO₂ saved',
    date: 'Yesterday'
  },
  {
    id: 4,
    title: 'Used reusable bottle',
    category: 'Waste',
    value: '1 bottle',
    impact: '0.3 kg CO₂ saved',
    date: '2 days ago'
  }
]

// Rewards
export const rewards = [
  {
    id: 1,
    title: 'Eco Starter Badge',
    description: 'A special badge for your first sustainable milestones.',
    category: 'Digital',
    cost: 300,
    icon: 'badge',
    available: true,
    owned: false
  },
  {
    id: 2,
    title: 'Plant a Tree',
    description: 'Use your XP to support planting one real tree.',
    category: 'Impact',
    cost: 500,
    icon: 'tree',
    available: true,
    owned: false
  },
  {
    id: 3,
    title: 'Reusable Bottle',
    description: 'Redeem this reward for a reusable EcoQuest bottle.',
    category: 'Merchandise',
    cost: 1000,
    icon: 'bottle',
    available: true,
    owned: false
  },
  {
    id: 4,
    title: 'EcoQuest Tote Bag',
    description: 'A reusable tote bag for your everyday activities.',
    category: 'Merchandise',
    cost: 1500,
    icon: 'bag',
    available: true,
    owned: false
  },
  {
    id: 5,
    title: 'Green Explorer Badge',
    description: 'Exclusive badge for active environmental explorers.',
    category: 'Digital',
    cost: 800,
    icon: 'leaf',
    available: true,
    owned: false
  },
  {
    id: 6,
    title: 'Eco Champion',
    description: 'A special reward for reaching advanced milestones.',
    category: 'Digital',
    cost: 2000,
    icon: 'trophy',
    available: false,
    owned: false
  }
]

export const redeemedRewards = [
  {
    id: 101,
    title: 'First Eco Badge',
    date: 'Aug 28, 2026',
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
    time: '12 min ago',
    category: 'Recycling',
    title: 'Recycled my plastic bottles today ♻️',
    content: 'Managed to collect and recycle 8 plastic bottles today. Small action, but it feels good to keep them out of the landfill!',
    likes: 24,
    comments: 6,
    liked: false,
    impact: '1.8 kg CO₂ saved'
  },
  {
    id: 2,
    name: 'Andi',
    avatar: 'A',
    time: '1 hour ago',
    category: 'Transport',
    title: 'Bike ride instead of driving 🚲',
    content: 'Took my bike to work today. The weather was great and I got some exercise along the way.',
    likes: 18,
    comments: 4,
    liked: false,
    impact: '2.4 kg CO₂ saved'
  },
  {
    id: 3,
    name: 'Rina',
    avatar: 'R',
    time: '3 hours ago',
    category: 'Energy',
    title: 'Saving energy at home 💡',
    content: 'Turned off unnecessary lights and unplugged devices before leaving home. Trying to make this a daily habit!',
    likes: 31,
    comments: 8,
    liked: false,
    impact: '0.9 kg CO₂ saved'
  },
  {
    id: 4,
    name: 'Fajar',
    avatar: 'F',
    time: 'Yesterday',
    category: 'Waste',
    title: 'No plastic cup today 🌱',
    content: 'Brought my reusable bottle and coffee cup everywhere today. No single-use cups needed!',
    likes: 15,
    comments: 3,
    liked: false,
    impact: '0.5 kg waste avoided'
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
  joinedDate: 'August 2026'
}

export const profileActivity = [
  {
    id: 1,
    title: 'Completed Recycle 5 Plastic Bottles',
    type: 'Mission',
    xp: 50,
    date: 'Today'
  },
  {
    id: 2,
    title: 'Completed Green Week challenge',
    type: 'Challenge',
    xp: 250,
    date: 'Yesterday'
  },
  {
    id: 3,
    title: 'Recorded Bike to Work',
    type: 'Eco Action',
    xp: 75,
    date: 'Yesterday'
  },
  {
    id: 4,
    title: 'Redeemed First Eco Badge',
    type: 'Reward',
    xp: -250,
    date: 'Aug 28, 2026'
  }
]