import { fade, makeStyles } from '@material-ui/core/styles'
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
}))(ToggleButtonGroup)

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
  imgCenter: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-45%, -55%)',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#2083ff', 0.75),
    '&:hover': {
      backgroundColor: fade('#2083ff', 0.5),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
  gridCard: {
    padding: 0,
    margin: 20,
  },
  // '@global': {
  //   '.MuiFilledInput-inputMarginDense': {
  //     paddingTop: '10px'
  //   },
  //   '.MuiToggleButton-root.Mui-selected': {
  //     backgroundColor: '#2083ff',
  //     color: 'white',
  //   },
  //   'div.makeStyles-root-283': {
  //     right: 0
  //   },
  //   'div.makeStyles-drawerOpen-285': {
  //     right: 50
  //   },
  //   '.MuiListItem-root': {
  //     width: 208
  //   },
  //   '.MuiListItem-gutters' : {
  //     padding: 0,
  //     margin: '10px 0'
  //   }
  // }
}))

export default useStyles