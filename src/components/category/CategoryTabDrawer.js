/* global chrome */
import clsx from 'clsx'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import {AlertModal} from '../../components/modal'
import CategoryTab from './CategoryTab'
import useEventListener from '../../hooks/useEventListener'
import {
  useLinkState, 
  useLinkDispatch, 
  useCategoryState, 
  useCategoryDispatch,
} from '../../containers/category/CategoryContainer'
import {useStyles} from './styles/CategoryTabDrawer'

export default function CategoryTabDrawer(props) {

  const { 
    selectedLinkList,
    setSelectedLinkList,
    draggedHistoryList,
    setDraggedHistoryList,
    selectedCategory,
    setSelectedCategory,
    isEditCategoryTitle,
    editCategoryTitle,
  } = props

  const {
    getCategory,
    writeCategory,
    updateCategory,
    deleteCategory
  } = useCategoryDispatch()

  const { 
    getLink, 
    writeLink, 
    deleteLink 
  } = useLinkDispatch()

  const classes = useStyles()
  const categories = useCategoryState()
  const favoritedArr = categories.filter(data => data.is_favorited === true)
  const notFavoritedArr = categories.filter(data => data.is_favorited === false)
  
  const [draggedCategoryData, setDraggedCategoryData] = useState({
    draggedCategory : '',
    draggedId: 0,
    draggedName: '',
    draggedOrder: 0,
    dragFinished: false
  })

  const {draggedCategory, draggedId, draggedName, draggedOrder, dragFinished} = draggedCategoryData  
  const [overedTabOrder, setOveredTabOrder] = useState(0)
  const [overedTabFavorite, setOveredTabFavorite] = useState(null)
  const [overedTabId, setOveredTabId] = useState(0)
  const [addOpen, setAddOpen] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enterOpen, setEnterOpen] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState('')
  const [dragHistoryFinished, setDragHistoryFinished] = useState(false)

  const wrapperRef = useRef(null)
  const listRef = useRef()
  const timeId = useRef()

  const handleClickChangeToAddBtn = useCallback(() => {
    setAddOpen(true)
    setDeleteOpen(false) 
    setEnterOpen(false)
    return 
  })
  useEventListener('click', handleClickChangeToAddBtn)

  useEffect(() => {
    // add Animation when finished dragging
    if(dragFinished) {
      getCategory({})
      .then(() => {
        timeId.current = setTimeout(() => {
          setDraggedCategoryData({
            ...draggedCategoryData,
            dragFinished: false
          })
        }, 1000)  
      })
    } else if(dragHistoryFinished) {
      if(overedTabId === selectedCategory.id) getLink({ category: selectedCategory.id })
      getCategory({})
        .then(() => {
          timeId.current = setTimeout(() => {
            setDragHistoryFinished(false)
          }, 1000)
        })
    }
    return () => {
      // document.removeEventListener("mousedown", handleClickOutside)
      clearTimeout(timeId.current)
    }

  },[wrapperRef, draggedCategory, dragFinished, dragHistoryFinished])
  
  const firstFavoriteDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
    draggedCategory.style.display='none'
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(true)
  }  

  const drop = (e, id, name, order, favorited) => {
    e.stopPropagation()
    const type = e.dataTransfer.getData('text/type')
    const filteredLinkList = [] 
    selectedLinkList.forEach(link => filteredLinkList.push(link.path))

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
      updateCategory({ id, name, order, is_favorited: favorited })
      .then(() =>  setDraggedCategoryData({
        ...draggedCategoryData,
        dragFinished: true
      }))
    } else if (type === 'link') {
      e.preventDefault()
      writeLink({ category: overedTabId, path: filteredLinkList })
        .then(() => setDragHistoryFinished(true))
      setSelectedLinkList([])
      setDraggedHistoryList([])
    } else {
      draggedCategory.style.display='block'
    }
  }

  const handleClickCategory = category => e => {
    e.stopPropagation()
    setAddOpen(false)
    if(addOpen) setDeleteOpen(true)
    setSelectedCategory(category)
  }

  const dragStart = (e, id, name, order) => {
    e.stopPropagation()
    const target = e.currentTarget
    setDraggedCategoryData({
      ...draggedCategoryData,
      draggedCategory: target,
      draggedId: id,
      draggedName: name,
      draggedOrder: order
    })

    e.dataTransfer.setData('text/html', target)
    e.dataTransfer.setData("text/type", 'category')
    e.dataTransfer.effectAllowed = 'move'
  }

  const dragEnd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggedCategoryData({
      ...draggedCategoryData,
      draggedCategory : '',
      draggedId: 0,
      draggedName: '',
      draggedOrder: 0,
    })
      
    if (e.dataTransfer.dropEffect === 'none') {
      draggedCategory.style.display='block'
    }
  }
  
  const dragOver = (e, id, order, favorited) => {
    e.preventDefault()
    e.stopPropagation()
    

    if(draggedHistoryList.length !== 0 && draggedHistoryList[0].dataset.type === 'link' && !draggedCategory) {
      setOveredTabId(id)
    e.dataTransfer.dropEffect = "move"
  } else if(draggedCategory.dataset.type === 'category' && draggedCategory) {
    setOveredTabOrder(order)
    setOveredTabFavorite(favorited)
    draggedCategory.style.display='none'
    e.currentTarget.previousSibling.style.opacity = 1
    e.dataTransfer.dropEffect = "move"
  }
}

const dragLeave = e => {
  e.currentTarget.previousSibling.style.opacity = 0
}

const openEnterTab = e => {
  e.stopPropagation()
  setAddOpen(false)
  setEnterOpen(true)
}
   
const openDeleteModal = e => {
  e.stopPropagation()
  setDeleteOpen(true)
  setDeleteModalOpen(true)
}

const addTab = e => {
  e.stopPropagation()
  if (!newCategoryTitle) {
    setAddOpen(true)
    setEnterOpen(false)
    setNewCategoryTitle('')
  } else {
    setAddOpen(true)
    setEnterOpen(false)
    writeCategory({ name: newCategoryTitle, is_favorited: false })
    .then((res) => {
      setNewCategoryTitle('')
      setSelectedCategory(res.data)
      getCategory({})
      return res.data
    })
  }
}

const handleChangeNewCategoryTitle = e => {
  let checks = /[a-zA-Z]/
  if(checks.test(e.target.value)) {
      if(e.target.value.length >= 14) return
  } else if (e.target.value.length >= 7) return
  setNewCategoryTitle(e.target.value)
}

const pressEnterAddTab = e => {
  e.preventDefault()
  e.stopPropagation()
  if (e.keyCode === 13) {
    addTab(e)
  }
}

const handleClickAddInput = e => {
  e.preventDefault()
  e.stopPropagation()
}

const cancelAddTab = e => {
  e.preventDefault()
  e.stopPropagation()
  setAddOpen(true)
  setEnterOpen(false)
  setNewCategoryTitle('')
}

const firstCategoryDragOver = (e) => {
  e.stopPropagation()
  e.preventDefault()
  draggedCategory.style.display='none'
  setOveredTabOrder(draggedOrder)
  setOveredTabFavorite(false)
}  

const closeDeleteModal = (e) => {
  e.stopPropagation()
  setDeleteModalOpen(false)
  setDeleteOpen(false)
  setAddOpen(true)
}

const deleteTab = (e) => {
  e.stopPropagation()
  deleteCategory({ id: selectedCategory.id })
    .then(() => {
      setSelectedCategory({})
      setDeleteModalOpen(false)
      setDeleteOpen(false)
      setAddOpen(true)
    })
}

const dragOverOnCardArea =(e) => {
  e.stopPropagation()
  e.preventDefault()
  setOveredTabId(selectedCategory.id)
}

const dropOnCardArea = (e) => {
  e.stopPropagation()
  const type = e.dataTransfer.getData('text/type')
  const filteredLinkList = [] 
  selectedLinkList.forEach(link => filteredLinkList.push(link.path))

  if(type === 'link') {
    e.preventDefault()
    writeLink({ category: selectedCategory.id, path: filteredLinkList })
      .then(() => setDragHistoryFinished(true))
    setSelectedLinkList([])
    setDraggedHistoryList([])
  }
}

const FavoriteDropZone  = (
  <div className={classes.firstFavoriteDropZone}
    data-dropzone='first-favorite-dropzone'
    onDragOver={firstFavoriteDragOver}
    onDrop={(e) => drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)}
  >
    Drag the category here!
  </div>
)

return (
  <div>
    <nav className={classes.drawer}>
    <Drawer classes={{paper: classes.drawerPaper}}
      variant="permanent"
      open
    >
    <div>
      <div className={classes.layout} ref={wrapperRef}>
        <div className={classes.favoriteHeader}>
          <div className={classes.favoriteText}>
            Favorite
          </div>
          <hr className={classes.hr}/>
        </div>
        { favoritedArr.length !== 0 ? null : FavoriteDropZone}
        <List ref={listRef}>
          {favoritedArr.map((data, index) => (
            <React.Fragment key={data.id}>
              <div className={classes.dragline} />
              <ListItem className={classes.listItem + (data.id === selectedCategory.id ? ' '+classes.selected : '' )}
                key={data.id}
                data-type='category' 
                draggable='true'
                onClick={handleClickCategory(data)}
                onDragStart={(e) => dragStart(e, data.id, data.name, data.order)}
                onDragEnd={dragEnd}
                onDragOver={(e) => dragOver(e, data.id, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
                onDragLeave={dragLeave}
                onDrop={(e) => drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)}
              >
                <CategoryTab 
                  key={data.id} 
                  text={data.name} 
                  id={data.id} 
                  order={data.order}
                  isFavorited={data.is_favorited}
                  urlCount={data.url_count}
                  isEditTitle={isEditCategoryTitle}
                  selected={(data.id === selectedCategory.id)} 
                  dragFinished={(data.id === draggedId ? dragFinished : false)} 
                  historyDragFinished={(dragHistoryFinished && data.id === overedTabId ? true : null)}
                  selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory.name}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <div className={classes.categoryHeader}>
          <div className={classes.categoryText}>
            Category
          </div>
          <hr className={classes.hr}/>
        </div>
        <Button className={classes.addButton + (addOpen ? '' : ' '+ classes.hidden)} 
          variant="contained"
          onClick={openEnterTab}
        >
          <AddCircleOutlineIcon style={{color: "#cccccc"}} />
        </Button>
        <Button className={classes.deleteButton + (deleteOpen ? ' '+classes.block : '')} 
          variant="contained" 
          onClick={openDeleteModal}
        >
          <DeleteIcon style={{color: "#cccccc"}} />
        </Button>
        {enterOpen ?
          <Paper className={classes.enterTab}
            component="div" 
          >
            <InputBase className={classes.input}
              placeholder="New one"
              value={newCategoryTitle}
              onChange={handleChangeNewCategoryTitle}
              onKeyUp={pressEnterAddTab}
              onClick={handleClickAddInput}
            />
              <Button className={classes.okBtn} onClick={addTab}>
                확인
              </Button>
              <Button className={classes.cancelBtn} onClick={cancelAddTab}>
                취소
              </Button>
          </Paper> : null
        }
        <div className={(!notFavoritedArr.length ? classes.hiddenDropZone: classes.hidden)}
          data-dropzone='first-cateogory-dropzone'          
          onDragOver={firstCategoryDragOver}
          onDrop={(e) => drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)}
        />
        <List>
          {notFavoritedArr.map((data, index) => (
            <React.Fragment key={data.id}>
              <div className={classes.dragline} />
              <ListItem className={classes.listItem + (data.id === selectedCategory.id ? ' '+classes.selected : '' )}
                key={data.id} 
                data-type='category' 
                draggable='true'
                onClick={handleClickCategory(data)}
                onDragStart={(e) => dragStart(e, data.id, data.name, data.order)}
                onDragEnd={dragEnd}
                onDragOver={(e) => dragOver(e, data.id, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
                onDragLeave={dragLeave}
                onDrop={(e) => drop(e, draggedId, draggedName, overedTabOrder, overedTabFavorite)}
              >
                <CategoryTab 
                  key={data.id} 
                  text={data.name} 
                  id={data.id} 
                  order={data.order}
                  isFavorited={data.is_favorited}
                  urlCount={data.url_count}
                  isEditTitle={isEditCategoryTitle}
                  selected={(data.id === selectedCategory.id)} 
                  dragFinished={(data.id === draggedId ? dragFinished : false)} 
                  historyDragFinished={(dragHistoryFinished && data.id === overedTabId ? true : false)}
                  selectedCategoryTitle={isEditCategoryTitle ? editCategoryTitle : selectedCategory.name}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        </div>
          <AlertModal 
            btnText='삭제'
            modalText='카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?'
            openBool={deleteModalOpen} 
            onClose={closeDeleteModal}
            onClickOk={deleteTab} 
          />
        </div>
    </Drawer>
    </nav>
    <div className={clsx(classes.coverBackground, {
        [classes.flexCoverBackground]: selectedLinkList.length !== 0
      })}
      onDrop={dropOnCardArea}
      onDragOver={dragOverOnCardArea}>
      <AddToPhotosIcon className={classes.addLinkIcon} />
    </div>
  </div>
  )  
}