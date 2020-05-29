import React, {useState, useEffect, useRef} from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import {AlertModal} from '../../components/modal'
import {useCategoryState, useCategoryDispatch} from '../../containers/category/CategoryContainer'
import CategoryHistoryContainer from '../../containers/category/CategoryHistoryContainer'
import CategoryTab from './CategoryTab'
import useStyles from './styles/CategoryDrawer'

export default function CategoryDrawer(props) {

  const categories = useCategoryState()
  const dispatch = useCategoryDispatch()
  /*
  dispatch.getCategory()
  dispatch.writeCategory(value,1,false)
  이런식으로 함수 4가지 중에 하나 불러와서 사용 가능
  */

  const favoritedArr = categories.filter(data => data.is_favorited === true)
  const notFavoritedArr = categories.filter(data => data.is_favorited === false)

  const classes = useStyles()
  const [value, setValue] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [addOpen, setAddOpen] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enterOpen, setEnterOpen] = useState(false)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const addTab = () => {
    dispatch.writeCategory(value, false)
    setValue('')
    setAddOpen(true)
    setEnterOpen(false)
  }

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      dispatch.writeCategory(value, false)
      setValue('')
      setAddOpen(true)
      setEnterOpen(false)
    }
  }

  const cancleAddTab = () => {
    setAddOpen(true)
    setEnterOpen(false)
  }

  const openDeleteModal = (e) => {
    setDeleteOpen(true)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setDeleteOpen(false)
    setAddOpen(true)
  }
  
  const deleteTab = () => {
    dispatch.deleteCategory(selectedId)
    setDeleteModalOpen(false)
    setDeleteOpen(false)
    setAddOpen(true)
  }
  const toggleAddBtn = (id) => {
    setAddOpen(false)
    setDeleteOpen(true)
    setSelectedId(id)
  }

  const toggleEnterTab = () => {
    setAddOpen(false)
    setEnterOpen(true)
  }


  /* 아래는 drag n drop 로직 */

  const [dragged, setDragged] = useState('')
  const [draggedOrder, setDraggedOrder] = useState(0)
  const [draggedId, setDraggedId] = useState(0)
  const [overedTabOrder, setOveredTabOrder] = useState(0)
  const [overedTabFavorite, setOveredTabFavorite] = useState(null)
  const [dragFinished, setDragFinished] = useState(false)

  const listRef = useRef()  

  const dragStart = (e, id, order) => {
    const target = e.currentTarget
    setDragged(target)
    setDraggedId(id)
    setDraggedOrder(order)
    e.dataTransfer.setData('text/html', target)
  }

  const dragOver = (e, order, favorited) => {
    e.preventDefault()
    setOveredTabOrder(order)
    setOveredTabFavorite(favorited)
    dragged.style.display='none'
    e.currentTarget.previousSibling.style.display = 'block'
  }

  const dragLeave = (e) => {
    e.currentTarget.previousSibling.style.display = 'none'
  }
  
  const dragEnd = (e, id, name, order, favorited) => {

    dispatch.updateCategory(id, name, order, favorited)
    setDragFinished(true)
    document.querySelectorAll('.dragline').forEach(el => {
      el.style.display = 'none'
    })
  }

  const firstFavoriteDragOver = (e) => {
    e.preventDefault()
    dragged.style.display='none'
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(true)
  }


  /* 아래는 외부영역 클릭시 버튼 토글 & cleartimeout */

  const wrapperRef = useRef(null)
  const timeId = useRef()

  useEffect(() => {

    //change add&delete button state if clicked on outside of element
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAddOpen(true)
        setDeleteOpen(false)
      } 
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)

    //setTimeout
    if(dragFinished) {
      timeId.current = setTimeout(() => setDragFinished(false), 800)
    }

    return () => {
      // Unbind the event and timeout on clean up
      document.removeEventListener("mousedown", handleClickOutside)
      //clearTimeout
      clearTimeout(timeId.current)
    }

  },[wrapperRef, dragFinished])


  
  const drawer = (
    <div>
      <div className="list-tab-layout" ref={wrapperRef}>
        <div className="favorite-text">
          Favorite
        </div>
        <hr />
        <div 
          className={(favoritedArr.length === 0 ? 'drag-box' : 'hidden')}
          onDragOver={firstFavoriteDragOver}
        >
          Drag the category here!
        </div>
        <List 
        ref={listRef}>
          {favoritedArr.map((data, index) => (
            <>
            <div className={classes.dragline + " dragline"}></div>
            <ListItem 
              key={data.id} 
              className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
              onClick={() => toggleAddBtn(data.id)}
              draggable='true'
              onDragStart={(e) => dragStart(e, data.id, data.order)}
              onDragEnd={(e) => dragEnd(e, data.id, data.name, overedTabOrder, overedTabFavorite)}
              onDragOver={(e) => dragOver(e, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
              onDragLeave={dragLeave}
            >
              <CategoryTab 
                key={data.id} 
                text={data.name} 
                id={data.id} 
                order={data.order}
                isFavorited={data.is_favorited}
                urlCount={data.url_count}
                selected={(data.id === selectedId)} 
                dragFinished={(data.id === draggedId ? dragFinished : false)} 
              />
            </ListItem>
            </>
          ))}
        </List>
        <div className="category-text">
          Category
        </div>
        <hr />
        <Button 
          className={classes.addButton + (addOpen ? '' : ' '+classes.hidden)} 
          variant="contained"
          onClick={toggleEnterTab}
        >
          <AddCircleOutlineIcon style={{color: "#cccccc"}} />
        </Button>
        <Button 
          className={classes.deleteButton + (deleteOpen ? ' '+classes.block : '')} 
          variant="contained" 
          onClick={openDeleteModal}
        >
          <DeleteIcon style={{color: "#cccccc"}} />
        </Button>
        <Paper 
          component="div" 
          className={classes.enterTab + (enterOpen ? ' '+classes.flex : '')}
        >
          <Input
            disableUnderline={true}
            className={classes.input}
            placeholder="New one"
            value={value}
            onChange={handleChange}
            onKeyDown={pressEnter}
          />
            <Button className={classes.okBtn} onClick={addTab}>확인</Button>
            <Button className={classes.cancleBtn} onClick={cancleAddTab}>취소</Button>
        </Paper>
        <List>
        {notFavoritedArr.map((data, index) => (
          <>
          <div className={classes.dragline + " dragline"}></div>
          <ListItem 
            key={data.id} 
            className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
            onClick={() => toggleAddBtn(data.id)}
            draggable='true'
            onDragStart={(e) => dragStart(e, data.id, data.order)}
            onDragEnd={(e) => dragEnd(e, data.id, data.name, overedTabOrder, overedTabFavorite)}
            onDragOver={(e) => dragOver(e, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
            onDragLeave={dragLeave}
          >
            <CategoryTab 
            key={data.id} 
            text={data.name} 
            id={data.id} 
            order={data.order}
            isFavorited={data.is_favorited}
            urlCount={data.url_count}
            selected={(data.id === selectedId)} 
            dragFinished={(data.id === draggedId ? dragFinished : null)} 
            />
            </ListItem>
          </>
        ))}
        </List>
      </div>

      <AlertModal 
        btnText = '삭제'
        modalText = '카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?'
        openBool = {deleteModalOpen} 
        onClose = {closeDeleteModal}
        onClickOk = {deleteTab} 
      />
    </div>
  )


  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      <CategoryHistoryContainer />
    </div>
  )
}