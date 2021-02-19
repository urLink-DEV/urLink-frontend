/* global chrome */
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useEventListener from '@hooks/useEventListener'
import Grid from '@material-ui/core/Grid'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import Link from './Link'
import useStyles from './style'
import { useCategories } from '@modules/category'
import { 
  useLinks,
  selectSelectedLink,
  linksReadThunk,
  linkModifyThunk,
} from '@modules/link'
import CategoryEmptyIcon from '@images/group-5.svg'
import linkListEmptyIcon from '@images/group-11.png'
import linkListSearchEmptyIcon from '@images/group-17.png'

function LinkList() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const { categories } = useCategories() 
  const { links } = useLinks()
  console.log(links)
  const selectedLink = useSelector(selectSelectedLink)
  const [searchValue, setSearchValue] = useState('')
  const [selectedLinkList, setSelectedLinkList] = useState([])
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false)
  const [isReset, setIsReset] = useState(false)
  
  useEffect(() => {
    if (isReset) {
      setSelectedLinkList([])
    }
  }, [isReset])

  const handleClickExceptCard = useCallback(() => {
    setSelectedLinkList([])
    setIsReset(true)
    return
  })

  useEventListener('click', handleClickExceptCard)

  const handleSelectedLink = linkObj => e => {
    if (selectedLinkList.indexOf(linkObj) !== -1) {
      selectedLinkList.splice(selectedLinkList.indexOf(linkObj), 1)
      setSelectedLinkList([...selectedLinkList])
      return
    }
    setSelectedLinkList([...selectedLinkList, linkObj])
  }

  const handleClickOpenSelectedCardList = () => {
    selectedLinkList.forEach((card, idx) => {
      chrome.tabs.create({url: card.path})
    })
    setIsReset(true)
  }

  // const handleClickDeleteSelectedCardList = () => {
  //   Promise.all(selectedLinkList.map(card => deleteLink({ id: card.id })))
  //   .then(() => getLink({ category: selectedCategory.id }))
  //   .then(() => getCategory({}))
  //   .then(() => {
  //     setDeleteSuccessAlert(true)
  //     setIsReset(true)
  //   })
  // }

  const handleDeleteSuccessAlertClose = e => {
    setDeleteSuccessAlert(false)
  }

  return (
    <>
      <LinkDropZone />
      <main className={classes.content}>
        <div position="static">
          <Header />
        </div>
        <div container>
          { 
            links.length ? links?.map((linkObj, idx) => 
              <Grid item key={idx} className={classes.gridCard}>
                <Link key={idx}
                  linkInfo={linkObj}
                  // handleSelectedCard={handleSelectedCard(linkObj)}
                  // isReset={isReset}
                  // setIsReset={setIsReset}
                  // writeAlarm={writeAlarm}
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
      </main>
    </>
  )
}

export default LinkList