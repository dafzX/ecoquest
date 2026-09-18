const API_URL = 'http://localhost:3000/api'
const SESSION_KEY = 'ecoquest_session'

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

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

export async function register({ name, email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

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

export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem(SESSION_KEY) || 'null'
  )
}

export function isLoggedIn() {
  return getCurrentUser() !== null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}