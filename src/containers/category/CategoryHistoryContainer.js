/* global chrome */
import React from 'react'
import CategoryHistory from '../../components/category/CategoryHistory'

export default function HistoryContainer(props) {
  const {children} = props
  const componentsProps = {
    urlList,
  }

  return (
    <CategoryHistory {...componentsProps}>
      {children}
    </CategoryHistory>
  )
}

const urlList = [
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "url": "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "url": "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "url": "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "url": "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "url": "chrome-extension://fljjldbbgojlhkhamhcgamibbjlincej/index.html",
    "visitCount": 24,
  }
]