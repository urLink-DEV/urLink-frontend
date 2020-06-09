import React, {useState} from 'react'
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
  },
  popover: {
    padding: '5px 10px',
  },
  popoverDiv: {
    marginBottom: 10,
  },
  '@global': {
    '.MuiFilledInput-inputMarginDense': {
      paddingTop: '10px'
    }
  }
}))

export default function CategorySearchPopOver(props) {

  const classes = useStyles()
  const {children} = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopOverClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget)
  };

  const handlePopOverClose = () => {
    setAnchorEl(null)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button className={classes.searchBtn}
        aria-describedby={id}
        onClick={handlePopOverClick}
        variant="contained" >
        <SearchIcon className={classes.searchIcon} fontSize="small" />
        Search
      </Button>
      <Popover 
        id={id}
        open={open}
        onClose={handlePopOverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </>
    
  )
}