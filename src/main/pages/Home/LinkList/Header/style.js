import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
    '& > :nth-last-child(1)': {
      marginLeft: 'auto',
    },
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
}))

export default useStyles
