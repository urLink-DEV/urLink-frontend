import React, { useState, useRef, useCallback } from 'react'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ErrorIcon from '@material-ui/icons/Error'
import { useDispatch, useSelector } from 'react-redux'

import urlinkLogo from '@assets/images/logo-urlink-full.png'
import { useCategories, selectSelectedCategory, categoriesReadThunk, categoryModifyThunk } from '@modules/category'
import { linkCreateThunk } from '@modules/link'
import { useToast } from '@modules/ui'
import { DRAG, useDrag } from '@modules/ui'

import CategoryButtonGroup from './CategoryButtonGroup'
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import CategoryItemWrapper from './CategoryItemWrapper'
import FirstCategoryDropZone from './FirstCategoryDropZone'
import FirstFavoriteDropZone from './FirstFavoriteDropZone'
import useStyles from './style'

const { CATEGORY } = DRAG

function CategoryList(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { error, favoritedArr, notFavoritedArr } = useCategories()
  const selectedCategory = useSelector(selectSelectedCategory)
  const { setDragData, clearDragData, dragType, data: dragData, listData } = useDrag(CATEGORY)
  const draggedCategory = useRef(null)
  const { openToast } = useToast()
  const [linkHoverTabId, setLinkHoverTabId] = useState(null)

  // 추후 삭제 예정
  const { isEditCategoryTitle, editCategoryTitle } = props

  const { draggedId, draggedName, draggedOrder, dragFinished, hoverTabOrder, hoverTabFavorite, hoverTabId } = dragData

  const dispatchLinkCreate = useCallback(async () => {
    const promises = []
    listData.forEach((link) =>
      promises.push(
        dispatch(
          linkCreateThunk({
            categoryId: linkHoverTabId,
            path: link.path,
          })
        )
      )
    )
    return Promise.all(promises)
  }, [dispatch, linkHoverTabId, listData])

  const handleDragOverFirstFavorite = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (!hoverTabFavorite) {
        setDragData({
          ...dragData,
          hoverTabFavorite: true,
          hoverTabOrder: draggedOrder,
        })
      }
    },
    [dragData, draggedOrder, hoverTabFavorite, setDragData]
  )

  const handleDragOverFirstCategory = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (hoverTabFavorite) {
        setDragData({
          ...dragData,
          hoverTabFavorite: false,
          hoverTabOrder: draggedOrder,
        })
      }
    },
    [dragData, draggedOrder, hoverTabFavorite, setDragData]
  )

  const handleDragStart = useCallback(
    (id, name, order, ref) => (e) => {
      e.stopPropagation()
      if (!ref.current) return
      ref.current.style.opacity = 0.3
      setDragData({
        draggedId: id,
        draggedName: name,
        draggedOrder: order,
      })
      draggedCategory.current = ref.current
    },
    [setDragData]
  )

  const handleDragOver = useCallback(
    (id, order, favorited, ref) => (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (dragType === 'link' && !!listData?.length) {
        if (id !== linkHoverTabId) {
          setLinkHoverTabId(id)
        }
      } else if (dragType === 'category' && draggedCategory?.current) {
        if (order !== hoverTabOrder) {
          setDragData({
            ...dragData,
            hoverTabOrder: order,
            hoverTabFavorite: favorited,
          })
        }
        ref.current.style.opacity = 1
      }
    },
    [dragData, listData, dragType, linkHoverTabId, hoverTabOrder, setDragData]
  )

  const handleDragLeave = (ref) => () => {
    ref.current.style.opacity = 0
  }

  const handleDragEnd = useCallback(() => {
    draggedCategory.current.style.opacity = 1
  }, [draggedCategory])

  const handleDragDrop = useCallback(
    (ref) => async (e) => {
      e.stopPropagation()
      e.preventDefault()
      try {
        if (dragType === 'category') {
          if (ref) ref.current.style.opacity = 0

          if (draggedCategory?.current) {
            await dispatch(
              categoryModifyThunk({
                id: draggedId,
                name: draggedName,
                order: hoverTabOrder,
                is_favorited: hoverTabFavorite,
              })
            )
            await dispatch(categoriesReadThunk())
            setDragData({
              ...dragData,
              dragFinished: true,
            })
          }
        } else if (dragType === 'link') {
          await dispatchLinkCreate()
          await dispatch(categoriesReadThunk())
          setDragData({
            dragFinished: true,
          })
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
      clearDragData,
      dispatchLinkCreate,
      openToast,
      dispatch,
      dragData,
      setDragData,
      dragType,
      draggedId,
      draggedName,
      hoverTabOrder,
      hoverTabFavorite,
    ]
  )

  const handleDragFunctions = {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
    handleDragEnd,
    handleDragOverFirstFavorite,
    handleDragOverFirstCategory,
  }

  return (
    <div>
      <nav className={classes.drawer}>
        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
          {error ? (
            <div className={classes.flexCenterBackground}>
              <ErrorIcon color="primary" fontSize="large" />
              <p>카테고리를 불러오지 못했습니다.</p>
            </div>
          ) : (
            <div>
              <div className={classes.layout}>
                <img className={classes.logo} src={urlinkLogo} alt="URLink" />
                <CategoryHeader type="favorite" />
                {!favoritedArr?.length && <FirstFavoriteDropZone handleDragFunctions={handleDragFunctions} />}
                <List>
                  {favoritedArr?.map((data) => (
                    <CategoryItemWrapper
                      key={data.id}
                      data={data}
                      handleDragFunctions={handleDragFunctions}
                      draggedOrder={draggedOrder}
                    >
                      <CategoryItem
                        data={data}
                        selected={data.id === selectedCategory?.id}
                        isEditTitle={isEditCategoryTitle}
                        dragFinished={data.id === draggedId || data.id === linkHoverTabId ? dragFinished : false}
                        selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name}
                      />
                    </CategoryItemWrapper>
                  ))}
                </List>
                <CategoryHeader type="category" />
                <CategoryButtonGroup />
                <FirstCategoryDropZone notFavoritedArr={notFavoritedArr} handleDragFunctions={handleDragFunctions} />
                <List>
                  {notFavoritedArr?.map((data) => (
                    <CategoryItemWrapper
                      key={data.id}
                      data={data}
                      handleDragFunctions={handleDragFunctions}
                      draggedOrder={draggedOrder}
                    >
                      <CategoryItem
                        data={data}
                        selected={data.id === selectedCategory?.id}
                        isEditTitle={isEditCategoryTitle}
                        dragFinished={data.id === draggedId || data.id === linkHoverTabId ? dragFinished : false}
                        selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name}
                      />
                    </CategoryItemWrapper>
                  ))}
                </List>
              </div>
            </div>
          )}
        </Drawer>
      </nav>
    </div>
  )
}

export default CategoryList
