import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  termsModal: {
    width: '600px',
    height: '500px',
  },
  alertModal: {
    lignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  alertIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  alertModalBtn: {
    width: '100%',
  },
}));

export default useStyles;
