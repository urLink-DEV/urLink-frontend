import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  checkValidation: {
    position: 'relative',
    width: '100%',
    margin: '2px 0 10px 0',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.55px',
    opacity: 0,
  },
  checkTrue: {
    color: '#00b381',
    opacity: 1,
  },
  checkFalse: {
    color: '#ff6b6b',
    opacity: 1,
  },
}))

export default useStyles
