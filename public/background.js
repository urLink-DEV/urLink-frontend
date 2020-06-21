chrome.tabs.onCreated.addListener(function (_tab) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    // chrome.tabs.get(tabs[0].id,  (s) => {console.log(s)})
    if (tabs.length <= 1) chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
  });
});