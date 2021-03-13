import { fade, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    width: '100%',
    marginLeft: 0,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#2083ff', 0.75),
    '&:hover': {
      backgroundColor: fade('#2083ff', 0.5),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    position: 'absolute',
    height: '100%',
    padding: theme.spacing(0, 2),
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
    width: '100%',
    // vertical padding + font size from searchIcon
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default useStyles
