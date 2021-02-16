/* global chrome */

export function createTab(url) {
  if (!chrome?.tabs) window.open(url);
  else chrome.tabs.create({ selected: true, url });
}

export function createTabList(urlList) {
  if (!chrome?.tabs) urlList.forEach((url) => window.open(url));
  else urlList.forEach((url) => chrome.tabs.create({ selected: true, url }));
}

export function getTabsQuery() {
  return new Promise((resove, reject) => {
    if (!chrome.tabs?.query) reject({ message: 'is not defined query of tabs' });
    else {
      chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) =>
        resove(tabs)
      );
    }
  });
}
