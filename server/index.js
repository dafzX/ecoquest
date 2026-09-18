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

app.use(cors())
app.use(express.json())

async function getData() {
  const file = await fs.readFile(usersFile, 'utf8')
  return JSON.parse(file)
}

async function getMissionsData() {
  const file = await fs.readFile(missionsFile, 'utf8')
  return JSON.parse(file)
}

async function saveData(data) {
  await fs.writeFile(usersFile, JSON.stringify(data, null, 2))
}

app.get('/api/health', (req, res) => {
  res.json({ message: 'EcoQuest API berjalan' })
})

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    xp: user.xp || 0,
    level: user.level || 1,
    streak: user.streak || 0,
    completedMissionIds: user.completedMissionIds || []
  }
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  const data = await getData()

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

  const data = await getData()

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
    completedMissionIds: []
  }

  data.users.push(newUser)
  await saveData(data)

  res.json({
    success: true,
    user: publicUser(newUser)
  })
})

app.post('/api/missions/:missionId/complete', async (req, res) => {
  const userId = Number(req.body.userId)
  const missionId = Number(req.params.missionId)

  const data = await getData()
  const missionData = await getMissionsData()

  const user = data.users.find((item) => item.id === userId)
  const mission = missionData.missions.find(
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
    yesterday.setDate(yesterday.getDate() - 1)

    const yesterdayDate = yesterday.toISOString().slice(0, 10)

    user.streak =
      lastCompletedDate === yesterdayDate
        ? user.streak + 1
        : 1

    user.lastCompletedDate = today
  }

  user.xp += mission.xp
  user.level = Math.floor(user.xp / 500) + 1
  user.completedMissionIds.push(missionId)

  await saveData(data)

  res.json({
    success: true,
    message: `Mission selesai! Kamu mendapat ${mission.xp} XP.`,
    user: publicUser(user)
  })
})

app.listen(PORT, () => {
  console.log(`Backend aktif di http://localhost:${PORT}`)
})