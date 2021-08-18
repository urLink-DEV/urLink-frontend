import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'

import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { debounce } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

import useDebounce from '@hooks/useDebounce'
import SearchBar from '@main/components/SearchBar'
import { categorySelector } from '@modules/category'
import { useLinks, linkSearchFilterChangeState } from '@modules/link'

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
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { reload } = useLinks({ categoryId: selectedCategory?.id })

  const [selectedName, setSelectedName] = useState(searchFilterList[0].search)
  const [keyword, setKeyword] = useState(null)
  const [searchBarKey, setSearchBarKey] = useState(0)

  const debouncedKeyword = useDebounce(keyword, 250)

  const handleChangeInput = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  const handleResetInput = useCallback(() => {
    setSearchBarKey(searchBarKey + 1)
    setKeyword('')
  }, [searchBarKey])

  const handleReload = useMemo(() => {
    return debounce(() => {
      handleResetInput()
      reload()
    }, 400)
  }, [reload, handleResetInput])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      setSelectedName(e.target.value)
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
      <IconButton onClick={handleReload}>
        <RefreshIcon />
      </IconButton>
      <SearchBar
        key={searchBarKey}
        inputProps={{
          onChange: handleChangeInput,
        }}
        searchFilterList={searchFilterList}
        onSelectName={handleSelectName}
        selectedName={selectedName}
      />
    </Toolbar>
  )
}

export default memo(Header)
