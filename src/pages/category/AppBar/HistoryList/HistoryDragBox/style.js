import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabMove: {
    display: 'flex',
    position: 'fixed',
    zIndex: -1,
    top: 10,
    right: 0,
    width: 110,
    height: 35,
    borderRadius: 3.2,
    boxShadow: '0 11px 22px 0 rgba(0, 0, 0, 0.15), 0 8px 8px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#2083ff',
    color: '#ffff',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    width: 23,
    height: 23,
    borderRadius: '50%',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  },
  moveIcon: {
    width: 20,
    height: 20,
    position: 'relative',
    left: 1,
  },
}));

export default useStyles;
