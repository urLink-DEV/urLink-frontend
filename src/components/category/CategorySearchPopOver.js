import React, {useState} from 'react'

import Popover from '@material-ui/core/Popover'
import useStyles from './styles/CategorySearchPopOver'

import SearchIcon from '../../images/search.png'

export default function CategorySearchPopOver(props) {

  const classes = useStyles()
  const {children} = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopOverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <button 
        className={classes.searchBtn}
        aria-describedby={id}
        onClick={handlePopOverClick}>
        <img src={SearchIcon} className={classes.searchIcon}/>
        <span className={classes.searchBtnText}>Search</span>
      </button>
      <Popover
        id={id}
        open={open}
        onClose={handlePopOverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {children}
      </Popover>
    </>
  )
}