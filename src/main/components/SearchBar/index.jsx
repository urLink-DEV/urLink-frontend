import React, { useState } from 'react'

import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

function SearchBar() {
  const classes = useStyles()
  const [menu, setMenu] = useState(10)
  const handleChange = (event) => {
    setMenu(event.target.value)
  }

  return (
    <Container className={classes.searchBar} 
      boxShadow={2}
    >
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
        value={menu}
        onChange={handleChange}
        // input={<BootstrapInput />}
      >
        <MenuItem className={classes.menuItem} value={10}>제목</MenuItem>
        <MenuItem className={classes.menuItem} value={20}>주소</MenuItem>
      </Select>
      <Divider className={classes.divider}
        orientation="vertical"
        flexItem="true"
      />
      <InputBase
        placeholder="웹사이트 주소나 제목을 검색하세요"
        classes={{input: classes.searchInput}}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton className={classes.searchIcon}>
        <SearchIcon />
      </IconButton>
    </Container>
  )
}

export default SearchBar
