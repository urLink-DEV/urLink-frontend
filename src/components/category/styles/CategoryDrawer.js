import { makeStyles } from '@material-ui/core/styles'
import {withStyles} from '@material-ui/styles'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
 
export const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const drawerWidth = 260;

export const useStyles = makeStyles((theme) => ({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    overflow: 'scroll',
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  coverBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(53, 142, 255, 0.15)',
    height: '100%',
    width: 'calc(100% - 635px)',
    paddingLeft: 259,
    zIndex: 1,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: '0 63px 0 0',
  },
  listItem: {
    display: 'block',
    width: 208,
    borderRadius: 4,
    padding: 0,
    marginTop: 10,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    '&:hover': {
      boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)"
    },
    outline: 'none'
  },
  addButton: {
    width: 208,
    height: 52,
    display: 'block',
    borderRadius: 4,
    margin: "10px 0",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  deleteButton: {
    display: 'none',
    width: 208,
    height: 52,
    borderRadius: 4,
    margin: "10px 0",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  enterTab: {
    width: 208,
    height: 52,
    display: 'none',
    alignItems: 'center',
    justifyCntent: "space-around",
    borderRadius: 4,
    padding: 8,
    marginTop: 10,
    backgroundColor: "#ffffff",
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff",
  },
  flex: {
    display: 'flex'
  },
  block: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  },
  input: {
    padding:12,
    width: 122,
    height: 28,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#f1f3f5",
    fontFamily: "AppleSDGothicNeo",
    fontSize: 14,
  },
  okBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#2083ff",
    padding: 0,
    minWidth: 0,
    color: "#fff",
    fontFamily: "SpoqaHanSans",
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#2083ff'
    }
  },
  cancelBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    padding: 0,
    minWidth: 0,
    fontFamily: "SpoqaHanSans",
    fontSize: 12
  },
  selected: {
    width:210,
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff"
  },
  addLinkIcon: {
    color: '#358eff',
    width: 50,
    height: 50
  }, 
  imgCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '80%',
    height: '70%',
    objectFit: 'contain'
  },
  mainFont: {
    width: 200,
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
  textfield: {
    '&:focus' : {border: '1px solid #2083ff'},
    outline: 'none',
    borderRadius: '4px',
    border: 'solid 1px #e9ecef',
    backgroundColor: '#f1f3f5',
    width: '100%',
    height: '28px'
  },
  dragline: {
    width: 208,
    margin: "20px 0",
    height: 2,
    borderRadius: 2,
    display: "none",
    backgroundImage: "linear-gradient(271deg, #e0f6ff, #2083ff)"
  },
  '@global': {
    '.MuiFilledInput-inputMarginDense': {
      paddingTop: '10px'
    },
    '.MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#2083ff',
      color: 'white',
    },
    '.MuiButton-root': {
      minWidth: 50,
    },
    'div.makeStyles-root-283': {
      right: 0
    },
    'div.makeStyles-drawerOpen-285': {
      right: 50
    }
  }
}))

export default useStyles