import React from 'react'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import useStyles from './style'

function Main({title}) {

  const classes = useStyles();

  return (
    <>
      <LinkDropZone />
      <main className={classes.content}>
        <div position="static">
          <Header title={title} />
        </div>
      </main>
    </>
  )
}

export default Main