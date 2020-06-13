/* global chrome */
import React, { useState } from 'react'

import logo from '../../images/logo/logo16.png';
import linkCopy from '../../images/link-copy.svg';
import newTab from '../../images/new-tab.svg';

import useStyles from './styles/CategoryHistory'

export default function CategoryHistoryList(props) {
  const { onHistoryDragStart,onHistoryDragEnd, setDraggedHistory, link, key } = props
  const classes = useStyles()

  const [favicon, setFavicon] = useState(`https://www.google.com/s2/favicons?domain=${link.hostName}`)
  
  const onError = () => { setFavicon(logo) }

  const onAnchorClick = (e) => {
    e.preventDefault()
    chrome.tabs.create({
      selected: true,
      url: link.url
    })
  }

  const onLinkCopy = (e) => {
    e.preventDefault();
    var copyElement = document.createElement('textarea');
    copyElement.value = link.url;
    document.body.appendChild(copyElement);
    copyElement.select();
    document.execCommand("copy");
    document.body.removeChild(copyElement);
  }

  const onLinkClick = (e , path) =>{
    e.preventDefault();
    setDraggedHistory(draggedHistory => draggedHistory.concat(path))
  }
  
  return (
    <div
      className={classes.linkDiv + " history-list"}
      key={key}
      data-type='link'
      draggable='true'
      onClick={(e) => onLinkClick(e, link.url)}
      onDragStart={(e) => onHistoryDragStart(e, link.url)}
      onDragnd={(e) => onHistoryDragEnd(e)}
    >
      <img className={classes.linkFavicon} onError={onError} src={favicon} alt={link.title} title={link.title}></img>
      <span className={classes.linkDivMainFont} title={link.title + ` (${link.visitCount})`}>{link.title + ` (${link.visitCount})`}</span>
      <span className={classes.linkDivSubFont} title={link.hostName}>{link.hostName}</span>
      <img className={classes.linkIcon} src={newTab} onClick={onAnchorClick} alt="새 창으로 열기" title="새 창으로 열기"></img>
      <img className={classes.linkIcon} src={linkCopy} onClick={onLinkCopy} alt="링크 복사 하기" title="링크 복사 하기"></img>
    </div>
  )
}