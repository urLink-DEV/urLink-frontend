import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 208,
    height: 241,
  },
  media: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 5,
    '& span': {
      transform: 'scale(1.0)',
    },
  },
}))

export default useStyles
