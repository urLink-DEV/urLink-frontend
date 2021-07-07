import React, { useCallback, memo, useState, useMemo } from 'react'

import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { debounce } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

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
  const [input, setInput] = useState('')

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleKeyDownLinkSearch = useCallback(
    (e) => {
      const { key, currentTarget } = e
      const { value } = currentTarget
      if (key === 'Enter') {
        dispatch(linkSearchFilterChangeState({ selectedName, keyword: value }))
      }
    },
    [dispatch, selectedName]
  )

  const handleClickLinkSearch = useCallback(() => {
    dispatch(linkSearchFilterChangeState({ selectedName, keyword: input }))
  }, [dispatch, input, selectedName])

  const handleSelectName = (e) => {
    setSelectedName(e.target.value)
  }

  const handleReload = useMemo(() => {
    return debounce(() => {
      reload()
    }, 400)
  }, [reload])

  return (
    <Toolbar className={classes.toolbar}>
      <EditableCategoryTitle />
      <TabButtonGroup />
      <IconButton onClick={handleReload}>
        <RefreshIcon />
      </IconButton>
      <SearchBar
        inputProps={{
          onKeyDown: handleKeyDownLinkSearch,
          onChange: handleChangeInput,
        }}
        listSearchFilter={listSearchFilter}
        onSelectName={handleSelectName}
        selectedName={selectedName}
        onClickSearch={handleClickLinkSearch}
      />
    </Toolbar>
  )
}

export default memo(Header)
