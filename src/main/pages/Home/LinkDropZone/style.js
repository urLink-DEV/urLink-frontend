import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  coverBackground: {
    position: 'absolute',
    zIndex: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 'calc(100% - 600px)',
    height: '100%',
    paddingLeft: 259,

    backgroundColor: 'rgba(53, 142, 255, 0.15)',
    opacity: 1,
  },
  diplayNone: {
    display: 'none',
  },
  addLinkIcon: {
    width: 50,
    height: 50,

    color: theme.palette.primary.main,
  },
}))

export default useStyles
