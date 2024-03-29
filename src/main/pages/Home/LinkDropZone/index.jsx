import React, { useCallback } from 'react'

import { AddToPhotos as AddToPhotosIcon } from '@mui/icons-material'
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
  const categoryList = useSelector(categorySelector.listData)
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { listData, clearDragData } = useDrag(LINK)
  const { open } = useDropZone(LINK_DROP_ZONE)

  const handleDropOnCardArea = useCallback(
    async (e) => {
      try {
        e.stopPropagation()
        if (!categoryList.length) {
          openToast({ type: 'error', message: '카테고리를 생성해주세요.' })
          return
        }
        if (!selectedCategory.id) {
          openToast({ type: 'error', message: '링크를 저장할 카테고리를 만들거나 선택해주세요.' })
          return
        }
        const path = listData.reduce((prev, data) => prev.concat(data.path), [])
        await dispatch(linkCreateThunk({ categoryId: selectedCategory.id, path }))
        clearDragData()
        dispatch(linksRead.request({ categoryId: selectedCategory.id }, { key: selectedCategory.id }))
        dispatch(categoriesRead.request())
        openToast({ type: 'success', message: '링크가 저장 되었습니다.' })
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [dispatch, listData, openToast, selectedCategory.id, clearDragData, categoryList]
  )

  const handleDragOverOnCardArea = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <div
      className={clsx(classes.coverBackground, {
        [classes.displayNone]: !open,
      })}
      onDrop={handleDropOnCardArea}
      onDragOver={handleDragOverOnCardArea}
    >
      <AddToPhotosIcon className={classes.addLinkIcon} />
    </div>
  )
}

export default LinkDropZone
