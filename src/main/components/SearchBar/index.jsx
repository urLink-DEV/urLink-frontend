import React, { useState } from 'react'

import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

function SearchBar({ inputProps, listSearchFilter, onSelectName, selectedName, onClickSearch }) {
  const classes = useStyles()
  
  return (
    <Container className={classes.searchBar}>
      <Select className={classes.inputSelect}
        MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={selectedName}
        onChange={onSelectName}
      >
        {listSearchFilter?.map(({ search, name }) => (
          <MenuItem className={classes.menuItem} 
            key={search}
            value={search}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      <Divider className={classes.divider}
        orientation="vertical"
        flexItem={true}
      />
      <InputBase
        placeholder="웹사이트 주소나 제목을 검색하세요"
        classes={{input: classes.searchInput}}
        inputProps={{ 'aria-label': 'search' }}
        {...inputProps}
      />
      <IconButton className={classes.searchIcon}
        onClick={onClickSearch}
      >
        <SearchIcon />
      </IconButton>
    </Container>
  )
}

export default SearchBar
