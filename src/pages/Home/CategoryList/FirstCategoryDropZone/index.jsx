import React from 'react'
import useStyles from './style'

function FirstCategoryDropZone({ notFavoritedArr, handleDragFunctions }) {
  const classes = useStyles()
  const { handleDragDrop, handleDragOverFirstCategory } = handleDragFunctions

  return (
    <div
      className={!notFavoritedArr?.length ? classes.hiddenCategoryDropZone : classes.hidden}
      data-dropzone="first-cateogory-dropzone"
      onDragOver={handleDragOverFirstCategory}
      onDrop={handleDragDrop}
    />
  )
}

export default FirstCategoryDropZone
