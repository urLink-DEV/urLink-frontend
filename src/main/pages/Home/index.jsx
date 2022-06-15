import React, { useCallback, useState } from 'react'

import { Resizable } from 're-resizable'
import { useDispatch } from 'react-redux'

import { useAlarmNoticeConnection } from '@/modules/alarmNotice'
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

  const handleScroll = useCallback(
    (e) => {
      const scrollTop = e.target.scrollTop
      dispatch(appBarInversionChangeState(scrollTop > 200))
    },
    [dispatch]
  )

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
      <main className={classes.main} onScroll={handleScroll}>
        <AppBar />
        <LinkDropZone />
        <LinkList />
      </main>
    </div>
  )
}
