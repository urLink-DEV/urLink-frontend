import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'

import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'

import { GAEvent } from '@/utils/ga'
import useDebounce from '@hooks/useDebounce'
import SearchBar from '@main/components/SearchBar'
import { linkSearchFilterChangeState } from '@modules/link'

import EditableCategoryTitle from './EditableCategoryTitle'
import useStyles from './style'
import TabButtonGroup from './TabButtonGroup'

const searchFilterList = [
  { search: 'path', name: '주소' },
  { search: 'title', name: '제목' },
]

function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [selectedName, setSelectedName] = useState(searchFilterList[0].search)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword, 250)

  const handleChangeInput = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  const handleResetInput = useCallback(() => {
    setKeyword('')
  }, [])

  const handleReload = useMemo(() => {
    GAEvent('메인', '새로고침 버튼 클릭')
    return debounce(() => {
      handleResetInput()
    }, 400)
  }, [handleResetInput])

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
      <TabButtonGroup />
      <IconButton onClick={handleReload} className={classes.refreshBtn}>
        <RefreshIcon />
      </IconButton>
      <SearchBar
        inputProps={{
          onChange: handleChangeInput,
          value: keyword,
        }}
        searchFilterList={searchFilterList}
        onSelectName={handleSelectName}
        selectedName={selectedName}
      />
    </Toolbar>
  )
}

export default memo(Header)
