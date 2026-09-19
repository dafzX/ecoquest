const API_URL = 'http://localhost:3000/api'

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
  try {
    const response = await fetch(`${API_URL}/impact`, {
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