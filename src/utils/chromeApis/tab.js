export function createTab(url) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) window.open(url)
  else chrome.tabs.create({ selected: true, url })
}

export function createTabList(urlList) {
  const idCheck = chrome.runtime?.id
  if (!idCheck) urlList.forEach((url) => window.open(url))
  else urlList.forEach((url) => chrome.tabs.create({ selected: true, url }))
}

export function getTabsQuery() {
  return new Promise((resolve, reject) => {
    const idCheck = chrome.runtime?.id
    if (!idCheck) reject({ message: 'is not defined query of tabs' })
    else chrome.tabs.query({ active: true, windowId: chrome.windows?.WINDOW_ID_CURRENT }, (tabs) => resolve(tabs))
  })
}
