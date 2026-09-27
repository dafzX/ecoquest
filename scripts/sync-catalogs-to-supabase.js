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

const catalogFiles = ['missions.json', 'rewards.json', 'challenges.json']
const catalogs = await Promise.all(catalogFiles.map(async (filename) => ({
  key: filename.replace('.json', ''),
  value: JSON.parse(await fs.readFile(path.join(dataDirectory, filename), 'utf8'))
})))

const { error } = await supabase
  .from('app_data')
  .upsert(catalogs, { onConflict: 'key' })

if (error) throw error

console.log('Synced mission, reward, and challenge catalogs. User progress and community data were not changed.')
