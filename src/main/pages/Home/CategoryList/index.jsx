import React, { useState, useRef, useCallback } from 'react'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ErrorIcon from '@material-ui/icons/Error'
import { useDispatch, useSelector } from 'react-redux'

import urlinkLogoImg from '@assets/images/logo-urlink-full.png'
import { useCategories, categorySelector, categoriesReadThunk, categoryModifyThunk } from '@modules/category'
import { linkCreateThunk, linksRead } from '@modules/link'
import { useToast } from '@modules/ui'
import { DRAG, useDrag } from '@modules/ui'

import CategoryButtonGroup from './CategoryButtonGroup'
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import CategoryItemWrapper from './CategoryItemWrapper'
import FirstCategoryDropZone from './FirstCategoryDropZone'
import FirstFavoriteDropZone from './FirstFavoriteDropZone'
import useStyles from './style'

const { CATEGORY, LINK } = DRAG

function CategoryList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { error, favoritedArr, notFavoritedArr } = useCategories()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { setDragData, clearDragData, dragType, data: dragData } = useDrag(CATEGORY)
  const { listData: linkListData } = useDrag(LINK)
  const { openToast } = useToast()

  const draggedCategoryRef = useRef(null)
  const [linkHoverTabId, setLinkHoverTabId] = useState(null)
  const [dragOverTabData, setDragOverTabData] = useState({})

  const handleDragOverFirstFavorite = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (dragType === CATEGORY && !dragData.is_favorited) {
        setDragData({
          ...dragData,
          order: 1,
          is_favorited: true,
        })
      }
    },
    [dragData, dragType, setDragData]
  )

  const handleDragOverFirstCategory = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (dragType === CATEGORY && dragData.is_favorited) {
        setDragData({
          ...dragData,
          order: 1,
          is_favorited: false,
        })
      }
    },
    [dragData, dragType, setDragData]
  )

  const handleDragStart = useCallback(
    (categoryData, categoryRef) => (e) => {
      e.stopPropagation()
      if (!categoryRef.current) return
      draggedCategoryRef.current = categoryRef.current
      draggedCategoryRef.current.style.opacity = 0.3
      setDragData({
        ...dragData,
        id: categoryData.id,
        name: categoryData.name,
        order: categoryData.order,
        is_favorited: categoryData.is_favorited,
      })
    },
    [dragData, setDragData]
  )

  const handleDragOver = useCallback(
    (tagetCategoryData, dragLineRef) => (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (dragType === LINK) {
        if (tagetCategoryData.id !== linkHoverTabId) setLinkHoverTabId(tagetCategoryData.id)
      } else if (dragType === CATEGORY) {
        setDragOverTabData({ ...dragOverTabData, ...tagetCategoryData })
        dragLineRef.current.style.opacity = 1
      }
    },
    [dragType, linkHoverTabId, dragOverTabData, setDragOverTabData]
  )

  const handleDragLeave = useCallback(
    (dragLineRef) => () => {
      dragLineRef.current.style.opacity = 0
      setLinkHoverTabId(null)
    },
    []
  )

  const handleDragEnd = useCallback(() => {
    draggedCategoryRef.current.style.opacity = 1
  }, [draggedCategoryRef])

  const handleDragDrop = useCallback(
    (dragLineRef) => async (e) => {
      e.stopPropagation()
      e.preventDefault()
      try {
        if (dragType === CATEGORY) {
          if (dragLineRef) dragLineRef.current.style.opacity = 0

          await dispatch(
            categoryModifyThunk({
              id: dragData.id,
              name: dragData.name,
              order: dragData.order < dragOverTabData.order ? dragOverTabData.order - 1 : dragOverTabData.order,
              is_favorited: dragOverTabData.is_favorited,
            })
          )
          await dispatch(categoriesReadThunk())
          setDragData({ ...dragData, dragFinished: true })
        } else if (dragType === LINK && linkHoverTabId) {
          const path = linkListData.reduce((prev, data) => prev.concat(data.path), [])
          await dispatch(linkCreateThunk({ categoryId: linkHoverTabId, path }))
          if (selectedCategory?.id === linkHoverTabId) dispatch(linksRead.request({ categoryId: linkHoverTabId }))
          await dispatch(categoriesReadThunk())
          setDragData({ ...dragData, dragFinished: true })
          openToast({ type: 'success', message: '링크가 저장 되었습니다.' })
        }
        setTimeout(() => {
          clearDragData()
          setLinkHoverTabId(null)
        }, 500)
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [
      dragType,
      dispatch,
      dragData,
      setDragData,
      linkListData,
      linkHoverTabId,
      selectedCategory?.id,
      dragOverTabData,
      clearDragData,
      openToast,
    ]
  )

  return (
    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent">
      {error ? (
        <div className={classes.flexCenterBackground}>
          <ErrorIcon color="primary" fontSize="large" />
          <p>카테고리를 불러오지 못했습니다.</p>
        </div>
      ) : (
        <>
          <img className={classes.logo} src={urlinkLogoImg} alt="URLink logo" />
          <div className={classes.layout}>
            <CategoryHeader type="favorite" />
            {!favoritedArr?.length && (
              <FirstFavoriteDropZone
                handleDragDrop={handleDragDrop}
                handleDragOverFirstFavorite={handleDragOverFirstFavorite}
              />
            )}
            <List>
              {favoritedArr?.map((data) => (
                <CategoryItemWrapper
                  key={data.id}
                  data={data}
                  draggedOrder={dragData.order}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDragDrop={handleDragDrop}
                  handleDragEnd={handleDragEnd}
                >
                  <CategoryItem
                    data={data}
                    selected={data.id === selectedCategory?.id}
                    hovered={data.id === linkHoverTabId}
                    dragFinished={
                      Boolean(dragData.dragFinished && data.id === linkHoverTabId) ||
                      Boolean(dragData.dragFinished && data.id === dragData.id)
                    }
                  />
                </CategoryItemWrapper>
              ))}
            </List>
            <CategoryHeader type="category" />
            <CategoryButtonGroup />
            <FirstCategoryDropZone
              openDropZone={!Boolean(notFavoritedArr.length)}
              handleDragDrop={handleDragDrop}
              handleDragOverFirstCategory={handleDragOverFirstCategory}
            />
            <List>
              {notFavoritedArr?.map((data) => (
                <CategoryItemWrapper
                  key={data.id}
                  data={data}
                  draggedOrder={dragData.order}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDragDrop={handleDragDrop}
                  handleDragEnd={handleDragEnd}
                >
                  <CategoryItem
                    data={data}
                    selected={data.id === selectedCategory?.id}
                    hovered={data.id === linkHoverTabId}
                    dragFinished={
                      Boolean(dragData.dragFinished && data.id === linkHoverTabId) ||
                      Boolean(dragData.dragFinished && data.id === dragData.id)
                    }
                  />
                </CategoryItemWrapper>
              ))}
            </List>
          </div>
        </>
      )}
    </Drawer>
  )
}

export default CategoryList
