import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  logo: {
    width: 95,
    margin: '28px 5px 28px 20px',
  },
  drawerPaper: {
    width: 260,
  },
  layout: {
    width: 240,
    margin: '0px auto',
    padding: '0 10px',
    backgroundColor: '#fff',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    height: '100%',
    overflowY: 'auto',
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
