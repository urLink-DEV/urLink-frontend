import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import useStyles from './style'

function InputTitle({title}) {

  const classes = useStyles();

  return (
    <div className={classes.title}>
      {/* {title
        ? 'TODO: 카테고리 제목 title' 
        : <InputBase className={classes.mainFont} />
      } */}
      <div className={classes.mainFont}>
        카테고리 제목
        <IconButton
          aria-label="setting"
          // onClick={handleClickEditTitle}
        >
          <CreateIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default InputTitle