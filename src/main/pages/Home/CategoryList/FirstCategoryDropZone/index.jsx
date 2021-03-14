import React from 'react'

import useStyles from './style'

function FirstCategoryDropZone({ openDropZone, handleDragDrop, handleDragOverFirstCategory }) {
  const classes = useStyles()

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
