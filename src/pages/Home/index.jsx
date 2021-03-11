import React from 'react'
import useStyles from './style'

import CategoryAppBar from '@pages/Home/AppBar'
import CategoryList from '@pages/Home/CategoryList'
import LinkList from '@pages/Home/LinkList'
import LinkDropZone from '@pages/Home/LinkList/LinkDropZone'

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
