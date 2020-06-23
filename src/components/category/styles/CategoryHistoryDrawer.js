import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "scroll",
    overflowX: "hidden",
    position: 'absolute',
    right: 50,
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
  },
  tabOpenText: {
    width: '100px',
    height: '31px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.64px',
    textAlign: 'center',
    color: '#737b84',
    backgroundColor: 'transparent'
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBtnText: {
    width: '34px',
    height: '15px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '12pt',
    fontWeight: '300',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#868e96',
  },
  textfield: {
    '&:focus' : {border: '1px solid #2083ff'},
    outline: 'none',
    borderRadius: '4px',
    border: 'solid 1px #e9ecef',
    backgroundColor: '#f1f3f5',
    width: '100%',
    height: '28px'
  },
  popover: {
    width: '220px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
    fontFamily: "SpoqaHanSans",
    padding: '5px 10px',
  },
  popoverDiv: {
    marginBottom: 10,
  },
  popoverBtn: {
    height: 30,
    marginTop: 3
  },
}))

export default useStyles