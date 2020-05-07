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

    const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

    let numRequestsOutstanding = 0;
  
    chrome.history.search(
        { text: "", startTime: 0, maxResults: 10 }, 
        
        (historyItems) => {
            historyItems.forEach(function(history){
                buildPopupDom(divName, history);
            });
        }
    );

    const processVisitsWithUrl = (url) => {
        return (visitItems) => {
            processVisits(url, visitItems);
        };
    };

    const historyItems = {};

    // * Callback for chrome.history.getVisits().  Counts the number of times a user visited a URL by typing the address.
    const processVisits = (url, visitItems) => {
        visitItems.some(function(visit){
            // * Ignore items unless the user typed the URL.
            if (visit.transition !== 'typed') return false;
            historyItems[url] && historyItems[url]++ || 0;
        });
    };

    // * This function is called when we have the final list of URls to display.
    const onAllVisitsProcessed = (historyItems) => {
        buildPopupDom(divName, historyItems);
    };
}

document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList("typedUrl_div");
});