import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
    padding: '200px 108px 200px 56px',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      minWidth: 748,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 1084,
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: 1420,
    },
  },
  content: {
    minHeight: 'calc(100vh - 61px);',
    margin: '0',
    // '& > .MuiGrid-item': {},
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
