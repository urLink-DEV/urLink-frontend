import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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

export const useStyles = makeStyles((theme) => ({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflow: 'scroll',
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  toolbar: {
    height: 40,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: '0 50px 0 0',
  },
  imgCenter: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-45%, -55%)',
  },
  mainFont: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: 180,
    height: '36px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '20pt',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
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
    fontFamily: 'SpoqaHanSans',
    padding: '5px 10px',
  },
  popoverDiv: {
    marginBottom: 10,
  },
  popoverBtn: {
    height: 30,
    marginTop: 3,
  },
  textfield: {
    '&:focus': { border: '1px solid #2083ff' },
    outline: 'none',
    borderRadius: '4px',
    border: 'solid 1px #e9ecef',
    backgroundColor: '#f1f3f5',
    width: '100%',
    height: '28px',
  },
  gridCard: {
    padding: 0,
    margin: 20,
  },
  settingsIcon: {
    marginTop: 5,
  },
  '@global': {
    '.MuiFilledInput-inputMarginDense': {
      paddingTop: '10px',
    },
    '.MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#2083ff',
      color: 'white',
    },
    'div.makeStyles-root-283': {
      right: 0,
    },
    'div.makeStyles-drawerOpen-285': {
      right: 50,
    },
    '.MuiListItem-root': {
      width: 208,
    },
  },
}));

export default useStyles;
