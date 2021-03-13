import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  hr: {
    width: '70%',
    border: '1px solid #d6d6d6',
  },
  favoriteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
  favoriteText: {
    height: 18,
    fontSize: 12,
    color: '#2083ff',
    display: 'inline-block',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 5,
  },
  categoryText: {
    height: '18px',
    fontSize: '12px',
    color: '#868e96',
    display: 'inline-block',
  },
}))

export default useStyles
