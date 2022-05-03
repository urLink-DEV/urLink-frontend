import React, { useCallback } from 'react'

import { Button } from '@mui/material'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { categorySelector, categoriesRead } from '@modules/category'
import { linkSelector, linkClearSelect, linksRead, linksRemoveThunk } from '@modules/link'
import { useToast } from '@modules/ui'
import { createTabList } from '@utils/chromeApis/tab'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function TabButtonGroup() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const { openToast } = useToast()

  const handleNewTab = useCallback(() => {
    createTabList(selectedLinkList.map((data) => data.path))
    GAEvent('메인', '복수의 링크 새 탭 열기')
  }, [selectedLinkList])

  const handleDeleteSelectedLinkList = useCallback(async () => {
    try {
      await dispatch(linksRemoveThunk({ urlIdList: selectedLinkList.map((data) => ({ urlId: data.id })) }))
      dispatch(linkClearSelect())
      openToast({ type: 'success', message: '선택하신 링크 카드 정보들을 삭제했습니다.' })
      GAEvent('메인', '복수의 링크 삭제 하기')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    } finally {
      dispatch(categoriesRead.request())
      dispatch(linksRead.request({ categoryId: selectedCategory.id }, { key: selectedCategory.id }))
    }
  }, [dispatch, selectedLinkList, selectedCategory.id, openToast])

  if (!selectedLinkList.length) return null

  return (
    <>
      <Button onClick={handleNewTab}>
        <span className={clsx(classes.tabText, classes.tabOpenText)}>탭 열기 ({selectedLinkList.length})</span>
      </Button>
      <Button onClick={handleDeleteSelectedLinkList}>
        <span className={clsx(classes.tabText, classes.tabDeleteText)}>탭 삭제</span>
      </Button>
    </>
  )
}

export default TabButtonGroup
