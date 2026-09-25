import express from 'express'
import cors from 'cors'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersFile = path.join(__dirname, 'data', 'users.json')
const missionsFile = path.join(__dirname, 'data', 'missions.json')
const rewardsFile = path.join(__dirname, 'data', 'rewards.json')
const challengesFile = path.join(__dirname, 'data', 'challenges.json')
const communityFile = path.join(__dirname, 'data', 'community.json')

app.use(cors())
app.use(express.json({ limit: '100kb' }))

async function getUsersData() {
  const file = await fs.readFile(usersFile, 'utf8')
  return JSON.parse(file)
}

async function saveUsersData(data) {
  await fs.writeFile(
    usersFile,
    JSON.stringify(data, null, 2)
  )
}

async function getMissionsData() {
  const file = await fs.readFile(missionsFile, 'utf8')
  return JSON.parse(file)
}

async function getRewardsData() {
  const file = await fs.readFile(rewardsFile, 'utf8')
  return JSON.parse(file)
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    xp: user.xp || 0,
    level: user.level || 1,
    streak: user.streak || 0,
    completedMissionIds: user.completedMissionIds || [],
    redeemedRewardIds: user.redeemedRewardIds || [],
    activities: user.activities || []
  }
}

async function getChallengesData() {
  const file = await fs.readFile(challengesFile, 'utf8')
  return JSON.parse(file)
}

async function getCommunityData() {
  const file = await fs.readFile(communityFile, 'utf8')
  return JSON.parse(file)
}

async function saveCommunityData(data) {
  await fs.writeFile(
    communityFile,
    JSON.stringify(data, null, 2)
  )
}

function getImpactForUser(user) {
  const completedCount = (user.completedMissionIds || []).length
  const activities = user.activities || []

  const missionActivities = activities.filter(
    (activity) => activity.type === 'mission'
  )

  return {
    totalImpact: user.xp || 0,

    monthlyCurrent: missionActivities.reduce(
      (total, activity) => total + Number(activity.xp || 0),
      0
    ),

    monthlyTarget: 500,

    co2Saved: Number(
      (completedCount * 1.2).toFixed(1)
    ),

    wasteReduced: Number(
      (completedCount * 0.8).toFixed(1)
    ),

    waterSaved: completedCount * 15,

    greenDistance: Number(
      (completedCount * 2.5).toFixed(1)
    ),

    treesEquivalent: Number(
      (completedCount / 4).toFixed(1)
    ),

    actions: missionActivities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      type: 'Mission',
      xp: activity.xp,
      date: activity.completedAt
    })),

    breakdown: {
      energy: completedCount ? 25 : 0,
      recycle: completedCount ? 35 : 0,
      transport: completedCount ? 25 : 0,
      plant: completedCount ? 15 : 0
    }
  }
}

/* Health */

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EcoQuest API berjalan'
  })
})

/* Auth */

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  const data = await getUsersData()

  const user = data.users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase().trim() &&
      item.password === password
  )

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email atau password salah.'
    })
  }

  res.json({
    success: true,
    user: publicUser(user)
  })
})

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body

  const normalizedEmail = email.toLowerCase().trim()

  const data = await getUsersData()

  const emailUsed = data.users.some(
    (item) => item.email.toLowerCase() === normalizedEmail
  )

  if (emailUsed) {
    return res.status(409).json({
      success: false,
      message: 'Email sudah terdaftar.'
    })
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    xp: 0,
    level: 1,
    streak: 0,
    completedMissionIds: [],
    redeemedRewardIds: [],
    activities: [],
    settings: {
      pushNotification: true,
      missionReminder: true,
      streakReminder: true,
      darkMode: false,
      language: 'Bahasa Indonesia'
    }
  }

  data.users.push(newUser)

  await saveUsersData(data)

  res.status(201).json({
    success: true,
    user: publicUser(newUser)
  })
})

/* Missions */

app.post('/api/missions/:missionId/complete', async (req, res) => {
  const userId = Number(req.body.userId)
  const missionId = Number(req.params.missionId)

  const usersData = await getUsersData()
  const missionsData = await getMissionsData()

  const user = usersData.users.find(
    (item) => item.id === userId
  )

  const mission = missionsData.missions.find(
    (item) => item.id === missionId
  )

  if (!user || !mission) {
    return res.status(404).json({
      success: false,
      message: 'User atau mission tidak ditemukan.'
    })
  }

  user.xp = user.xp || 0
  user.level = user.level || 1
  user.streak = user.streak || 0
  user.completedMissionIds = user.completedMissionIds || []

  if (user.completedMissionIds.includes(missionId)) {
    return res.status(409).json({
      success: false,
      message: 'Mission ini sudah pernah diselesaikan.'
    })
  }

  const today = new Date().toISOString().slice(0, 10)
  const lastCompletedDate = user.lastCompletedDate

  if (lastCompletedDate !== today) {
    const yesterday = new Date()

    yesterday.setDate(
      yesterday.getDate() - 1
    )

    const yesterdayDate = yesterday
      .toISOString()
      .slice(0, 10)

    user.streak =
      lastCompletedDate === yesterdayDate
        ? user.streak + 1
        : 1

    user.lastCompletedDate = today
  }

  user.xp += mission.xp
  user.level = Math.floor(user.xp / 500) + 1

  user.completedMissionIds.push(
    missionId
  )

  user.activities = user.activities || []

  user.activities.unshift({
    id: Date.now(),
    type: 'mission',
    missionId: mission.id,
    title: mission.title,
    xp: mission.xp,
    completedAt: new Date().toISOString()
  })

  await saveUsersData(usersData)

  res.json({
    success: true,
    message: `Mission selesai! Kamu mendapat ${mission.xp} XP.`,
    user: publicUser(user)
  })
})

/* Users */

app.get('/api/users/:id', async (req, res) => {
  const userId = Number(req.params.id)

  const data = await getUsersData()

  const user = data.users.find(
    (item) => item.id === userId
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.'
    })
  }

  res.json({
    success: true,
    user: publicUser(user)
  })
})

app.put('/api/users/:id', async (req, res) => {
  const userId = Number(req.params.id)
  const { name, email } = req.body

  const data = await getUsersData()

  const user = data.users.find(
    (item) => item.id === userId
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.'
    })
  }

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Nama dan email wajib diisi.'
    })
  }

  const normalizedEmail = email.toLowerCase().trim()

  const emailUsed = data.users.some(
    (item) =>
      item.id !== userId &&
      item.email.toLowerCase() === normalizedEmail
  )

  if (emailUsed) {
    return res.status(409).json({
      success: false,
      message: 'Email sudah digunakan akun lain.'
    })
  }

  user.name = name.trim()
  user.email = normalizedEmail

  await saveUsersData(data)

  res.json({
    success: true,
    message: 'Profil berhasil diperbarui.',
    user: publicUser(user)
  })
})

/* Missions */

app.get('/api/missions', async (req, res) => {
  const data = await getMissionsData()

  res.json({
    success: true,
    missions: data.missions
  })
})

/* Leaderboard */

app.get('/api/leaderboard', async (req, res) => {
  const data = await getUsersData()

  const leaderboard = data.users
    .map(publicUser)
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }))

  res.json({
    success: true,
    leaderboard
  })
})

/* Rewards */

app.get('/api/rewards', async (req, res) => {
  const data = await getRewardsData()

  res.json({
    success: true,
    rewards: data.rewards
  })
})

app.post('/api/rewards/:rewardId/claim', async (req, res) => {
  const userId = Number(req.body.userId)
  const rewardId = Number(req.params.rewardId)

  const usersData = await getUsersData()
  const rewardsData = await getRewardsData()

  const user = usersData.users.find(
    (item) => item.id === userId
  )

  const reward = rewardsData.rewards.find(
    (item) => item.id === rewardId
  )

  if (!user || !reward) {
    return res.status(404).json({
      success: false,
      message: 'User atau reward tidak ditemukan.'
    })
  }

  user.xp = user.xp || 0
  user.redeemedRewardIds =
    user.redeemedRewardIds || []

  if (!reward.available) {
    return res.status(400).json({
      success: false,
      message: 'Reward belum tersedia.'
    })
  }

  if (user.redeemedRewardIds.includes(rewardId)) {
    return res.status(409).json({
      success: false,
      message: 'Reward ini sudah pernah diklaim.'
    })
  }

  if (user.xp < reward.cost) {
    return res.status(400).json({
      success: false,
      message: 'XP kamu belum cukup untuk menukar reward ini.'
    })
  }

  user.xp -= reward.cost

  user.redeemedRewardIds.push(
    rewardId
  )

  await saveUsersData(usersData)

  res.json({
    success: true,
    message: `Reward ${reward.title} berhasil diklaim.`,
    reward,
    user: publicUser(user)
  })
})

/* Activities */

app.get('/api/users/:id/activities', async (req, res) => {
  const userId = Number(req.params.id)

  const data = await getUsersData()

  const user = data.users.find(
    (item) => item.id === userId
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.'
    })
  }

  res.json({
    success: true,
    activities: user.activities || []
  })
})

/* Community */

app.get('/api/community', async (req, res) => {
  const userId = Number(req.query.userId)

  const data = await getCommunityData()
  const usersData = await getUsersData()

  res.json({
    success: true,

    stats: {
      members: usersData.users.length,

      actionsToday: usersData.users.reduce(
        (total, user) =>
          total + (user.activities || []).length,
        0
      ),

      co2Saved: Number(
        (
          usersData.users.reduce(
            (total, user) =>
              total +
              (user.completedMissionIds || []).length,
            0
          ) * 1.2
        ).toFixed(1)
      )
    },

    posts: data.posts.map((post) => ({
      ...post,
      liked: userId
        ? post.likedBy.includes(userId)
        : false
    }))
  })
})

app.post('/api/community/posts', async (req, res) => {
  const userId = Number(req.body.userId)

  const content = String(
    req.body.content || ''
  ).trim()

  const category = String(
    req.body.category || 'Eco Action'
  ).trim()

  const usersData = await getUsersData()

  const user = usersData.users.find(
    (item) => item.id === userId
  )

  if (!user || !content) {
    return res.status(400).json({
      success: false,
      message: 'User dan isi postingan wajib diisi.'
    })
  }

  const data = await getCommunityData()

  const post = {
    id: Date.now(),
    userId: user.id,
    name: user.name,
    avatar: user.name
      .slice(0, 1)
      .toUpperCase(),
    time: 'Baru saja',
    category,
    title: 'Aksi Eco Baru',
    content,
    likes: 0,
    comments: 0,
    impact: 'Aksi ramah lingkungan',
    likedBy: []
  }

  data.posts.unshift(post)

  await saveCommunityData(data)

  res.status(201).json({
    success: true,
    post
  })
})

app.post(
  '/api/community/posts/:postId/like',
  async (req, res) => {
    const userId = Number(req.body.userId)
    const postId = Number(req.params.postId)

    const data = await getCommunityData()

    const post = data.posts.find(
      (item) => item.id === postId
    )

    if (!userId || !post) {
      return res.status(404).json({
        success: false,
        message: 'User atau postingan tidak ditemukan.'
      })
    }

    post.likedBy = post.likedBy || []

    const liked = post.likedBy.includes(
      userId
    )

    post.likedBy = liked
      ? post.likedBy.filter(
          (id) => id !== userId
        )
      : [...post.likedBy, userId]

    post.likes = Math.max(
      0,
      Number(post.likes || 0) +
        (liked ? -1 : 1)
    )

    await saveCommunityData(data)

    res.json({
      success: true,
      post: {
        ...post,
        liked: !liked
      }
    })
  }
)

/* Settings */

app.get(
  '/api/users/:id/settings',
  async (req, res) => {
    const userId = Number(req.params.id)

    const data = await getUsersData()

    const user = data.users.find(
      (item) => item.id === userId
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.'
      })
    }

    res.json({
      success: true,

      settings: {
        pushNotification: true,
        missionReminder: true,
        streakReminder: true,
        darkMode: false,
        language: 'Bahasa Indonesia',
        ...(user.settings || {})
      }
    })
  }
)

app.put(
  '/api/users/:id/settings',
  async (req, res) => {
    const userId = Number(req.params.id)

    const data = await getUsersData()

    const user = data.users.find(
      (item) => item.id === userId
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.'
      })
    }

    const allowedKeys = [
      'pushNotification',
      'missionReminder',
      'streakReminder',
      'darkMode',
      'language'
    ]

    const settings = Object.fromEntries(
      Object.entries(req.body || {}).filter(
        ([key]) => allowedKeys.includes(key)
      )
    )

    user.settings = {
      ...(user.settings || {}),
      ...settings
    }

    await saveUsersData(data)

    res.json({
      success: true,
      message: 'Pengaturan berhasil disimpan.',
      settings: user.settings
    })
  }
)

/* Challenges */

app.get('/api/challenges', async (req, res) => {
  const userId = Number(req.query.userId)

  const challengesData =
    await getChallengesData()

  if (!userId) {
    return res.json({
      success: true,
      challenges:
        challengesData.challenges
    })
  }

  const usersData = await getUsersData()

  const user = usersData.users.find(
    (item) => item.id === userId
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.'
    })
  }

  const progressByChallenge =
    user.challengeProgress || {}

  res.json({
    success: true,

    challenges:
      challengesData.challenges.map(
        (challenge) => ({
          ...challenge,

          joined: Boolean(
            progressByChallenge[
              challenge.id
            ]?.joined
          ),

          completedSteps: Number(
            progressByChallenge[
              challenge.id
            ]?.completedSteps || 0
          )
        })
      )
  })
})

app.post(
  '/api/challenges/:challengeId/join',
  async (req, res) => {
    const userId = Number(req.body.userId)
    const challengeId = Number(
      req.params.challengeId
    )

    const usersData = await getUsersData()
    const challengesData =
      await getChallengesData()

    const user = usersData.users.find(
      (item) => item.id === userId
    )

    const challenge =
      challengesData.challenges.find(
        (item) => item.id === challengeId
      )

    if (!user || !challenge) {
      return res.status(404).json({
        success: false,
        message: 'User atau challenge tidak ditemukan.'
      })
    }

    user.challengeProgress =
      user.challengeProgress || {}

    user.challengeProgress[challengeId] = {
      ...user.challengeProgress[challengeId],

      joined: true,

      completedSteps: Number(
        user.challengeProgress[
          challengeId
        ]?.completedSteps || 0
      )
    }

    await saveUsersData(usersData)

    res.json({
      success: true,
      message: 'Challenge berhasil diikuti.',

      challenge: {
        ...challenge,
        ...user.challengeProgress[
          challengeId
        ]
      }
    })
  }
)

app.post(
  '/api/challenges/:challengeId/steps/complete',
  async (req, res) => {
    const userId = Number(req.body.userId)
    const challengeId = Number(
      req.params.challengeId
    )

    const usersData = await getUsersData()
    const challengesData =
      await getChallengesData()

    const user = usersData.users.find(
      (item) => item.id === userId
    )

    const challenge =
      challengesData.challenges.find(
        (item) => item.id === challengeId
      )

    if (!user || !challenge) {
      return res.status(404).json({
        success: false,
        message: 'User atau challenge tidak ditemukan.'
      })
    }

    user.challengeProgress =
      user.challengeProgress || {}

    const current =
      user.challengeProgress[challengeId]

    if (!current?.joined) {
      return res.status(400).json({
        success: false,
        message: 'Ikuti challenge terlebih dahulu.'
      })
    }

    const totalSteps =
      challenge.steps.length

    const completedSteps = Math.min(
      Number(current.completedSteps || 0) + 1,
      totalSteps
    )

    user.challengeProgress[challengeId] = {
      joined: true,
      completedSteps,
      completed:
        completedSteps === totalSteps
    }

    await saveUsersData(usersData)

    res.json({
      success: true,

      message:
        completedSteps === totalSteps
          ? 'Challenge selesai!'
          : 'Step challenge berhasil diselesaikan.',

      challenge: {
        ...challenge,
        ...user.challengeProgress[
          challengeId
        ]
      }
    })
  }
)

/* Impact */

app.get('/api/impact', async (req, res) => {
  const userId = Number(req.query.userId)

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId wajib diisi.'
    })
  }

  const data = await getUsersData()

  const user = data.users.find(
    (item) => item.id === userId
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User tidak ditemukan.'
    })
  }

  res.json({
    success: true,
    impact: getImpactForUser(user)
  })
})

/* Achievements */

app.get(
  '/api/users/:id/achievements',
  async (req, res) => {
    const userId = Number(req.params.id)

    const data = await getUsersData()

    const user = data.users.find(
      (item) => item.id === userId
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.'
      })
    }

    const completedCount =
      (user.completedMissionIds || []).length

    res.json({
      success: true,

      achievements: [
        {
          id: 1,
          title: 'Langkah Pertama',
          description:
            'Selesaikan misi eco pertamamu.',
          unlocked:
            completedCount >= 1
        },

        {
          id: 2,
          title: 'Eco Pemula',
          description:
            'Capai 100 XP.',
          unlocked:
            (user.xp || 0) >= 100
        },

        {
          id: 3,
          title: 'Streak 7 Hari',
          description:
            'Pertahankan streak selama 7 hari.',
          unlocked:
            (user.streak || 0) >= 7
        }
      ]
    })
  }
)

/* Error Handler */

app.use((error, req, res, next) => {
  console.error(error)

  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.'
  })
})

/* Local Server */

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Backend aktif di http://localhost:${PORT}`)
  })
}

export default app