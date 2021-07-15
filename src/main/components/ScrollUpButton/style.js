import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 14,
    right: 58,

    opacity: 0,

    transform: 'translateY(100px)',
    transition: 'all .5s ease',
  },
  showBtn: {
    opacity: 1,

    transform: 'translateY(0)',
  },
}))

export default useStyles
