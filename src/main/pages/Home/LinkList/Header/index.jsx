import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'

import { Refresh as RefreshIcon } from '@mui/icons-material'
import { Button, IconButton, Toolbar } from '@mui/material'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import useDebounce from '@hooks/useDebounce'
// import SearchBar from '@main/components/SearchBar'
import { categorySelector, categoriesRead } from '@modules/category'
import {
  linkSelector,
  linksSelectedState,
  linkSearchFilterChangeState,
  linkClearSelect,
  linksRead,
  linksRemoveThunk,
} from '@modules/link'
import { useToast } from '@modules/ui'
import { createTabList } from '@utils/chromeApis/tab'
import { GAEvent } from '@utils/ga'

import EditableCategoryTitle from './EditableCategoryTitle'
import useStyles from './style'
import TabButtonGroup from './TabButtonGroup'

const searchFilterList = [
  { search: 'path', name: '주소' },
  { search: 'title', name: '제목' },
]

function Header({ links }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const { openToast } = useToast()

  const [selectedName, setSelectedName] = useState(searchFilterList[0].search)
  const [selectLinks, setSelectLinks] = useState(false)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword, 250)

  // const handleChangeInput = useCallback((e) => {
  //   setKeyword(e.target.value)
  // }, [])

  const handleResetInput = useCallback(() => {
    setKeyword('')
  }, [])

  const handleReload = useMemo(() => {
    return debounce(() => {
      handleResetInput()
      GAEvent('메인', '새로고침 버튼 클릭')
    }, 400)
  }, [handleResetInput])

  const handleLinksSelectStateOpen = useCallback(() => {
    setSelectLinks(true)
    dispatch(linksSelectedState(true))
    GAEvent('메인', '다중 선택 버튼 클릭')
  }, [dispatch])

  const handleLinksSelectStateClose = useCallback(() => {
    setSelectLinks(false)
    dispatch(linksSelectedState(false))
    dispatch(linkClearSelect())
    GAEvent('메인', '선택 해제 버튼 클릭')
  }, [dispatch])

  const handleNewTab = useCallback(() => {
    createTabList(selectedLinkList.map((data) => data.path))
    console.log('selectedLinkList', selectedLinkList)
    GAEvent('메인', '복수의 링크 새 탭 열기')
  }, [selectedLinkList])

  const handleDeleteSelectedLinkList = useCallback(async () => {
    try {
      await dispatch(linksRemoveThunk({ urlIdList: selectedLinkList.map((data) => ({ urlId: data.id })) }))
      dispatch(linkClearSelect())
      openToast({ type: 'success', message: '선택하신 링크 카드 정보들을 삭제했습니다.' })
      setSelectLinks(false)
      dispatch(linksSelectedState(false))
      GAEvent('메인', '복수의 링크 삭제 하기')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    } finally {
      dispatch(categoriesRead.request())
      dispatch(linksRead.request({ categoryId: selectedCategory.id }, { key: selectedCategory.id }))
    }
  }, [dispatch, selectedLinkList, selectedCategory.id, openToast])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      setSelectedName(e.target.value)
      GAEvent('메인', '검색 주제 바꾸기')
    },
    [handleResetInput]
  )

  useEffect(() => {
    dispatch(linkSearchFilterChangeState({ selectedName, keyword: debouncedKeyword }))
  }, [dispatch, selectedName, debouncedKeyword])

  return (
    <Toolbar className={classes.toolbar}>
      <EditableCategoryTitle />
      {/* <TabButtonGroup /> */}
      <IconButton onClick={handleReload} className={classes.refreshBtn}>
        <RefreshIcon />
      </IconButton>
      {/* <SearchBar
        inputProps={{
          onChange: handleChangeInput,
          value: keyword,
        }}
        searchFilterList={searchFilterList}
        onSelectName={handleSelectName}
        selectedName={selectedName}
      /> */}
      {!selectLinks ? (
        <Button onClick={handleLinksSelectStateOpen} className={classes.selectLinksBtn}>
          다중 선택
        </Button>
      ) : (
        <div className={classes.selectLinksBtnGroup}>
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
