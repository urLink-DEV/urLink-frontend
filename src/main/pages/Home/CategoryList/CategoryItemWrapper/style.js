import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  dragline: {
    width: 208,
    height: 2,
    borderRadius: 2,
    backgroundImage: 'linear-gradient(271deg, #e0f6ff, #2083ff)',
    opacity: 0,
    margin: 'auto',
  },
}))

export default useStyles
