/* global chrome */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#f6f6f6',
    padding: '5%',
    marginRight: '3%',
  },
  urlDiv: {
    width: '100%',
    height: '32px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '10px 0'
  }
}))

export default function CategoryHistoryPage(props) {
  const {urlList} = props
  const classes = useStyles()

  return ( 
    <div className={classes.root}>
      <Typography variant='h4'>방문기록</Typography>
      {urlList.map(url => {
          return <div className={classes.urlDiv}>
            {url.url}
          </div>
      })}
    </div>
  )
}