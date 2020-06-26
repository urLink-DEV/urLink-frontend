/* global chrome */
import React, { useState , useEffect, Fragment, useRef} from 'react'
import clsx from 'clsx'

import useStyles from './styles/CategoryHistoryDrawer'

import SearchIcon from '../../images/search.png'
import linkListSearchEmptyIcon from '../../images/group-17.png'
import linkListEmptyIcon from '../../images/group-19.png'
import moveLink from '../../images/move.png';

import CategorySearchPopOver from './CategorySearchPopOver'
import CategoryHistoryDateTitle from './CategoryHistoryDateTitle'
import CategoryHistory from './CategoryHistory'

export default function CategoryHistoryDrawer(props) {
  const classes = useStyles()
  const { 
    getHistory, 
    historyDrawerOpen,

    draggedHistoryList, 
    setDraggedHistoryList,    
    
    selectedLinkList,
    setSelectedLinkList
  } = props
  
  const [linkList, setLinkList] = useState([])
  const [isHistoryDrag, setIsHistoryDrag] = useState(false)
  const dragMove = useRef(null)
  const dayAgo  = 1000 * 60 * 60 * 24 * 1
  const minTime = Date.now() - (dayAgo * 365) 
  const [historySearch, setHisotrySearch] = useState({
    text: '',
    startTime: (new Date).getTime() - dayAgo,
    endTime: (new Date).getTime(),
    maxResults: 0,
    scroll: true
  })

  const [modalText, setModalText] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const onHistoryDragStart = (e, link) => {
    const target = e.currentTarget
    const { id, url: path } = link
    if(target.classList.contains('history-list')){
      if(!selectedLinkList.length) {
        setSelectedLinkList(selectedLinks => selectedLinks.concat({ id, path }))
        setDraggedHistoryList(draggedHistoryList => draggedHistoryList.concat(target))
      }
      setIsHistoryDrag(true)
      e.dataTransfer.setData('text/type', 'link')
      e.dataTransfer.setDragImage(dragMove.current, 110, 35)
    }
  }

  const onHistoryDragEnd = (e, _link) => {
    e.preventDefault()
    setIsHistoryDrag(false)
  }

  const onLinkClick = (e, link) => {
    e.preventDefault()
    const { id, url: path } = link
    const target = e.currentTarget
    // const isSelectedHistoryDOM = (history) => draggedHistory.includes(history)
    const isSelectedList = (id) => selectedLinkList.filter(selectedLink => selectedLink.id === id).length

    if (isSelectedList(id)) {
      setSelectedLinkList(selectedLinkList => selectedLinkList.filter(selectedLink => selectedLink.id !== id))
      setDraggedHistoryList(draggedHistoryList => draggedHistoryList.filter(historyDOM => historyDOM !== target))
    }
    else {
      setSelectedLinkList(selectedLinkList => selectedLinkList.concat({ id, path }))
      setDraggedHistoryList(draggedHistoryList => draggedHistoryList.concat(target))
    }
  }

  const onTabOpenClick = (e) => {
    e.preventDefault()
    if(!chrome.tabs){
      selectedLinkList.forEach(link =>  window.open(link.url)) // * not working multiple new Tab
    }
    else {
      selectedLinkList.forEach(link => chrome.tabs.create({
        selected: true,
        url: link.path
      }))
    }
  }

  const onHistoryDrawerTransitionEnd = (e) => {
    if(e.currentTarget !== e.target) return
    if (historyDrawerOpen) {
      const {text, startTime, endTime, maxResults} = historySearch;
      getHistory({
        text, startTime, endTime, maxResults, callback: (historyItems) => {
          setLinkList([...linkList, ...historyItems])
        }
      })
    }
    else {
      setSelectedLinkList([])
      setLinkList([])
      setSelectedLinkList([])
      setHisotrySearch({
        ...historySearch,
        text: '',
        startTime: (new Date).getTime() - dayAgo,
        endTime: (new Date).getTime(),
        maxResults: 0,
        scroll: true
      })
    }
  }

  const onInintClik = (e) => {
    e.preventDefault()
    setLinkList([])
    setSelectedLinkList([])
    setHisotrySearch({
      ...historySearch,
      text: '',
      startTime: (new Date).getTime() - dayAgo,
      endTime: (new Date).getTime(),
      maxResults: 0,
      scroll: true
    }) 
  }
  
  const onPressEnterSearchHistory = (e) => {
    const { keyCode } = e
    const { value } = e.target
    let startTime = (new Date).getTime() - dayAgo
    let scroll = true
    if (keyCode === 13) {
      if(value) startTime = 0
      else scroll = false
      setLinkList([])
      setSelectedLinkList([])
      setHisotrySearch({
        ...historySearch,
        text: value,
        startTime,
        endTime: (new Date).getTime(),
        scroll
      })
    }
  } 

  const onHistoryDrawerScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight

    if(Math.ceil(scrollTop + clientHeight) >= scrollHeight ) {
      setHisotrySearch((historySearch) => ({
        ...historySearch,
        startTime: historySearch.startTime - dayAgo,
        endTime: historySearch.startTime
      }))
    }
  }

  const onCloseModal = (e) => {
    e.preventDefault()
    setModalText('')
    setModalOpen(false)
  }

  useEffect(() => {
    if (historyDrawerOpen && (minTime < historySearch.startTime || !historySearch.startTime)) {
      const { text, startTime, endTime, maxResults } = historySearch;
      getHistory({
        text, startTime, endTime, maxResults, callback: (historyItems) => {
          if (historyItems.scroll && historyItems.length < 20) {
            setHisotrySearch((historySearch) => ({
              ...historySearch,
              startTime: historySearch.startTime - dayAgo
            }))
          }
          else {
            setLinkList([...linkList, ...historyItems])
          }
        }
      })
    } 
    else {
      setLinkList([])
    }
  }, [historySearch])

  useEffect(() => {
    if(modalText) setModalOpen(!modalOpen)
  },[modalText])

  return (
    <>
      {/* history List Drag */}
      <div
        ref={dragMove}
        className={
          clsx(classes.tabMove, {
            [classes.dragStart]: isHistoryDrag,
            [classes.dragEnd]: !isHistoryDrag,
          })
        }
      >
        <div className={classes.circle}>
          <img className={classes.moveIcon} src={moveLink} alt="move links" />
        </div>
        <span>링크 {selectedLinkList.length}개 이동</span>
      </div>
      {/* history List Drag - END */}

      <div
        className={
          clsx(classes.root, {
            [classes.drawerOpen]: historyDrawerOpen,
            [classes.drawerClose]: !historyDrawerOpen
          })
        }
        onTransitionEnd={onHistoryDrawerTransitionEnd}
        onScroll={onHistoryDrawerScroll}
      >
        {
          historyDrawerOpen ?
            <Fragment>
              <button className={classes.mainFont} onClick={onInintClik}>방문기록</button>
              {/* history serarchTool */}
              <CategorySearchPopOver>
                <div className={classes.popover}>
                  <div className={classes.popoverDiv}>
                    <img src={SearchIcon} className={classes.searchIcon} />
                    <span className={classes.searchBtnText}>Search</span>
                  </div>
                  <div>
                    <input
                      placeholder="검색어를 입력해 주세요."
                      className={classes.textfield}
                      onKeyDown={onPressEnterSearchHistory}
                    />
                  </div>
                </div>
              </CategorySearchPopOver>
              {/* history serarchTool - END */}

              {selectedLinkList.length ?
                <button className={classes.tabOpenText} onClick={onTabOpenClick}>탭 열기 ({selectedLinkList.length})</button> : ""
              }
              
              {linkList.length ?
                linkList.map(link =>
                  <Fragment key={link.id}>
                    <CategoryHistoryDateTitle link={link} />
                    <CategoryHistory
                      link={link}
                      selectedLinkList={selectedLinkList}
                      onHistoryDragStart={onHistoryDragStart}
                      onHistoryDragEnd={onHistoryDragEnd}
                      onLinkClick={onLinkClick}
                      setModalText={setModalText}
                    />
                  </Fragment>
                )
                :
                historySearch.text ?
                  (<div className={classes.imgCenter}>
                    <img src={linkListSearchEmptyIcon} alt="link search list is empty"></img>
                  </div>)
                  :
                  (<div className={classes.imgCenter}>
                    <img src={linkListEmptyIcon} alt="link list is empty"></img>
                  </div>)
              }
            </Fragment>
            : null
        }
      </div>
    </>
  )
}