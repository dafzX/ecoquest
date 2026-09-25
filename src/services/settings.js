import { getCurrentUser } from '@/services/auth'

const API_URL = '/api'

function getUserId() {
  return getCurrentUser()?.id || null
}

export async function getSettings() {
  const userId = getUserId()

  if (!userId) {
    return { success: false, message: 'Silakan login terlebih dahulu.' }
  }

  try {
    const response = await fetch(`${API_URL}/users/${userId}/settings`)
    return await response.json()
  } catch {
    return { success: false, message: 'Backend tidak terhubung.' }
  }
}

export async function updateSettings(settings) {
  const userId = getUserId()

  if (!userId) {
    return { success: false, message: 'Silakan login terlebih dahulu.' }
  }

  try {
    const response = await fetch(`${API_URL}/users/${userId}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })

    return await response.json()
  } catch {
    return { success: false, message: 'Backend tidak terhubung.' }
  }
}
