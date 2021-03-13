import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import linkListEmptyImg from '@assets/images/group-11.png'
import linkListSearchEmptyImg from '@assets/images/group-17.png'
import CategoryEmptyImg from '@assets/images/group-5.svg'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
import ScrollUpButton from '@main/components/ScrollUpButton'
import { useCategories, selectSelectedCategory } from '@modules/category'
import { useLinks, linkSelector, linkClearSelect, linkSearchFilterInit } from '@modules/link'

import Header from './Header'
import Link from './Link'
import useStyles from './style'

const CATEGORY_EMPTY = 0
const LINK_EMPTY = 0
const SEARCH_LINK_EMPTY = 1

function LinkList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { categories } = useCategories()
  const selectedCategory = useSelector(selectSelectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const searchFilter = useSelector(linkSelector.searchFilter)
  const { links } = useLinks({
    detact: true,
    categoryId: selectedCategory?.id,
    selectedName: searchFilter?.selectedName,
    keyword: searchFilter?.keyword,
  })

  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const [showScrollUpButton, setButtonOpen] = useState(null)

  const handleScrollUpBtn = (e) => {
    const scrollTop = e.currentTarget.scrollTop
    const clientHeight = e.currentTarget.clientHeight
    setButtonOpen(scrollTop + clientHeight / 2 > clientHeight)
  }

  useOutsideAlerter(
    rootRef,
    selectedLinkList.length,
    useCallback(() => dispatch(linkClearSelect()), [dispatch])
  )

  useEffect(() => {
    contentRef.current.scrollTop = 0
    dispatch(linkClearSelect())
  }, [dispatch, links])

  useEffect(() => {
    dispatch(linkSearchFilterInit())
  }, [dispatch, selectedCategory])

  return (
    <Grid container direction="column" className={classes.root} ref={rootRef}>
      <Grid item>
        <Header />
      </Grid>

      <Grid item container className={classes.content} spacing={2} onScroll={handleScrollUpBtn} ref={contentRef}>
        {categories.length === CATEGORY_EMPTY && (
          <Grid item xs={12} className={classes.center}>
            <img src={CategoryEmptyImg} alt="카테고리 비어 있음" />
          </Grid>
        )}

        {links?.map((data) => (
          <Grid item key={data.id}>
            <Link data={data} />
          </Grid>
        ))}

        {links.length === LINK_EMPTY &&
          (searchFilter.keyword && SEARCH_LINK_EMPTY ? (
            <Grid item xs={12} className={classes.center}>
              <img src={linkListSearchEmptyImg} alt="검색 조회 없음" />
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.center}>
              <img src={linkListEmptyImg} alt="링크 비어 있음" />
            </Grid>
          ))}
      </Grid>

      <ScrollUpButton targetRef={contentRef} open={showScrollUpButton} />
    </Grid>
  )
}

export default LinkList
