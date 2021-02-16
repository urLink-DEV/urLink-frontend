/* global chrome */

export function createTab(url) {
  const create = chrome.tabs?.create;
  if (!create) window.open(url);
  else create({ selected: true, url });
}

export function createTabList(urlList) {
  const create = chrome.tabs?.create;
  if (!create) urlList.forEach((url) => window.open(url));
  else urlList.forEach((url) => create({ selected: true, url }));
}

export function getTabsQuery() {
  return new Promise((resolve, reject) => {
    const query = chrome.tabs?.query;
    const WINDOW_ID_CURRENT = chrome.windows?.WINDOW_ID_CURRENT;
    if (!query) reject({ message: 'is not defined query of tabs' });
    else query({ active: true, windowId: WINDOW_ID_CURRENT }, (tabs) => resolve(tabs));
  });
}
