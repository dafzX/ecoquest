import { reactive } from 'vue'

export const alertState = reactive({
  current: null
})

const queue = []
let resolveCurrent = null

export function showAlert(message, options = {}) {
  return enqueueDialog(message, options, false)
}

export function showConfirm(message, options = {}) {
  return enqueueDialog(message, options, true)
}

function enqueueDialog(message, options, confirm) {
  return new Promise((resolve) => {
    queue.push({
      message: String(message ?? ''),
      title: options.title || '',
      type: options.type || (confirm ? 'warning' : 'error'),
      confirm,
      resolve
    })

    showNextAlert()
  })
}

export function dismissAlert(confirmed = false) {
  if (!alertState.current) {
    return
  }

  alertState.current = null
  resolveCurrent?.(confirmed)
  resolveCurrent = null
  queueMicrotask(showNextAlert)
}

function showNextAlert() {
  if (alertState.current || queue.length === 0) {
    return
  }

  const next = queue.shift()
  resolveCurrent = next.resolve
  alertState.current = next
}
