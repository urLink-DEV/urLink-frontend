import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 95,
    margin: '28px 5px',
  },
  drawerPaper: {
    width: 260,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  layout: {
    width: 240,
    margin: '0px auto',
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
