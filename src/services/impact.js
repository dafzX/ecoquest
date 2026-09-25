import { getCurrentUser } from '@/services/auth'

const API_URL = '/api'

async function parseResponse(response) {
  try {
    return await response.json()
  } catch {
    return {
      success: false,
      message: 'Response dari server tidak valid.'
    }
  }
}

export async function getImpact() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.'
    }
  }

  try {
    const response = await fetch(`${API_URL}/impact?userId=${currentUser.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await parseResponse(response)

    if (!response.ok) {
      return result
    }

    return result
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung.'
    }
  }
}
