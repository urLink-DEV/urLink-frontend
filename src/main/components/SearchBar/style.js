import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    gap: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: 380,
    height: 38,
    padding: '0px 40px 0px 16px',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
  },
  searchBarDisabled: {
    opacity: 0.4,
  },
  searchSelect: {
    paddingRight: '12px',
    fontSize: 14,
  },
  searchSelectPaper: {
    padding: '12px 0 12px 0',
    width: 199,
    borderRadius: 8,

    '& > .MuiMenu-list': {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
  },
  searchSelectItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: 14,

    color: '#777777',
  },
  divider: {
    height: 31,
  },
  pickerBtn: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    fontSize: 14,

    width: '100%',
    borderBottom: '1px solid',
    borderRadius: 0,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  datePicker: {
    width: 320,
  },
  searchIcon: {
    margin: '11px 10px',
    width: 16,
    height: 16,
    color: '#777777',
  },
}))

export default useStyles
