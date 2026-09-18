const STORAGE_KEY = 'ecoquest_challenge_progress'

function getAllProgress() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    )
  } catch {
    return {}
  }
}

function saveAllProgress(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  )
}

export function getChallengeProgress(challengeId) {
  const allProgress = getAllProgress()

  return (
    allProgress[String(challengeId)] || {
      joined: false,
      completedSteps: 0
    }
  )
}

export function setChallengeProgress(
  challengeId,
  completedSteps,
  joined = true
) {
  const allProgress = getAllProgress()

  allProgress[String(challengeId)] = {
    joined,
    completedSteps
  }

  saveAllProgress(allProgress)

  return allProgress[String(challengeId)]
}

export function joinChallenge(challengeId) {
  const current = getChallengeProgress(challengeId)

  return setChallengeProgress(
    challengeId,
    current.completedSteps || 0,
    true
  )
}

export function resetChallengeProgress(challengeId) {
  const allProgress = getAllProgress()

  delete allProgress[String(challengeId)]

  saveAllProgress(allProgress)
}