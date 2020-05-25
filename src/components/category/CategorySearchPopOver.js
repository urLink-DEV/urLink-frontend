import React from 'react'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  searchBtn: {
    padding: '5px 10px',
    margin: '0 16px',
  },
  searchIcon: {
    marginRight: 5,
  }
}))

export default function CategorySearchPopOver(props) {

  const classes = useStyles()
  const {onClickBtn} = props

  return (
    <div>
      <Button className={classes.searchBtn}
        variant="contained" >
        <SearchIcon className={classes.searchIcon} fontSize="small" />
        Search
      </Button>
      <Popover 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        The content of the Popover.
      </Popover>
    </div>
    
  )
}