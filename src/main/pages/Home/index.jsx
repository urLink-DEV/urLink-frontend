import React from 'react'

import { useAlarmNoticeConnection } from '@/modules/alarmNotice'
import CategoryAppBar from '@main/pages/Home/AppBar'
import CategoryList from '@main/pages/Home/CategoryList'
import LinkDropZone from '@main/pages/Home/LinkDropZone'
import LinkList from '@main/pages/Home/LinkList'

import useStyles from './style'

export default function Home() {
  useAlarmNoticeConnection()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <section className={classes.categoryList}>
        <CategoryList />
      </section>
      <main className={classes.main}>
        <LinkDropZone />
        <LinkList />
      </main>
      <section className={classes.appBar}>
        <CategoryAppBar />
      </section>
    </div>
  )
}
