import { getCurrentUser } from '@/services/auth'

const API_URL = 'http://localhost:3000/api'
const SESSION_KEY = 'ecoquest_session'

export async function completeMission(missionId) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.'
    }
  }

  const response = await fetch(
    `${API_URL}/missions/${missionId}/complete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.id
      })
    }
  )

  const result = await response.json()

  if (!response.ok) {
    return result
  }

  // Update session agar XP/level/streak terbaru tersedia di frontend.
  localStorage.setItem(SESSION_KEY, JSON.stringify(result.user))

  return result
}