function onAnchorClick(event) {
    chrome.tabs.create({
        selected: true,
        url: event.srcElement.href
    });
    return false;
}

const buildPopupDom = (divName, {url, title, visitCount}) => {
    const popupDiv = document.getElementById(divName);
    const ul = document.getElementById("history_link");

    const a = document.createElement('a');
          a.href = url;
          a.appendChild(document.createTextNode(`${title} [${visitCount}]`));
          a.addEventListener('click', onAnchorClick);

    const li = document.createElement('li');
    
    const img = document.createElement("img");
          img.src = `https://www.google.com/s2/favicons?domain=${url}`;
          img.height = "10";
          img.width = "10";

    li.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);
}

const buildTypedUrlList = (divName) => {
    chrome.history.search(
        { text: "", startTime: 0, maxResults: 10 }, 
        
        (historyItems) => {
            historyItems.forEach(function(history){
                buildPopupDom(divName, history);
            });
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList("typedUrl_div");
});