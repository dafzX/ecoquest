const API_URL = '/api'
export async function getLeaderboard() {
  try {
    const response = await fetch(`${API_URL}/leaderboard`)
    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Gagal mengambil leaderboard.'
      }
    }

    return result
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung.'
    }
  }
}