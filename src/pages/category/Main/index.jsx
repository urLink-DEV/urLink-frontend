import React from 'react'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import useStyles from './style'

function Main({title}) {

  const classes = useStyles();

  return (
    <>
      <LinkDropZone />
      <Header title={title} />
    </>
  )
}

export default Main