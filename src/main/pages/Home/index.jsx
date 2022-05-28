import React, { useState } from 'react'

import { Resizable } from 're-resizable'

import { useAlarmNoticeConnection } from '@/modules/alarmNotice'
import CategoryList from '@main/pages/Home/CategoryList'
import LinkDropZone from '@main/pages/Home/LinkDropZone'
import LinkList from '@main/pages/Home/LinkList'

import useStyles from './style'

export default function Home() {
  useAlarmNoticeConnection()
  const [resizing, setResizing] = useState(false)
  const onResizeStart = () => setResizing(true)
  const onResizeStop = () => setResizing(false)
  const classes = useStyles({ resizing })

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
      <main className={classes.main}>
        <LinkDropZone />
        <LinkList />
      </main>
    </div>
  )
}
