/* global chrome */
import React from 'react'
import CategoryAppBar from '../../components/category/CategoryAppBar'

export default function HistoryContainer() {

  const props = {
    urlList,
    newAlarmList,
    newProfileList,
    newRecentNofitication,
    // getAllAlarmList,
    // getRecentNotification,
  }
  
  return (
    <CategoryAppBar {...props}/>
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

const newAlarmList = [
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: new Date(),
  },
]

const newRecentNofitication = [
  {
    title: '새로운 버전 출시', 
    description: 'asdfasfd',
    date: new Date(),
  }
]
const newProfileList = {
  nickName: '녹챠챠',
  email: 'isoo7510@gmail.com',
  profileImg: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
}