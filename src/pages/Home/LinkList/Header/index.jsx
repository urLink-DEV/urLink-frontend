import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import InputTitle from './InputTitle'
import SearchBar from './SearchBar'
import useStyles from './style'

function Header({title}) {

  const classes = useStyles();

  return (
    <Toolbar container className={classes.toolbar}>
      <InputTitle title={title} />
      <SearchBar />
    </Toolbar>
  )
}

export default Header