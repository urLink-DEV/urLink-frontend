import React, { useState , useEffect} from 'react'
import clsx from 'clsx'
import useStyles from './styles/CategoryHistoryDrawer'

import CategoryHistoryDateTitle from './CategoryHistoryDateTitle'
import CategoryHistory from './CategoryHistory'

export default function CategoryHistoryDrawer(props) {
  const classes = useStyles()
  const { getHistory, historyDrawerOpen, draggedHistory, setDraggedHistory } = props
  
  const [linkList, setLinkList] = useState([])
  const [isHistoryDrag, setIsHistoryDrag] = useState(false)

  const onScroll = (e) => {

  }
  
  const onHistoryDragStart = (e) => {
    const target = e.currentTarget
    if(target.classList.contains('history-list')){
      e.dataTransfer.setData('text/type', 'link')
      setIsHistoryDrag(true)
    }
  }

  const onHistoryDragEnd = () => {
    setIsHistoryDrag(false)
  }
  
  useEffect(() => {
    if(historyDrawerOpen){
      getHistory({text: "", callback : (historyItems) => {
        setLinkList(historyItems)
      }, maxResults: 100})
    }
  }, [historyDrawerOpen])

  return (
    <div
      className={
        clsx(classes.root, {
          [classes.drawerOpen]: historyDrawerOpen,
          [classes.drawerClose]: !historyDrawerOpen
        })
      }
    >
      {
        historyDrawerOpen ?
          <>
            <div className={
              clsx(classes.tabMove, {
                [classes.dragStart]: isHistoryDrag,
                [classes.dragEnd]: !isHistoryDrag
              })
            }>
              탭 {draggedHistory.length}개 이동
            </div>

            <div className={classes.mainFont}>방문기록</div>
            {
              linkList.map(link =>
                <>
                  <CategoryHistoryDateTitle
                    key={new Date(link.lastVisitTime).toLocaleDateString()} 
                    link={link}
                  />
                  <CategoryHistory
                    key={link.id}
                    link={link}
                    setDraggedHistory={setDraggedHistory}
                    onHistoryDragStart={onHistoryDragStart}
                    onHistoryDragEnd={onHistoryDragEnd}
                  />
                </>
              )
            }
          </>
          : null
      }
    </div>
  )
}