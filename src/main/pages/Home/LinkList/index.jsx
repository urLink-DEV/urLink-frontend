import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import linkListEmptyImg from '@assets/images/group-11.png'
import linkListSearchEmptyImg from '@assets/images/group-17.png'
import CategoryEmptyImg from '@assets/images/group-5.svg'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
import ScrollUpButton from '@main/components/ScrollUpButton'
import { useCategories, categorySelector } from '@modules/category'
import { useLinks, linkSelector, linkClearSelect, linkSearchFilterInit, linksRead, linkCreate } from '@modules/link'
import { PENDING } from '@modules/pending'
import { uiSelector } from '@modules/ui'

import Header from './Header'
import Link from './Link'
import LinkSkeleton from './LinkSkeleton'
import useStyles from './style'

const CATEGORY_EMPTY = 0
const LINK_EMPTY = 0
const SEARCH_LINK_EMPTY = 1

function LinkList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { categories } = useCategories()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const searchFilter = useSelector(linkSelector.searchFilter)
  const dragData = useSelector(uiSelector.drag)
  const [skeletonLength, setSkeletonLength] = useState(0)
  const linkCreatePending = useSelector((state) => state[PENDING][linkCreate.TYPE])
  const linksReadPending = useSelector((state) => state[PENDING][linksRead.TYPE])

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

  useEffect(() => {
    if (!!dragData.link.listData.length && linkCreatePending) {
      setSkeletonLength(dragData.link.listData.length)
    }
    if (skeletonLength && !linkCreatePending && !linksReadPending) {
      setSkeletonLength(0)
    }
  }, [dragData, skeletonLength, linkCreatePending, linksReadPending])

  const skeletons = (length) => {
    return new Array(length).fill().map((_, i) => (
      <Grid item key={i}>
        <LinkSkeleton key={i} />
      </Grid>
    ))
  }

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

        {!!skeletonLength && dragData.category.data.id === selectedCategory?.id ? skeletons(skeletonLength) : null}

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
