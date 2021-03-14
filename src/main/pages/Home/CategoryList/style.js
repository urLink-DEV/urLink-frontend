import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 95,
    margin: '28px 5px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  layout: {
    width: 240,
    margin: 'auto',
    padding: '0 10px',
    backgroundColor: '#fff',
  },

  flexCenterBackground: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}))

export default useStyles
