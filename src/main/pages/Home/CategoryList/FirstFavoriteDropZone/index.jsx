import React from 'react'

import useStyles from './style'

function FirstFavoriteDropZone({ handleDragDrop, handleDragOverFirstFavorite }) {
  const classes = useStyles()

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
