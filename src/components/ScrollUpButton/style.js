import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: 0,

    transform: 'translateY(100px)',
    transition: 'all .5s ease',
  },
  showBtn: {
    opacity: 1,
    
    transform: 'translateY(0)',
  },
}));

export default useStyles;
