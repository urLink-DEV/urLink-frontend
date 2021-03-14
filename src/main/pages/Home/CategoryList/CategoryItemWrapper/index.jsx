import React, { useRef } from 'react'

import { DRAG } from '@modules/ui'

import useStyles from './style'
const { CATEGORY } = DRAG

function CategoryItemWrapper({
  data,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDragDrop,
  handleDragEnd,
  children,
}) {
  const classes = useStyles()

  const dragLineRef = useRef(null)
  const categoryRef = useRef(null)

  return (
    <React.Fragment>
      <div className={classes.dragline} ref={dragLineRef} />
      <div
        ref={categoryRef}
        data-type={CATEGORY}
        draggable="true"
        onDragStart={handleDragStart(data, categoryRef)}
        onDragOver={handleDragOver(data, dragLineRef)}
        onDragLeave={handleDragLeave(dragLineRef)}
        onDrop={handleDragDrop(dragLineRef)}
        onDragEnd={handleDragEnd}
      >
        {children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(CategoryItemWrapper)
