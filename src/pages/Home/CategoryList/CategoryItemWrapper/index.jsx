import React from 'react'
import useStyles from './style'
// import { DROP_ZONE, useDropZone } from '@modules/ui'

// const { CATEGORY_DROP_ZONE } = DROP_ZONE

function CategoryItemWrapper({ data, handleDragFunctions, draggedOrder, children }) {
  const classes = useStyles()
  const {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
    handleDragEnd,
  } = handleDragFunctions

  // const { open, toggle, close } = useDropZone(CATEGORY_DROP_ZONE)

  return (
    <React.Fragment>
      <div className={classes.dragline} />
      <div
        data-type="category"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, data.id, data.name, data.order)}
        onDragOver={(e) =>
          handleDragOver(
            e,
            data.id,
            draggedOrder < data.order ? data.order - 1 : data.order,
            data.is_favorited
          )
        }
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        onDragEnd={handleDragEnd}
      >
        {children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(CategoryItemWrapper)
