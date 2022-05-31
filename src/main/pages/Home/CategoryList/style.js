import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  logo: {
    width: 95,
    margin: '24px 0 28px',
  },
  drawerPaper: {
    width: '100%',
    height: '100%',
    padding: '0 28px',
  },
  layout: {
    width: '100%',
    height: 'calc(100% - 258px)',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll',
  },
  flexCenterBackground: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  favoriteList: {
    padding: 0,
  },
  notFavoriteList: {},
  addCategoryBtn: {
    height: '120px',
    width: '100%',
    borderRadius: 'unset',
    borderTop: '1px solid #C0C0C0',
    justifyContent: 'space-between',
    fontSize: 16,
    color: '#666',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

export default useStyles
