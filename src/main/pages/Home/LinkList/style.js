import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 748,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 1084,
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: 1420,
    },
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
    padding: '172px 108px 172px 56px',
  },
  header: {
    marginBottom: 32,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 636,
    },
    [theme.breakpoints.up('lg')]: {
      width: 972,
    },
    [theme.breakpoints.up('xl')]: {
      width: 1308,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexFlow: 'row wrap',
    gap: 36,
    minHeight: 'calc(100vh - 61px);',
    margin: '0',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 636,
    },
    [theme.breakpoints.up('lg')]: {
      width: 972,
    },
    [theme.breakpoints.up('xl')]: {
      width: 1308,
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
