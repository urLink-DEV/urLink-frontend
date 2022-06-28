import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  tabMove: {
    position: 'absolute',
    zIndex: -1,
    top: 10,
    right: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 110,
    height: 35,

    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3.2,
    boxShadow: '0 11px 22px 0 rgba(0, 0, 0, 0.15), 0 8px 8px 0 rgba(0, 0, 0, 0.12)',

    fontSize: 12,
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 23,
    height: 23,
    marginRight: 7,

    borderRadius: '50%',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  },
  moveIcon: {
    position: 'relative',
    left: 1,

    width: 20,
    height: 20,
  },
}))

export default useStyles
