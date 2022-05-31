import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    width: 656,
    height: 'calc(100vh - 72px);',

    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: '16px 16px 10px 16px',
  },
  mainText: {
    marginRight: 10,
    marginTop: 2,
    height: 36,

    backgroundColor: 'transparent',

    fontSize: '20pt',
    fontWeight: 'bold',
  },
  reloadIcon: {
    padding: 0,
  },
  tabOpenButton: {
    marginLeft: 10,
    marginTop: 10,
    padding: 0,
    backgroundColor: 'transparent',
  },
  tabOpenText: {
    color: theme.palette.primary.main,

    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.64,
    textAlign: 'center',
  },
  content: {
    overflowY: 'scroll',
    overflowX: 'hidden',

    height: '100%',
    paddingTop: 0,
  },
  imgContent: {
    width: 'auto',
  },

  /* common */
  rowSpread: {
    display: 'flex',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop16: {
    marginTop: 16,
  },
}))

export default useStyles
