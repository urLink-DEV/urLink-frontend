export function notifications(notificationId, options) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) alert(options.message)
  else {
    if (notificationId) chrome.notifications.clear(notificationId)
    chrome.notifications.create(notificationId, options)
  }
}

let prevCallback = ''
export function notificationsAddListener(callback) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) return
  else {
    chrome.notifications.onClicked.removeListener(prevCallback)
    chrome.notifications.onClicked.addListener(callback)
    prevCallback = callback
  }
}
