import React from 'react'

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

function SearchBar() {
  const classes = useStyles()
  const [age, setAge] = React.useState('')
  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <Box className={classes.searchBar} boxShadow={2}>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={age}
        onChange={handleChange}
        // input={<BootstrapInput />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <InputBase
        placeholder="Search…"
        classes={{input: classes.searchInput}}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
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
