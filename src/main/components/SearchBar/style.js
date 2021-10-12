import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    width: 410,
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
  searchInputBase: {
    width: '65%',
  },
  searchInput: {
    width: '100%',
    color: 'black',
    fontSize: 14,
    paddingLeft: `calc(${theme.spacing(1)}px)`,
  },
  inputSelect: {
    width: '25%',
    fontSize: 14,
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
    width: '65%',
    padding: theme.spacing(0, 1),
    marginTop: 5,
    '& > .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl': {
      fontSize: 14,
    },
  },
  searchIcon: {
    width: '10%',
    color: '#CCCCCC',
    margin: '7px 0 7px 7px',
  },
}))

export default useStyles
