export function sendMessage(data) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) return
  else chrome.runtime.sendMessage(data)
}
