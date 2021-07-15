import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.64,
    textAlign: 'center',
  },
  tabOpenText: {
    color: theme.palette.primary.main,
  },
  tabDeleteText: {
    color: theme.palette.secondary.main,
  },
  refreshBtn: {
    padding: 12,
  },
}))

export default useStyles
