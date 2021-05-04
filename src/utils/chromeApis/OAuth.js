export function getAuthToken() {
  return new Promise((resolve, reject) => {
    const idCheck = chrome.runtime?.id
    if (!idCheck) reject({ message: 'is not defined getAuthToken' })
    else chrome.identity.getAuthToken({ interactive: true }, (token) => resolve(token))
  })
}

export function removeCachedAuthToken(token) {
  return new Promise((resolve, reject) => {
    const idCheck = chrome.runtime?.id
    if (!idCheck) reject({ message: 'is not defined removeCachedAuthToken' })
    else chrome.identity.removeCachedAuthToken({ token }, () => resolve())
  })
}
