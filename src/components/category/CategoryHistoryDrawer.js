import React, { useState , useEffect} from 'react'
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
  

  const onScroll = (e) => {

  }
  
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

  useEffect(() => {
    if(historyDrawerOpen){
      getHistory({text: "", callback : (historyItems) => {
        setLinkList(historyItems)
      }, maxResults: 100})
    }
  }, [historyDrawerOpen])



  return (
    <div className={
        clsx(classes.root, {
          [classes.drawerOpen]: historyDrawerOpen,
          [classes.drawerClose]: !historyDrawerOpen
        })
      }
    >
      {
        historyDrawerOpen ?
          <>
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
                <React.Fragment key={link.id}>
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
                </React.Fragment>
              )
            }
          </>
          : null
      }
    </div>
  )
}