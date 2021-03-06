import React, { useCallback, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { IconButton, Toolbar } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import SearchButton from '@components/SearchButton'
import EditableCategoryTitle from './EditableCategoryTitle'
import TabButtonGroup from './TabButtonGroup'
import useStyles from './style'
import { selectSelectedCategory } from '@modules/category'
import { useLinks, linkSearchFilterChangeState } from '@modules/link'

const listSearchFilter = [
  { search: 'path', name: '도메인' },
  { search: 'title', name: '단어' },
]

function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(selectSelectedCategory)
  const { refresh } = useLinks({ categoryId: selectedCategory?.id })

  const [selectedName, setSelectedName] = useState(listSearchFilter[0].search)

  const handleLinkSearch = useCallback(
    (e) => {
      const { key, currentTarget } = e
      const { value } = currentTarget
      if (key === 'Enter') {
        dispatch(linkSearchFilterChangeState({ selectedName, keyword: value }))
      }
    },
    [dispatch, selectedName]
  )

  const handleSelectButton = useCallback((_e, name) => {
    setSelectedName(name)
  }, [])

  const handleReload = debounce(() => {
    refresh()
  }, 400)

  return (
    <Toolbar className={classes.toolbar}>
      <EditableCategoryTitle />
      <SearchButton
        inputProps={{
          onKeyDown: handleLinkSearch,
        }}
        listSearchFilter={listSearchFilter}
        onSelectButton={handleSelectButton}
        selectedName={selectedName}
      />
      <TabButtonGroup />
      <IconButton onClick={handleReload}>
        <RefreshIcon />
      </IconButton>
    </Toolbar>
  )
}

export default memo(Header)
