import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'

import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'

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

function Header({ links }) {
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
    return debounce(() => {
      handleResetInput()
    }, 400)
  }, [handleResetInput])

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
      {!!links.length && (
        <>
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
        </>
      )}
    </Toolbar>
  )
}

export default memo(Header)
