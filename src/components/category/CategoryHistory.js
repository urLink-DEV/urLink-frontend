/* global chrome */
import React, { useState } from 'react'
import clsx from 'clsx';

import logo from '../../images/logo/logo16.png'
import linkCopy from '../../images/link-copy.svg'
import newTab from '../../images/new-tab.svg'

import useStyles from './styles/CategoryHistory'

export default function CategoryHistory(props) {
  const { 
    onHistoryDragStart, 
    onHistoryDragEnd, 
    onLinkClick,
    selectedLinkList,
    link
  } = props

  const classes = useStyles()

  const [favicon, setFavicon] = useState(`https://www.google.com/s2/favicons?domain=${link.hostName}`)
  const onError = () => { setFavicon(logo) }

  const onAnchorClick = (e) => {
    e.preventDefault()
    if(!chrome.tabs){
      window.open(link.url)
    }
    else {
      chrome.tabs.create({
        selected: true,
        url: link.url
      })
    }
  }

  const onLinkCopy = (e) => {
    e.preventDefault()
    const copyElement = document.createElement('textarea')
    copyElement.value = link.url
    document.body.appendChild(copyElement)
    copyElement.select()
    document.execCommand("copy")
    document.body.removeChild(copyElement)
  }

  return (
    <div
      className={
        clsx(classes.linkDiv, 'history-list', {
        [classes.selectedDiv]: selectedLinkList.filter(list => list.id === link.id).length
        }
      )}
      data-type='link'
      draggable='true'
      onClick={(e) => onLinkClick(e, link)}
      onDragStart={(e) => onHistoryDragStart(e, link)}
      onDragEnd={(e) => onHistoryDragEnd(e, link)}
    >
      <img className={classes.linkFavicon} onError={onError} src={favicon} alt={link.title} title={link.title}></img>
      <span className={classes.linkDivMainFont} title={link.title + ` (${link.visitCount})`}>{link.title + ` (${link.visitCount})`}</span>
      <span className={classes.linkDivSubFont} title={link.hostName}>{link.hostName}</span>
      <img className={classes.linkIcon} src={newTab} onClick={onAnchorClick} alt="새 창으로 열기" title="새 창으로 열기"></img>
      <img className={classes.linkIcon} src={linkCopy} onClick={onLinkCopy} alt="링크 복사 하기" title="링크 복사 하기"></img>
    </div>
  )
}