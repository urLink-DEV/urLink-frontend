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
    >
      <h1 className={classes.title}> 카테고리를 생성해주세요.</h1>
    </div>
  )
}

export default FirstCategoryDropZone
