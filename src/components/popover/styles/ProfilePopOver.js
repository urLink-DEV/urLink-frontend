import makeStyles from '@material-ui/styles/makeStyles'
import withStyles from '@material-ui/styles/withStyles'
import Badge from '@material-ui/core/Badge'

export const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles({
  root: {
    width: 320,
    height: 228,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    width: 60,
    height: 29,
    fontFamily: 'SpoqaHanSans',
    fontSize: 20,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
  },
  content: {
    paddingTop: 24,
  },
  pos: {
    marginBottom: 12,
  },
  profileImg: {
    width: 52,
    height: 52,
    marginRight: 16,
    marginBottom: 24,
  },
  profileInfoGrid: {
    paddingTop: 5
  },
  profileName: {
    fontSize: 14,
  },
  profileEmail: {
    fontSize: 12,
  },
  profileBtn: {
    fontSize: 12,
    marginTop: 5,
  },
  logoutBtn: {
    width: '100%',
    backgroundColor: 'white'
  }
});

export default useStyles