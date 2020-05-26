// * content <-> background message listener like socket
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
})
// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
// })


// * send Login Check
chrome.runtime.sendMessage({"login": "login"}, function(response) {
  // 응답 처리
  console.log(response);
}); 