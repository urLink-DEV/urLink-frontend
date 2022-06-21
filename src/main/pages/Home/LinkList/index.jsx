import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Grid, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import linkListEmptyImg from '@assets/images/group-11.png'
import linkListSearchEmptyImg from '@assets/images/group-17.png'
import CategoryEmptyImg from '@assets/images/group-5.svg'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
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

  useOutsideAlerter(
    rootRef,
    selectedLinkList.length,
    useCallback(() => dispatch(linkClearSelect()), [dispatch])
  )

  useEffect(() => {
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
    <div className={classes.root} ref={rootRef}>
      {!!selectedCategory?.id && (
        <div className={classes.header}>
          <Header links={links} />
        </div>
      )}
      <div className={classes.content}>
        {!skeletonLength
          ? null
          : dragData.type === 'link' && createLinksCategoryId === selectedCategory?.id
          ? SkeletonList(skeletonLength)
          : dragData.category.data.id === selectedCategory?.id && SkeletonList(skeletonLength)}

        {links?.map((data) => (
          <Link key={data.id} data={data} />
        ))}
      </div>

      {categories.length === CATEGORY_EMPTY ? (
        <div className={classes.center}>
          <Typography className={classes.centerFont}>생성하신 카테고리가 없습니다</Typography>
          <Typography className={classes.centerSubFont}>링크 보관을 위해 새로운 카테고리를 생성해주세요.</Typography>
        </div>
      ) : (
        links.length === LINK_EMPTY &&
        (skeletonLength ? null : searchFilter.keyword && SEARCH_LINK_EMPTY ? (
          <div className={classes.center}>
            <Typography className={classes.centerFont}>검색어와 일치하는 검색 결과가 없습니다</Typography>
          </div>
        ) : (
          <div className={classes.center}>
            <Typography className={classes.centerFont}>카테고리에 담은 링크가 없습니다</Typography>
            <Typography className={classes.centerSubFont}>
              방문기록을 열어 보관할 링크를 선택하고 카테고리에 끌어다 놓으세요.
            </Typography>
          </div>
        ))
      )}
    </div>
  )
}

export default LinkList
