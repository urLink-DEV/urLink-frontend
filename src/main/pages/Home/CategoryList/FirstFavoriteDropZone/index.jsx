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
      <h1 className={classes.title}> 자주 사용하는 카테고리 등록</h1>
    </div>
  )
}

export default FirstFavoriteDropZone
