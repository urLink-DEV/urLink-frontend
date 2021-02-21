import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ErrorIcon from '@material-ui/icons/Error'
// import CircularProgress from '@material-ui/core/CircularProgress'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import CategoryButtonGroup from './CategoryButtonGroup'
import urlinkLogo from '@images/logo-urlink-full.png'

import { useStyles } from './style'
import { useToast } from '@modules/ui'
import { DRAG, useDrag } from '@modules/ui'

import {
  useCategories,
  selectSelectedCategory,
  categoriesReadThunk,
  categoryModifyThunk,
} from '@modules/category'

const { CATEGORY } = DRAG

export default function CategoryList(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { error, favoritedArr, notFavoritedArr } = useCategories()
  const { setDragData, clearDragData, listData } = useDrag(CATEGORY)
  const [draggedCategory, setDraggedCategory] = useState(null)
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

  const { draggedId, draggedName, draggedOrder, dragFinished } = listData
  const [overedTabOrder, setOveredTabOrder] = useState(0)
  const [overedTabFavorite, setOveredTabFavorite] = useState(null)
  const [overedTabId, setOveredTabId] = useState(0)

  const [dragHistoryFinished, setDragHistoryFinished] = useState(false)

  const timeId = useRef()

  useEffect(() => {
    if (dragHistoryFinished) {
      // 추후 link 모듈 적용
      // if (overedTabId === selectedCategory?.id) getLink({ category: selectedCategory?.id });
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

  const firstFavoriteDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(true)
  }

  const firstCategoryDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(false)
  }

  const dragStart = (e, id, name, order) => {
    e.stopPropagation()
    const target = e.currentTarget
    if (!target) return
    target.style.opacity = 0.3
    e.dataTransfer.dropEffect = 'move'
    setDragData({
      draggedId: id,
      draggedName: name,
      draggedOrder: order,
    })
    setDraggedCategory(target)

    e.dataTransfer.setData('text/html', target)
    e.dataTransfer.setData('text/type', 'category')
    e.dataTransfer.effectAllowed = 'move'
  }

  const dragEnd = async (e, id, name, order, favorited) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      if (draggedCategory && e.dataTransfer.dropEffect === 'move') {
        await dispatch(categoryModifyThunk({ id, name, order, is_favorited: favorited }))
        await dispatch(categoriesReadThunk())
        setDragData({
          ...listData,
          dragFinished: true,
        })

        draggedCategory.style.opacity = 1

        setTimeout(() => {
          clearDragData()
          setOveredTabOrder(0)
          setOveredTabFavorite(null)
        }, 1000)
      } else if (draggedCategory) {
        draggedCategory.style.opacity = 1
      }
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  const dragOver = (e, id, order, favorited) => {
    e.preventDefault()
    e.stopPropagation()
    if (
      draggedHistoryList?.length !== 0 &&
      draggedHistoryList?.[0]?.dataset?.type === 'link' &&
      !draggedCategory
    ) {
      setOveredTabId(id)
      e.dataTransfer.dropEffect = 'move'
    } else if (draggedCategory?.dataset?.type === 'category' && draggedCategory) {
      setOveredTabOrder(order)
      setOveredTabFavorite(favorited)

      e.currentTarget.previousSibling.style.opacity = 1
      e.dataTransfer.dropEffect = 'move'
    }
  }

  const dragLeave = (e) => {
    e.currentTarget.previousSibling.style.opacity = 0
  }

  const drop = (e) => {
    e.stopPropagation()
    const type = e.dataTransfer.getData('text/type')
    // 추후 link state 가져와서 적용
    // const filteredLinkList = [];
    // selectedLinkList.forEach((link) => filteredLinkList.push(link.path));

    if (type === 'category') {
      e.preventDefault()
      if (e.currentTarget.dataset.dropzone) {
        const dropzone = e.currentTarget.dataset.dropzone
        if (dropzone === 'first-favorite-dropzone' || dropzone === 'first-category-dropzone') {
          e.currentTarget.previousSibling.style.opacity = 1
        }
      } else {
        e.currentTarget.previousSibling.style.opacity = 0
      }
    } else if (type === 'link') {
      e.preventDefault()
      // 추후 link 모듈 적용
      // writeLink({ category: overedTabId, path: filteredLinkList }).then(() =>
      //   setDragHistoryFinished(true)
      // );
      setSelectedLinkList([])
      setDraggedHistoryList([])
    }
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
                {favoritedArr?.length !== 0 ? null : (
                  <FirstFavoriteDropZone
                    className={classes.firstFavoriteDropZone}
                    data-dropzone="first-favorite-dropzone"
                    onDragOver={firstFavoriteDragOver}
                    onDrop={(e) =>
                      drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)
                    }
                  >
                    Drag the category here!
                  </FirstFavoriteDropZone>
                )}
                <List>
                  {favoritedArr?.map((data) => (
                    <>
                      <div className={classes.dragline} />
                      <CategoryItemWrapper
                        className={
                          classes.listItem +
                          (data.id === selectedCategory?.id ? ' ' + classes.selected : '')
                        }
                        key={data.id}
                        data-type="category"
                        draggable="true"
                        onDragStart={(e) => dragStart(e, data.id, data.name, data.order)}
                        onDragEnd={(e) =>
                          dragEnd(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)
                        }
                        onDragOver={(e) =>
                          dragOver(
                            e,
                            data.id,
                            draggedOrder < data.order ? data.order - 1 : data.order,
                            data.is_favorited
                          )
                        }
                        onDragLeave={dragLeave}
                        onDrop={drop}
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
                    </>
                  ))}
                </List>
                <CategoryHeader type="category" />
                <CategoryButtonGroup />
                <NotFavoriteDropZone
                  className={
                    !notFavoritedArr?.length ? classes.hiddenCategoryDropZone : classes.hidden
                  }
                  data-dropzone="first-cateogory-dropzone"
                  onDragOver={firstCategoryDragOver}
                  onDrop={(e) => drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)}
                />
                <List>
                  {notFavoritedArr?.map((data) => (
                    <>
                      <div className={classes.dragline} />
                      <CategoryItemWrapper
                        className={
                          classes.listItem +
                          (data.id === selectedCategory?.id ? ' ' + classes.selected : '')
                        }
                        key={data.id}
                        data-type="category"
                        draggable="true"
                        onDragStart={(e) => dragStart(e, data.id, data.name, data.order)}
                        onDragEnd={(e) =>
                          dragEnd(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)
                        }
                        onDragOver={(e) =>
                          dragOver(
                            e,
                            data.id,
                            draggedOrder < data.order ? data.order - 1 : data.order,
                            data.is_favorited
                          )
                        }
                        onDragLeave={dragLeave}
                        onDrop={drop}
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
                    </>
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

const FirstFavoriteDropZone = styled.div``
const NotFavoriteDropZone = styled.div``
const CategoryItemWrapper = styled.div``
