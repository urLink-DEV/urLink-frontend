import React, { useCallback } from 'react'

import { AddToPhotos as AddToPhotosIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { categorySelector, categoriesReadThunk } from '@modules/category'
import { linkCreateThunk, linksRead } from '@modules/link'
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui'

import useStyles from './style'

const { LINK } = DRAG
const { LINK_DROP_ZONE } = DROP_ZONE

function LinkDropZone() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { listData } = useDrag(LINK)
  const { open } = useDropZone(LINK_DROP_ZONE)

  const dispatchLinkCreate = useCallback(async () => {
    const promises = []
    listData.forEach((link) =>
      promises.push(
        dispatch(
          linkCreateThunk({
            categoryId: selectedCategory.id,
            path: link.path,
          })
        )
      )
    )
    return Promise.all(promises)
  }, [dispatch, selectedCategory, listData])

  const handleDropOnCardArea = async (e) => {
    e.stopPropagation()
    await dispatchLinkCreate()
    dispatch(categoriesReadThunk())
    dispatch(linksRead.request({ categoryId: selectedCategory.id }))
  }

  const handleDragOverOnCardArea = (e) => {
    e.preventDefault()
  }

  return (
    <div
      className={clsx(classes.coverBackground, {
        [classes.diplayNone]: !open,
      })}
      onDrop={handleDropOnCardArea}
      onDragOver={handleDragOverOnCardArea}
    >
      <AddToPhotosIcon className={classes.addLinkIcon} />
    </div>
  )
}

export default LinkDropZone
