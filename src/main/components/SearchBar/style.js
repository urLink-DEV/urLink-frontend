import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    width: 407,
    padding: 0,
    margin: 'auto 0',
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
  searchInput: {
    width: 250,
    color: 'black',
    paddingLeft: theme.spacing(1),
  },
  inputSelect: {
    '& > .MuiSelect-select.MuiSelect-select': {
      width: 70,
      paddingLeft: 10,
    },
    '& > .MuiSelect-iconStandard': {
      right: 0,
    },
  },
  menuItem: {
    padding: theme.spacing(0, 1.5),
  },
  divider: {
    margin: theme.spacing(0.5, 0),
  },
  pickerBtn: {
    color: '#2083FF',
    textDecoration: 'underline',
    fontSize: '1rem',
    '&:hover': {
      color: '#2083FF',
      textDecoration: 'underline',
    },
  },
  datePicker: {
    width: 320,
  },
  searchIcon: {
    width: 40,
    color: '#CCCCCC',
    margin: '7px 0 7px 7px',
  },
}))

export default useStyles
