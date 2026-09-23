import { getCurrentUser } from '@/services/auth'

const API_URL = 'http://localhost:3000/api'

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, options)
    return await response.json()
  } catch {
    return { success: false, message: 'Backend tidak terhubung.' }
  }
}

export function getCommunity() {
  const userId = getCurrentUser()?.id
  return request(`/community${userId ? `?userId=${userId}` : ''}`)
}

export function createCommunityPost(content, category = 'Eco Action') {
  const userId = getCurrentUser()?.id
  return request('/community/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, content, category })
  })
}

export function toggleCommunityLike(postId) {
  const userId = getCurrentUser()?.id
  return request(`/community/posts/${postId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
}
