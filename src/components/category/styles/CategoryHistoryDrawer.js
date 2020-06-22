import { makeStyles } from '@material-ui/core/styles'

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
    }),
    zIndex: 2
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
  imgCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '50%',
    objectFit: 'contain'
  },
  tabMove: {
    position: 'absolute',
    width: '110px',
    height: '35px',
    borderRadius: '3.2px',
    boxShadow: '0 11px 22px 0 rgba(0, 0, 0, 0.15), 0 8px 8px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#2083ff',
    color: '#fff',
    fontFamily: 'SpoqaHanSans',
    fontSize: 12,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: '50%',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '7px'
  },
  moveIcon: {
    width: 20,
    height: 20,
    position: 'relative',
    left: '1px'
  },
  dragStart: {
    display: 'flex'
  },
  dragEnd: {
    display: 'none'
  }
}))

export default useStyles