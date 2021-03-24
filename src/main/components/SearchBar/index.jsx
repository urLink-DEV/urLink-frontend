import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

function SearchBar() {
  const classes = useStyles()
  const [menu, setMenu] = useState(10)
  const handleChange = (event) => {
    setMenu(event.target.value)
  }

  return (
    <Grid container className={classes.searchBar} boxShadow={2}>
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
      <Divider orientation="vertical" flexItem="true" />
      <InputBase
        placeholder="Search…"
        classes={{input: classes.searchInput}}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Grid>
    // <div className={classes.search}>
    //   <div className={classes.searchIcon}>
    //     <SearchIcon />
    //   </div>
    //   <InputBase
    //     placeholder="Search…"
    //     classes={{
    //       root: classes.inputRoot,
    //       input: classes.inputInput,
    //     }}
    //     inputProps={{ 'aria-label': 'search' }}
    //   />
    // </div>
  )
}

export default SearchBar
