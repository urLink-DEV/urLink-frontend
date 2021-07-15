import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 15,
    height: '100vh',
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 15,
    },
  },
  content: {
    maxHeight: 'calc(100vh - 61px);',
    overflow: 'scroll',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
