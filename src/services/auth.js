const API_URL = '/api'
const SESSION_KEY = 'ecoquest_session'

async function authRequest(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const result = await response.json()

  if (!response.ok) {
    return {
      ...result,
      success: false,
      user: null
    }
  }

  if (result.user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(result.user))
  }

  return result
}

export async function login(email, password) {
  try {
    return await authRequest('/auth/login', { email, password })
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung.',
      user: null
    }
  }
}

export async function register({ name, email, password }) {
  try {
    return await authRequest('/auth/register', { name, email, password })
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung.',
      user: null
    }
  }
}

export async function getProfile() {
  try {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      return {
        success: false,
        message: 'Pengguna belum login.',
        user: null
      }
    }

    const response = await fetch(`${API_URL}/users/${currentUser.id}`)
    const result = await response.json()

    if (!response.ok) {
      return { ...result, user: null }
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(result.user))
    return result
  } catch (error) {
    return {
      success: false,
      message: 'Gagal mengambil profil dari backend.',
      user: null
    }
  }
}

export function getCurrentUser() {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return getCurrentUser() !== null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  return {
    success: true,
    message: 'Logout berhasil.'
  }
}