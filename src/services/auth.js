import defaultUsers from '@/data/users.json'

const USERS_KEY = 'ecoquest_users'
const SESSION_KEY = 'ecoquest_session'

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function getAllUsers() {
  return [...defaultUsers, ...getRegisteredUsers()]
}

export function login(email, password) {
  const user = getAllUsers().find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase().trim() &&
      item.password === password
  )

  if (!user) {
    return {
      success: false,
      message: 'Email atau password salah.'
    }
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))

  return {
    success: true,
    user: sessionUser
  }
}

export function register({ name, email, password }) {
  const normalizedEmail = email.toLowerCase().trim()

  const emailAlreadyUsed = getAllUsers().some(
    (item) => item.email.toLowerCase() === normalizedEmail
  )

  if (emailAlreadyUsed) {
    return {
      success: false,
      message: 'Email sudah terdaftar.'
    }
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password
  }

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...getRegisteredUsers(), newUser])
  )

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    })
  )

  return {
    success: true
  }
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
}

export function isLoggedIn() {
  return getCurrentUser() !== null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}