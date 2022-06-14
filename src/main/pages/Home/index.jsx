import React, { useState } from 'react'

import { Resizable } from 're-resizable'
import { Controller } from 'react-scrollmagic'

import { useAlarmNoticeConnection } from '@/modules/alarmNotice'

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

  return (
    <Controller>
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
          <AppBar />
          <LinkDropZone />
          <LinkList />
        </main>
      </div>
    </Controller>
  )
}
