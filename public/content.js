// alert("hello");
// document.body.style.background = 'yellow';
var h1 = document.createElement("h1");
var text = document.createTextNode("Hello World!");
h1.appendChild(text);
document.body.appendChild(h1);

var iFrame  = document.createElement ("iframe");
iFrame.src  = chrome.extension.getURL ("index.html");

document.body.insertBefore (iFrame, document.body.firstChild);