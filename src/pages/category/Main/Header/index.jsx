import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import useStyles from './style'

function Header({title}) {

  const classes = useStyles();
  
  return (
    <main className={classes.content}>
      <div position="static">
        <Toolbar container className={classes.toolbar}>
          <div className={classes.title}>
            {title
              ? 'TODO: 카테고리 제목 title' 
              : <InputBase className={classes.mainFont} />
            }
          </div>
        </Toolbar>
      </div>
    </main>
  )
}

export default Header