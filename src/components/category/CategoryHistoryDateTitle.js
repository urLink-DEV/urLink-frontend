import React from 'react'
import useStyles from './styles/CategoryHistoryDateTitle'

export default function CategoryHistoryDateTitle(props) {
  const classes = useStyles()
  const { link } = props

  const curDate = new Date().toLocaleDateString()
  const linkDate = new Date(link.lastVisitTime).toLocaleDateString()
  let date = linkDate
  if (curDate === linkDate) date = "오늘"

  if (link.first) {
    return (
      <div className={classes.root}>
        <span className={classes.title}>{date}</span><span className={classes.line}></span>
      </div>
    )
  }
  else return ""
} 