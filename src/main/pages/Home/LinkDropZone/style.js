import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  coverBackground: {
    position: 'absolute',
    zIndex: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 'calc(100% - 917px)',
    height: '100%',

    backgroundColor: 'rgba(53, 142, 255, 0.15)',
    opacity: 1,
  },
  displayNone: {
    display: 'none',
  },
  addLinkIcon: {
    width: 50,
    height: 50,

    color: theme.palette.primary.main,
  },
}))

export default useStyles
