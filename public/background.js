chrome.runtime.onInstalled.addListener(function(state) {
  const {reason} = state;
  if(reason === "install") {
    chrome.tabs.create({ url: chrome.extension.getURL("index.html"), selected: true }, function () {
      chrome.runtime.onConnect.addListener(port => {
        port.postMessage({messgae: "install"});
      })
    });
  }
});