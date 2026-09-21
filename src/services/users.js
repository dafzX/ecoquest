import { getCurrentUser } from '@/services/auth'

const API_URL = 'http://localhost:3000/api'
const SESSION_KEY = 'ecoquest_session'

export async function updateProfile({ name, email }) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.'
    }
  }

  try {
    const response = await fetch(
      `${API_URL}/users/${currentUser.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
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