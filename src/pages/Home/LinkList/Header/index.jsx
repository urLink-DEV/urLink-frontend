import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import InputTitle from './InputTitle'
import SearchBar from './SearchBar'
import useStyles from './style'

function Header() {

  const classes = useStyles()

  return (
    <Toolbar container className={classes.toolbar}>
      <InputTitle />
      <SearchBar />
    </Toolbar>
  )
}

export default Header