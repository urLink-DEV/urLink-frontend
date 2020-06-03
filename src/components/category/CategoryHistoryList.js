/* global chrome */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles/CategoryHistoryList'

export default function CategoryHistoryList(props) {
  const {urlList,setDraggedHistory} = props
  const classes = useStyles()

  const dragStart = (e, path) => {
    const target = e.currentTarget
    setDraggedHistory(target)
    if(target.classList.contains('history-list')){
      e.dataTransfer.setData('text/link', path)
      e.dataTransfer.setData('text/type', 'link')
    } else {
      console.warn('dragged wrong target')
    }
  }

  return ( 
    <div className={classes.root}>
      <Typography variant='h4'>방문기록</Typography>
      {urlList.map((url, idx) => {
          return <div key={idx} className={classes.urlDiv}>
            <Typography 
            variant="body2" 
            data-type='link' 
            className='history-list'
            draggable='true'
            onDragStart={(e) => dragStart(e, url.path)}
            >
              {url.path}
            </Typography>
          </div>
      })}
    </div>
  )
}