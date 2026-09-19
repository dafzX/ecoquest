const API_URL = 'http://localhost:3000/api'
const SESSION_KEY = 'ecoquest_session'

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

    const result = await parseResponse(response)

    if (!response.ok) {
      return result
    }

    if (result.user) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(result.user)
      )
    }

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

    const result = await parseResponse(response)

    if (!response.ok) {
      return result
    }

    if (result.user) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(result.user)
      )
    }

    return result
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung. Jalankan server terlebih dahulu.'
    }
  }
}

export async function getProfile() {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await parseResponse(response)

    if (!response.ok) {
      return result
    }

    if (result.user) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(result.user)
      )
    }

    return result
  } catch (error) {
    return {
      success: false,
      message: 'Backend tidak terhubung.'
    }
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem(SESSION_KEY) || 'null'
    )
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return getCurrentUser() !== null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}