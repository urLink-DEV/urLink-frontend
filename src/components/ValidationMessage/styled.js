import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkValidation: {
    width: '100%',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.55px',
    position: 'relative',
    opacity: 0,
    margin: '2px 0 10px 0',
  },
  checkTrue: {
    opacity: 1,
    color: '#00b381',
  },
  checkFalse: {
    opacity: 1,
    color: '#ff6b6b',
  },
}));

export default useStyles;
