import { fade, makeStyles } from '@material-ui/core/styles'

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
  content: {
    width: '100%',
    padding: theme.spacing(3),
    margin: '0 50px 0 0',
  },
  imgCenter: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-45%, -55%)',
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