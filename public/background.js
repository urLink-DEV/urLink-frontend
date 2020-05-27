chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
 });

// // * login check
// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
//     if (request.message == "tokenCheck") {
//       auth.tokenCheck()
//       .then(res => {
//         sendResponse({ res: res });
//       })
//       .catch(e => console.log(e))
//     }
//   }
// );


