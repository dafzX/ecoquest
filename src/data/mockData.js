export const user = {
  name: 'Dafa',
  level: 5,
  levelName: 'Eco Explorer',
  xp: 1240,
  nextLevelXp: 1600,
  streak: 7,
  avatar: 'D'
}

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