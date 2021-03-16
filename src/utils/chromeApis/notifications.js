export function notifications(options) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) alert(options.message)
  else chrome.notifications.create(options)
}
