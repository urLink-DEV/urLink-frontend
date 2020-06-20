import React, { useState , useEffect, Fragment} from 'react'
import clsx from 'clsx'

import useStyles from './styles/CategoryHistoryDrawer'

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
  
  // * history search option
  const dayAgo  = 1000 * 60 * 60 * 24 * 1
  const [startTime, setStartTime] = useState((new Date).getTime() - dayAgo)
  const [endTime, setEndTime] = useState((new Date).getTime())
  const [maxResults, setMaxResults] = useState(0)
  // * /history search option - END

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

  const onHistoryDrawerTransitionEnd = () => {
    if (historyDrawerOpen) {
      getHistory({
        text: '', startTime, endTime, maxResults, callback: (historyItems) => {
          setLinkList([...linkList, ...historyItems])
        }
      })
    }
    else {
      setLinkList([])
      setEndTime((new Date).getTime())
      setStartTime((new Date).getTime() - dayAgo)
    }
  }
  
  const onHistoryDrawerScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight

    if(Math.ceil(scrollTop + clientHeight) >= scrollHeight ) {
      setEndTime(startTime)
      setStartTime(startTime - dayAgo)
    }
  }

  useEffect(() => {
    if (historyDrawerOpen) {
        getHistory({
          text: '', startTime, endTime, maxResults, callback: (historyItems) => {
            setLinkList([...linkList, ...historyItems])
          }
        })
    }
  },[endTime])

  return (
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
            <div 
              className={
                clsx(classes.tabMove, {
                  [classes.dragStart]: isHistoryDrag,
                  [classes.dragEnd]: !isHistoryDrag
                })
              }
              id='result'
            >
              링크 {draggedHistory.length}개 이동
            </div>

            <div className={classes.mainFont}>방문기록</div>

            {
              linkList.map(link =>
                <Fragment>
                  <CategoryHistoryDateTitle
                    key={link.id + link.lastVisitTime} 
                    link={link}
                  />
                  <CategoryHistory
                    key={link.id}
                    link={link}
                    selectedLinkList={selectedLinkList}
                    onHistoryDragStart={onHistoryDragStart}
                    onHistoryDragEnd={onHistoryDragEnd}
                    onLinkClick={onLinkClick}
                  />
                </Fragment>
              )
            }
          </Fragment>
          : null
      }
    </div>
  )
}