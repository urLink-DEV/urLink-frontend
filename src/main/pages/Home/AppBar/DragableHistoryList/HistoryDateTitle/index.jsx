import React from 'react'

import useStyles from './style'

function HistoryDateTitle({ data }) {
  const classes = useStyles()
  const curDate = new Date().toLocaleDateString()
  const linkDate = new Date(data.lastVisitTime).toLocaleDateString()

  if (!data.first) return null
  return (
    <div>
      <span className={classes.title}>{curDate === linkDate ? '오늘' : linkDate}</span>
      <span className={classes.line}></span>
    </div>
  )
}

export default HistoryDateTitle
