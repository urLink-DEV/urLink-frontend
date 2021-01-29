import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    width: 575,
    height: '100vh',
    // padding: '20px 24px 22px 24px',

    backgroundColor:
      theme.palette.type !== 'dark'
        ? theme.palette.colorGroup.lightGrey
        : theme.palette.background.default,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: '16px 16px 0 16px',
  },
  mainText: {
    marginRight: 16,
    height: 36,

    backgroundColor: 'transparent',

    fontSize: '20pt',
    fontWeight: 'bold',
  },
  tabOpenButton: {
    marginLeft: 16,

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
  scrollUp: {
    position: 'absolute',
    bottom: 14,
    right: 6,
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
}));

export default useStyles;
