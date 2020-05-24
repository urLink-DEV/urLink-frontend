/* global chrome */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles/CategoryHistoryList'

export default function CategoryHistoryList(props) {
  const {urlList} = props
  const classes = useStyles()

  return ( 
    <div className={classes.root}>
      <Typography variant='h4'>방문기록</Typography>
      {urlList.map((url, idx) => {
          return <div key={idx} className={classes.urlDiv}>
            <Typography variant="body2">{url.url}</Typography>
          </div>
      })}
    </div>
  )
}