import { getCurrentUser } from '@/services/auth'

const API_URL = '/api'

export async function getAchievements() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.',
      achievements: []
    }
  }

  try {
    const response = await fetch(
      `${API_URL}/users/${currentUser.id}/achievements`
    )

    const result = await response.json()

    if (!response.ok) {
      return result
    }

    return result
  } catch {
    return {
      success: false,
      message: 'Backend tidak terhubung.',
      achievements: []
    }
  }
}
