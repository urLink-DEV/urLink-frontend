import { makeStyles } from '@material-ui/core/styles'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { withStyles } from '@material-ui/styles'

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

const useStyles = makeStyles((_theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchBtn: {
    height: 30,
    padding: '5px 10px',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
    },
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBtnText: {
    width: 34,
    height: 15,
    color: '#868e96',
    fontSize: '12pt',
    fontWeight: '300',
    textAlign: 'center',
  },
  inputBox: {
    width: 220,
    padding: '5px 10px',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
  },
  textfield: {
    width: '100%',
    height: 28,
    padding: '3px 7px',
    borderRadius: '4px',
    border: 'solid 1px #e9ecef',
    backgroundColor: '#f1f3f5',
    outline: 'none',
    '&:focus': { border: '1px solid #2083ff' },
  },
  marginBottom10: {
    marginBottom: 10,
  },
  popoverBtn: {
    height: 30,
    marginTop: 3,
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: '#2083ff',
      fontWeight: 400,
    },
  },
}))

export default useStyles
