import React from 'react'

import useStyles from './style'

function FirstCategoryDropZone({ openDropZone, handleDragFunctions }) {
  const classes = useStyles()
  const { handleDragDrop, handleDragOverFirstCategory } = handleDragFunctions

  return (
    <div
      className={openDropZone ? classes.categoryDropZone : classes.hidden}
      data-dropzone="first-cateogory-dropzone"
      onDragOver={handleDragOverFirstCategory}
      onDrop={handleDragDrop()}
    />
  )
}

export default FirstCategoryDropZone
