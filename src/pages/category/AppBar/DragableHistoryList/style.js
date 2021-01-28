import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: 575,
    height: '100vh',
    // padding: '20px 24px 22px 24px',
    backgroundColor: '#f6f6f6',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainText: {
    backgroundColor: 'transparent',
    marginRight: 16,
    height: 36,
    fontSize: '20pt',
    fontWeight: 'bold',
  },
  spread: {
    display: 'flex',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOpenButton: {
    marginLeft: 16,
    backgroundColor: 'transparent',
  },
  tabOpenText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.64,
    textAlign: 'center',
    color: '#2083ff',
  },
  marginTop16: {
    marginTop: 16,
  },
  imgContent: {
    width: 'auto',
  },
}));

export default useStyles;
