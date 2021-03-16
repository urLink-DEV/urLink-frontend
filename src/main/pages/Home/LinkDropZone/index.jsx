import React, { useCallback } from 'react'

import { AddToPhotos as AddToPhotosIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { categoriesRead, categorySelector } from '@modules/category'
import { linkCreateThunk, linksRead } from '@modules/link'
import { useToast } from '@modules/ui'
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui'

import useStyles from './style'

const { LINK } = DRAG
const { LINK_DROP_ZONE } = DROP_ZONE

function LinkDropZone() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { listData } = useDrag(LINK)
  const { open } = useDropZone(LINK_DROP_ZONE)

  const handleDropOnCardArea = useCallback(
    async (e) => {
      try {
        e.stopPropagation()
        const path = listData.reduce((prev, data) => prev.concat(data.path), [])
        await dispatch(linkCreateThunk({ categoryId: selectedCategory.id, path }))
        dispatch(linksRead.request({ categoryId: selectedCategory.id }))
        dispatch(categoriesRead.request())
        openToast({ type: 'success', message: '링크가 저장 되었습니다.' })
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [dispatch, listData, openToast, selectedCategory.id]
  )

  const handleDragOverOnCardArea = useCallback((e) => {
    e.preventDefault()
  }, [])

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
