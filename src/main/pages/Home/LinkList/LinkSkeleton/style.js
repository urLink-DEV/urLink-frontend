import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 348,
    marginTop: 20,
    boxShadow: 'none',
  },
  cardContent: {
    padding: '12px 16px',
    '& span': {
      transform: 'scale(1.0)',
    },
  },
}))

export default useStyles
