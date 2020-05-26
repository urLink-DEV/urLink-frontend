import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import useStyles from './styles/CategoryHistory'

export default function CategoryHistory(props) {

  const {children, open, onClickHistoryDrawer} = props
  const classes = useStyles()

  return <Drawer className={clsx(classes.drawer, {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open,
  })}
    variant="permanent"
    anchor="right"
    open={open}
    onClose={onClickHistoryDrawer}
  >
    {
      open ?
        <div className={classes.drawerOpenSpace}>
          <div className={classes.root}>
            {children}
          </div>
        </div> : null
    }
  </Drawer>
}