import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  termsModal: {
    width: '600px',
    height: '500px',
  },
  alertModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
}))

export default useStyles
