import React from 'react'
import useStyles from './style'

function CategoryItemWrapper({ data, handleDragFunctions, draggedOrder, children }) {
  const classes = useStyles()
  const {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
  } = handleDragFunctions

  return (
    <React.Fragment>
      <div className={classes.dragline} />
      <div
        data-type="category"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, data.id, data.name, data.order)}
        onDragEnd={handleDragEnd}
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
      >
        {children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(CategoryItemWrapper)
