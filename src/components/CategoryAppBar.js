import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import alarm from '../images/alarm.png'
import person from '../images/person.png'
import history from '../images/history.png'
import Drawer from '@material-ui/core/Drawer'

const drawerWidth = '50%'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    height: '100vh',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  '@global': {
    '.MuiDrawer-paperAnchorDockedRight': {
      position: 'relative',
      width: '100%',
      height: '100vh',
    }
  }
}))

export default function CategoryAppBar(props) {

  const {children} = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const onClickHistoryDrawer = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className={classes.appBar}>
        <div className="drawer-btn-group">
          <button onClick={onClickHistoryDrawer}>
            <img src={history} alt="history button" />
          </button>
          <button>
            <img src={alarm} alt="alarm button" />
          </button>
          <button>
            <img src={person} alt="person button" />
          </button>
        </div>
      </div>
      <Drawer className={clsx(classes.drawer, {
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
              {children}
            </div> : null
        }
      </Drawer>
    </div>
    
  )
}