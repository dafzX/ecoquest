import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDirectory = path.join(root, 'server', 'data')
const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.')
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function readJson(filename) {
  return JSON.parse(
    await fs.readFile(path.join(dataDirectory, filename), 'utf8')
  )
}

async function loadAuthUsers() {
  const users = []
  let page = 1

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000
    })

    if (error) throw error
    users.push(...data.users)
    if (data.users.length < 1000) return users
    page += 1
  }
}

const usersData = await readJson('users.json')
const communityData = await readJson('community.json')
const missionsData = await readJson('missions.json')
const rewardsData = await readJson('rewards.json')
const challengesData = await readJson('challenges.json')
const existingAuthUsers = await loadAuthUsers()

for (const user of usersData.users) {
  const email = user.email.trim().toLowerCase()
  let authUser = existingAuthUsers.find(
    (candidate) => candidate.email?.toLowerCase() === email
  )

  if (!authUser) {
    if (!user.password) {
      console.warn(`Skipping ${email}: no legacy password found.`)
      continue
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name }
    })

    if (error) throw error
    authUser = data.user
  }

  delete user.password
  user.authId = authUser.id
}

const documents = [
  { key: 'users', value: usersData },
  { key: 'community', value: communityData },
  { key: 'missions', value: missionsData },
  { key: 'rewards', value: rewardsData },
  { key: 'challenges', value: challengesData }
]

const { error } = await supabase
  .from('app_data')
  .upsert(documents, { onConflict: 'key' })

if (error) throw error

console.log(`Migrated ${usersData.users.length} profiles, ${communityData.posts.length} posts, and app catalogs.`)
