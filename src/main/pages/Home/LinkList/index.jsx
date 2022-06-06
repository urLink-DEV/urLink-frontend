import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Grid } from '@mui/material'
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

const SkeletonList = (length) => {
  return new Array(length).fill().map((_, i) => (
    <Grid item key={i}>
      <LinkSkeleton key={i} />
    </Grid>
  ))
}

function LinkList() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { categories } = useCategories()
  const categoryList = useSelector(categorySelector.listData)
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const searchFilter = useSelector(linkSelector.searchFilter)
  const createLinksCategoryId = useSelector(linkSelector.createLinksCategoryId)
  const dragData = useSelector(uiSelector.drag)
  const linkCreatePending = useSelector((state) => state[PENDING][linkCreate.TYPE])
  const linksReadPending = useSelector((state) => state[PENDING][linksRead.TYPE])

  const [skeletonLength, setSkeletonLength] = useState(0)

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
    const { link } = dragData
    if (link.listData.length && linkCreatePending) {
      setSkeletonLength(link.listData.length)
    } else if (!linkCreatePending && !linksReadPending) {
      setSkeletonLength(0)
    } else {
      setSkeletonLength(0)
    }
  }, [dragData, linkCreatePending, linksReadPending])

  return (
    <Grid container direction="column" className={classes.root} ref={rootRef}>
      {!!categoryList.length && (
        <div className={classes.header}>
          <Header links={links} />
        </div>
      )}
      <div className={classes.content} onScroll={handleScrollUpBtn} ref={contentRef}>
        {!skeletonLength
          ? null
          : dragData.type === 'link' && createLinksCategoryId === selectedCategory?.id
          ? SkeletonList(skeletonLength)
          : dragData.category.data.id === selectedCategory?.id && SkeletonList(skeletonLength)}

        {links?.map((data) => (
          <Link key={data.id} data={data} />
        ))}

        {categories.length === CATEGORY_EMPTY ? (
          <Grid item xs={12} className={classes.center}>
            <img src={CategoryEmptyImg} alt="카테고리 비어 있음" />
          </Grid>
        ) : (
          links.length === LINK_EMPTY &&
          (skeletonLength ? null : searchFilter.keyword && SEARCH_LINK_EMPTY ? (
            <Grid item xs={12} className={classes.center}>
              <img src={linkListSearchEmptyImg} alt="검색 조회 없음" />
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.center}>
              <img src={linkListEmptyImg} alt="링크 비어 있음" />
            </Grid>
          ))
        )}
      </div>
      <ScrollUpButton targetRef={contentRef} open={showScrollUpButton} />
    </Grid>
  )
}

export default LinkList
