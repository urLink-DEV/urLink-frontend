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
  categoryContainer: {
    width: '100%',
    height: 'calc(100% - 200px)',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll',
    borderTop: ({ observerVisible }) => (observerVisible ? 'unset' : '1px solid #C0C0C0'),
  },
  ioBox: {
    width: '100%',
    height: 52,
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
    marginBottom: 52,
  },
  notFavoriteList: {},
  addCategoryBtn: {
    height: '120px',
    width: '100%',
    borderTop: '1px solid #C0C0C0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 'unset',

    '& > h3': {
      fontSize: 16,
      fontWeight: 400,
      color: '#666',
      padding: '4px 16px',
      borderRadius: 8,
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%',
    },

    '&:hover': {
      backgroundColor: 'transparent',
      '& > h3': {
        backgroundColor: '#F2F2F2',
      },
    },
  },
}))

export default useStyles
