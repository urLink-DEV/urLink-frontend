// * React
import React, { useState, useEffect, useRef } from 'react'

// * dispatch
import {useLinkState, useLinkDispatch, useCategoryState, useCategoryDispatch} from '../../containers/category/CategoryContainer'

// * UI (CSS)
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import ToggleButton from '@material-ui/lab/ToggleButton'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {useStyles, StyledToggleButtonGroup} from './styles/CategoryDrawer'
import clsx from 'clsx'

import SearchIcon from '../../images/search.png'
import linkListEmptyIcon from '../../images/group-11.png'
import linkListSearchEmptyIcon from '../../images/group-17.png'

// * components
import CategoryCard from '../../components/category/CategoryCard'
import {AlertModal} from '../../components/modal'
import CategoryAppBar from './CategoryAppBar'
import CategoryTab from './CategoryTab'
import CategorySearchPopOver from './CategorySearchPopOver'

export default function CategoryDrawer(props) {
  // console.log("recall");

  const classes = useStyles()

  const {
    getCategory,
    writeCategory,
    updateCategory,
    deleteCategory
  } = useCategoryDispatch()
  const { getLink, writeLink, deleteLink } = useLinkDispatch()
  const { 
    draggedHistory,
    setDraggedHistory,
    selectedLinkList,
    setSelectedLinkList
  } = props
  
  const links = useLinkState()
  const categories = useCategoryState()
  const favoritedArr = categories.filter(data => data.is_favorited === true)
  const notFavoritedArr = categories.filter(data => data.is_favorited === false)

  const [newCategoryTitle, setNewCategoryTitle] = useState('')
  const [toggleAlignment, setToggleAlignment] = useState('left')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('')

  const [addOpen, setAddOpen] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enterOpen, setEnterOpen] = useState(false)

  useEffect(() => {
    if(!selectedCategoryId && categories.length) {
      setAddOpen(true)
      setDeleteOpen(false)
      setSelectedCategoryId(categories[0]?.id)
      setSelectedCategoryTitle(categories[0]?.name)
    } else getLink(selectedCategoryId)

  }, [categories, selectedCategoryId])

  const handleChangeNewCategoryTitle = (e) => {
    if (e.target.value.length >= 15) {
      return 
    }
    setNewCategoryTitle(e.target.value)
  }

  const handleToggleChange = (event, newAlignment) => {
    setToggleAlignment(newAlignment);
  }

  const handlePressEnterSearchValue = e => {
    const { keyCode } = e
    const { value } = e.target
    let path, title
    if (keyCode === 13) {
      if (toggleAlignment === 'left') {
        path = value
        title = value
      }
      else if (toggleAlignment === 'center') path = value
      else if (toggleAlignment === 'right') title = value
      setSearchValue(value)
      getLink(selectedCategoryId, path, title)
    }
  }

  const addTab = () => {
    writeCategory(newCategoryTitle, false)
    setNewCategoryTitle('')
    setAddOpen(true)
    setEnterOpen(false)
  }

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      writeCategory(newCategoryTitle, false)
      setNewCategoryTitle('')
      setAddOpen(true)
      setEnterOpen(false)
    }
  }

  const cancelAddTab = () => {
    setAddOpen(true)
    setEnterOpen(false)
    setNewCategoryTitle('')
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
    deleteCategory(selectedCategoryId)
    setDeleteModalOpen(false)
    setDeleteOpen(false)
    setAddOpen(true)
  }

  const handleClickCategory = (id, name) => {
    setAddOpen(false)
    setDeleteOpen(true)
    setSelectedCategoryId(id)
    setSelectedCategoryTitle(name)
  }

  const toggleEnterTab = () => {
    setAddOpen(false)
    setEnterOpen(true)
  }

  /*
    아래는 drag n drop 로직
  */

  const [dragged, setDragged] = useState('')
  const [draggedOrder, setDraggedOrder] = useState(0)
  const [draggedId, setDraggedId] = useState(0)
  const [overedTabId, setOveredTabId] = useState(0)
  const [overedTabOrder, setOveredTabOrder] = useState(0)
  const [overedTabFavorite, setOveredTabFavorite] = useState(null)
  const [dragFinished, setDragFinished] = useState(false)
  const [dragHistoryFinished, setDragHistoryFinished] = useState(false)

  const listRef = useRef()  

  const dragStart = (e, id, order) => {
    const target = e.currentTarget
    setDragged(target)
    setDraggedId(id)
    setDraggedOrder(order)
    e.dataTransfer.setData('text/html', target)
    e.dataTransfer.setData("text/type", 'category')
  }

  const dragOver = (e, id, order, favorited) => {

    e.preventDefault()
    console.log('over', draggedHistory)

    if(draggedHistory.length !== 0 && draggedHistory[0].dataset.type === 'link') {
      setOveredTabId(id)
    } else if(dragged.dataset.type === 'category') {
      setOveredTabOrder(order)
      setOveredTabFavorite(favorited)
      dragged.style.display='none'
      e.currentTarget.previousSibling.style.display = 'block'
    }
  }

  const dragLeave = (e) => {
    e.currentTarget.previousSibling.style.display = 'none'
  }
  
  const dragEnd = (e, id, name, order, favorited) => {
    updateCategory(id, name, order, favorited)
    setDragFinished(true)
    setDragged('')
  }

  const drop = (e) => {
    const type = e.dataTransfer.getData('text/type')
    const filteredLinkList = [] 
    selectedLinkList.forEach(link => filteredLinkList.push(link.path))

    console.log('dropped', selectedLinkList)

    if(type === 'category') {
      e.preventDefault()
      e.currentTarget.previousSibling.style.display = 'none'
    } else if(type === 'link') {
      e.preventDefault()
      setDragHistoryFinished(true)
      writeLink(overedTabId, filteredLinkList)
      setSelectedLinkList([])
      setDraggedHistory([])
    }
  }

  const firstFavoriteDragOver = (e) => {
    e.preventDefault()
    dragged.style.display='none'
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(true)
  }  

  const dragOverOnCardArea =(e) => {
    e.preventDefault()
    setOveredTabId(selectedCategoryId)
  }

  const dropOnCardArea = (e) => {
    const type = e.dataTransfer.getData('text/type')
    const filteredLinkList = [] 
    selectedLinkList.forEach(link => filteredLinkList.push(link.path))

    console.log('dropped on card area', selectedLinkList)

    if(type === 'link') {
      e.preventDefault()
      writeLink(selectedCategoryId, filteredLinkList)
      setDragHistoryFinished(true)
      setSelectedLinkList([])
      setDraggedHistory([])
    }
  }


  /* 
    아래는 외부영역 클릭시 버튼 토글 & 드래그 시작/끝날 때 애니메이션 css 토글
  */

  const wrapperRef = useRef(null)
  const timeId = useRef()

  useEffect(() => {
    // * change add&delete button state if clicked on outside of element
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAddOpen(true)
        setDeleteOpen(false)
      } 
    }
    // * Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)

    // * setTimeout
    if(dragFinished) {
      timeId.current = setTimeout(() => {
        setDragFinished(false)
      }, 900)
    } else {
      timeId.current = setTimeout(() => {
        setDragHistoryFinished(false)
      }, 800)
    }


    return () => {
      // * Unbind the event and timeout on clean up
      document.removeEventListener("mousedown", handleClickOutside)
      // * clearTimeout
      clearTimeout(timeId.current)
    }

  },[wrapperRef, dragFinished, dragHistoryFinished])
  
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
        <List ref={listRef}>
          {favoritedArr.map((data, index) => (
            <React.Fragment key={data.id}>
              <div className={classes.dragline} />
              <ListItem 
                key={data.id}
                data-type='category' 
                className={classes.listItem + (data.id === selectedCategoryId ? ' '+classes.selected : '' )}
                onClick={() => handleClickCategory(data.id, data.name)}
                draggable='true'
                onDragStart={(e) => dragStart(e, data.id, data.order)}
                onDragEnd={(e) => dragEnd(e, data.id, data.name, overedTabOrder, overedTabFavorite)}
                onDragOver={(e) => dragOver(e, data.id, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
                onDragLeave={dragLeave}
                onDrop={drop}
              >
                <CategoryTab 
                  key={data.id} 
                  text={data.name} 
                  id={data.id} 
                  order={data.order}
                  isFavorited={data.is_favorited}
                  urlCount={data.url_count}
                  selected={(data.id === selectedCategoryId)} 
                  dragFinished={(data.id === draggedId ? dragFinished : false)} 
                  historyDragFinished={(dragHistoryFinished && data.id === overedTabId ? true : null)}
                  setSelectedCategoryTitle={setSelectedCategoryTitle}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <div className="category-text">
          Category
        </div>
        <hr />
        <Button className={classes.addButton + (addOpen ? '' : ' '+classes.hidden)} 
          variant="contained"
          onClick={toggleEnterTab}
        >
          <AddCircleOutlineIcon style={{color: "#cccccc"}} />
        </Button>
        <Button className={classes.deleteButton + (deleteOpen ? ' '+classes.block : '')} 
          variant="contained" 
          onClick={openDeleteModal}
        >
          <DeleteIcon style={{color: "#cccccc"}} />
        </Button>
        <Paper className={classes.enterTab + (enterOpen ? ' '+classes.flex : '')}
          component="div" 
        >
          <Input className={classes.input}
            disableUnderline={true}
            placeholder="New one"
            value={newCategoryTitle}
            onChange={handleChangeNewCategoryTitle}
            onKeyDown={pressEnter}
          />
            <Button className={classes.okBtn} onClick={addTab}>확인</Button>
            <Button className={classes.cancelBtn} onClick={cancelAddTab}>취소</Button>
        </Paper>
        <List>
          {notFavoritedArr.map((data, index) => (
            <React.Fragment key={data.id}>
              <div className={classes.dragline} />
              <ListItem 
                key={data.id} 
                data-type='category' 
                className={classes.listItem + (data.id === selectedCategoryId ? ' '+classes.selected : '' )}
                onClick={() => handleClickCategory(data.id, data.name)}
                draggable='true'
                onDragStart={(e) => dragStart(e, data.id, data.order)}
                onDragEnd={(e) => dragEnd(e, data.id, data.name, overedTabOrder, overedTabFavorite)}
                onDragOver={(e) => dragOver(e, data.id, (draggedOrder < data.order ? data.order-1 : data.order) , data.is_favorited)}
                onDragLeave={dragLeave}
                onDrop={drop}
              >
                <CategoryTab 
                key={data.id} 
                text={data.name} 
                id={data.id} 
                order={data.order}
                isFavorited={data.is_favorited}
                urlCount={data.url_count}
                selected={(data.id === selectedCategoryId)} 
                dragFinished={(data.id === draggedId ? dragFinished : null)} 
                historyDragFinished={(dragHistoryFinished && data.id === overedTabId ? true : null)}
                setSelectedCategoryTitle={setSelectedCategoryTitle}
                />
              </ListItem>
            </React.Fragment>
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
      <div 
        className={
          clsx(classes.coverBackground, {
            [classes.flex]: selectedLinkList.length !== 0
          })
        }
        onDrop={dropOnCardArea}
        onDragOver={dragOverOnCardArea}>
          <AddToPhotosIcon className={classes.addLinkIcon} />
      </div>
      <main className={classes.content}>
        <Grid container className={classes.toolbar}>
          <Grid item>
            <div className={classes.mainFont}>
              {selectedCategoryTitle}
            </div>
          </Grid>
          <Grid item>
            {/* link card serarchTool */}
            <CategorySearchPopOver>
              <Grid  className={classes.popover}>
                <Grid className={classes.popoverDiv}>
                  <img src={SearchIcon} className={classes.searchIcon} alt='search Icon'/>
                  <span className={classes.searchBtnText}>Search</span>
                </Grid>
                <Grid>
                  <input
                    placeholder="검색어를 입력해 주세요."
                    className={classes.textfield}
                    onKeyDown={handlePressEnterSearchValue}
                  />
                </Grid>
                <Grid>
                  <StyledToggleButtonGroup 
                    size="small"
                    value={toggleAlignment}
                    exclusive
                    onChange={handleToggleChange}
                  >
                    <ToggleButton
                      value='left'
                      className={classes.popoverBtn}
                      variant='contained'
                      size='small'
                    >
                      전체
                    </ToggleButton>
                    <ToggleButton
                      value='center'
                      className={classes.popoverBtn}
                      variant='contained'
                      size='small'
                    >
                      도메인
                    </ToggleButton>
                    <ToggleButton
                      value='right'
                      className={classes.popoverBtn}
                      variant='contained'
                      size='small'
                    >
                      단어
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Grid>
              </Grid> 
            </CategorySearchPopOver>
            {/* link card serarchTool - END */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {
          links.length ? links?.map((urlObj, idx) => 
            <Grid item xs={2} key={idx}>
              <CategoryCard key={idx} urlInfoList={urlObj} />
            </Grid>
          ) 
          :
          searchValue ? 
          (<div className={classes.imgCenter}>
            <img src={linkListSearchEmptyIcon}></img>
          </div>)
          :
          (<div className={classes.imgCenter}>
            <img src={linkListEmptyIcon}></img>
          </div>) 
          }
        </Grid>
      </main>
      <CategoryAppBar {...props} />
    </div>
  )
}