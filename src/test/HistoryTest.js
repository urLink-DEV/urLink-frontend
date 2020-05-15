/* global chrome */
import React, { useState } from 'react';
import { getHistory } from '../commons/history'
import logo from '../images/logo.png';

export default function CategoryPage() {
  const [history, sethistory] = useState([])
  const [text, settext] = useState('')
  const [startTime, setstartTime] = useState(0)
  const [endTime, setendTime] = useState(0)
  const [maxResults, setmaxResults] = useState(0)

  const onClick = (e) => {
    e.preventDefault()
    const today = new Date()
    const aWeekAgo = today.setDate(today.getDate() - 7)
    getHistory({
      // text, startTime: aWeekAgo, endTime: Date.now(), maxResults:parseInt(maxResults), 
      text, startTime, endTime, maxResults:parseInt(maxResults), 
      callback:(historyItems) => {
        sethistory(historyItems)
      }
    })
  }
  const onTextChange = (e) => {
    settext(e.target.value)
  }
  const onMaxResultsChange = (e) => {
    setmaxResults(e.target.value)
  }
  return (
    <div>
      this is History TEST PAGE
      <input value={text} onChange={onTextChange} placeholder="text" />
      <input value={maxResults} type="number" onChange={onMaxResultsChange} laceholder="maxResults"/>
      <button onClick={onClick}>serach</button>
      {history.length ? HistoryList(history) : ""}
    </div>
  )
}

const HistoryList = (history) => {
  const historyItems = history.map((history) =>
    <History
      key={history.id}
      url={history.url}
      title={history.title}
      visitCount={history.visitCount}
      lastVisitTime={history.lastVisitTime} />
  )
  return (
    <ul>{historyItems}</ul>
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
  const [src, setsrc] = useState(`https://www.google.com/s2/favicons?domain=${url}`)
  lastVisitTime = new Date(lastVisitTime)
  const onError = () => {
    setsrc(logo)
  }
  return (
    <li>
      <img src={src} onError={onError} height={16} width={16}></img>
      <a href={url} onClick={onAnchorClick} title={title} >{title.slice(0,20)+"..."} [{visitCount}]</a>
      {lastVisitTime.toLocaleDateString()}
    </li>
  )
}