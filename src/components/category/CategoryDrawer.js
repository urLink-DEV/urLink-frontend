/* global chrome */
// * React
import React, { useState, useEffect, useCallback } from 'react'

// * dispatch
import {useLinkState, useLinkDispatch, useCategoryState, useCategoryDispatch} from '../../containers/category/CategoryContainer'

// * UI (CSS)
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ToggleButton from '@material-ui/lab/ToggleButton'
import CreateIcon from '@material-ui/icons/Create'
import InputBase from '@material-ui/core/InputBase'
import {useStyles, StyledToggleButtonGroup} from './styles/CategoryDrawer'
import SearchIcon from '@material-ui/icons/Search'

// import SearchIcon from '../../images/search.png'
import CategoryEmptyIcon from '../../images/group-5.svg'
import linkListEmptyIcon from '../../images/group-11.png'
import linkListSearchEmptyIcon from '../../images/group-17.png'

// * components
import CategoryTabDrawer from './CategoryTabDrawer'
import CategoryCard from '../../components/category/CategoryCard'
import CategoryAppBar from './CategoryAppBar'
import CategorySearchPopOver from './CategorySearchPopOver'
import Snackbar from '../Snackbar'
import useEventListener from '../../hooks/useEventListener'
export default function CategoryDrawer(props) {

  const classes = useStyles()

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
  const { 
    draggedHistoryList,
    setDraggedHistoryList,
    selectedLinkList,
    setSelectedLinkList,
    writeAlarm,
  } = props
  
  const [links, setLink] = useLinkState()
  const categories = useCategoryState()
  const [toggleAlignment, setToggleAlignment] = useState('left')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState({})

  const [isEditCategoryTitle, setIsEditCategoryTitle] = useState(false)
  const [editCategoryTitle, setEditCategoryTitle] = useState('')

  const handleClickExceptEditingTitle = useCallback(() => {
    setIsEditCategoryTitle(false)
    setEditCategoryTitle('')
  })

  useEventListener('click', handleClickExceptEditingTitle)
  useEffect(() => {
    if (!selectedCategory.id) {
      getCategory({}).then((response) => {
        const {data} = response
        if(data.length) {
          setSelectedCategory(data[0])
        } else {
          setLink([])
        }
      })
    } 
    else if (selectedCategory.id) { // * category Select
      getLink({ category: selectedCategory.id })
    }
  }, [selectedCategory])

  const handleClickCategoryTitle = () => {
    getLink({ category: selectedCategory.id })
  }

  const handleToggleChange = (event, newAlignment) => {
    setToggleAlignment(newAlignment)
  }

  const handlePressEnterSearchValue = e => {
    const { keyCode } = e
    const { value } = e.target
    let path, title
    if (keyCode === 13) {
      if (toggleAlignment === 'left') path = value
      else if (toggleAlignment === 'right') title = value
      setSearchValue(value)
      getLink({ category: selectedCategory.id, path, title })
    }
  }

  // when Edit Category Title
  const handleClickEditTitle = e => {
    e.stopPropagation()
    setEditCategoryTitle(selectedCategory.name)
    setIsEditCategoryTitle(true)
  }

  const handleChangeEditCategoryTitle = e => {
    let checks = /[a-zA-Z]/
    if(checks.test(e.target.value)) {
        if(e.target.value.length >= 14) return
    } else if (e.target.value.length >= 7) return
    setEditCategoryTitle(e.target.value)
  }

  const handleClickEditCategoryTitle = e => {
    e.stopPropagation()
  }

  const handleKeyupEditCategoryTitle = e => {
    if (e.keyCode === 13) {
      updateCategory({ 
        id: selectedCategory.id, 
        name: editCategoryTitle, 
        order: selectedCategory.order, 
        is_favorited: selectedCategory.isFavorited
        }).then(res => setSelectedCategory({...selectedCategory, name: res.data.name}))
        .then(() => getCategory({}))
        .then(() => setIsEditCategoryTitle(false))
    }
  }

  const searchPopOverBtn = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
    // <CategorySearchPopOver>
    //   <Grid  className={classes.popover}>
    //     <Grid className={classes.popoverDiv}>
    //       {/* <img  className={classes.searchIcon}
    //         alt='search icon'
    //         src={SearchIcon}
    //         />
    //       <span className={classes.searchBtnText}>
    //         Search
    //       </span> */}
    //       <div className={classes.search}>
    //         <div className={classes.searchIcon}>
    //         <img  className={classes.searchIcon}
    //           alt='search icon'
    //           src={SearchIcon} />
    //         </div>
    //         <InputBase
    //           placeholder="Search…"
    //           classes={{
    //             root: classes.inputRoot,
    //             input: classes.inputInput,
    //           }}
    //           inputProps={{ 'aria-label': 'search' }}
    //         />
    //       </div>
    //     </Grid>
    //     <Grid>
    //       <input className={classes.textfield}
    //         placeholder="검색어를 입력해 주세요."
    //         onKeyDown={handlePressEnterSearchValue}
    //       />
    //     </Grid>
    //     <Grid>
    //       <StyledToggleButtonGroup 
    //         size="small"
    //         value={toggleAlignment}
    //         exclusive
    //         onChange={handleToggleChange}
    //       >
    //         <ToggleButton className={classes.popoverBtn}
    //           value='left'
    //           variant='contained'
    //           size='small'
    //         >
    //           도메인
    //         </ToggleButton>
    //         <ToggleButton className={classes.popoverBtn}
    //           value='right'
    //           variant='contained'
    //           size='small'
    //         >
    //           단어
    //         </ToggleButton>
    //       </StyledToggleButtonGroup>
    //     </Grid>
    //   </Grid> 
    // </CategorySearchPopOver>
  )

  // TODO Refactoring
  // Category Cards List Business Logic
  const [selectedCardList, setSelectedCardList] = useState([])
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false)
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    if (isReset) {
      setSelectedCardList([])
    }
  }, [isReset])

  const handleClickExceptCard = useCallback(() => {
    setSelectedCardList([])
    setIsReset(true)
    return
  })

  useEventListener('click', handleClickExceptCard)

  const handleSelectedCard = linkObj => e => {
    if (selectedCardList.indexOf(linkObj) !== -1) {
      selectedCardList.splice(selectedCardList.indexOf(linkObj), 1)
      setSelectedCardList([...selectedCardList])
      return
    }
    setSelectedCardList([...selectedCardList, linkObj])
  }

  const handleClickOpenSelectedCardList = () => {
    selectedCardList.forEach((card, idx) => {
      chrome.tabs.create({url: card.path})
    })
    setIsReset(true)
  }

  const handleClickDeleteSelectedCardList = () => {
    Promise.all(selectedCardList.map(card => deleteLink({ id: card.id })))
    .then(() => getLink({ category: selectedCategory.id }))
    .then(() => getCategory({}))
    .then(() => {
      setDeleteSuccessAlert(true)
      setIsReset(true)
    })
  }

  const handleDeleteSuccessAlertClose = e => {
    setDeleteSuccessAlert(false)
  }

  return (
    <div className={classes.root}>
      <CategoryTabDrawer 
        selectedLinkList={selectedLinkList}
        setSelectedLinkList={setSelectedLinkList}
        draggedHistoryList={draggedHistoryList}
        setDraggedHistoryList={setDraggedHistoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isEditCategoryTitle={isEditCategoryTitle}
        editCategoryTitle={editCategoryTitle}
      />
      <main className={classes.content}>
        <div position="static">
          <Toolbar container className={classes.toolbar}>
            <div className={classes.title}>
            {
              categories.length !== 0
                ? isEditCategoryTitle
                ? <InputBase className={classes.mainFont}
                    onChange={handleChangeEditCategoryTitle}
                    onClick={handleClickEditCategoryTitle}
                    onKeyUp={handleKeyupEditCategoryTitle}
                    value={editCategoryTitle}
                  />
                : <>
                  <button className={classes.mainFont} 
                    onClick={handleClickCategoryTitle}>
                    {selectedCategory.name}
                  </button>
                  <IconButton
                    aria-label="setting"
                    onClick={handleClickEditTitle}
                  >
                    <CreateIcon fontSize="small" />
                  </IconButton>
                </> : null
            }
            </div>
            {categories.length !== 0 ? searchPopOverBtn : null}
            {
              (selectedCardList.length > 0) 
              ? <>
                  <Button onClick={handleClickOpenSelectedCardList}>
                    탭 열기
                  </Button>
                  <Button color="secondary" 
                    onClick={handleClickDeleteSelectedCardList}
                  >
                    탭 삭제
                  </Button>
                </>
              : null
            }
          </Toolbar>
        </div>
        <div container>
          { 
            links.length ? links?.map((linkObj, idx) => 
              <Grid item key={idx} className={classes.gridCard}>
                <CategoryCard key={idx}
                  linkInfo={linkObj}
                  handleSelectedCard={handleSelectedCard(linkObj)}
                  isReset={isReset}
                  setIsReset={setIsReset}
                  writeAlarm={writeAlarm}
                />
              </Grid>) 
            : categories.length === 0 ? 
              <img className={classes.imgCenter} 
                src={CategoryEmptyIcon} 
                alt='category list empty'
              />
            :  searchValue ? 
              <img className={classes.imgCenter}
                src={linkListSearchEmptyIcon} 
                alt='link list search empty'
              />
          : <img className={classes.imgCenter}
              src={linkListEmptyIcon} 
              alt='link list empty'
            />
          }
        </div>
        <Snackbar open={deleteSuccessAlert}
          alertText="선택하신 카드가 삭제되었습니다."
          handleClose={handleDeleteSuccessAlertClose}
        />
      </main>
      <CategoryAppBar {...props} />
    </div>
  )
}