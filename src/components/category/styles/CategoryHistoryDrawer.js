import { makeStyles } from '@material-ui/core/styles'
import zIndex from '@material-ui/core/styles/zIndex'
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "scroll",
    overflowX: "hidden",
    position: 'absolute',
    right:64,
    padding: '20px 24px 22px 24px',
    backgroundColor: '#f6f6f6',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  mainFont: {
    height: '36px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '20pt',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000'
  },
  drawerOpen: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    width: '575px',
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },  
  drawerClose: {
    overflowX: 'hidden',
    position: 'absolute',
    right:0,
    width: '30px',
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  tabMove: {
    position: 'absolute',
    width: '102px',
    height: '32px',
    borderRadius: '3.2px',
    boxShadow: '0 11px 22px 0 rgba(0, 0, 0, 0.15), 0 8px 8px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#2083ff',
    zIndex: 9999
  },
  dragStart: {
    display: 'inline'
  },
  dragEnd: {
    display: 'none'
  }
}))

export default useStyles