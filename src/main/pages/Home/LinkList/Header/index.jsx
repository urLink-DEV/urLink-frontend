import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'

import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { debounce } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

import { useDebounce } from '@/hooks/useDebounce'
import SearchBar from '@main/components/SearchBar'
import { categorySelector } from '@modules/category'
import { useLinks, linkSearchFilterChangeState } from '@modules/link'

import EditableCategoryTitle from './EditableCategoryTitle'
import useStyles from './style'
import TabButtonGroup from './TabButtonGroup'

const listSearchFilter = [
  { search: 'path', name: '주소' },
  { search: 'title', name: '제목' },
]

function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { reload } = useLinks({ categoryId: selectedCategory?.id })

  const [selectedName, setSelectedName] = useState(listSearchFilter[0].search)
  const [keyword, setKeyword] = useState(null)
  const [isSearch, setIsSearch] = useState(false)

  const debouncedKeyword = useDebounce(keyword, 250)

  const handleChangeInput = useCallback((e) => {
    setIsSearch(true)
    setKeyword(e.target.value)
  }, [])

  // const handleKeyDownLinkSearch = useCallback(
  //   (e) => {
  //     if (e.key === 'Enter') {
  //       handleClickLinkSearch()
  //     }
  //   },
  //   [dispatch, keyword, selectedName]
  // )

  // const handleClickLinkSearch = useCallback(() => {
  //   dispatch(linkSearchFilterChangeState({ selectedName, keyword }))
  // }, [dispatch, keyword, selectedName])

  const handleSelectName = useCallback((e) => {
    setSelectedName(e.target.value)
    handleReload()
  }, [])

  const handleReload = useMemo(() => {
    return debounce(() => {
      setIsSearch(false)
      setKeyword(null)
      reload()
    }, 400)
  }, [reload])

  useEffect(() => {
    if (isSearch) {
      console.log(debouncedKeyword)
      dispatch(linkSearchFilterChangeState({ selectedName, keyword: debouncedKeyword }))
    }
  }, [isSearch, dispatch, selectedName, debouncedKeyword])

  return (
    <Toolbar className={classes.toolbar}>
      <EditableCategoryTitle />
      <TabButtonGroup />
      <IconButton onClick={handleReload}>
        <RefreshIcon />
      </IconButton>
      <SearchBar
        inputProps={{
          // onKeyDown: handleKeyDownLinkSearch,
          onChange: handleChangeInput,
        }}
        listSearchFilter={listSearchFilter}
        onSelectName={handleSelectName}
        selectedName={selectedName}
        // onClickSearch={handleClickLinkSearch}
      />
    </Toolbar>
  )
}

export default memo(Header)
