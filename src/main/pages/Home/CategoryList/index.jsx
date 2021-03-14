import React, { useState, useRef, useCallback } from 'react'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ErrorIcon from '@material-ui/icons/Error'
import { useDispatch, useSelector } from 'react-redux'

import urlinkLogo from '@assets/images/logo-urlink-full.png'
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

function CategoryList(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { error, favoritedArr, notFavoritedArr } = useCategories()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { setDragData, clearDragData, dragType, data: dragData } = useDrag(CATEGORY)
  const { listData: linkListData } = useDrag(LINK)
  const { openToast } = useToast()

  const { isEditCategoryTitle, editCategoryTitle } = props // 추후 삭제 예정
  const draggedCategoryRef = useRef(null)
  const [linkHoverTabId, setLinkHoverTabId] = useState(null)

  const handleDragOverFirstFavorite = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (!dragData.is_favorited) {
        setDragData({
          ...dragData,
          order: 1,
          is_favorited: true,
        })
      }
    },
    [dragData, setDragData]
  )

  const handleDragOverFirstCategory = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (dragData.is_favorited) {
        setDragData({
          ...dragData,
          order: 1,
          is_favorited: false,
        })
      }
    },
    [dragData, setDragData]
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
        setLinkHoverTabId(tagetCategoryData.id)
      } else if (dragType === CATEGORY) {
        const order = dragData.order < tagetCategoryData.order ? tagetCategoryData.order - 1 : tagetCategoryData.order
        setDragData({
          ...dragData,
          order,
          is_favorited: tagetCategoryData.is_favorited,
        })
        dragLineRef.current.style.opacity = 1
      }
    },
    [dragData, dragType, setDragData]
  )

  const handleDragLeave = useCallback(
    (dragLineRef) => () => {
      dragLineRef.current.style.opacity = 0
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
              order: dragData.order,
              is_favorited: dragData.is_favorited,
            })
          )
          await dispatch(categoriesReadThunk())
          setDragData({ ...dragData, dragFinished: true })
        } else if (dragType === LINK) {
          const path = linkListData.reduce((prev, data) => prev.concat(data.path), [])
          await dispatch(linkCreateThunk({ categoryId: linkHoverTabId, path }))
          if (selectedCategory?.id === linkHoverTabId) dispatch(linksRead.request({ categoryId: linkHoverTabId }))
          await dispatch(categoriesReadThunk())
          setDragData({ ...dragData, dragFinished: true })
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
      clearDragData,
      openToast,
    ]
  )

  return (
    <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant="permanent" open>
      {error ? (
        <div className={classes.flexCenterBackground}>
          <ErrorIcon color="primary" fontSize="large" />
          <p>카테고리를 불러오지 못했습니다.</p>
        </div>
      ) : (
        <div>
          <div className={classes.layout}>
            <img className={classes.logo} src={urlinkLogo} alt="URLink logo" />
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
                    isEditTitle={isEditCategoryTitle}
                    dragFinished={dragData.dragFinished && data.id === dragData.id}
                    selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name}
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
                    isEditTitle={isEditCategoryTitle}
                    dragFinished={dragData.dragFinished && data.id === dragData.id}
                    selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name}
                  />
                </CategoryItemWrapper>
              ))}
            </List>
          </div>
        </div>
      )}
    </Drawer>
  )
}

export default CategoryList
