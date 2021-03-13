import React from 'react'

import CategoryAppBar from '@main/pages/Home/AppBar'
import CategoryList from '@main/pages/Home/CategoryList'
import LinkDropZone from '@main/pages/Home/LinkDropZone'
import LinkList from '@main/pages/Home/LinkList'

import useStyles from './style'

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <section>
        <CategoryList />
      </section>
      <main className={classes.main}>
        <LinkDropZone />
        <LinkList />
      </main>
      <section>
        <CategoryAppBar />
      </section>
    </div>
  )
}
