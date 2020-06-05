/* global chrome */
import React, { useState,useEffect, useRef} from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles/CategoryHistoryList'

export default function CategoryHistoryList(props) {
  const {urlList,setDraggedHistory} = props
  const classes = useStyles()
  const [draggedId, setDraggedId] = useState(0)
  const [dragFinished, setDragFinished] = useState(false)

  const dragStart = (e, id, path) => {
    const target = e.currentTarget
    setDraggedId(id)
    setDraggedHistory(target)

    if(target.classList.contains('history-list')){
      e.dataTransfer.setData('text/link', path)
      e.dataTransfer.setData('text/type', 'link')
    } else {
      console.warn('dragged wrong target')
    }
  }

  const dragEnd = (e) => {
    e.preventDefault()
    setDragFinished(true)
  }

  const timeId = useRef()

  useEffect(() => {
    //setTimeout
    if(dragFinished) {
      timeId.current = setTimeout(() => {
        setDragFinished(false)
      }, 600)
    } 

    return () => {
      //clearTimeout
      clearTimeout(timeId.current)
    }

  },[dragFinished])

  return ( 
    <div className={classes.root}>
      <Typography variant='h4'>방문기록</Typography>
      {urlList.map((url) => {
          return <div key={url.id} className={classes.urlDiv}>
            <Typography 
            variant="body2" 
            data-type='link' 
            className={classes.urlText + ' history-list ' + (url.id === draggedId && dragFinished ? 'drag-finish' : '')}
            draggable='true'
            onDragStart={(e) => dragStart(e, url.id, url.path)}
            onDragEnd={(e) => dragEnd(e)}
            >
              {url.path}
            </Typography>
          </div>
      })}
    </div>
  )
}