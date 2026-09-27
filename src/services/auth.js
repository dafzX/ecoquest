import { supabase } from '@/lib/supabase'

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        user: null
      }
    }

    return {
      success: true,
      message: 'Login berhasil.',
      user: data.user
    }
  } catch (error) {
    return {
      success: false,
      message: 'Terjadi kesalahan saat login.',
      user: null
    }
  }
}

export async function register({ name, email, password }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        user: null
      }
    }

    if (!data.user) {
      return {
        success: false,
        message: 'Pendaftaran gagal.',
        user: null
      }
    }

    return {
      success: true,
      message: 'Akun berhasil dibuat.',
      user: data.user
    }
  } catch (error) {
    return {
      success: false,
      message: 'Terjadi kesalahan saat membuat akun.',
      user: null
    }
  }
}

export async function getProfile() {
  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error) {
      return {
        success: false,
        message: error.message,
        user: null
      }
    }

    if (!user) {
      return {
        success: false,
        message: 'Pengguna belum login.',
        user: null
      }
    }

    return {
      success: true,
      user
    }
  } catch (error) {
    return {
      success: false,
      message: 'Gagal mengambil profil.',
      user: null
    }
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    return user
  } catch {
    return null
  }
}

export async function isLoggedIn() {
  const user = await getCurrentUser()

  return user !== null
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  return {
    success: !error,
    message: error?.message || 'Logout berhasil.'
  }
}