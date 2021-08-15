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
  const [searchBarKey, setSearchBarKey] = useState(0)

  const debouncedKeyword = useDebounce(keyword, 250)

  const handleChangeInput = useCallback((e) => {
    setIsSearch(true)
    setKeyword(e.target.value)
  }, [])

  const handleResetInput = useCallback(
    (e) => {
      setSearchBarKey(searchBarKey + 1)
      setIsSearch(false)
      setKeyword('')
    },
    [searchBarKey]
  )

  const handleReload = useMemo(() => {
    return debounce(() => {
      reload()
    }, 400)
  }, [reload])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      handleReload()
      setSelectedName(e.target.value)
    },
    [handleResetInput, handleReload]
  )

  useEffect(() => {
    if (isSearch) {
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
        key={searchBarKey}
        inputProps={{
          onChange: handleChangeInput,
        }}
        listSearchFilter={listSearchFilter}
        onSelectName={handleSelectName}
        selectedName={selectedName}
      />
    </Toolbar>
  )
}

export default memo(Header)
