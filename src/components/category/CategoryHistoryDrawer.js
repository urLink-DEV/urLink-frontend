/* global chrome */
import React, { useState , useEffect, Fragment} from 'react'
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
    draggedHistory, 
    setDraggedHistory,    
    selectedLinkList,
    setSelectedLinkList
  } = props
  
  const [linkList, setLinkList] = useState([])
  const [isHistoryDrag, setIsHistoryDrag] = useState(false)
  
  const dayAgo  = 1000 * 60 * 60 * 24 * 1
  const [historySearch, setHisotrySearch] = useState({
    text: '',
    startTime: (new Date).getTime() - dayAgo,
    endTime: (new Date).getTime(),
    maxResults: 0,
    scroll: true
  })

  const [modalText, setModalText] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const onHistoryDragStart = (e, historyLink, historyLinkID) => {
    const target = e.currentTarget
    if(target.classList.contains('history-list')){
      if(selectedLinkList.length === 0) {
        setSelectedLinkList(selectedLinks => 
          selectedLinks.concat({
            id: historyLinkID, 
            path: historyLink
          })
        )
        setDraggedHistory(draggedHistorys => draggedHistorys.concat(target))
      }
      
      setIsHistoryDrag(true)
      e.dataTransfer.setData('text/type', 'link')
      e.dataTransfer.setDragImage(document.getElementById('mouse-modal'),110,35);
    }
  }

  const onHistoryDragEnd = (e, historyLinkID) => {
    e.preventDefault()
    console.log('end')

    setIsHistoryDrag(false)
  }

  const onLinkClick = (e , historyLink, historyLinkID) =>{
    e.preventDefault()
    const target = e.currentTarget
    const isSelectedHistoryDOM = (history) => draggedHistory.includes(history)

    if( isSelectedHistoryDOM(target) ) {
      setSelectedLinkList(selectedLinks => selectedLinks.filter(link => link.id !== historyLinkID))
      setDraggedHistory(draggedHistorys => draggedHistorys.filter(historyDOM => historyDOM !== target))

    } else {
      setSelectedLinkList(selectedLinks => 
        selectedLinks.concat({
          id: historyLinkID, 
          path: historyLink
        })
      )
      setDraggedHistory(draggedHistorys => draggedHistorys.concat(target))

    }
  }

  const onTabOpenClick = (e) => {
    e.preventDefault()
    if(!chrome.tabs){
      selectedLinkList.forEach(link =>  window.open(link.url))
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
      setLinkList([])
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
  
  const onPressEnterSearchHistory = (e) => {
    const { keyCode } = e
    const { value } = e.target
    let startTime = (new Date).getTime() - dayAgo
    let scroll = true
    if (keyCode === 13) {
      setLinkList([])
      if(value) startTime = 0
      else scroll = false
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
    if (historyDrawerOpen) {
        const {text, startTime, endTime, maxResults} = historySearch;
        getHistory({
          text, startTime, endTime, maxResults, callback: (historyItems) => {
            if(historyItems.scroll && historyItems.length < 20 && Date.now() - (dayAgo*365) > historySearch.startTime) {
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
  },[historySearch])

  useEffect(() => {
    if(modalText) setModalOpen(!modalOpen)
  },[modalText])

  return (
    <>
      <div 
        className={
          clsx(classes.tabMove, {
            [classes.dragStart]: isHistoryDrag,
            [classes.dragEnd]: !isHistoryDrag,
          })
        }
        id='mouse-modal'
      >
        <div className={classes.circle}>
          <img className={classes.moveIcon} src={moveLink} alt="move links" />
        </div>
        <span>링크 {selectedLinkList.length}개 이동</span>
      </div>

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
              <span className={classes.mainFont}>방문기록</span>
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
              {
                linkList.length ? linkList.map(link =>
                  <Fragment key={link.id}>
                    <CategoryHistoryDateTitle link={link}/>
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
