import React, { useState } from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = '50%'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  drawer: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    height: '100vh',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpenSpace: {
    width: '100%',
    height: '100vh'
  },
  drawerClose: {
    width: 30,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    height: '100vh',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    overflowX: 'hidden',
  },
  '@global': {
    '.MuiDrawer-paperAnchorDockedRight': {
      position: 'relative',
      width: '100%',
      height: '100vh',
    }
  },
}))

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