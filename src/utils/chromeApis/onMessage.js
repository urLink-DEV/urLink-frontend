export function onMessage(callback) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) return
  else chrome.runtime?.onMessage.addListener(callback)
}

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
