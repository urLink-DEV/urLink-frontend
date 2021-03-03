import React from 'react'
import useStyles from './style'

function FirstFavoriteDropZone({ handleDragFunctions }) {
  const classes = useStyles()
  const { handleDragDrop, handleDragOverFirstFavorite } = handleDragFunctions

  return (
    <div
      className={classes.firstFavoriteDropZone}
      data-dropzone="first-favorite-dropzone"
      onDragOver={handleDragOverFirstFavorite}
      onDrop={handleDragDrop()}
    >
      Drag the category here!
    </div>
  )
}

export default FirstFavoriteDropZone
