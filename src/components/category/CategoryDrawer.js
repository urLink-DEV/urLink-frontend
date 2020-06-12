// * React
import React, {useState, useEffect, useRef} from 'react'

// * UI (CSS)
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import {useStyles, StyledToggleButtonGroup} from './styles/CategoryDrawer'

// * components
import CategoryCard from '../../components/category/CategoryCard'
import {AlertModal} from '../../components/modal'
import CategoryAppBar from './CategoryAppBar'
import CategoryTab from './CategoryTab'
import CategorySearchPopOver from './CategorySearchPopOver'

// * Hooks
import {useLinkState, useLinkDispatch, useCategoryState, useCategoryDispatch} from '../../containers/category/CategoryContainer'

/*
  * categoryDispatch.getCategory()
  * categoryDispatch.writeCategory(value,1,false)
  * linkDispatch.getLink(87, "trust")
  * linkDispatch.writeLink(87, ["https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"])
  * 이런식으로 불러와서 사용 가능
*/
export default function CategoryDrawer(props) {

  const categories = useCategoryState()
  const categoryDispatch = useCategoryDispatch()
  const links = useLinkState()
  const linkDispatch = useLinkDispatch()
  const { 
    getSearchLink,
    getSearchPathLink,
    getSearchTitleLink,
    draggedHistory,
    setDraggedHistory
  } = props

  const favoritedArr = categories.filter(data => data.is_favorited === true)
  const notFavoritedArr = categories.filter(data => data.is_favorited === false)
  const classes = useStyles()
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
    linkDispatch.getLink(categories[0]?.id)
    setSelectedCategoryTitle(categories[0]?.name)
  }, [categories])

  useEffect(() => {
    linkDispatch.getLink(selectedCategoryId)
  }, [selectedCategoryId])

  const handleChangeNewCategoryTitle = (e) => {
    setNewCategoryTitle(e.target.value)
  }

  const handleClickCategoryTitle = () => {
    linkDispatch.getLink(selectedCategoryId)
  }

  const handleToggleChange = (event, newAlignment) => {
    setToggleAlignment(newAlignment);
  }

  const handleChangeSearchValue = e => {
    setSearchValue(e.target.value)
  }

  const handlePressEnterSearchValue = e => {
    if (e.keyCode === 13) {
      if (toggleAlignment === 'left') getSearchLink(selectedCategoryId, searchValue)
      if (toggleAlignment === 'center') getSearchPathLink(selectedCategoryId, searchValue)
      if (toggleAlignment === 'right') getSearchTitleLink(selectedCategoryId, searchValue)
    }
  }

  const addTab = () => {
    categoryDispatch.writeCategory(newCategoryTitle, false)
    setNewCategoryTitle('')
    setAddOpen(true)
    setEnterOpen(false)
  }

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      categoryDispatch.writeCategory(newCategoryTitle, false)
      setNewCategoryTitle('')
      setAddOpen(true)
      setEnterOpen(false)
    }
  }

  const cancelAddTab = () => {
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
    categoryDispatch.deleteCategory(selectedCategoryId)
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
    * * 아래는 drag n drop 로직
  */
  const [dragged, setDragged] = useState('')
  const [draggedOrder, setDraggedOrder] = useState(0)
  const [draggedId, setDraggedId] = useState(0)
  const [overedTabId, setOveredTabId] = useState(0)
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
    e.dataTransfer.setData("text/type", 'category')
  }

  const dragOver = (e, id, order, favorited) => {

    e.preventDefault()

    if(draggedHistory !== '' && draggedHistory.dataset.type === 'link') {
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
    categoryDispatch.updateCategory(id, name, order, favorited)
    setDragFinished(true)
    setDragged('')
  }

  const drop = (e) => {
    const type = e.dataTransfer.getData('text/type')
    const path = e.dataTransfer.getData('text/link')

    if(type === 'category') {
      e.preventDefault()
      e.currentTarget.previousSibling.style.display = 'none'
    } else if(type === 'link') {
      e.preventDefault()
      linkDispatch.writeLink(overedTabId, [path])
      setDraggedHistory('')
    }
  }

  const firstFavoriteDragOver = (e) => {
    e.preventDefault()
    dragged.style.display='none'
    setOveredTabOrder(draggedOrder)
    setOveredTabFavorite(true)
  }


  /*
    * 아래는 외부영역 클릭시 버튼 토글 & cleartimeout 
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
      timeId.current = setTimeout(() => setDragFinished(false), 900)
    }

    return () => {
      // * Unbind the event and timeout on clean up
      document.removeEventListener("mousedown", handleClickOutside)
      // * clearTimeout
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
            <div className={classes.dragline}></div>
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
            value={newCategoryTitle}
            onChange={handleChangeNewCategoryTitle}
            onKeyDown={pressEnter}
          />
            <Button className={classes.okBtn} onClick={addTab}>확인</Button>
            <Button className={classes.cancelBtn} onClick={cancelAddTab}>취소</Button>
        </Paper>
        <List>
          {notFavoritedArr.map((data, index) => (
            <>
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
        <div className={classes.toolbar}>
          <Button onClick={handleClickCategoryTitle}>
            {selectedCategoryTitle}
          </Button>
          <CategorySearchPopOver>
            <Grid  className={classes.popover}>
              <Grid className={classes.popoverDiv}>
                <SearchIcon className={classes.searchIcon} fontSize="small" />
                SEARCH
              </Grid>
              <Grid>
                <TextField
                  className={classes.textfield}
                  onChange={handleChangeSearchValue}
                  value={searchValue}
                  variant='filled'
                  size='small' 
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
        </div>
        <Grid container spacing={2}>
          {links?.map((urlObj, idx) => 
            <Grid item xs={2} key={idx}>
              <CategoryCard key={idx} urlInfoList={urlObj} />
            </Grid>
          )}
        </Grid>
      </main>
      <CategoryAppBar {...props} />
    </div>
  )
}