import { makeStyles } from '@material-ui/core/styles'

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
    width: 260,
    color: 'black',
    paddingLeft: `calc(${theme.spacing(1)}px)`,
  },
  inputSelect: {
    width: 100,

    '& > .MuiSelect-select.MuiSelect-select': {
      paddingLeft: '10px',
    },
  },
  menuItem: {
    padding: theme.spacing(0, 1.5),
  },
  divider: {
    margin: theme.spacing(0.5, 0),
  },
  datePicker: {
    padding: theme.spacing(0, 1),
    width: '100%',
  },
  searchIcon: {
    width: 40,
    color: '#CCCCCC',
    margin: '7px 0 7px 7px',
  },
}))

export default useStyles
