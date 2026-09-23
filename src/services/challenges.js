import { getCurrentUser } from '@/services/auth'

const API_URL = 'http://localhost:3000/api'

function getUserId() {
  return getCurrentUser()?.id || null
}

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, options)
    const result = await response.json()

    if (!response.ok) {
      return result
    }

    return result
  } catch {
    return {
      success: false,
      message: 'Backend tidak terhubung.'
    }
  }
}

export function getChallenges() {
  const userId = getUserId()
  const query = userId ? `?userId=${userId}` : ''

  return request(`/challenges${query}`)
}

export function joinChallenge(challengeId) {
  const userId = getUserId()

  if (!userId) {
    return Promise.resolve({
      success: false,
      message: 'Silakan login terlebih dahulu.'
    })
  }

  return request(`/challenges/${challengeId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
}

export function completeChallengeStep(challengeId) {
  const userId = getUserId()

  if (!userId) {
    return Promise.resolve({
      success: false,
      message: 'Silakan login terlebih dahulu.'
    })
  }

  return request(`/challenges/${challengeId}/steps/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
}
