import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    width: 410,
    padding: 0,
    margin: 'auto 0 auto auto',
    borderRadius: 20,
    backgroundColor: 'white',
    border: theme.spacing(0.5, 0),

    '& > .MuiInput-underline:before': {
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '0px',
      pointerEvents: 'none',
    },
  },
  searchInputBase: {
    width: '65%',
  },
  searchInput: {
    width: 320,
    color: 'black',
    paddingLeft: theme.spacing(1),
  },
  inputSelect: {
    width: '25%',
    fontSize: 14,
    '& > .MuiSelect-select.MuiSelect-select': {
      paddingLeft: '10px',
    },
    '& > .MuiSelect-iconStandard': {
      right: 0,
    },
  },
  menuItem: {
    fontSize: 14,
    padding: theme.spacing(0, 1.5),
  },
  divider: {
    margin: theme.spacing(0.5, 0),
  },
  pickerBtn: {
    color: 'black',
    fontSize: '1rem',
  },
  datePicker: {
    width: 320,
  },
  searchIcon: {
    width: '10%',
    color: '#CCCCCC',
    margin: '7px 0 7px 7px',
  },
}))

export default useStyles
