import React, { useRef } from 'react'

import { DRAG } from '@modules/ui'

import useStyles from './style'
const { CATEGORY } = DRAG

function CategoryItemWrapper({ data, handleDragFunctions, draggedOrder, children }) {
  const classes = useStyles()
  const { handleDragStart, handleDragOver, handleDragLeave, handleDragDrop, handleDragEnd } = handleDragFunctions

  const dragLineRef = useRef(null)
  const categoryRef = useRef(null)

  return (
    <React.Fragment>
      <div className={classes.dragline} ref={dragLineRef} />
      <div
        ref={categoryRef}
        data-type={CATEGORY}
        draggable="true"
        onDragStart={handleDragStart(data.id, data.name, data.order, categoryRef)}
        onDragOver={handleDragOver(
          data.id,
          draggedOrder < data.order ? data.order - 1 : data.order,
          data.is_favorited,
          dragLineRef
        )}
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
