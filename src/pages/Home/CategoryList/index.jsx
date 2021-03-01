import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ErrorIcon from '@material-ui/icons/Error'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CategoryHeader from './CategoryHeader'
import CategoryItemWrapper from './CategoryItemWrapper'
import CategoryItem from './CategoryItem'
import CategoryButtonGroup from './CategoryButtonGroup'
import urlinkLogo from '@images/logo-urlink-full.png'

import useStyles from './style'
import { useToast } from '@modules/ui'
import { DRAG, useDrag } from '@modules/ui'

import {
  useCategories,
  selectSelectedCategory,
  categoriesReadThunk,
  categoryModifyThunk,
} from '@modules/category'

const { CATEGORY } = DRAG

function CategoryList(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { error, favoritedArr, notFavoritedArr } = useCategories()
  const { setDragData, clearDragData, data: dragData } = useDrag(CATEGORY)
  const draggedCategory = useRef(null)
  const { openToast } = useToast()
  const selectedCategory = useSelector(selectSelectedCategory)

  // 추후 삭제 예정
  const {
    setSelectedLinkList,
    draggedHistoryList,
    setDraggedHistoryList,
    isEditCategoryTitle,
    editCategoryTitle,
  } = props

  const {
    draggedId,
    draggedName,
    draggedOrder,
    draggedType,
    dragFinished,
    overedTabOrder,
    overedTabFavorite,
    overedTabId,
  } = dragData

  const [dragHistoryFinished, setDragHistoryFinished] = useState(false)

  const timeId = useRef()

  useEffect(() => {
    if (dragHistoryFinished) {
      // 추후 link 모듈 적용
      // if (overedTabId === selectedCategory?.id) getLink({ category: selectedCategory?.id })
      ;(async function () {
        try {
          await dispatch(categoriesReadThunk())
          timeId.current = setTimeout(() => {
            setDragHistoryFinished(false)
          }, 1000)
        } catch (error) {
          openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
        }
      })()
    }

    return () => clearTimeout(timeId.current)
  }, [dragHistoryFinished])

  const handleDragOverFirstFavorite = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (!overedTabFavorite) {
        setDragData({
          ...dragData,
          overedTabFavorite: true,
          overedTabOrder: draggedOrder,
        })
      }
    },
    [dragData, draggedOrder, overedTabFavorite, setDragData]
  )

  const handleDragOverFirstCategory = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (overedTabFavorite) {
        setDragData({
          ...dragData,
          overedTabFavorite: false,
          overedTabOrder: draggedOrder,
        })
      }
    },
    [dragData, draggedOrder, overedTabFavorite, setDragData]
  )

  const handleDragStart = useCallback(
    (e, id, name, order) => {
      e.stopPropagation()
      const target = e.currentTarget
      if (!target) return
      target.style.opacity = 0.3
      setDragData({
        draggedId: id,
        draggedName: name,
        draggedOrder: order,
        draggedType: 'category',
      })
      draggedCategory.current = target
    },
    [setDragData]
  )

  const handleDragEnd = useCallback(
    async (e) => {
      try {
        e.preventDefault()
        e.stopPropagation()
        if (draggedCategory?.current && e.dataTransfer.dropEffect === 'move') {
          await dispatch(
            categoryModifyThunk({
              id: draggedId,
              name: draggedName,
              order: overedTabOrder,
              is_favorited: overedTabFavorite,
            })
          )
          await dispatch(categoriesReadThunk())
          setDragData({
            ...dragData,
            dragFinished: true,
          })

          draggedCategory.current.style.opacity = 1

          setTimeout(() => {
            clearDragData()
          }, 500)
        } else if (draggedCategory?.current) {
          draggedCategory.current.style.opacity = 1
        }
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [
      clearDragData,
      dispatch,
      dragData,
      openToast,
      setDragData,
      draggedId,
      draggedName,
      overedTabOrder,
      overedTabFavorite,
    ]
  )

  const handleDragOver = useCallback(
    (e, id, order, favorited) => {
      e.preventDefault()
      e.stopPropagation()
      if (draggedHistoryList?.length !== 0 && draggedType === 'link' && !draggedCategory?.current) {
        if (id !== overedTabId) {
          setDragData({
            ...dragData,
            overedTabId: id,
          })
          e.dataTransfer.dropEffect = 'move'
        }
      } else if (draggedType === 'category' && draggedCategory?.current) {
        if (order !== overedTabOrder) {
          setDragData({
            ...dragData,
            overedTabOrder: order,
            overedTabFavorite: favorited,
          })
          e.dataTransfer.dropEffect = 'move'
        }
        e.currentTarget.previousSibling.style.opacity = 1
      }
    },
    [dragData, draggedHistoryList, draggedType, overedTabId, overedTabOrder, setDragData]
  )

  const handleDragLeave = (e) => {
    e.currentTarget.previousSibling.style.opacity = 0
  }

  const handleDragDrop = useCallback(
    (e) => {
      e.stopPropagation()
      // 추후 link state 가져와서 적용
      // const filteredLinkList = [];
      // selectedLinkList.forEach((link) => filteredLinkList.push(link.path));

      if (draggedType === 'category') {
        e.preventDefault()
        if (e.currentTarget.dataset.dropzone) {
          const dropzone = e.currentTarget.dataset.dropzone
          if (dropzone === 'first-favorite-dropzone' || dropzone === 'first-category-dropzone') {
            e.currentTarget.previousSibling.style.opacity = 1
          }
        } else {
          e.currentTarget.previousSibling.style.opacity = 0
        }
      } else if (draggedType === 'link') {
        e.preventDefault()
        // 추후 link 모듈 적용
        // writeLink({ category: overedTabId, path: filteredLinkList }).then(() =>
        //   setDragHistoryFinished(true)
        // );
        setSelectedLinkList([])
        setDraggedHistoryList([])
      }
    },
    [draggedType, setDraggedHistoryList, setSelectedLinkList]
  )

  const handleDragFunctions = {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
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
                {!favoritedArr?.length && (
                  <div
                    className={classes.firstFavoriteDropZone}
                    data-dropzone="first-favorite-dropzone"
                    onDragOver={handleDragOverFirstFavorite}
                    onDrop={handleDragDrop}
                  >
                    Drag the category here!
                  </div>
                )}
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
                        dragFinished={data.id === draggedId ? dragFinished : false}
                        historyDragFinished={
                          dragHistoryFinished && data.id === overedTabId ? true : false
                        }
                        selectedCategoryTitle={
                          isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name
                        }
                      />
                    </CategoryItemWrapper>
                  ))}
                </List>
                <CategoryHeader type="category" />
                <CategoryButtonGroup />
                <div
                  className={
                    !notFavoritedArr?.length ? classes.hiddenCategoryDropZone : classes.hidden
                  }
                  data-dropzone="first-cateogory-dropzone"
                  onDragOver={handleDragOverFirstCategory}
                  onDrop={handleDragDrop}
                />
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
                        dragFinished={data.id === draggedId ? dragFinished : false}
                        historyDragFinished={
                          dragHistoryFinished && data.id === overedTabId ? true : false
                        }
                        selectedCategoryTitle={
                          isEditCategoryTitle ? editCategoryTitle : selectedCategory?.name
                        }
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
