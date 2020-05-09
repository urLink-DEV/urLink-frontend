/* global chrome */
/**
 * * Get Chrome History information -> callback Pattern
 * @param {String} text String
 * @param {Date} startTime Date
 * @param {Date} endTime Date
 * @param {Number} maxResults Number
 * @param {Function} callback Function
 *  * search return
 *  * id: "11081" (history Id)
 *  * lastVisitTime: 1588933029447.23
 *  * title: "React App"
 *  * typedCount: 0 (사용자가 주소(typing in the address)를 입력하여 이 페이지를 탐색 한 횟수)
 *  * url: "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html"
 *  * visitCount: 24 (사용자가이 페이지를 탐색(navigated to this page) 한 횟수)
 */
export const getHistory = ({text, startTime, endTime, maxResults, callback}) => {
    startTime = startTime ? startTime: 0
    endTime = endTime ? endTime: Date.now()
    chrome.history.search(
        { text, startTime, endTime, maxResults },

        (historyItems) => {
            historyItems.sort(function (preHistory, CurHistory) { return preHistory.lastVisitTime > CurHistory.lastVisitTime})
            if (callback && typeof (callback) === "function") callback(historyItems)
            else console.log(historyItems)
        }
    );
}