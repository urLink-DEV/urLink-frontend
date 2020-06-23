/* global chrome */
import React, { useState } from 'react';
import historyAPI from '../commons/chromeApis/history'
import logo from '../images/logo.png';

/*
 * favicon: "https://www.google.com/s2/favicons?domain=mcpfkbednblokhkopibdoagbkmdpcapp"
 * first: true
 * hostName: "mcpfkbednblokhkopibdoagbkmdpcapp"
 * id: "16335"
 * lastVisitTime: 1592753162380.488
 * title: "UrLink"
 * typedCount: 0
 * url: "chrome-extension://mcpfkbednblokhkopibdoagbkmdpcapp/index.html"
 * visitCount: 27
*/

export default function CategoryPage() {
  const [historyList, setHistoryList] = useState([])
  const [text, setText] = useState('')
  const dayAgo  = 1000 * 60 * 60 * 24 * 1
  const [startTime, setStartTime] = useState((new Date).getTime() - dayAgo)
  const [endTime, setEndTime] = useState((new Date).getTime())
  const [maxResults, setMaxResults] = useState(0)

  const onClick = (e) => {
    e.preventDefault()
    historyAPI.get({
      text, startTime, endTime, maxResults, callback: (historyItems) => {
        console.log(historyItems)
        setHistoryList([...historyItems])
      }
    })
  }
  const onTextChange = (e) => {
    setText(e.target.value)
  }
  const onMaxResultsChange = (e) => {
    setMaxResults(e.target.value)
  }
  return (
    <div>
      <h1>This is History TEST PAGE</h1>
      <input value={text} onChange={onTextChange} placeholder="text" />
      <input value={maxResults} type="number" onChange={onMaxResultsChange} laceholder="maxResults"/>
      <button onClick={onClick}>serach</button>
      {
        historyList.length ?
          <ul>
            {
              historyList.map((history) =>
                <History
                  key={history.id}
                  url={history.url}
                  title={history.title}
                  visitCount={history.visitCount}
                  lastVisitTime={history.lastVisitTime} />
              )
            }
          </ul>
        : ""
      }
    </div>
  )
}

const History = ({ url, title, visitCount, lastVisitTime }) => {
  /**
 * * open new Tab
 * @param {Event} event
 */
  const onAnchorClick = (event) => {
    event.preventDefault()
    chrome.tabs.create({
      selected: true,
      url: event.target.href
    })
  }
  const [src, setSrc] = useState(`https://www.google.com/s2/favicons?domain=${url}`)
  lastVisitTime = new Date(lastVisitTime)
  const onError = () => {
    setSrc(logo)
  }
  return (
    <li>
      <img src={src} onError={onError} height={16} width={16}></img>
      <a href={url} onClick={onAnchorClick} title={title} >{title.slice(0,20)+"..."} [{visitCount}]</a>
      {lastVisitTime.toLocaleDateString()}
    </li>
  )
}