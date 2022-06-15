import React, { useCallback, memo, useState, useEffect } from 'react'

import { Button, Toolbar } from '@mui/material'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { categorySelector, categoriesRead } from '@modules/category'
import { linkSelector, linkSelectBoxChangeState, linkClearSelect, linksRead, linksRemoveThunk } from '@modules/link'
import { useToast } from '@modules/ui'
import { createTabList } from '@utils/chromeApis/tab'
import { GAEvent } from '@utils/ga'

import EditableCategoryTitle from './EditableCategoryTitle'
import useStyles from './style'

function Header() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const isOpenLinkSelectBox = useSelector(linkSelector.isOpenLinkSelectBox)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)

  const { openToast } = useToast()

  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)
  const [isScrollTrigger, setIsScrollTrigger] = useState(false)

  useEffect(() => {
    if (isOpenLinkSelectBox) setIsOpenSelectBox(true)
    else setIsOpenSelectBox(false)
  }, [isOpenLinkSelectBox])

  const handleLinksSelectStateOpen = useCallback(() => {
    dispatch(linkSelectBoxChangeState(true))
    GAEvent('메인', '다중 선택 버튼 클릭')
  }, [dispatch])

  const handleLinksSelectStateClose = useCallback(() => {
    dispatch(linkSelectBoxChangeState(false))
    dispatch(linkClearSelect())
    GAEvent('메인', '선택 해제 버튼 클릭')
  }, [dispatch])

  const handleNewTab = useCallback(() => {
    createTabList(selectedLinkList.map((data) => data.path))
    GAEvent('메인', '복수의 링크 새 탭 열기')
  }, [selectedLinkList])

  const handleDeleteSelectedLinkList = useCallback(async () => {
    try {
      await dispatch(linksRemoveThunk({ urlIdList: selectedLinkList.map((data) => ({ urlId: data.id })) }))
      dispatch(linkClearSelect())
      openToast({ type: 'success', message: '선택하신 링크 카드 정보들을 삭제했습니다.' })
      dispatch(linkSelectBoxChangeState(false))
      GAEvent('메인', '복수의 링크 삭제 하기')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    } finally {
      dispatch(categoriesRead.request())
      dispatch(linksRead.request({ categoryId: selectedCategory.id }, { key: selectedCategory.id }))
    }
  }, [dispatch, selectedLinkList, selectedCategory.id, openToast])

  useEffect(() => {
    const handleScrollAppBarIn = () => {
      const scrollTop = document.documentElement.scrollTop
      setIsScrollTrigger(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScrollAppBarIn)
    return () => document.removeEventListener('scroll', handleScrollAppBarIn)
  }, [])

  return (
    <Toolbar className={classes.toolbar}>
      <EditableCategoryTitle />
      {!isOpenSelectBox ? (
        <Button
          className={clsx(classes.selectLinksBtn, { [classes.selectBoxInversion]: isScrollTrigger })}
          onClick={handleLinksSelectStateOpen}
        >
          다중 선택
        </Button>
      ) : (
        <div className={clsx(classes.selectLinksBtnGroup, { [classes.selectBoxInversion]: isScrollTrigger })}>
          <span className={classes.chosenLinks}>{selectedLinkList.length}개 선택</span>
          <Button className={classes.btnInBtnGroup} onClick={handleLinksSelectStateClose}>
            선택 해제
          </Button>
          <Button className={classes.btnInBtnGroup} onClick={handleNewTab}>
            링크 열기
          </Button>
          <Button className={classes.deleteLinksBtn} onClick={handleDeleteSelectedLinkList}>
            삭제
          </Button>
        </div>
      )}
    </Toolbar>
  )
}

export default memo(Header)
