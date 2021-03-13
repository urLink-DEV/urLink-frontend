/* global chrome */

/**
 * * Get Chrome History List information -> promise Pattern
 * @param {String} text String
 * @param {Date} startTime Date
 * @param {Date} endTime Date
 * @param {Number} maxResults Number
 * @returns {Object} search
 *  * first : (true|false) 해당 날짜의 첫번째 게시글
 *  * id: "11081" (history Id)
 *  * favicon: "https://www.google.com/s2/favicons?domain=${url}"
 *  * lastVisitTime: 1588933029447.23
 *  * title: "React App"
 *  * typedCount: 0 (사용자가 주소(typing in the address)를 입력하여 이 페이지를 탐색 한 횟수)
 *  * url: "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html?index=1"
 *  * hostName: "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html"
 *  * visitCount: 24 (사용자가이 페이지를 탐색(navigated to this page) 한 횟수)
 */
export function getHistoryList({ text, startTime = 0, endTime = Date.now(), maxResults }) {
  return new Promise((resolve, _reject) => {
    const search = chrome.history?.search
    if (!search) resolve(urlTempList)
    else {
      search({ text, startTime, endTime, maxResults }, (historyList) => {
        historyList = historyList.filter(
          (history) => startTime <= history.lastVisitTime && history.lastVisitTime <= endTime
        )
        historyList.sort((preHistory, curHistory) => curHistory.lastVisitTime - preHistory.lastVisitTime)
        let prevDate = ''
        const resultList = historyList.map(function (history) {
          let curDate = new Date(history.lastVisitTime).toLocaleDateString()
          let first = false
          if (curDate !== prevDate) {
            first = true
            prevDate = curDate
          }
          const url = document.createElement('a')
          url.href = history.url
          return {
            ...history,
            first,
            hostName: url.hostname,
            favicon: `https://www.google.com/s2/favicons?domain=${url.hostname}`,
          }
        })
        resolve(resultList)
      })
    }
  })
}

const urlTempList = [
  {
    id: '1',
    lastVisitTime: 1588933029447.23,
    title: 'React App',
    typedCount: 0,
    url: 'https://www.naver.com',
    visitCount: 24,
  },
  {
    id: '2',
    lastVisitTime: 1588933029447.23,
    title: 'React App',
    typedCount: 0,
    url: 'https://www.naver.com',
    visitCount: 24,
  },
  {
    id: '3',
    lastVisitTime: 1588933029447.23,
    title: 'React App',
    typedCount: 0,
    url: 'https://www.naver.com',
    visitCount: 24,
  },
  {
    id: '4',
    lastVisitTime: 1588933029447.23,
    title: 'React App',
    typedCount: 0,
    url: 'https://www.naver.com',
    visitCount: 24,
  },
  {
    id: '5',
    lastVisitTime: 1588933029447.23,
    title: 'React App',
    typedCount: 0,
    url: 'https://www.naver.com',
    visitCount: 24,
  },
]
