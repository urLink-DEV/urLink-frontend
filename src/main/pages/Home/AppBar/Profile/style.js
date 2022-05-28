import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    width: 320,
    height: 228,
  },
  title: {
    width: 100,
    height: 29,
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
  profileImg: {
    width: 52,
    height: 52,
    marginRight: 16,
    marginBottom: 24,
  },
  profileInfoGrid: {
    paddingTop: 5,
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
  },
})

export default useStyles
