import { getCurrentUser } from '@/services/auth'

const API_URL = '/api'
const SESSION_KEY = 'ecoquest_session'

export async function getRewards() {
  const response = await fetch(`${API_URL}/rewards`)
  return response.json()
}

export async function claimReward(rewardId) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.'
    }
  }

  try {
    const response = await fetch(
      `${API_URL}/rewards/${rewardId}/claim`,
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

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(result.user)
    )

    return result
  } catch {
    return {
      success: false,
      message: 'Backend tidak terhubung.'
    }
  }
}