import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  divRoot: {
    display: 'inline',
  },
  root: {
    maxWidth: 345,
    margin: 5,
  },
  cardContent: {
    height: 80,
    padding: 5,
  },
  cardContentTitle: {
    fontSize: 14,
  },
  cardContentDesc: {
    fontSize: 12,
  },
  cardActions: {
    padding: 5
  },
  icons: {
    padding: 5
  }
});

export default useStyles