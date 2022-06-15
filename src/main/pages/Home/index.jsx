import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Resizable } from 're-resizable'
import { useDispatch, useSelector } from 'react-redux'

import ScrollUpButton from '@/main/components/ScrollUpButton'
import { useAlarmNoticeConnection } from '@/modules/alarmNotice'
import { categorySelector } from '@/modules/category'
import { appBarInversionChangeState } from '@/modules/ui'

import AppBar from './AppBar'
import CategoryList from './CategoryList'
import LinkDropZone from './LinkDropZone'
import LinkList from './LinkList'
import useStyles from './style'

export default function Home() {
  useAlarmNoticeConnection()

  const [resizing, setResizing] = useState(false)
  const onResizeStart = () => setResizing(true)
  const onResizeStop = () => setResizing(false)
  const classes = useStyles({ resizing })

  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)

  const mainRef = useRef(null)

  const [isShowScrollUpButton, setIshShowScrollUpButton] = useState(null)

  const handleScrollMain = useCallback(
    (e) => {
      const scrollTop = e.target.scrollTop
      const clientHeight = e.target.clientHeight
      dispatch(appBarInversionChangeState(scrollTop > 150))
      setIshShowScrollUpButton(scrollTop + clientHeight / 2 > clientHeight)
    },
    [dispatch]
  )

  useEffect(() => {
    mainRef.current.scrollTop = 0
  }, [selectedCategory])

  return (
    <div className={classes.root}>
      <Resizable
        className="resizable-category"
        defaultSize={{
          width: 288,
          height: '100vh',
        }}
        minWidth={288}
        maxWidth={388}
        handleClasses={{ right: 'resize-handler' }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        style={{ backgroundColor: '#fff' }}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      >
        <CategoryList />
      </Resizable>
      <main className={classes.main} onScroll={handleScrollMain} ref={mainRef}>
        <AppBar />
        <LinkDropZone />
        <LinkList />
        <ScrollUpButton targetRef={mainRef} open={isShowScrollUpButton} />
      </main>
    </div>
  )
}
