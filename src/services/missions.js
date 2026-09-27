import { getCurrentUser } from '@/services/auth'

const API_URL = '/api'
const SESSION_KEY = 'ecoquest_session'

export async function getMissions() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return { success: false, message: 'Silakan login terlebih dahulu.' }
  }

  try {
    const response = await fetch(`${API_URL}/missions?userId=${currentUser.id}`)
    const result = await response.json()
    return response.ok ? result : {
      success: false,
      message: result.message || 'Gagal mengambil data misi.'
    }
  } catch {
    return { success: false, message: 'Backend tidak terhubung.' }
  }
}

export async function completeMissionStep(missionId, stepNumber) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return { success: false, message: 'Silakan login terlebih dahulu.' }
  }

  try {
    const response = await fetch(`${API_URL}/missions/${missionId}/steps/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, stepNumber })
    })
    const result = await response.json()
    return response.ok ? result : {
      success: false,
      message: result.message || 'Gagal menyimpan progress misi.'
    }
  } catch {
    return { success: false, message: 'Backend tidak terhubung.' }
  }
}

export async function completeMission(missionId) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return {
      success: false,
      message: 'Silakan login terlebih dahulu.'
    }
  }


  try {
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

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(result.user)
    )

    return result
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung. Jalankan server terlebih dahulu.'
    }
  }

}