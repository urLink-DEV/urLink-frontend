import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { createTabList } from '@commons/chromeApis/tab'
import { useToast } from '@modules/ui'
import { linkSelector, linkClearSelect, linksRead, linksRemoveThunk } from '@modules/link'
import { selectSelectedCategory, categoriesRead } from '@modules/category'

function TabButtonGroup() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(selectSelectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const { openToast } = useToast()

  const handleNewTab = useCallback(() => {
    createTabList(selectedLinkList.map((data) => data.path))
  }, [selectedLinkList])

  const handleDeleteSelectedLinkList = useCallback(async () => {
    try {
      await dispatch(
        linksRemoveThunk({ urlIdList: selectedLinkList.map((data) => ({ urlId: data.id })) })
      )
      dispatch(linkClearSelect())
      openToast({ type: 'success', message: '선택하신 링크 카드 정보들을 삭제했습니다.' })
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    } finally {
      // dispatch(categoriesRead.request()) // !! BUG:정보를 불러오는 순간 category 첫번째가 자동으로 읽어 오는 버그 발견
      dispatch(linksRead.request({ categoryId: selectedCategory.id }))
    }
  }, [dispatch, selectedLinkList, selectedCategory.id, openToast])

  if (!selectedLinkList.length) return null

  return (
    <>
      <Button onClick={handleNewTab}>
        <span className={clsx(classes.tabText, classes.tabOpenText)}>
          탭 열기 ({selectedLinkList.length})
        </span>
      </Button>
      <Button onClick={handleDeleteSelectedLinkList}>
        <span className={clsx(classes.tabText, classes.tabDeleteText)}>탭 삭제</span>
      </Button>
    </>
  )
}

export default TabButtonGroup
